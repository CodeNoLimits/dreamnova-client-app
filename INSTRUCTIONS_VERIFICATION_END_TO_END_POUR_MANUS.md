# 📋 INSTRUCTIONS DE VÉRIFICATION END-TO-END - DREAMNOVA COMPTA

## Pour: Manus (Agent Autonome)
## Date: 2025-01-27
## Type: Vérification Macro et Micro - End-to-End

---

## 🎯 OBJECTIF

Effectuer une vérification complète de l'application DreamNova Compta, couvrant :
- ✅ **Vérifications Macro** : Fonctionnalités principales, flux utilisateur complets
- ✅ **Vérifications Micro** : Détails UI/UX, responsive, accessibilité, performance
- ✅ **Vérifications End-to-End** : Scénarios utilisateur complets de A à Z

---

## 📊 STRUCTURE DE VÉRIFICATION

### Niveaux de vérification
1. **Niveau 1 - Macro** : Fonctionnalités critiques, flux principaux
2. **Niveau 2 - Micro** : Détails UI, responsive, edge cases
3. **Niveau 3 - End-to-End** : Scénarios complets utilisateur réel

---

## 🔴 NIVEAU 1 - VÉRIFICATIONS MACRO (CRITIQUES)

### 1.1 AUTHENTIFICATION ET SESSION

#### Test 1.1.1 : Inscription Nouvel Utilisateur
**URL**: `http://localhost:3000/login` (ou URL production)

**Étapes**:
1. Aller sur `/login`
2. Cliquer sur l'onglet "Inscription"
3. Remplir le formulaire :
   - Nom entreprise : "Test Company SAS"
   - Email : `test-${Date.now()}@example.com`
   - Mot de passe : `TestPassword123!`
4. Cliquer sur "Créer mon compte"

**Résultats attendus**:
- ✅ Formulaire valide les champs (email, mot de passe)
- ✅ Compte créé avec succès
- ✅ Redirection vers `/dashboard` OU message de confirmation email
- ✅ Profil créé automatiquement dans Supabase
- ✅ Badge plan affiché (probablement "ESSAI GRATUIT" ou aucun)

**Vérifications**:
- [ ] Pas d'erreur console (F12 → Console)
- [ ] Pas d'erreur réseau (F12 → Network)
- [ ] Session créée et persistante
- [ ] Cookies Supabase présents (F12 → Application → Cookies)

---

#### Test 1.1.2 : Connexion Utilisateur Existant
**URL**: `/login`

**Étapes**:
1. Aller sur `/login`
2. Utiliser un compte existant (créé précédemment)
3. Entrer email et mot de passe
4. Cliquer sur "Se connecter"

**Résultats attendus**:
- ✅ Connexion réussie
- ✅ Redirection vers `/dashboard`
- ✅ Session persistante
- ✅ Badge plan affiché correctement

**Vérifications**:
- [ ] Pas d'erreur
- [ ] Session maintenue après rechargement (F5)
- [ ] Cookies présents et valides

---

#### Test 1.1.3 : Mode Testeur (Growth)
**URL**: `/login`

**Étapes**:
1. Aller sur `/login`
2. Cliquer sur "Se connecter en mode Testeur (Growth)"
3. Attendre la connexion

**Résultats attendus**:
- ✅ Pas d'erreur "Erreur création compte testeur"
- ✅ Redirection vers `/dashboard`
- ✅ Email `tester@example.com` affiché
- ✅ Badge "GROWTH" visible à côté de l'email
- ✅ Toutes les fonctionnalités Growth accessibles

**Vérifications**:
- [ ] Logs serveur montrent succès (pas d'erreur)
- [ ] Badge "GROWTH" présent (pas "ESSAI GRATUIT")
- [ ] Checklist "Abonnement activé" coché automatiquement

---

#### Test 1.1.4 : Connexion manubousky@gmail.com (Premium MAX)
**URL**: `/login`

**Étapes**:
1. Aller sur `/login`
2. Se connecter avec `manubousky@gmail.com` (mot de passe existant)
3. Vérifier l'accès

**Résultats attendus**:
- ✅ Connexion réussie
- ✅ Badge "PREMIUM MAX" visible
- ✅ Toutes les fonctionnalités accessibles
- ✅ Pas de limitation

**Vérifications**:
- [ ] Badge "PREMIUM MAX" présent
- [ ] Toutes les fonctionnalités débloquées
- [ ] Pas de message de limitation

---

#### Test 1.1.5 : Persistance Session Navigation
**Scénario complet**:
1. Se connecter (testeur ou manubousky)
2. Aller sur `/dashboard`
3. Cliquer sur "Faire un audit" → `/audit`
4. Compléter l'audit (ou utiliser données de test)
5. Arriver sur `/audit-results`
6. **Cliquer sur le logo DreamNova** (en haut à gauche)
7. Vérifier le résultat

**Résultats attendus**:
- ✅ Logo redirige vers `/dashboard` (pas `/login`)
- ✅ Session toujours active
- ✅ Email et badge toujours visibles
- ✅ Pas de déconnexion

**Vérifications**:
- [ ] Navigation interne ne déconnecte pas
- [ ] Cookies toujours présents après navigation
- [ ] Session valide après plusieurs navigations

---

#### Test 1.1.6 : Persistance Session Homepage
**Étapes**:
1. Se connecter
2. Aller sur `/` (homepage)
3. Vérifier le comportement

**Résultats attendus**:
- ✅ Redirection automatique vers `/dashboard` si connecté
- ✅ OU affichage normal si non connecté

**Vérifications**:
- [ ] Pas de page blanche
- [ ] Redirection correcte si connecté

---

### 1.2 AUDIT DE CONFORMITÉ

#### Test 1.2.1 : Création Audit Complet
**URL**: `/audit`

**Étapes**:
1. Se connecter (testeur ou manubousky)
2. Aller sur `/audit`
3. Remplir le formulaire :
   - Nom entreprise : "Test Company"
   - Secteur : "Commerce"
   - Taille : "10-50 employés"
   - CA annuel : 500000
   - Volume B2B mensuel : 50
   - Volume B2C mensuel : 20
   - Solution actuelle : "Excel"
   - Format actuel : "PDF"
4. Cliquer sur "Lancer l'audit"
5. Attendre les résultats

**Résultats attendus**:
- ✅ Formulaire valide tous les champs
- ✅ Appel API Gemini réussi
- ✅ Résultats affichés sur `/audit-results`
- ✅ PDF générable
- ✅ Données cohérentes (pas de "0" inexpliqués)

**Vérifications**:
- [ ] Pas d'erreur "GEMINI_API_KEY required"
- [ ] Résultats complets (score, amendes, ROI, PDP)
- [ ] PDF téléchargeable
- [ ] Données logiques (amendes calculées si volume B2B > 0)

---

#### Test 1.2.2 : Navigation Audit → Dashboard
**Étapes**:
1. Compléter un audit
2. Sur `/audit-results`, cliquer sur le logo DreamNova
3. Vérifier le résultat

**Résultats attendus**:
- ✅ Retour au dashboard
- ✅ Session maintenue
- ✅ Audit visible dans l'historique

**Vérifications**:
- [ ] Pas de déconnexion
- [ ] Audit sauvegardé dans Supabase

---

### 1.3 CHECKLIST DE CONFORMITÉ

#### Test 1.3.1 : Checklist Affichage
**URL**: `/dashboard`

**Étapes**:
1. Se connecter
2. Aller sur `/dashboard`
3. Vérifier la checklist

**Résultats attendus**:
- ✅ 8 items affichés
- ✅ Progression calculée correctement
- ✅ Items "done" coché (si applicable)
- ✅ Items "pending" avec boutons bleus
- ✅ Items "blocked" grisés

**Vérifications**:
- [ ] Pour testeur : "Abonnement activé" = done
- [ ] Pour testeur : "PDP configuré" = pending (avec bouton)
- [ ] Progression affichée (ex: "25%")

---

#### Test 1.3.2 : Bouton "Configurer PDP"
**Étapes**:
1. Se connecter (testeur ou manubousky)
2. Aller sur `/dashboard`
3. Dans la checklist, cliquer sur "Configurer PDP"

**Résultats attendus**:
- ✅ Modal s'ouvre (pas de redirection)
- ✅ 6 options PDP affichées (Pennylane, Qonto, Sellsy, Tiime, Chorus Pro, Sage)
- ✅ Sélection possible
- ✅ Champ clé API apparaît après sélection
- ✅ Bouton "Connecter" activé si clé API remplie

**Vérifications**:
- [ ] Modal fonctionnel
- [ ] Pas d'erreur console
- [ ] Interface responsive

---

#### Test 1.3.3 : Connexion PDP Réelle
**Étapes**:
1. Ouvrir modal PDP (Test 1.3.2)
2. Sélectionner un PDP (ex: "Pennylane")
3. Entrer une clé API (peut être factice pour test)
4. Cliquer sur "Connecter"

**Résultats attendus**:
- ✅ Appel API `/api/pdp/connect` réussi
- ✅ Message de succès affiché
- ✅ Modal se ferme
- ✅ Page se recharge
- ✅ Checklist "PDP configuré" = done

**Vérifications**:
- [ ] Pas d'erreur 500 (table `pdp_connections` doit exister)
- [ ] Connexion enregistrée dans Supabase
- [ ] Checklist mise à jour

---

#### Test 1.3.4 : Autres Boutons Checklist
**Étapes**:
1. Vérifier chaque bouton de la checklist :
   - "Faire un audit" → `/audit`
   - "Voir les offres" → `/pricing`
   - "Configurer Factur-X" → `/dashboard#document-upload`
   - "Accéder à la formation" → `/formation`
   - "Tester" → `/dashboard#test-flow`
   - "Configurer" (archivage) → `/dashboard#archivage`
   - "Configurer" (e-reporting) → `/dashboard#e-reporting`

**Résultats attendus**:
- ✅ Tous les boutons fonctionnent
- ✅ Redirections correctes
- ✅ Ancre scroll vers la bonne section (si hash)

**Vérifications**:
- [ ] Pas de 404
- [ ] Scroll fonctionne pour les ancres
- [ ] Boutons "blocked" désactivés correctement

---

### 1.4 UPLOAD DE DOCUMENTS

#### Test 1.4.1 : Upload Desktop (Fichier)
**URL**: `/dashboard` → Section "Document Upload"

**Étapes**:
1. Se connecter
2. Aller sur `/dashboard`
3. Scroll vers section upload documents
4. Cliquer sur "Parcourir les fichiers"
5. Sélectionner un PDF ou image
6. Attendre l'upload

**Résultats attendus**:
- ✅ Fichier sélectionné
- ✅ Barre de progression affichée
- ✅ Upload réussit
- ✅ Message de succès
- ✅ Document enregistré dans Supabase

**Vérifications**:
- [ ] Logs console détaillés (`[Upload] Début`, `[Upload] Réponse`, `[Upload] Succès`)
- [ ] Logs serveur détaillés (`[API /convert]`)
- [ ] Pas d'erreur "Erreur de téléchargement"
- [ ] Document visible dans table `documents` (Supabase)

---

#### Test 1.4.2 : Upload Mobile (Caméra)
**URL**: `/dashboard` → Section "Document Upload" (sur mobile)

**Étapes**:
1. Ouvrir l'application sur mobile (ou simulateur mobile)
2. Se connecter
3. Aller sur `/dashboard`
4. Scroll vers section upload
5. Vérifier l'interface caméra
6. Prendre une photo OU sélectionner depuis galerie

**Résultats attendus**:
- ✅ Interface caméra visible UNIQUEMENT sur mobile
- ✅ Bouton "Prendre une photo" fonctionnel
- ✅ Photo capturée
- ✅ Upload réussit

**Vérifications**:
- [ ] Interface caméra cachée sur desktop
- [ ] Interface caméra visible sur mobile
- [ ] Upload fonctionne depuis caméra
- [ ] Logs détaillés présents

---

#### Test 1.4.3 : Conversion Factur-X
**Étapes**:
1. Uploader un PDF
2. Vérifier la conversion

**Résultats attendus**:
- ✅ PDF converti en Factur-X (si applicable)
- ✅ Format `factur-x` indiqué dans le résultat
- ✅ Fichier sauvegardé dans Storage

**Vérifications**:
- [ ] Conversion réussie (ou simulée)
- [ ] Document marqué comme "converted" dans DB

---

### 1.5 PAIEMENTS ET ABONNEMENTS

#### Test 1.5.1 : Page Pricing
**URL**: `/pricing`

**Étapes**:
1. Aller sur `/pricing`
2. Vérifier l'affichage

**Résultats attendus**:
- ✅ Plans mensuels affichés
- ✅ Plans one-shot affichés
- ✅ Prix corrects
- ✅ Boutons "Choisir" fonctionnels

**Vérifications**:
- [ ] Design cohérent
- [ ] Responsive (mobile/tablette/desktop)
- [ ] Pas d'erreur console

---

#### Test 1.5.2 : Checkout Stripe
**URL**: `/checkout?plan=growth-monthly`

**Étapes**:
1. Aller sur `/pricing`
2. Cliquer sur "Choisir" pour un plan mensuel
3. Sur `/checkout`, sélectionner "STRIPE"
4. Cliquer sur "Payer"

**Résultats attendus**:
- ✅ Redirection vers Stripe Checkout
- ✅ OU erreur claire si clé API manquante
- ✅ Pas d'erreur "Invalid API Key" sans explication

**Vérifications**:
- [ ] Redirection correcte (pas `localhost:3000` en production)
- [ ] URL Stripe valide
- [ ] Erreur claire si configuration manquante

---

#### Test 1.5.3 : Simulation Paiement
**URL**: `/checkout?plan=growth-monthly`

**Étapes**:
1. Aller sur `/checkout`
2. Sélectionner "SIMULER"
3. Cliquer sur "Payer"

**Résultats attendus**:
- ✅ Abonnement créé dans Supabase
- ✅ Status "active"
- ✅ Email de confirmation (simulé dans logs)
- ✅ Redirection vers confirmation

**Vérifications**:
- [ ] Abonnement visible dans table `subscriptions`
- [ ] Plan type correct
- [ ] Dates correctes (started_at, expires_at)

---

### 1.6 NAVIGATION ET ROUTES

#### Test 1.6.1 : Toutes les Routes Principales
**Routes à vérifier**:
- `/` → Homepage
- `/login` → Page connexion
- `/dashboard` → Dashboard (protégé)
- `/audit` → Formulaire audit (protégé)
- `/audit-results` → Résultats audit (protégé)
- `/pricing` → Page tarifs
- `/checkout` → Page paiement (protégé)
- `/formation` → Page formation
- `/reglementation` → Page réglementation
- `/mobile-scan` → Scan mobile (protégé)

**Résultats attendus**:
- ✅ Toutes les routes accessibles
- ✅ Routes protégées redirigent vers `/login` si non connecté
- ✅ Pas de 404
- ✅ Pas de page blanche

**Vérifications**:
- [ ] Chaque route charge correctement
- [ ] Protection d'authentification fonctionne
- [ ] Navigation fluide

---

## 🟡 NIVEAU 2 - VÉRIFICATIONS MICRO (DÉTAILS)

### 2.1 RESPONSIVE DESIGN

#### Test 2.1.1 : Desktop (1920x1080)
**Étapes**:
1. Ouvrir DevTools (F12)
2. Mode responsive : Desktop (1920x1080)
3. Naviguer sur toutes les pages

**Vérifications**:
- [ ] Layout correct (pas de débordement)
- [ ] Textes lisibles
- [ ] Boutons accessibles
- [ ] Images bien dimensionnées

---

#### Test 2.1.2 : Tablette (768x1024)
**Étapes**:
1. Mode responsive : iPad (768x1024)
2. Naviguer sur toutes les pages

**Vérifications**:
- [ ] Layout adapté
- [ ] Navigation fonctionnelle
- [ ] Formulaires utilisables
- [ ] Modals adaptés

---

#### Test 2.1.3 : Mobile (375x667 - iPhone)
**Étapes**:
1. Mode responsive : iPhone (375x667)
2. Naviguer sur toutes les pages

**Vérifications**:
- [ ] Layout mobile-first
- [ ] Textes lisibles (pas trop petits)
- [ ] Boutons assez grands pour le touch
- [ ] Navigation hamburger si présente
- [ ] Pas de scroll horizontal indésirable

---

#### Test 2.1.4 : Mobile Small (320x568 - iPhone SE)
**Étapes**:
1. Mode responsive : iPhone SE (320x568)
2. Vérifier les pages critiques

**Vérifications**:
- [ ] Layout fonctionne même sur petit écran
- [ ] Pas de contenu coupé
- [ ] Formulaires utilisables

---

### 2.2 UI/UX DÉTAILS

#### Test 2.2.1 : Badges Plans
**Vérifications**:
- [ ] Badge "GROWTH" affiché pour testeur
- [ ] Badge "PREMIUM MAX" affiché pour manubousky
- [ ] Badge "ESSAI GRATUIT" affiché pour nouveaux utilisateurs (si applicable)
- [ ] Couleurs cohérentes (Growth = primary, Premium = purple)
- [ ] Badge visible à côté de l'email dans header

---

#### Test 2.2.2 : Animations et Transitions
**Vérifications**:
- [ ] Animations fluides (pas de saccades)
- [ ] Transitions de page douces
- [ ] Loading states visibles
- [ ] Pas d'animations qui bloquent l'interaction

---

#### Test 2.2.3 : Messages d'Erreur
**Vérifications**:
- [ ] Messages d'erreur clairs et compréhensibles
- [ ] Messages en français
- [ ] Messages contextuels (pas de "Erreur" générique)
- [ ] Affichage cohérent (couleur rouge/danger)

---

#### Test 2.2.4 : Messages de Succès
**Vérifications**:
- [ ] Messages de succès visibles
- [ ] Messages contextuels
- [ ] Disparition automatique après quelques secondes
- [ ] Couleur cohérente (vert/success)

---

### 2.3 PERFORMANCE

#### Test 2.3.1 : Temps de Chargement
**Outils**: DevTools → Network

**Vérifications**:
- [ ] Page initiale < 3 secondes
- [ ] Navigation entre pages < 1 seconde
- [ ] Images optimisées (format WebP si possible)
- [ ] Pas de ressources inutiles chargées

---

#### Test 2.3.2 : Lighthouse Score
**Outils**: DevTools → Lighthouse

**Vérifications**:
- [ ] Performance > 80
- [ ] Accessibility > 90
- [ ] Best Practices > 80
- [ ] SEO > 80

---

#### Test 2.3.3 : Console Errors
**Outils**: DevTools → Console

**Vérifications**:
- [ ] Pas d'erreur JavaScript
- [ ] Pas d'erreur React
- [ ] Pas d'avertissement critique
- [ ] Erreurs réseau justifiées (si API externe échoue)

---

### 2.4 ACCESSIBILITÉ

#### Test 2.4.1 : Navigation Clavier
**Étapes**:
1. Utiliser uniquement le clavier (Tab, Enter, Espace)
2. Naviguer sur toutes les pages

**Vérifications**:
- [ ] Tous les éléments interactifs accessibles
- [ ] Focus visible (outline)
- [ ] Ordre de tabulation logique
- [ ] Pas de piège clavier

---

#### Test 2.4.2 : Contraste Couleurs
**Outils**: DevTools → Accessibility

**Vérifications**:
- [ ] Contraste texte/fond > 4.5:1 (WCAG AA)
- [ ] Contraste boutons > 3:1
- [ ] Pas de texte gris clair sur fond blanc

---

#### Test 2.4.3 : Alt Text Images
**Vérifications**:
- [ ] Images décoratives avec `alt=""`
- [ ] Images informatives avec `alt` descriptif
- [ ] Icônes avec `aria-label` si nécessaire

---

### 2.5 EDGE CASES

#### Test 2.5.1 : Formulaire Vide
**Étapes**:
1. Essayer de soumettre un formulaire vide
2. Vérifier la validation

**Vérifications**:
- [ ] Validation HTML5 fonctionne
- [ ] Messages d'erreur affichés
- [ ] Pas de soumission si invalide

---

#### Test 2.5.2 : Fichier Trop Volumineux
**Étapes**:
1. Essayer d'uploader un fichier > 25MB

**Vérifications**:
- [ ] Erreur claire affichée
- [ ] Message indique la limite
- [ ] Pas de crash

---

#### Test 2.5.3 : Format Fichier Non Supporté
**Étapes**:
1. Essayer d'uploader un fichier .exe ou .zip

**Vérifications**:
- [ ] Erreur claire
- [ ] Formats acceptés listés
- [ ] Pas de crash

---

#### Test 2.5.4 : Session Expirée
**Étapes**:
1. Se connecter
2. Attendre expiration session (ou supprimer cookies manuellement)
3. Essayer d'accéder à une page protégée

**Vérifications**:
- [ ] Redirection vers `/login`
- [ ] Message clair si nécessaire
- [ ] Pas d'erreur 500

---

## 🟢 NIVEAU 3 - VÉRIFICATIONS END-TO-END (SCÉNARIOS COMPLETS)

### 3.1 SCÉNARIO 1 : Nouvel Utilisateur Complet

**Objectif**: Simuler un utilisateur qui découvre l'application et complète tout le parcours

**Étapes**:
1. **Découverte**
   - Aller sur `/` (homepage)
   - Lire les informations
   - Cliquer sur "Faire mon audit gratuit"
   - OU cliquer sur "En savoir plus" → `/reglementation`

2. **Inscription**
   - Aller sur `/login`
   - Créer un compte
   - Vérifier email (ou connexion directe si confirmation désactivée)

3. **Premier Audit**
   - Aller sur `/audit`
   - Remplir le formulaire avec données réalistes
   - Lancer l'audit
   - Consulter les résultats sur `/audit-results`
   - Télécharger le PDF

4. **Découverte Dashboard**
   - Cliquer sur logo → `/dashboard`
   - Vérifier la checklist
   - Voir les statistiques
   - Consulter l'historique

5. **Souscription**
   - Cliquer sur "Voir les offres" → `/pricing`
   - Choisir un plan (ex: Growth)
   - Aller sur `/checkout`
   - Utiliser "SIMULER" pour tester
   - Vérifier l'abonnement créé

6. **Configuration PDP**
   - Retourner sur `/dashboard`
   - Dans checklist, cliquer sur "Configurer PDP"
   - Sélectionner un PDP
   - Entrer clé API
   - Connecter
   - Vérifier que checklist se met à jour

7. **Upload Document**
   - Sur `/dashboard`, section upload
   - Uploader un PDF
   - Vérifier la conversion
   - Vérifier que le document est enregistré

8. **Navigation Complète**
   - Naviguer entre toutes les pages
   - Vérifier que la session persiste
   - Tester les boutons de la checklist

**Vérifications Globales**:
- [ ] Aucune erreur bloquante
- [ ] Session persistante tout au long
- [ ] Données sauvegardées correctement
- [ ] UX fluide et intuitive

---

### 3.2 SCÉNARIO 2 : Utilisateur Testeur (Growth)

**Objectif**: Tester toutes les fonctionnalités Growth

**Étapes**:
1. **Connexion Testeur**
   - Aller sur `/login`
   - Cliquer sur "Se connecter en mode Testeur (Growth)"
   - Vérifier badge "GROWTH"

2. **Vérification Accès**
   - Vérifier que toutes les fonctionnalités Growth sont accessibles
   - Vérifier les limitations (si applicable)

3. **Test Audit**
   - Faire un audit
   - Vérifier les résultats
   - Télécharger PDF

4. **Test Checklist**
   - Vérifier que "Abonnement activé" = done
   - Configurer PDP
   - Uploader document
   - Vérifier progression checklist

5. **Test Navigation**
   - Naviguer entre pages
   - Vérifier persistance session
   - Tester tous les boutons

**Vérifications**:
- [ ] Badge "GROWTH" toujours visible
- [ ] Fonctionnalités Growth accessibles
- [ ] Pas de limitation inattendue

---

### 3.3 SCÉNARIO 3 : Utilisateur Premium MAX (manubousky)

**Objectif**: Tester l'accès maximum

**Étapes**:
1. **Connexion**
   - Se connecter avec `manubousky@gmail.com`
   - Vérifier badge "PREMIUM MAX"

2. **Vérification Accès**
   - Toutes les fonctionnalités accessibles
   - Pas de limitation

3. **Test Complet**
   - Faire un audit
   - Configurer PDP
   - Uploader documents
   - Tester toutes les fonctionnalités

**Vérifications**:
- [ ] Badge "PREMIUM MAX" visible
- [ ] Toutes les fonctionnalités débloquées
- [ ] Pas de message de limitation

---

### 3.4 SCÉNARIO 4 : Mobile Complet

**Objectif**: Tester l'expérience mobile complète

**Étapes**:
1. **Ouvrir sur Mobile**
   - Ouvrir l'application sur un vrai mobile OU simulateur
   - Vérifier le responsive

2. **Navigation Mobile**
   - Se connecter
   - Naviguer entre pages
   - Vérifier que tout est utilisable

3. **Upload Mobile**
   - Tester l'interface caméra
   - Prendre une photo
   - OU sélectionner depuis galerie
   - Vérifier l'upload

4. **QR Code Pairing** (si applicable)
   - Générer QR code sur desktop
   - Scanner sur mobile
   - Vérifier le pairing
   - Uploader depuis mobile

**Vérifications**:
- [ ] Interface mobile optimale
- [ ] Caméra fonctionne
- [ ] Upload mobile fonctionne
- [ ] Navigation fluide

---

## 🔍 VÉRIFICATIONS TECHNIQUES

### 4.1 BASE DE DONNÉES (Supabase)

#### Vérifier Tables
**Outils**: Supabase Dashboard → Table Editor

**Tables à vérifier**:
- [ ] `profiles` - Existe et contient données
- [ ] `audits` - Existe et contient données
- [ ] `subscriptions` - Existe et contient données
- [ ] `documents` - Existe et contient données
- [ ] `pdp_connections` - Existe (créée manuellement)
- [ ] `pairing_sessions` - Existe
- [ ] `mobile_uploads` - Existe
- [ ] `invoices` - Existe
- [ ] `e_reporting_logs` - Existe

**Vérifications**:
- [ ] RLS (Row Level Security) activé sur toutes les tables
- [ ] Policies correctes (utilisateurs voient seulement leurs données)
- [ ] Index présents pour performances

---

#### Vérifier Storage
**Outils**: Supabase Dashboard → Storage

**Buckets à vérifier**:
- [ ] `documents` - Existe et configuré
  - Public: `false` (privé)
  - MIME types: `application/pdf, image/jpeg, image/png`
  - Size limit: `25 MB`

**Vérifications**:
- [ ] Bucket accessible
- [ ] Upload fonctionne
- [ ] RLS activé sur le bucket

---

### 4.2 VARIABLES D'ENVIRONNEMENT

#### Vérifier .env.local
**Fichier**: `.env.local`

**Variables requises**:
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Présente et valide
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Présente et valide
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Présente et valide
- [ ] `NEXT_PUBLIC_GEMINI_API_KEY` - Présente et valide
- [ ] `GEMINI_API_KEY` - Présente et valide
- [ ] `STRIPE_SECRET_KEY` - Présente (ou placeholder si test)
- [ ] `STRIPE_WEBHOOK_SECRET` - Présente (ou placeholder)
- [ ] `NEXT_PUBLIC_URL` - Présente (pour production)

**Vérifications**:
- [ ] Toutes les variables présentes
- [ ] Pas de valeur "placeholder" en production
- [ ] Clés valides (format correct)

---

### 4.3 API EXTERNES

#### Test API Gemini
**Étapes**:
1. Faire un audit
2. Vérifier les logs serveur

**Vérifications**:
- [ ] Appel API Gemini réussi
- [ ] Pas d'erreur "API key required"
- [ ] Résultats cohérents

---

#### Test API Stripe (si configuré)
**Étapes**:
1. Aller sur `/checkout`
2. Sélectionner Stripe
3. Tenter un paiement (mode test)

**Vérifications**:
- [ ] Redirection Stripe fonctionne
- [ ] Pas d'erreur "Invalid API Key"
- [ ] Webhook configuré (si applicable)

---

### 4.4 LOGS ET DEBUGGING

#### Vérifier Logs Serveur
**Outils**: Terminal où `npm run dev` tourne

**Vérifications**:
- [ ] Logs détaillés pour upload (`[API /convert]`)
- [ ] Logs détaillés pour PDP (`[API PDP]`)
- [ ] Logs détaillés pour testeur (`[API auth/tester]`)
- [ ] Pas d'erreur non gérée

---

#### Vérifier Logs Client
**Outils**: DevTools → Console

**Vérifications**:
- [ ] Logs détaillés pour upload (`[Upload]`)
- [ ] Pas d'erreur JavaScript
- [ ] Warnings justifiés uniquement

---

## 📝 CHECKLIST RAPIDE POUR MANUS

### ✅ Vérifications Critiques (À Faire en Priorité)

1. **Authentification**
   - [ ] Inscription fonctionne
   - [ ] Connexion fonctionne
   - [ ] Mode testeur fonctionne
   - [ ] Session persiste

2. **Audit**
   - [ ] Formulaire fonctionne
   - [ ] Résultats affichés
   - [ ] PDF générable

3. **Checklist**
   - [ ] Bouton "Configurer PDP" ouvre modal
   - [ ] Connexion PDP fonctionne
   - [ ] Checklist se met à jour

4. **Upload**
   - [ ] Upload desktop fonctionne
   - [ ] Upload mobile fonctionne
   - [ ] Logs détaillés présents

5. **Navigation**
   - [ ] Toutes les routes accessibles
   - [ ] Session persiste
   - [ ] Pas de déconnexion intempestive

---

### ✅ Vérifications Secondaires

6. **Responsive**
   - [ ] Desktop OK
   - [ ] Tablette OK
   - [ ] Mobile OK

7. **Performance**
   - [ ] Temps de chargement < 3s
   - [ ] Lighthouse > 80

8. **Accessibilité**
   - [ ] Navigation clavier OK
   - [ ] Contraste OK

---

## 🐛 RAPPORT DE BUGS

### Format de Rapport

Pour chaque bug trouvé, documenter :

```markdown
### Bug #[NUMERO]

**Page/Composant**: [URL ou nom composant]
**Sévérité**: 🔴 Critique | 🟡 Moyen | 🟢 Mineur
**Reproduction**:
1. [Étape 1]
2. [Étape 2]
3. [Étape 3]

**Résultat Attendu**: [Ce qui devrait se passer]
**Résultat Observé**: [Ce qui se passe réellement]

**Logs**:
- Console: [Erreur console si présente]
- Serveur: [Erreur serveur si présente]
- Network: [Erreur réseau si présente]

**Screenshots**: [Si applicable]
```

---

## 📊 RAPPORT FINAL

### Template de Rapport

```markdown
# RAPPORT DE VÉRIFICATION - DREAMNOVA COMPTA

**Date**: [DATE]
**Testeur**: Manus
**Environnement**: [Local / Production]
**URL**: [URL testée]

## ✅ VÉRIFICATIONS RÉUSSIES
- [Liste des vérifications qui passent]

## ❌ PROBLÈMES IDENTIFIÉS
- [Liste des bugs avec détails]

## ⚠️ AMÉLIORATIONS SUGGÉRÉES
- [Suggestions d'amélioration]

## 📊 STATISTIQUES
- Tests effectués: [X]
- Tests réussis: [X]
- Tests échoués: [X]
- Taux de réussite: [X]%

## 🎯 CONCLUSION
[Synthèse globale]
```

---

## 🚀 INSTRUCTIONS SPÉCIFIQUES POUR MANUS

### Ordre de Priorité

1. **CRITIQUE** : Vérifier que l'application fonctionne (pas de page blanche, pas de crash)
2. **HAUTE** : Vérifier les fonctionnalités principales (auth, audit, upload)
3. **MOYENNE** : Vérifier les détails (responsive, UI, performance)
4. **BASSE** : Vérifier les edge cases et améliorations

### Méthodologie

1. **Commencer par les scénarios end-to-end** (Niveau 3)
   - Cela couvre déjà beaucoup de vérifications macro
   
2. **Ensuite, vérifier les détails** (Niveau 2)
   - Responsive, UI, performance
   
3. **Enfin, vérifier les edge cases** (Niveau 2.5)
   - Cas limites, erreurs

### Outils Recommandés

- **Navigateur**: Chrome/Edge (DevTools complets)
- **Responsive**: DevTools → Toggle device toolbar
- **Performance**: DevTools → Lighthouse
- **Network**: DevTools → Network tab
- **Console**: DevTools → Console tab
- **Application**: DevTools → Application tab (Cookies, Storage)

### Documentation des Résultats

Pour chaque test :
- ✅ **Succès** : Noter "OK" + screenshot si nécessaire
- ❌ **Échec** : Noter le bug avec détails complets
- ⚠️ **Partiel** : Noter ce qui fonctionne et ce qui ne fonctionne pas

---

## 📋 CHECKLIST FINALE RAPIDE

### Avant de Commencer
- [ ] Serveur démarré (`npm run dev`)
- [ ] Variables d'environnement configurées
- [ ] Tables Supabase créées
- [ ] Bucket Storage créé

### Tests Critiques (30 min)
- [ ] Mode testeur fonctionne
- [ ] Audit fonctionne
- [ ] Upload fonctionne
- [ ] Checklist fonctionne
- [ ] Session persiste

### Tests Complets (2-3h)
- [ ] Tous les scénarios end-to-end
- [ ] Toutes les pages
- [ ] Responsive complet
- [ ] Performance
- [ ] Accessibilité

---

## 🎯 OBJECTIF FINAL

**L'objectif est de s'assurer que l'application est :**
- ✅ **Fonctionnelle** : Toutes les fonctionnalités marchent
- ✅ **Robuste** : Pas de crash, gestion d'erreur correcte
- ✅ **Performante** : Temps de chargement acceptable
- ✅ **Accessible** : Utilisable par tous
- ✅ **Prête pour production** : Pas de bug bloquant

---

**Bon courage Manus ! 🚀**

**Document créé par Cursor pour Manus (Agent Autonome)**

