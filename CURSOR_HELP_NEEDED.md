# 🚨 AIDE CURSOR - Onglet Développeur Sidebar

## PROBLÈME
L'onglet "Développeur" avec badge "DEV" n'apparaît PAS dans la sidebar pour l'utilisateur `testeur@example.com`, malgré plusieurs tentatives de correction.

## COMPORTEMENT ATTENDU
Quand l'utilisateur est connecté avec `testeur@example.com`, un onglet "Développeur 🔶 DEV" doit apparaître EN BAS de la sidebar (après "Réglementation"), avec:
- Icône: `code`
- Badge jaune "DEV"
- Lien vers: `/dev-tools`
- Couleur: jaune (text-yellow-400)

## COMPORTEMENT ACTUEL
L'onglet n'apparaît JAMAIS, même après:
- Hard refresh (Cmd+Shift+R)
- Vider le cache
- Attendre le déploiement Vercel
- Ajouter des console.log
- Changer la condition de `user?.email` à `user && user.email`
- Ajouter `onAuthStateChange` listener
- FORCER la visibilité pour TOUS les users (dernière tentative)

## CODE ACTUEL (Sidebar.tsx)

**Localisation**: `src/components/layout/Sidebar.tsx`

**Lignes 128-163**: Onglet DEV
```tsx
{/* Onglet Développeur - TEMPORAIREMENT VISIBLE POUR TOUS */}
{user && (
  <>
    <li className="px-3 py-2">
      <div className="border-t border-slate-700"></div>
    </li>
    <li key={DEV_NAV_ITEM.href}>
      <Link
        href={DEV_NAV_ITEM.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
          pathname === DEV_NAV_ITEM.href || pathname.startsWith(DEV_NAV_ITEM.href + '/')
            ? 'bg-yellow-600 text-white'
            : 'text-yellow-400 hover:bg-slate-800 hover:text-yellow-300'
        }`}
        title={isCollapsed ? DEV_NAV_ITEM.label : undefined}
      >
        <span className="material-symbols-outlined text-xl flex-shrink-0">
          {DEV_NAV_ITEM.icon}
        </span>
        {!isCollapsed && (
          <>
            <span className="flex-1">{DEV_NAV_ITEM.label}</span>
            <span className="px-2 py-0.5 bg-yellow-500 text-yellow-900 text-xs rounded-full font-bold">
              DEV
            </span>
          </>
        )}
      </Link>
    </li>
  </>
)}
```

**Lignes 38-58**: Hook useEffect
```tsx
useEffect(() => {
  const loadUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    console.log('🔍 [Sidebar] User loaded:', user?.email)
    setUser(user)
  }
  loadUser()

  // Écouter les changements d'auth
  const supabase = createClient()
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log('🔄 [Sidebar] Auth state changed:', session?.user?.email)
    setUser(session?.user || null)
  })

  return () => {
    subscription.unsubscribe()
  }
}, [pathname])
```

## CONTEXTE TECHNIQUE

### Architecture
- Next.js 14 (App Router)
- Supabase Auth
- Sidebar utilisé via `DashboardLayout` component
- URL déployée: https://dreamnova-client.vercel.app

### Utilisateur de test
- Email: `testeur@example.com`
- Mot de passe: (connu par l'utilisateur)
- Ce compte existe dans Supabase
- Utilisateur peut se connecter et accéder au dashboard

### Fichiers liés
1. `src/components/layout/Sidebar.tsx` - Sidebar avec l'onglet DEV
2. `src/components/layout/DashboardLayout.tsx` - Layout qui importe Sidebar
3. `src/app/dashboard/page.tsx` - Page dashboard qui utilise DashboardLayout
4. `src/app/dev-tools/page.tsx` - Page de destination (EXISTE déjà)

## TENTATIVES DE CORRECTION (toutes échouées)

### Commit df7e51d
- Ajout `onAuthStateChange` listener
- Re-render sur `pathname` change
- Console.log pour debug
- Condition stricte: `user && user.email === 'testeur@example.com'`

### Commit 146e3e3 (dernier)
- FORCÉ la visibilité pour TOUS les users: `{user && (...)}`
- Supprimé la condition email
- Badge vert ✓ pour testeur@example.com

## QUESTIONS POUR TOI, CURSOR

1. **Est-ce que le `user` se charge correctement?**
   - Comment vérifier dans la console si `user.email` est bien défini?
   - Y a-t-il un problème de timing (le render se fait avant que user soit chargé)?

2. **Est-ce que le composant Sidebar se re-render correctement?**
   - Le `useEffect` avec `[pathname]` est-il suffisant?
   - Faut-il forcer un re-render autrement?

3. **Y a-t-il un problème de cache côté Vercel/Next.js?**
   - Est-ce que le code déployé correspond bien au dernier commit?
   - Faut-il vider un cache Next.js?

4. **La condition est-elle correctement évaluée?**
   - Le JSX `{user && (...)}` devrait fonctionner, non?
   - Y a-t-il une meilleure façon de conditionner l'affichage?

## CE QU'ON ATTEND DE TOI

**Corrige le code pour que l'onglet "Développeur 🔶 DEV" apparaisse dans la sidebar.**

Soit:
1. Visible pour TOUS les utilisateurs connectés (temporaire pour debug)
2. OU visible UNIQUEMENT pour `testeur@example.com` (idéal)

**Important**: L'utilisateur doit voir le changement IMMÉDIATEMENT après:
- Deploy Vercel (2-3 min)
- Hard refresh (Cmd+Shift+R)

## FICHIERS À MODIFIER

Probablement juste: `src/components/layout/Sidebar.tsx`

Mais si nécessaire, tu peux aussi modifier:
- `src/components/layout/DashboardLayout.tsx`
- `src/app/dashboard/page.tsx`

## COMMIT MESSAGE SUGGÉRÉ

```
✅ FIX: Onglet Développeur sidebar ENFIN visible

[Explique ce que tu as corrigé]

Testé avec testeur@example.com sur Vercel.
```

---

**Merci Cursor! On compte sur toi!** 🙏
