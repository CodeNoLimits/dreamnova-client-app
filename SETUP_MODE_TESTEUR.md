# 🧪 SETUP MODE TESTEUR - GUIDE COMPLET

**Date:** 2025-11-12
**Objectif:** Configurer le bouton "Mode Testeur" pour accès direct sans email

---

## ✅ CE QUI A ÉTÉ FAIT

### 1. API Route créée: `/api/auth/tester`
- Crée automatiquement le compte `tester@dreamnova.app`
- Auto-confirme l'email (pas de vérification requise)
- Génère une session Supabase valide
- Crée profil + abonnement Growth automatiquement

### 2. Bouton "Mode Testeur" mis à jour
- Appelle `/api/auth/tester` au clic
- Reçoit la session et se connecte automatiquement
- Redirige vers `/dashboard`

---

## 🔧 CONFIGURATION REQUISE

### Étape 1: Récupérer la Service Role Key

1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet **DreamNova**
3. Menu de gauche → **Settings** → **API**
4. Section "Project API keys"
5. **Copier** la clé `service_role` (⚠️ clé secrète!)

**Exemple:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```

### Étape 2: Ajouter dans `.env.local`

```bash
# .env.local (LOCAL - NE PAS COMMIT)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....
```

⚠️ **IMPORTANT:** Cette clé **NE DOIT JAMAIS être committée** dans Git!

### Étape 3: Ajouter dans Vercel (production)

1. Aller sur https://vercel.com/dashboard
2. Sélectionner projet **dreamnova-client**
3. **Settings** → **Environment Variables**
4. Ajouter:
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....` (ta clé)
   - Environments: ✅ Production, ✅ Preview, ✅ Development
5. **Save**
6. **Redéployer** l'application

---

## 🧪 TESTER EN LOCAL

### 1. Redémarrer le serveur de développement

```bash
npm run dev
```

### 2. Ouvrir la page de login

```
http://localhost:3000/login
```

### 3. Cliquer sur "Se connecter en mode Testeur (Growth)"

**Résultat attendu:**
- ✅ API `/api/auth/tester` appelée
- ✅ Compte `tester@dreamnova.app` créé/connecté
- ✅ Session Supabase active
- ✅ Redirection vers `/dashboard`
- ✅ Plan Growth visible

---

## 🔍 VÉRIFICATION SUPABASE

Après le premier clic sur "Mode Testeur":

1. Aller sur https://supabase.com/dashboard
2. Sélectionner projet DreamNova
3. **Authentication** → **Users**
4. Vérifier qu'il existe un utilisateur:
   - Email: `tester@dreamnova.app`
   - Email Confirmed: ✅ (auto-confirmé)
   - Last Sign In: Date récente

5. **Database** → **Table Editor** → **profiles**
6. Vérifier qu'il existe un profil:
   - id: (UUID du testeur)
   - full_name: "Testeur Growth"
   - company_name: "Compte Testeur Partagé"

7. **Database** → **Table Editor** → **subscriptions**
8. Vérifier qu'il existe un abonnement:
   - user_id: (UUID du testeur)
   - plan_type: "growth"
   - status: "active"
   - expires_at: Date dans 1 an

---

## 🚀 FONCTIONNEMENT

### Workflow complet

```
1. Utilisateur clique "Mode Testeur"
   ↓
2. Frontend appelle POST /api/auth/tester
   ↓
3. API vérifie si compte tester@dreamnova.app existe
   ↓
4a. Si NON → Crée compte + profil + abonnement
4b. Si OUI → Utilise compte existant
   ↓
5. API génère session Supabase valide
   ↓
6. Frontend reçoit access_token + refresh_token
   ↓
7. Frontend setSession() avec les tokens
   ↓
8. Redirection vers /dashboard
   ↓
9. ✅ Utilisateur connecté avec plan Growth
```

### Caractéristiques du compte testeur

- **Email:** tester@dreamnova.app
- **Password:** TesterGrowth2026! (fixe)
- **Partagé:** Tous les testeurs utilisent le même compte
- **Persistant:** Les audits et données restent en mémoire
- **Plan:** Growth (1 an d'abonnement)
- **Auto-confirmé:** Pas besoin de vérifier l'email

---

## 🐛 DÉPANNAGE

### Erreur: "Configuration Supabase manquante"

**Cause:** `SUPABASE_SERVICE_ROLE_KEY` non définie

**Solution:** Ajouter la clé dans `.env.local` (voir Étape 2)

### Erreur: "Erreur création compte testeur"

**Causes possibles:**
1. Service Role Key invalide → Vérifier la clé
2. Supabase down → Vérifier status.supabase.com
3. RLS policies bloquent l'insertion → Vérifier policies Supabase

**Solution:** Consulter les logs:
```bash
# Terminal où tourne npm run dev
# Les erreurs détaillées s'affichent dans la console
```

### Erreur: "Erreur connexion testeur"

**Cause:** Le compte existe mais le password ne correspond pas

**Solution:**
1. Aller dans Supabase Dashboard → Authentication → Users
2. Supprimer le compte `tester@dreamnova.app`
3. Recliquer sur "Mode Testeur" → Le compte sera recréé

### Le bouton ne fait rien

**Vérifier:**
1. Console navigateur (F12) → Onglet Console
2. Rechercher erreurs JavaScript
3. Vérifier que `/api/auth/tester` existe:
   ```bash
   ls -la src/app/api/auth/tester/route.ts
   ```

---

## ✅ CHECKLIST FINALE

- [ ] Service Role Key récupérée depuis Supabase
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ajoutée dans `.env.local`
- [ ] Serveur dev redémarré (`npm run dev`)
- [ ] Bouton "Mode Testeur" cliqué
- [ ] Connexion réussie au dashboard
- [ ] Plan Growth visible
- [ ] Compte vérifié dans Supabase Dashboard
- [ ] Variable ajoutée dans Vercel
- [ ] Application redéployée sur Vercel
- [ ] Test en production réussi

---

## 📞 SUPPORT

Si problème persiste:

1. Vérifier les logs serveur (terminal npm run dev)
2. Vérifier console navigateur (F12)
3. Vérifier Supabase Dashboard → Authentication → Users
4. Vérifier que la Service Role Key est correcte

---

**Document créé par Claude Code - 2025-11-12**
