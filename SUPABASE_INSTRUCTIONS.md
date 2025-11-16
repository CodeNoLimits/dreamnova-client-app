# 🚀 Instructions Supabase - Étape par Étape

## ✅ ÉTAPE 1: Exécuter le Script SQL

1. **Dans Supabase Dashboard**, cliquez sur **"SQL Editor"** dans la sidebar gauche
2. Cliquez sur **"New Query"** (bouton en haut à droite)
3. **Ouvrez le fichier** `supabase/schema.sql` dans votre projet
4. **Copiez TOUT le contenu** du fichier
5. **Collez** dans l'éditeur SQL de Supabase
6. Cliquez sur **"Run"** (ou Ctrl+Enter)

**✅ Vérification:** Vous devriez voir "Success. No rows returned"

---

## ✅ ÉTAPE 2: Vérifier les Tables

1. Cliquez sur **"Table Editor"** dans la sidebar
2. Vous devriez voir 4 tables créées:
   - ✅ `profiles`
   - ✅ `audits`
   - ✅ `subscriptions`
   - ✅ `invoices`

---

## ✅ ÉTAPE 3: Récupérer les Clés API

1. Cliquez sur **"Settings"** (icône engrenage) dans la sidebar
2. Cliquez sur **"API"** dans le menu Settings
3. Vous verrez deux clés importantes:

### 🔑 Project URL
```
https://dgflttnrpotuqivltiwd.supabase.co
```
(C'est votre `NEXT_PUBLIC_SUPABASE_URL`)

### 🔑 anon public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
(C'est votre `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

---

## ✅ ÉTAPE 4: Configurer .env.local

1. **Créez un fichier** `.env.local` à la racine du projet `dreamnova-client/`

2. **Ajoutez ces lignes** (remplacez par VOS vraies clés):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dgflttnrpotuqivltiwd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_ici

# Gemini AI (si pas déjà configuré)
NEXT_PUBLIC_GEMINI_API_KEY=votre_cle_gemini
GEMINI_API_KEY=votre_cle_gemini
```

3. **Sauvegardez** le fichier

---

## ✅ ÉTAPE 5: Désactiver la Confirmation Email (Optionnel - Dev)

Pour tester rapidement sans vérifier l'email:

1. Dans Supabase Dashboard → **Settings** → **Authentication**
2. Scroll jusqu'à **"Email Auth"**
3. **Désactivez** "Confirm email" (toggle OFF)
4. Cliquez **"Save"**

---

## ✅ ÉTAPE 6: Tester l'Authentification

1. **Redémarrez** le serveur de dev:
   ```bash
   cd dreamnova-client
   npm run dev
   ```

2. **Allez sur** http://localhost:3000/login

3. **Créez un compte de test:**
   - Email: `test@example.com`
   - Password: `test123456`
   - Company: `Test Company`

4. **Vérifiez** que:
   - ✅ L'inscription fonctionne
   - ✅ Vous êtes redirigé vers `/dashboard`
   - ✅ Votre profil est créé dans Supabase (Table Editor → profiles)

---

## 🎉 C'EST FAIT !

Votre authentification Supabase est maintenant configurée et fonctionnelle !

**Prochaines étapes:**
- Tester le workflow complet (inscription → audit → dashboard)
- Enrichir le dashboard avec les données réelles
- Intégrer les agents IA pour sauvegarder les audits

---

**Questions?** Vérifiez les logs dans la console du navigateur ou les logs Supabase (Settings → Logs)

