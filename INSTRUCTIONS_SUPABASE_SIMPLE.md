# 🚀 INSTRUCTIONS SUPABASE - SIMPLE ET RAPIDE

## ⚠️ ERREUR ACTUELLE
L'application ne trouve pas les clés Supabase. Il faut les configurer.

---

## 📋 ÉTAPE 1: Exécuter le SQL dans Supabase

### Dans Supabase Dashboard:

1. **Vous êtes déjà dans "SQL Editor"** ✅
2. **Cliquez sur "+ New"** (bouton en haut à gauche de l'éditeur)
3. **Un nouvel onglet s'ouvre** avec un éditeur vide
4. **Copiez TOUT le contenu** du fichier `supabase/schema.sql` (je l'ai créé pour vous)
5. **Collez** dans l'éditeur SQL de Supabase
6. **Cliquez sur "Run"** (bouton vert avec une flèche ▶️)

**✅ Résultat attendu:** "Success. No rows returned"

---

## 📋 ÉTAPE 2: Récupérer vos Clés API

1. Dans Supabase, cliquez sur **"Settings"** (icône ⚙️ engrenage) dans la sidebar gauche
2. Cliquez sur **"API"** dans le menu Settings
3. Vous verrez deux choses importantes:

### 🔑 Project URL
```
https://dgflttnrpotuqivltiwd.supabase.co
```
→ C'est votre `NEXT_PUBLIC_SUPABASE_URL`

### 🔑 anon public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZmx0dG5ycG90dXFpdmx0aXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0Mjg4MDAsImV4cCI6MjA1MTAwNDgwMH0...
```
→ C'est votre `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**📋 COPIEZ CES DEUX VALEURS** (vous en aurez besoin après)

---

## 📋 ÉTAPE 3: Créer le fichier .env.local

1. **Ouvrez votre terminal** dans le dossier `dreamnova-client`
2. **Créez le fichier** `.env.local`:

```bash
cd /Users/codenolimits-dreamai-nanach/Desktop/alexis/dreamnova-client
touch .env.local
```

3. **Ouvrez le fichier** `.env.local` dans votre éditeur
4. **Ajoutez ces lignes** (remplacez par VOS vraies clés de l'étape 2):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://dgflttnrpotuqivltiwd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_ici_copier_de_supabase

# Gemini AI (si pas déjà configuré)
NEXT_PUBLIC_GEMINI_API_KEY=votre_cle_gemini
GEMINI_API_KEY=votre_cle_gemini
```

5. **Sauvegardez** le fichier

---

## 📋 ÉTAPE 4: Redémarrer le serveur

1. **Arrêtez** le serveur (Ctrl+C dans le terminal)
2. **Relancez** le serveur:

```bash
npm run dev
```

3. **Allez sur** http://localhost:3000

**✅ L'erreur devrait disparaître !**

---

## 🎯 RÉCAPITULATIF

1. ✅ SQL Editor → "+ New" → Coller SQL → "Run"
2. ✅ Settings → API → Copier URL et anon key
3. ✅ Créer `.env.local` avec les clés
4. ✅ Redémarrer `npm run dev`

**C'est tout !** 🎉

