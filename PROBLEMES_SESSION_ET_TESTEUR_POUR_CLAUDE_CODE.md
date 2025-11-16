# 🚨 PROBLÈMES CRITIQUES - SESSION ET BOUTON TESTEUR

## Date: 2025-01-27
## Pour: Claude Code
## De: Cursor

---

## 📋 RÉSUMÉ DES PROBLÈMES

Deux problèmes critiques empêchent l'utilisation normale de l'application :

1. **❌ Session ne persiste pas** : L'utilisateur est déconnecté lors des navigations internes
2. **❌ Bouton "Se connecter en mode Testeur (Growth)" échoue** : Erreur "Erreur création compte testeur"

---

## 🔴 PROBLÈME 1: SESSION QUI NE PERSISTE PAS

### Symptômes observés :
- L'utilisateur se connecte avec succès
- Il fait un audit
- Il clique sur le logo DreamNova pour revenir au dashboard
- **→ Il est déconnecté et redirigé vers `/login`**

### Cause probable :
Le middleware ou la gestion des cookies Supabase ne persiste pas correctement la session lors des navigations.

### Fichiers concernés :
1. `src/middleware.ts` - Gestion des cookies et refresh de session
2. `src/lib/supabase/client.ts` - Client Supabase côté client
3. `src/lib/supabase/server.ts` - Client Supabase côté serveur
4. `src/app/dashboard/page.tsx` - Vérification de session

### Solutions à implémenter :

#### A. Améliorer le middleware (`src/middleware.ts`)

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              // CRITIQUE: Augmenter la durée de vie des cookies
              maxAge: options?.maxAge || 60 * 60 * 24 * 30, // 30 jours au lieu de 7
              sameSite: 'lax', // Toujours 'lax' pour la persistance
              secure: process.env.NODE_ENV === 'production',
              httpOnly: options?.httpOnly !== false,
              path: '/', // CRITIQUE: Cookie accessible partout
            })
          )
        },
      },
    }
  )

  // CRITIQUE: Rafraîchir la session à chaque requête
  const { data: { user } } = await supabase.auth.getUser()

  // Si l'utilisateur est connecté, s'assurer que la session est valide
  if (user) {
    // Vérifier que les cookies de session sont bien présents
    const sessionCookie = request.cookies.get('sb-access-token')
    if (!sessionCookie) {
      // Si pas de cookie, essayer de rafraîchir la session
      await supabase.auth.refreshSession()
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

#### B. Améliorer la gestion de session dans le dashboard (`src/app/dashboard/page.tsx`)

Dans la fonction `chargerAbonnement` et le `useEffect`, ajouter :

```typescript
useEffect(() => {
  const supabase = createClient()
  let isMounted = true

  // CRITIQUE: Vérifier la session AVANT de charger les données
  const checkSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Erreur session:', error)
      if (isMounted) {
        setLoading(false)
      }
      return
    }

    if (!session) {
      // Pas de session, rediriger vers login
      router.push('/login')
      return
    }

    // CRITIQUE: Forcer le refresh de la session si elle est expirée
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      // Session invalide, essayer de rafraîchir
      const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession()
      
      if (refreshError || !refreshedSession) {
        // Impossible de rafraîchir, rediriger vers login
        router.push('/login')
        return
      }
    }

    // Session valide, continuer
    if (isMounted) {
      setUser(session.user)
      Promise.all([
        chargerAudits(session.user.id),
        chargerAbonnement(session.user.id)
      ]).finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })
    }
  }

  checkSession()

  // Écouter les changements d'auth
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (!isMounted) return

    if (event === 'SIGNED_OUT' || !session) {
      router.push('/login')
    } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      setUser(session.user)
      await chargerAudits(session.user.id)
      await chargerAbonnement(session.user.id)
    }
  })

  return () => {
    isMounted = false
    subscription.unsubscribe()
  }
}, [router])
```

#### C. S'assurer que les cookies sont bien persistés côté client

Dans `src/lib/supabase/client.ts`, vérifier que la configuration est :

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return document.cookie.split('; ').map(cookie => {
            const [name, ...rest] = cookie.split('=')
            return { name, value: rest.join('=') }
          })
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // CRITIQUE: S'assurer que les cookies sont persistants
            const cookieString = `${name}=${value}; path=/; max-age=${options?.maxAge || 60 * 60 * 24 * 30}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
            document.cookie = cookieString
          })
        },
      },
    }
  )
}
```

---

## 🔴 PROBLÈME 2: BOUTON TESTEUR QUI ÉCHOUE

### Symptômes observés :
- L'utilisateur clique sur "Se connecter en mode Testeur (Growth)"
- **→ Erreur affichée : "Erreur création compte testeur"**

### Causes probables :
1. **`SUPABASE_SERVICE_ROLE_KEY` manquante** dans `.env.local`
2. **Erreur dans la route API** `/api/auth/tester`
3. **Problème avec l'API Admin de Supabase**

### Fichiers concernés :
1. `src/app/api/auth/tester/route.ts` - Route API pour le compte testeur
2. `.env.local` - Variables d'environnement

### Solutions à implémenter :

#### A. Vérifier que `SUPABASE_SERVICE_ROLE_KEY` est configurée

**IMPORTANT** : Cette clé est critique. Elle se trouve dans :
- Supabase Dashboard → Settings → API → `service_role` key (secret)

Ajouter dans `.env.local` :
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### B. Améliorer la route API (`src/app/api/auth/tester/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const TESTER_EMAIL = 'tester@example.com'
const TESTER_PASSWORD = 'TesterGrowth2026!'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // CRITIQUE: Vérifier que les variables sont présentes
    if (!supabaseUrl) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL manquante')
      return NextResponse.json(
        { error: 'Configuration Supabase manquante: NEXT_PUBLIC_SUPABASE_URL' },
        { status: 500 }
      )
    }

    if (!supabaseServiceKey) {
      console.error('❌ SUPABASE_SERVICE_ROLE_KEY manquante')
      return NextResponse.json(
        { 
          error: 'Configuration Supabase manquante: SUPABASE_SERVICE_ROLE_KEY',
          details: 'Ajoutez SUPABASE_SERVICE_ROLE_KEY dans .env.local (trouvez-la dans Supabase Dashboard → Settings → API → service_role key)'
        },
        { status: 500 }
      )
    }

    // Créer un client Supabase avec la Service Role Key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Étape 1: Vérifier si le compte existe
    let existingUser = null
    try {
      const { data: userData, error: getUserError } = await supabaseAdmin.auth.admin.getUserByEmail(TESTER_EMAIL)
      if (!getUserError && userData?.user) {
        existingUser = userData.user
        console.log('✅ Compte testeur existe déjà:', existingUser.id)
      }
    } catch (err) {
      console.log('ℹ️ Compte testeur n\'existe pas encore')
    }

    let userId: string

    // Étape 2: Créer le compte s'il n'existe pas
    if (!existingUser) {
      console.log('📝 Création du compte testeur...')
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: TESTER_EMAIL,
        password: TESTER_PASSWORD,
        email_confirm: true, // CRITIQUE: Auto-confirmer l'email
        user_metadata: {
          company_name: 'Compte Testeur Partagé',
          is_tester: true,
        }
      })

      if (createError) {
        console.error('❌ Erreur création compte:', createError)
        
        // Si l'erreur est "already registered", récupérer l'utilisateur
        if (createError.message?.includes('already registered') || createError.message?.includes('already exists')) {
          console.log('ℹ️ Compte existe déjà, récupération...')
          const { data: existingUserData, error: getUserError } = await supabaseAdmin.auth.admin.getUserByEmail(TESTER_EMAIL)
          if (!getUserError && existingUserData?.user) {
            existingUser = existingUserData.user
            userId = existingUser.id
          } else {
            return NextResponse.json(
              { error: 'Erreur création compte testeur', details: createError.message },
              { status: 500 }
            )
          }
        } else {
          return NextResponse.json(
            { error: 'Erreur création compte testeur', details: createError.message },
            { status: 500 }
          )
        }
      } else if (newUser?.user) {
        userId = newUser.user.id
        console.log('✅ Compte testeur créé:', userId)
      } else {
        return NextResponse.json(
          { error: 'Erreur création compte testeur', details: 'Aucun utilisateur créé' },
          { status: 500 }
        )
      }
    } else {
      userId = existingUser.id
    }

    // Étape 3: Créer/mettre à jour le profil
    const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
      id: userId,
      full_name: 'Testeur Growth',
      company_name: 'Compte Testeur Partagé',
    }, { onConflict: 'id' })

    if (profileError) {
      console.error('⚠️ Erreur création profil:', profileError)
      // Ne pas échouer, continuer
    } else {
      console.log('✅ Profil créé/mis à jour')
    }

    // Étape 4: Créer/mettre à jour l'abonnement Growth
    const { error: subError } = await supabaseAdmin.from('subscriptions').upsert({
      user_id: userId,
      plan_type: 'growth',
      plan_name: 'GROWTH',
      status: 'active',
      started_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
    }, { onConflict: 'user_id' })

    if (subError) {
      console.error('⚠️ Erreur création abonnement:', subError)
      // Ne pas échouer, continuer
    } else {
      console.log('✅ Abonnement Growth créé/mis à jour')
    }

    // Étape 5: Se connecter pour obtenir une session
    console.log('🔐 Connexion au compte testeur...')
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: TESTER_EMAIL,
      password: TESTER_PASSWORD,
    })

    if (signInError || !signInData.session) {
      console.error('❌ Erreur connexion testeur:', signInError)
      return NextResponse.json(
        { error: 'Erreur connexion testeur', details: signInError?.message || 'Session non créée' },
        { status: 500 }
      )
    }

    console.log('✅ Session créée avec succès')

    // Retourner la session
    return NextResponse.json({
      success: true,
      session: {
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
        user: signInData.user,
      }
    })

  } catch (error: any) {
    console.error('❌ Erreur API auth/tester:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    )
  }
}
```

#### C. Améliorer la gestion d'erreur côté client (`src/app/login/page.tsx`)

Dans le handler du bouton testeur :

```typescript
onClick={async () => {
  setIsLoading(true)
  setError(null)
  try {
    const supabase = createClient()
    
    const response = await fetch('/api/auth/tester', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const result = await response.json()

    if (!response.ok) {
      // Afficher l'erreur détaillée
      throw new Error(result.details || result.error || 'Erreur lors de la connexion testeur')
    }

    if (!result.session) {
      throw new Error('Erreur: Session non créée')
    }

    // CRITIQUE: Forcer la session côté client
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: result.session.access_token,
      refresh_token: result.session.refresh_token,
    })

    if (sessionError) {
      console.error('Erreur session:', sessionError)
      throw new Error('Erreur lors de la création de la session')
    }

    // CRITIQUE: Attendre un peu pour que la session soit bien persistée
    await new Promise(resolve => setTimeout(resolve, 500))

    setSuccess('Connexion au compte testeur réussie ! Redirection...')
    
    // Rediriger vers le dashboard
    router.push('/dashboard')
    router.refresh()
    
  } catch (err: any) {
    console.error('Erreur connexion testeur:', err)
    setError(err.message || 'Erreur lors de la connexion testeur. Veuillez réessayer.')
  } finally {
    setIsLoading(false)
  }
}}
```

---

## ✅ CHECKLIST POUR CLAUDE CODE

- [ ] Vérifier que `SUPABASE_SERVICE_ROLE_KEY` est dans `.env.local`
- [ ] Améliorer le middleware pour persister les cookies (30 jours, path='/')
- [ ] Améliorer la gestion de session dans le dashboard (refresh automatique)
- [ ] Améliorer la route API `/api/auth/tester` avec meilleure gestion d'erreur
- [ ] Ajouter des logs détaillés pour le debugging
- [ ] Tester que la session persiste lors des navigations
- [ ] Tester que le bouton testeur fonctionne

---

## 🔍 DEBUGGING

Pour déboguer :

1. **Vérifier les cookies dans le navigateur** :
   - Ouvrir DevTools → Application → Cookies
   - Vérifier que les cookies Supabase sont présents (`sb-access-token`, `sb-refresh-token`)

2. **Vérifier les logs serveur** :
   - Regarder les logs de la route `/api/auth/tester`
   - Vérifier les erreurs dans la console

3. **Tester la session** :
   - Se connecter
   - Ouvrir DevTools → Application → Cookies
   - Naviguer vers une autre page
   - Vérifier que les cookies sont toujours présents

---

## 📝 NOTES IMPORTANTES

- **NE JAMAIS désactiver la confirmation email dans Supabase** (comme demandé par l'utilisateur)
- Utiliser `email_confirm: true` dans l'API Admin pour bypasser la confirmation
- La session doit persister pendant au moins 30 jours
- Le compte testeur est partagé entre tous les testeurs (`tester@example.com`)

---

**Merci Claude Code pour ton aide ! 🙏**

