# 🧪 TESTS END-TO-END COMPLETS - DREAMNOVA COMPTA

**Date:** 2025-01-27
**Status:** 🟡 En cours d'exécution
**URL Dev:** http://localhost:3000

---

## 📋 CHECKLIST COMPLÈTE

### ✅ Tests Navigation

#### Page Landing (/)
- [ ] **Logo DreamNova Compta** affiché dans le header
- [ ] Logo cliquable → Retour à /
- [ ] **Bouton "Connexion"** → /login
- [ ] **Bouton "En savoir plus"** → Scroll vers #calculator
- [ ] **Bouton "Audit gratuit en 2 minutes"** → Ouvre AuditWizardComplete
- [ ] **Bouton "Découvrir nos offres"** → /pricing
- [ ] Menu de navigation responsive mobile
- [ ] Scroll smooth fonctionnel

#### Hero Section
- [ ] Titre principal visible
- [ ] Sous-titre visible
- [ ] 2 CTA affichés (Audit + Pricing)
- [ ] Animations Framer Motion

#### Calculateur d'Amendes (#calculator)
- [ ] Section visible après scroll
- [ ] **Slider 0-1000 factures** fonctionnel
- [ ] Valeur mise à jour en temps réel
- [ ] **Amendes mensuelles** calculées (15€/facture)
- [ ] **Amendes annuelles** calculées (cap 15,000€)
- [ ] **Pénalités PA** calculées (500€ + 1000€ x 4 trimestres)
- [ ] **Total 3 ans** affiché
- [ ] Design responsive

#### Section Problème/Solution
- [ ] 2 cartes affichées
- [ ] "Ancienne méthode" avec icônes rouges
- [ ] "Méthode DreamNova" avec icônes vertes
- [ ] Textes lisibles
- [ ] Border primary sur carte DreamNova

#### Section "Comment ça marche"
- [ ] 3 étapes affichées
- [ ] Icônes Material Symbols
- [ ] Animations au scroll
- [ ] Textes clairs

#### Section Social Proof
- [ ] **5 logos entreprises** affichés :
  - [ ] Sage (bg-blue-100)
  - [ ] Cegid (bg-purple-100)
  - [ ] Pennylane (bg-pink-100)
  - [ ] Tiime (bg-green-100)
  - [ ] Qonto (bg-orange-100)
- [ ] Effet hover sur logos
- [ ] 3 badges certifications (ISO 27001, GDPR, SecNumCloud)

#### Section CTA Finale
- [ ] Fond gradient primary
- [ ] Titre "Préparez-vous à la conformité 2026"
- [ ] 2 boutons (Pricing + Audit)
- [ ] Texte "Sans engagement • 100% gratuit • Résultats immédiats"

---

### ✅ Tests Audit Complet (AuditWizardComplete)

#### Ouverture Wizard
- [ ] Bouton "Audit gratuit" ouvre le wizard
- [ ] Modal overlay visible
- [ ] Bouton "Retour" fonctionnel

#### Étape 1 : Informations Entreprise (7 champs)
- [ ] Input "Nom entreprise" fonctionnel
- [ ] Select "Secteur activité" avec options
- [ ] Input "CA annuel" (type number)
- [ ] Input "Volume factures B2B/mois" (type number)
- [ ] Input "Nombre employés" (type number)
- [ ] Select "Logiciel comptable actuel"
- [ ] Select "État conformité"
- [ ] Bouton "Suivant" désactivé si champs vides
- [ ] Validation des champs

#### Étape 2 : État de Conformité (3 champs)
- [ ] Questions affichées
- [ ] Inputs fonctionnels
- [ ] Bouton "Précédent" retourne à étape 1
- [ ] Bouton "Suivant" vers étape 3

#### Étape 3 : Génération Rapport
- [ ] Bouton "Générer mon rapport" visible
- [ ] **LOADING STATES (très important à tester) :**
  - [ ] Loading Agent #1 : "Analyse de votre conformité..."
  - [ ] Loading Agent #2 : "Calcul du retour sur investissement..."
  - [ ] Loading Agent #3 : "Recherche de la meilleure plateforme..."
- [ ] Durée totale ~6-9 secondes
- [ ] Pas d'erreurs console
- [ ] Redirection vers /audit-results

---

### ✅ Tests Page Résultats Audit (/audit-results)

#### Affichage Données
- [ ] Page se charge
- [ ] **Nom entreprise** affiché
- [ ] **Score conformité** (0-100) affiché
- [ ] **Jauge circulaire** animée
- [ ] **Badge niveau risque** (CRITIQUE/ÉLEVÉ/MODÉRÉ/FAIBLE)
- [ ] Couleur badge appropriée

#### Section Amendes Potentielles
- [ ] **Amendes mensuelles** affichées
- [ ] **Amendes annuelles** affichées
- [ ] **Amendes 3 ans** affichées
- [ ] Valeurs en euros avec séparateurs (ex: 15 000€)

#### Section ROI
- [ ] **Économies amendes annuelles** affichées
- [ ] **Économies 3 ans** affichées
- [ ] **Gains productivité annuels** affichés
- [ ] **Gains 3 ans** affichés
- [ ] **ROI annuel** (pourcentage) affiché
- [ ] **ROI 3 ans** (pourcentage) affiché
- [ ] **Breakeven** (en mois) affiché

#### Section Recommandation PDP
- [ ] **Nom PDP recommandée** (Pennylane/Qonto/Sellsy/Tiime)
- [ ] **Score de match** (0-100) affiché
- [ ] **Pricing** affiché
- [ ] **Délai intégration** affiché
- [ ] **Raisons** listées (avec puces)
- [ ] **Features clés** listées

#### Section Actions Urgentes
- [ ] Liste des actions affichée
- [ ] Badges priorité (HAUTE/MOYENNE/BASSE)
- [ ] Couleurs appropriées
- [ ] Délais affichés

#### Section Points Critiques
- [ ] Liste affichée avec puces

#### Section Recommandations
- [ ] Liste affichée avec puces

#### Section Plan de Migration
- [ ] Durée estimée affichée
- [ ] Coût total affiché
- [ ] PDP recommandée affichée
- [ ] ROI en mois affiché
- [ ] Étapes listées avec numérotation

#### Boutons Actions
- [ ] **Bouton "Générer PDF"** visible
- [ ] Click → Génère PDF
- [ ] Loading state pendant génération
- [ ] PDF téléchargé (nom: rapport-audit-[entreprise].pdf)
- [ ] PDF contient 10 pages
- [ ] **Bouton "Imprimer"** fonctionnel
- [ ] **Bouton "Partager"** visible
- [ ] **Bouton "Souscrire à un plan"** → /pricing

#### Erreurs
- [ ] Pas d'erreurs TypeError dans console
- [ ] Pas d'erreurs "Cannot read properties of undefined"
- [ ] Tous les `.map()` protégés avec `|| []`
- [ ] Optional chaining (`?.`) utilisé partout

---

### ✅ Tests Page Pricing (/pricing)

#### Plans Mensuels
- [ ] **3 plans affichés** :
  - [ ] STARTER (50€/mois)
  - [ ] GROWTH (80€/mois) - Badge POPULAIRE
  - [ ] PREMIUM (180€/mois)
- [ ] Prix affichés correctement
- [ ] Features listées par plan
- [ ] Boutons "Commencer maintenant" fonctionnels
- [ ] Click → /checkout?plan=starter-monthly (etc.)

#### Plans One-Shot
- [ ] **3 plans affichés** :
  - [ ] URGENCE (8,500€) - Badge BEST-SELLER
  - [ ] TRANSFORMATION (15,000€)
  - [ ] PREMIUM (25,000€)
- [ ] Prix affichés correctement
- [ ] Features listées
- [ ] Boutons fonctionnels
- [ ] Click → /checkout?plan=urgence-oneshot (etc.)

#### Toggle Mensuel/One-Shot
- [ ] Toggle visible
- [ ] Click change l'affichage
- [ ] Animations smooth

#### Section Paiement Flexible
- [ ] Logos Alma, Klarna, Pledg, Stripe affichés
- [ ] Texte "Split payment 3x 4x sans frais"

---

### ✅ Tests Page Checkout (/checkout)

#### Étape 1 : Récapitulatif
- [ ] Plan sélectionné affiché
- [ ] Prix affiché
- [ ] Features listées
- [ ] Bouton "Suivant" fonctionnel

#### Étape 2 : Informations Facturation
- [ ] Formulaire complet affiché :
  - [ ] Nom entreprise
  - [ ] Email
  - [ ] Téléphone
  - [ ] Adresse
  - [ ] Code postal
  - [ ] Ville
  - [ ] SIRET
- [ ] Validation des champs
- [ ] Bouton "Précédent" retourne à étape 1
- [ ] Bouton "Suivant" vers étape 3

#### Étape 3 : Paiement
- [ ] **Sélection mode paiement visible** :
  - [ ] Option Stripe (carte bancaire)
  - [ ] Option Alma (split 3-4x) - Si montant ≥ 50€
  - [ ] Option PayPal
- [ ] **Test Stripe** :
  - [ ] Click → Appel /api/checkout/stripe
  - [ ] Redirection vers Stripe Checkout
  - [ ] Mode test fonctionne (carte test 4242 4242 4242 4242)
- [ ] **Test Alma** :
  - [ ] Visible si montant ≥ 50€ et ≤ 20,000€
  - [ ] Click → Stripe avec Alma activé
- [ ] **Test PayPal** :
  - [ ] Click → Appel /api/checkout/paypal
  - [ ] ⚠️ **SI identifiants manquants** :
    - [ ] Message : "Cette fonctionnalité sera bientôt disponible"
    - [ ] Texte : "Dès que les administrateurs ont configuré le système PayPal"
  - [ ] ⚠️ **SI identifiants présents** :
    - [ ] Redirection vers PayPal
    - [ ] Sandbox PayPal fonctionne

#### Page Succès (/checkout/success)
- [ ] Message de confirmation
- [ ] Résumé commande
- [ ] Bouton "Accéder au dashboard" → /dashboard

#### Page Annulation (/checkout/cancel)
- [ ] Message d'annulation
- [ ] Bouton "Réessayer" → /pricing

---

### ✅ Tests Authentification

#### Page Login (/login)
- [ ] Formulaire connexion visible
- [ ] Toggle vers inscription
- [ ] Input email fonctionnel
- [ ] Input password fonctionnel
- [ ] **Connexion** :
  - [ ] Click "Se connecter"
  - [ ] Appel Supabase auth
  - [ ] Redirection /dashboard si succès
  - [ ] Message erreur si échec
- [ ] **Inscription** :
  - [ ] Click "S'inscrire"
  - [ ] Appel Supabase auth.signUp
  - [ ] Email de vérification envoyé
  - [ ] Redirection /dashboard

#### Déconnexion
- [ ] Bouton "Déconnexion" dans dashboard
- [ ] Click → Appel /api/auth/signout
- [ ] Redirection vers /

---

### ✅ Tests Dashboard (/dashboard)

#### Protection Route
- [ ] Redirection vers /login si non connecté
- [ ] Accès autorisé si connecté

#### Header
- [ ] Nom utilisateur affiché
- [ ] Bouton "Déconnexion" fonctionnel

#### Stats Cards
- [ ] 4 cards affichées :
  - [ ] Score conformité (avec tendance)
  - [ ] Amendes évitées
  - [ ] Économies estimées
  - [ ] Jours restants (deadline 2026)
- [ ] Valeurs affichées (même si 0)

#### Graphiques Recharts
- [ ] **AreaChart** : Évolution score (ligne)
- [ ] **PieChart** : Distribution conformité (camembert)
- [ ] **BarChart** : Réduction amendes (barres)
- [ ] **LineChart** : Projection ROI (ligne)
- [ ] Animations smooth
- [ ] Tooltips au hover
- [ ] Légendes affichées

#### Actions Rapides
- [ ] Bouton "Nouvel audit" → /
- [ ] Bouton "Voir rapports" fonctionnel
- [ ] Bouton "Gérer abonnement" (si abonné)

#### Historique Audits
- [ ] Liste audits affichée (si existants)
- [ ] Date, score, statut par audit
- [ ] Bouton "Voir détails" → /audit-results

---

### ✅ Tests Upload Documents

#### Composant DocumentUpload
- [ ] Zone drag & drop affichée
- [ ] Caméra mobile affichée (sur mobile uniquement)
- [ ] **Drag & Drop** :
  - [ ] Hover change couleur zone
  - [ ] Drop upload le fichier
  - [ ] Barre progression visible
  - [ ] Message succès après upload
- [ ] **Bouton Parcourir** :
  - [ ] Click ouvre sélecteur fichiers
  - [ ] Fichiers acceptés : PDF, DOCX, JPG, PNG
  - [ ] Validation taille (25MB max)
  - [ ] Message erreur si trop gros
- [ ] **Caméra Mobile** (sur mobile) :
  - [ ] Bouton caméra visible
  - [ ] Click ouvre caméra native
  - [ ] Photo prise upload automatiquement
  - [ ] Preview image affichée
- [ ] **Preview** :
  - [ ] Image preview affichée si JPG/PNG
  - [ ] Bouton "X" pour supprimer
- [ ] **Upload vers Supabase** :
  - [ ] Appel /api/documents/convert
  - [ ] Fichier uploadé dans bucket "documents"
  - [ ] Enregistrement dans table "documents"
  - [ ] ⚠️ Message "Conversion Factur-X en cours..." (pas encore implémenté)

---

### ✅ Tests API Routes

#### /api/checkout/stripe
- [ ] POST avec planId fonctionne
- [ ] Retourne sessionId et url
- [ ] Vérification auth Supabase
- [ ] Erreur 401 si non connecté
- [ ] Erreur 400 si plan invalide

#### /api/checkout/paypal
- [ ] POST avec planId fonctionne
- [ ] ⚠️ **SI PAYPAL_CLIENT_ID manquant** :
  - [ ] Retourne erreur personnalisée
  - [ ] Message "Configuration PayPal en cours"
- [ ] ⚠️ **SI PAYPAL_CLIENT_ID présent** :
  - [ ] Retourne orderId et approvalUrl
  - [ ] Vérification auth Supabase

#### /api/webhooks/stripe
- [ ] POST avec signature valide fonctionne
- [ ] Erreur 400 si signature invalide
- [ ] Événements gérés :
  - [ ] checkout.session.completed
  - [ ] customer.subscription.updated
  - [ ] customer.subscription.deleted
  - [ ] invoice.payment_succeeded
  - [ ] invoice.payment_failed
- [ ] Mise à jour table "subscriptions"

#### /api/documents/convert
- [ ] POST avec fichier fonctionne
- [ ] Vérification auth
- [ ] Vérification format (PDF, JPG, PNG, DOCX)
- [ ] Vérification taille (25MB max)
- [ ] Upload vers Supabase Storage
- [ ] Enregistrement dans table "documents"
- [ ] ⚠️ Conversion Factur-X (pas encore implémentée)

---

### ✅ Tests Base de Données Supabase

#### Table profiles
- [ ] Auto-création via trigger après signup
- [ ] Colonnes : id, full_name, created_at, updated_at
- [ ] RLS activé (user voit seulement son profil)

#### Table audits
- [ ] Insertion après audit complet
- [ ] Colonnes : id, user_id, results (JSONB), created_at
- [ ] RLS activé
- [ ] results contient : company, audit, roi, pdp

#### Table subscriptions
- [ ] Insertion après paiement
- [ ] Colonnes : id, user_id, plan_id, stripe_customer_id, status, etc.
- [ ] RLS activé
- [ ] Statuts : active, canceled, paid

#### Table documents
- [ ] Insertion après upload
- [ ] Colonnes : id, user_id, file_name, file_url, converted_format, status
- [ ] RLS activé

#### Storage bucket "documents"
- [ ] Upload fichiers fonctionne
- [ ] RLS activé (user voit seulement ses fichiers)

---

### ✅ Tests Responsive Mobile

#### iPhone (375x812)
- [ ] Landing page responsive
- [ ] Navigation hamburger (si implémenté)
- [ ] Calculateur utilisable
- [ ] Wizard audit utilisable
- [ ] Forms remplissables
- [ ] Boutons cliquables (taille suffisante)
- [ ] Textes lisibles
- [ ] Graphiques dashboard adaptés

#### iPad (768x1024)
- [ ] Layout adapté
- [ ] Grid columns ajustées
- [ ] Navigation utilisable

---

### ✅ Tests Performance

#### Lighthouse (Desktop)
- [ ] **Performance** : Target ≥ 90
- [ ] **Accessibility** : Target ≥ 90
- [ ] **Best Practices** : Target ≥ 90
- [ ] **SEO** : Target ≥ 90

#### Lighthouse (Mobile)
- [ ] **Performance** : Target ≥ 70
- [ ] **Accessibility** : Target ≥ 90
- [ ] **Best Practices** : Target ≥ 90
- [ ] **SEO** : Target ≥ 90

#### Temps de chargement
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Largest Contentful Paint < 2.5s

#### Agents IA
- [ ] Agent #1 (Audit) : 2-3s
- [ ] Agent #2 (ROI) : 2-3s
- [ ] Agent #3 (PDP) : 2-3s
- [ ] Total séquence : 6-9s

---

### ✅ Tests Console & Erreurs

#### Console Navigateur
- [ ] Pas d'erreurs JavaScript
- [ ] Pas d'erreurs React
- [ ] Pas d'erreurs Supabase
- [ ] Pas d'avertissements critiques

#### Erreurs Réseau
- [ ] Toutes les API routes retournent 200 (ou 400/401/500 approprié)
- [ ] Pas de 404 sur ressources
- [ ] Images chargent correctement

---

## 📸 SCREENSHOTS À PRENDRE

### Desktop (1920x1080)

#### Landing Page
1. [ ] Hero section (pleine page)
2. [ ] Calculateur d'amendes
3. [ ] Section problème/solution
4. [ ] Section "Comment ça marche"
5. [ ] Section social proof + logos entreprises
6. [ ] CTA finale

#### Audit
7. [ ] Wizard étape 1 (informations)
8. [ ] Wizard étape 2 (conformité)
9. [ ] Wizard étape 3 (génération) avec loading
10. [ ] Page résultats audit (haut de page)
11. [ ] Page résultats audit (section ROI)
12. [ ] Page résultats audit (plan migration)

#### Pricing
13. [ ] Plans mensuels
14. [ ] Plans one-shot
15. [ ] Section paiement flexible

#### Checkout
16. [ ] Étape 1 (récapitulatif)
17. [ ] Étape 2 (facturation)
18. [ ] Étape 3 (paiement)
19. [ ] Page succès

#### Dashboard
20. [ ] Vue complète avec 4 graphiques
21. [ ] Graphique évolution détail
22. [ ] Graphique distribution détail

### Mobile (375x812)

#### Landing Page
23. [ ] Hero mobile
24. [ ] Calculateur mobile
25. [ ] Logos entreprises mobile

#### Audit
26. [ ] Wizard étape 1 mobile
27. [ ] Résultats audit mobile

#### Pricing
28. [ ] Plans mensuels mobile

#### Dashboard
29. [ ] Dashboard mobile (cards)
30. [ ] Graphiques mobile

---

## 🐛 BUGS IDENTIFIÉS

### Critiques (Bloquants)
- [ ] Aucun pour l'instant

### Majeurs (À corriger avant prod)
- [ ] Conversion Factur-X pas implémentée (bibliothèque ne compile pas)
- [ ] PayPal identifiants manquants (affiche message placeholder ✅)

### Mineurs (Post-prod)
- [ ] Tiime API pas disponible (Q2 2026)
- [ ] Emails automatiques pas configurés

---

## ✅ VALIDATION FINALE

### Avant Push GitHub
- [ ] Tous les tests critiques passent
- [ ] Pas d'erreurs console
- [ ] Build production réussit (`npm run build`)
- [ ] Variables .env documentées

### Avant Déploiement
- [ ] Coordination avec Cursor effectuée
- [ ] Prix Stripe créés
- [ ] Webhooks configurés
- [ ] Identifiants PayPal (si disponibles)

---

**Status actuel:** 🟡 Tests en cours d'exécution

**Prochaines étapes:**
1. Exécuter tous les tests manuels
2. Prendre les 30 screenshots
3. Documenter les bugs trouvés
4. Corriger les bugs critiques
5. Valider avec Cursor
6. Push sur GitHub

---

**Document créé par Claude Code - 2025-01-27**
