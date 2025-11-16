# PLAN DE TESTS COMPLET - BRESLEV BOOKS
## Agent 7: Testing & QA

**Version:** 1.0
**Date:** 10 Novembre 2024
**Agent:** Agent 7 - Testing & QA
**Statut:** READY FOR EXECUTION

---

## TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Stratégie de tests](#stratégie-de-tests)
3. [Tests fonctionnels](#tests-fonctionnels)
4. [Tests responsive](#tests-responsive)
5. [Tests navigateurs](#tests-navigateurs)
6. [Tests accessibilité](#tests-accessibilité)
7. [Tests performance](#tests-performance)
8. [Tests sécurité](#tests-sécurité)
9. [Tests e-commerce](#tests-e-commerce)
10. [Planning d'exécution](#planning-dexécution)

---

## 1. VUE D'ENSEMBLE

### 1.1 Objectifs des tests

- Assurer le bon fonctionnement de toutes les fonctionnalités du site
- Vérifier la compatibilité multi-devices (5 devices minimum)
- Garantir l'accessibilité WCAG 2.1 AA
- Valider les performances (Lighthouse 90+)
- Tester les parcours utilisateurs complets
- Identifier et documenter tous les bugs

### 1.2 Périmètre

**Inclus:**
- Interface utilisateur complète (V2)
- Parcours d'achat (panier, checkout)
- Navigation et recherche
- Formulaires et validation
- Responsive design (5 breakpoints)
- Accessibilité (WCAG 2.1 AA)
- Performance (Lighthouse)
- SEO basique
- Compatibilité navigateurs (4 browsers)

**Exclus:**
- Backend Shopify admin
- Intégrations tierces (hors FlipHTML5)
- Tests de charge (stress testing)
- Tests de sécurité avancés (pentesting)

### 1.3 Environnements de test

| Environnement | URL | Accès |
|--------------|-----|-------|
| Local Preview | http://localhost:3000 | Dev uniquement |
| Shopify Dev Store | [À définir] | Credentials requis |
| Production | [À définir] | Post-déploiement |

---

## 2. STRATÉGIE DE TESTS

### 2.1 Approche

- **Tests manuels:** Interface, UX, responsive
- **Tests automatisés:** Lighthouse, WAVE, validators
- **Tests exploratoires:** Parcours utilisateur atypiques
- **Tests de régression:** Après chaque modification

### 2.2 Priorités

**P0 - Critique (bloquant):**
- Navigation principale
- Ajout au panier
- Checkout
- Paiement
- Responsive mobile

**P1 - Haute:**
- Recherche
- Filtres collections
- Formulaires
- Images produits
- Quick view

**P2 - Moyenne:**
- Newsletter
- Wishlist
- Comparateur
- Animations

**P3 - Basse:**
- Effets visuels avancés
- Easter eggs
- Features bonus

### 2.3 Critères de succès

**Site OK pour production si:**
- ✅ 100% tests P0 passent
- ✅ 95%+ tests P1 passent
- ✅ 85%+ tests P2 passent
- ✅ Lighthouse Performance 90+
- ✅ Lighthouse Accessibility 95+
- ✅ 0 bugs critiques
- ✅ < 5 bugs majeurs

---

## 3. TESTS FONCTIONNELS

### 3.1 Navigation principale

#### Test 3.1.1: Header Desktop
**Objectif:** Vérifier que le header fonctionne correctement en desktop

**Prérequis:**
- Navigateur desktop (Chrome)
- Viewport > 1024px

**Steps:**
1. Charger la page d'accueil
2. Vérifier présence du logo (haut gauche)
3. Vérifier menu principal visible
4. Cliquer sur "Catégories" → dropdown s'ouvre
5. Vérifier 6 catégories présentes
6. Cliquer sur "Livres d'étude" → redirige vers /collections/livres-etude
7. Retour accueil
8. Cliquer icône recherche → barre expansible s'ouvre
9. Taper "nachman" → suggestions apparaissent
10. Vérifier icône compte utilisateur cliquable
11. Vérifier icône panier avec compteur "(0)"

**Résultat attendu:**
- Logo visible et cliquable (retour accueil)
- Menu complet affiché
- Dropdown catégories fonctionnel
- Recherche expansible OK
- Compteur panier affiché
- Tous les liens fonctionnent

**Critère de succès:** 100% des éléments fonctionnels

---

#### Test 3.1.2: Header Mobile
**Objectif:** Vérifier que le header mobile fonctionne

**Prérequis:**
- Viewport < 768px (iPhone 12)

**Steps:**
1. Charger page d'accueil mobile
2. Vérifier logo visible
3. Vérifier icône hamburger (☰) visible
4. Cliquer hamburger → menu full-screen s'ouvre
5. Vérifier tous les liens menu présents
6. Fermer menu (X) → menu se ferme
7. Vérifier icône panier visible
8. Vérifier header sticky au scroll

**Résultat attendu:**
- Header compact et responsive
- Menu hamburger fonctionnel
- Menu full-screen overlay
- Fermeture smooth
- Sticky au scroll

---

#### Test 3.1.3: Footer
**Objectif:** Valider le footer complet

**Steps:**
1. Scroller jusqu'en bas de page
2. Vérifier présence 5 colonnes footer
3. Tester liens colonne "À propos"
4. Tester liens colonne "Navigation"
5. Tester liens colonne "Catégories"
6. Tester liens colonne "Aide"
7. Tester formulaire newsletter (email valide)
8. Vérifier icônes réseaux sociaux cliquables
9. Vérifier badges paiement affichés
10. Vérifier mentions légales en bas

**Résultat attendu:**
- 5 colonnes complètes
- Tous liens fonctionnels
- Newsletter OK (confirmation)
- Réseaux sociaux OK
- Copyright 2024 affiché

---

### 3.2 Page d'accueil

#### Test 3.2.1: Hero Section
**Steps:**
1. Charger page d'accueil
2. Vérifier hero section 90vh minimum
3. Vérifier image background chargée
4. Vérifier overlay dégradé visible
5. Vérifier badge "Nouveauté" affiché
6. Vérifier titre principal lisible
7. Vérifier sous-titre lisible
8. Cliquer "Explorer Collection" → /collections/all
9. Retour → Cliquer "Abonnement 29€/mois" → /pages/abonnement
10. Vérifier 3 badges rassurance en bas hero

**Résultat attendu:**
- Hero impactant et professionnel
- Image optimisée (< 500KB)
- CTAs fonctionnels
- Responsive parfait

---

#### Test 3.2.2: Section Catégories
**Steps:**
1. Scroller jusqu'à section catégories
2. Vérifier grille 6 blocs (desktop)
3. Vérifier icônes visibles pour chaque catégorie
4. Cliquer "Livres d'étude" → collection
5. Retour → Tester les 5 autres catégories
6. Vérifier responsive (2 colonnes mobile)

**Résultat attendu:**
- 6 catégories affichées
- Grille responsive (6-3-2 colonnes)
- Toutes cliquables
- Visuellement cohérent

---

#### Test 3.2.3: Produits Vedettes
**Steps:**
1. Scroller jusqu'à "Produits Vedettes"
2. Vérifier grille 4 colonnes (desktop)
3. Compter nombre de produits (max 8)
4. Pour chaque card produit:
   - Image chargée
   - Titre lisible
   - Prix affiché
   - Badge si applicable (New, Sale)
   - Hover effect fonctionne
5. Cliquer sur un produit → page produit
6. Tester "Ajouter au panier" rapide (icône)

**Résultat attendu:**
- 8 produits max affichés
- Cards uniformes et professionnelles
- Hover effects smooth
- Quick add fonctionnel

---

#### Test 3.2.4: Bannière Abonnement
**Steps:**
1. Scroller jusqu'à bannière abonnement
2. Vérifier fond noir avec dégradé
3. Vérifier titre "Abonnement Illimité - 29€/mois"
4. Vérifier 3 avantages affichés (✓)
5. Cliquer "S'abonner" → /pages/abonnement
6. Retour → Cliquer "En savoir plus" → même page

**Résultat attendu:**
- Bannière impactante
- Contraste texte/fond excellent
- CTAs clairs et visibles

---

#### Test 3.2.5: Section Nouveautés
**Steps:**
1. Scroller jusqu'à "Nouveautés"
2. Vérifier 4 produits affichés
3. Vérifier badge "NEW" sur chaque card
4. Vérifier date de sortie si affichée
5. Tester hover effects
6. Cliquer "Voir toutes les nouveautés" → /collections/nouveautes

**Résultat attendu:**
- 4 derniers produits
- Badge NEW visible
- Lien "Voir tout" fonctionnel

---

#### Test 3.2.6: Badges Rassurance
**Steps:**
1. Scroller jusqu'aux badges rassurance
2. Vérifier 4 badges présents:
   - 🚚 Livraison gratuite
   - 🔒 Paiement sécurisé
   - ✅ Satisfait ou remboursé
   - 📞 Service client
3. Vérifier icônes et textes lisibles
4. Vérifier responsive (2-2 mobile)

**Résultat attendu:**
- 4 badges complets
- Visuellement rassurante
- Mobile friendly

---

### 3.3 Collections & Produits

#### Test 3.3.1: Page Collection
**Objectif:** Tester /collections/livres-etude

**Steps:**
1. Naviguer vers /collections/livres-etude
2. Vérifier titre collection affiché
3. Vérifier description collection
4. Vérifier grille produits (4 colonnes desktop)
5. Compter nombre de produits
6. Tester filtres si présents:
   - Par prix
   - Par langue
   - Par auteur
7. Tester tri:
   - Best-sellers
   - Prix croissant
   - Prix décroissant
   - Nouveautés
8. Vérifier pagination si > 20 produits

**Résultat attendu:**
- Collection complète affichée
- Filtres fonctionnels
- Tri fonctionne
- Pagination OK

---

#### Test 3.3.2: Page Produit
**Objectif:** Tester /products/chemot-hatsadikim

**Steps:**
1. Naviguer vers un produit
2. Vérifier:
   - Image principale (zoom au hover)
   - Galerie images (thumbnails cliquables)
   - Titre produit
   - Prix (physique, digital, bundle)
   - Description complète
   - Métadonnées (auteur, pages, langue, ISBN)
   - Badges (Nouveau, Bestseller)
   - Stock disponible
3. Tester sélecteur variant (Physique/Digital/Bundle)
4. Tester quantité (+ / -)
5. Cliquer "Ajouter au panier"
6. Vérifier modal confirmation ou compteur panier update
7. Tester "Acheter maintenant" (direct checkout)
8. Tester bouton wishlist (cœur)
9. Scroller → Vérifier section "Produits similaires"

**Résultat attendu:**
- Toutes infos produit présentes
- Images haute qualité
- Variants fonctionnels
- Ajout panier OK
- Quick buy OK

---

#### Test 3.3.3: Book Card V2
**Objectif:** Valider composant book-card-v2.liquid

**Steps:**
1. Inspecter une card produit
2. Vérifier structure HTML:
   - Image wrapper avec lazy-loading
   - Badge overlay (si applicable)
   - Titre produit
   - Auteur (vendor)
   - Prix (barré si promo)
   - Note étoiles (si reviews)
   - Quick actions (wishlist, quick view, compare)
3. Tester hover:
   - Shadow elevation
   - Quick actions apparaissent
   - Transition smooth
4. Tester quick view (modal)
5. Tester quick add to cart

**Résultat attendu:**
- Card complète et professionnelle
- Hover effects premium
- Quick actions fonctionnelles

---

### 3.4 Recherche

#### Test 3.4.1: Barre de recherche
**Steps:**
1. Cliquer icône recherche (header)
2. Vérifier barre expansible s'ouvre
3. Taper "nachman" → attendre suggestions
4. Vérifier suggestions affichées:
   - Produits (avec image)
   - Collections
   - Pages
5. Cliquer sur une suggestion → redirige
6. Retour → Taper recherche vide → appuyer Enter
7. Vérifier message "Aucun résultat"
8. Tester recherche hébreu (si supporté)
9. Fermer recherche (ESC ou X)

**Résultat attendu:**
- Recherche instantanée (< 300ms)
- Suggestions pertinentes
- Images produits dans suggestions
- Support multilingue

---

#### Test 3.4.2: Page Résultats Recherche
**Steps:**
1. Faire recherche "livre"
2. Naviguer vers /search?q=livre
3. Vérifier titre "Résultats pour 'livre'"
4. Vérifier nombre de résultats affiché
5. Vérifier grille produits
6. Tester filtres (même que collections)
7. Vérifier pagination
8. Tester recherche sans résultats

**Résultat attendu:**
- Page résultats complète
- Nombre de résultats exact
- Filtrage possible
- Message erreur si 0 résultats

---

### 3.5 Panier & Checkout

#### Test 3.5.1: Ajout au panier
**Steps:**
1. Page produit → Ajouter produit au panier
2. Vérifier modal/notification apparaît
3. Vérifier compteur panier header update "(1)"
4. Ajouter même produit (quantité +1)
5. Ajouter produit différent
6. Vérifier compteur "(3)" (total items)

**Résultat attendu:**
- Ajout instantané
- Feedback visuel clair
- Compteur précis

---

#### Test 3.5.2: Page Panier
**Steps:**
1. Cliquer icône panier header
2. Vérifier page /cart affichée
3. Pour chaque item panier:
   - Image produit
   - Titre + variant
   - Prix unitaire
   - Quantité modifiable (+ / -)
   - Prix ligne (quantité × prix)
   - Bouton supprimer (X)
4. Modifier quantité → total update
5. Supprimer un item → ligne disparaît
6. Vérifier sous-total
7. Vérifier estimation frais de port
8. Vérifier taxes (si applicable)
9. Vérifier total général
10. Cliquer "Valider la commande" → /checkout

**Résultat attendu:**
- Panier complet et clair
- Calculs précis
- Modifications en temps réel
- Bouton checkout visible

---

#### Test 3.5.3: Checkout Shopify
**Steps:**
1. Page checkout
2. Vérifier résumé commande (droite)
3. Remplir informations client:
   - Email
   - Prénom / Nom
   - Adresse complète
   - Téléphone
4. Vérifier validation formulaire (champs requis)
5. Choisir mode livraison
6. Vérifier calcul frais de port
7. Choisir mode paiement
8. Entrer CB test (Shopify test mode)
9. Valider commande
10. Vérifier page confirmation
11. Vérifier email confirmation reçu

**Résultat attendu:**
- Checkout Shopify natif fonctionnel
- Validation formulaire stricte
- Paiement test OK
- Confirmation immédiate

---

### 3.6 Compte Client

#### Test 3.6.1: Inscription
**Steps:**
1. Cliquer icône compte (header)
2. Cliquer "Créer un compte"
3. Remplir formulaire:
   - Prénom
   - Nom
   - Email
   - Mot de passe (min 8 caractères)
   - Confirmer mot de passe
4. Accepter CGV
5. Soumettre
6. Vérifier redirection /account
7. Vérifier email de bienvenue reçu

**Résultat attendu:**
- Inscription rapide
- Validation mot de passe
- Email confirmation
- Connexion automatique

---

#### Test 3.6.2: Connexion
**Steps:**
1. Se déconnecter
2. Cliquer icône compte
3. Cliquer "Se connecter"
4. Entrer email / mot de passe
5. Soumettre
6. Vérifier connexion réussie
7. Vérifier nom affiché (header)
8. Tester "Mot de passe oublié"

**Résultat attendu:**
- Connexion instantanée
- Session persistante
- Reset password fonctionne

---

#### Test 3.6.3: Mon Compte
**Steps:**
1. Connecté → Aller /account
2. Vérifier dashboard client:
   - Informations personnelles
   - Historique commandes
   - Adresses enregistrées
   - Abonnement (si actif)
   - Wishlist
3. Modifier informations → sauvegarder
4. Ajouter nouvelle adresse
5. Consulter détail commande
6. Télécharger facture (PDF)

**Résultat attendu:**
- Dashboard complet
- Modifications sauvegardées
- Historique précis
- Factures accessibles

---

### 3.7 Abonnement Digital

#### Test 3.7.1: Page Abonnement
**Steps:**
1. Naviguer /pages/abonnement
2. Vérifier 3 plans affichés:
   - Mensuel (29€/mois)
   - Annuel (290€/an = 24€/mois)
   - Lifetime (990€ one-time)
3. Vérifier features de chaque plan
4. Cliquer "S'abonner" Mensuel
5. Vérifier checkout spécifique abonnement
6. Compléter paiement test
7. Vérifier statut "Abonné" dans /account
8. Tester accès contenu digital

**Résultat attendu:**
- 3 plans clairs
- Checkout abonnement OK
- Accès immédiat après paiement

---

#### Test 3.7.2: Lecteur Digital (FlipHTML5)
**Steps:**
1. Connecté en tant qu'abonné
2. Page produit → Cliquer "Lire en ligne"
3. Vérifier FlipHTML5 player charge
4. Tester fonctions lecteur:
   - Navigation pages (flèches)
   - Zoom
   - Plein écran
   - Télécharger (si autorisé)
   - Partager
5. Vérifier DRM protection (copie interdite)
6. Fermer lecteur

**Résultat attendu:**
- Player FlipHTML5 fonctionnel
- Expérience de lecture fluide
- Protection DRM active

---

### 3.8 Formulaires

#### Test 3.8.1: Newsletter
**Steps:**
1. Footer → Formulaire newsletter
2. Entrer email invalide → soumettre
3. Vérifier message erreur
4. Entrer email valide → soumettre
5. Vérifier message succès
6. Vérifier email confirmation reçu
7. Tester lien désinscription email

**Résultat attendu:**
- Validation email stricte
- Confirmation immédiate
- Email bien reçu

---

#### Test 3.8.2: Contact
**Steps:**
1. Page /pages/contact
2. Vérifier formulaire:
   - Nom
   - Email
   - Sujet (dropdown)
   - Message (textarea)
3. Soumettre vide → erreurs
4. Remplir complet → soumettre
5. Vérifier confirmation
6. Vérifier email reçu (admin)

**Résultat attendu:**
- Validation complète
- Envoi réussi
- Email admin

---

## 4. TESTS RESPONSIVE

### 4.1 Devices à tester

| Device | Viewport | Browser |
|--------|----------|---------|
| iPhone SE | 375 × 667 | Safari iOS |
| iPhone 12/13 | 390 × 844 | Safari iOS |
| iPad | 768 × 1024 | Safari iOS |
| Desktop Standard | 1366 × 768 | Chrome |
| Desktop XL | 1920 × 1080 | Chrome |

---

### 4.2 Tests par breakpoint

#### Test 4.2.1: Mobile Small (< 480px)
**Device:** iPhone SE

**Checklist:**
- [ ] Header compact (logo + hamburger + panier)
- [ ] Menu hamburger fonctionnel
- [ ] Hero section lisible
- [ ] Catégories 1 colonne
- [ ] Produits 1 colonne
- [ ] Footer 1 colonne
- [ ] Boutons touch-friendly (min 44px)
- [ ] Texte lisible sans zoom
- [ ] Images responsive
- [ ] Formulaires utilisables

---

#### Test 4.2.2: Mobile Medium (480-768px)
**Device:** iPhone 12

**Checklist:**
- [ ] Grille produits 2 colonnes
- [ ] Catégories 2 colonnes
- [ ] Footer 2 colonnes
- [ ] Hero section proportionné
- [ ] Navigation tactile fluide
- [ ] Zoom images fonctionne
- [ ] Panier mobile optimisé

---

#### Test 4.2.3: Tablet (768-1024px)
**Device:** iPad

**Checklist:**
- [ ] Header intermédiaire
- [ ] Grille produits 3 colonnes
- [ ] Catégories 3 colonnes
- [ ] Footer 3-4 colonnes
- [ ] Orientation portrait ET paysage
- [ ] Recherche adaptée
- [ ] Checkout responsive

---

#### Test 4.2.4: Desktop (1024-1440px)
**Device:** Laptop standard

**Checklist:**
- [ ] Header complet visible
- [ ] Grille produits 4 colonnes
- [ ] Catégories 6 colonnes (2 rangées)
- [ ] Footer 5 colonnes
- [ ] Hover effects fonctionnent
- [ ] Dropdowns OK
- [ ] Sidebar filtres (si présent)

---

#### Test 4.2.5: Desktop XL (> 1440px)
**Device:** 1920 × 1080

**Checklist:**
- [ ] Container max-width 1280px centré
- [ ] Pas de stretch excessif
- [ ] Images haute résolution
- [ ] Espacement cohérent
- [ ] Pas de vide inutile

---

### 4.3 Tests d'orientation

#### Mobile/Tablet Rotation
**Steps:**
1. Charger page en portrait
2. Tourner en paysage
3. Vérifier layout s'adapte
4. Retour portrait
5. Vérifier aucune cassure

**Résultat attendu:**
- Adaptation fluide
- Aucun débordement
- Lisibilité maintenue

---

## 5. TESTS NAVIGATEURS

### 5.1 Navigateurs à tester

| Browser | Version | OS | Priorité |
|---------|---------|-----|----------|
| Chrome | Latest | Windows/Mac | P0 |
| Safari | Latest | macOS/iOS | P0 |
| Firefox | Latest | Windows/Mac | P1 |
| Edge | Latest | Windows | P1 |

---

### 5.2 Tests cross-browser

#### Test 5.2.1: Chrome (P0)
**Checklist:**
- [ ] Design System CSS rendu correct
- [ ] Fonts chargées (Playfair + Montserrat)
- [ ] Animations smooth
- [ ] Flexbox/Grid OK
- [ ] JavaScript fonctionne
- [ ] Console 0 erreurs

---

#### Test 5.2.2: Safari (P0)
**Checklist:**
- [ ] Vendor prefixes OK
- [ ] Sticky header fonctionne
- [ ] Smooth scroll
- [ ] Backdrop-filter (si utilisé)
- [ ] Forms natifs iOS OK
- [ ] Touch events

---

#### Test 5.2.3: Firefox (P1)
**Checklist:**
- [ ] Layout identique à Chrome
- [ ] CSS Grid support
- [ ] Animations 60fps
- [ ] Developer tools warnings

---

#### Test 5.2.4: Edge (P1)
**Checklist:**
- [ ] Chromium engine → similaire Chrome
- [ ] Vérifier spécificités Windows
- [ ] Fonts rendering

---

## 6. TESTS ACCESSIBILITÉ

### 6.1 Objectif WCAG 2.1 AA

**Standards à respecter:**
- Contraste texte minimum 4.5:1
- Tous éléments clavier-navigables
- Alt text sur toutes images
- Labels sur tous inputs
- Structure heading logique (H1-H6)
- ARIA labels pertinents
- Focus visible
- Pas de flash/clignotement

---

### 6.2 Outils automatisés

#### Test 6.2.1: WAVE
**Steps:**
1. Installer extension WAVE
2. Scanner page d'accueil
3. Vérifier 0 erreurs
4. Corriger warnings
5. Scanner pages clés:
   - Collection
   - Produit
   - Panier
   - Checkout

**Critère succès:** 0 erreurs, < 5 warnings

---

#### Test 6.2.2: Lighthouse Accessibility
**Steps:**
1. DevTools → Lighthouse
2. Cocher "Accessibility"
3. Lancer audit
4. Vérifier score ≥ 95
5. Corriger issues détectées

**Critère succès:** Score 95+

---

#### Test 6.2.3: axe DevTools
**Steps:**
1. Installer axe extension
2. Scanner toutes pages
3. Résoudre issues critiques
4. Résoudre issues modérées

**Critère succès:** 0 critical, 0 serious

---

### 6.3 Tests manuels accessibilité

#### Test 6.3.1: Navigation clavier
**Steps:**
1. Désactiver souris
2. Utiliser uniquement TAB / SHIFT+TAB
3. Parcourir toute la page d'accueil
4. Vérifier focus visible sur chaque élément
5. Tester ENTER sur liens/boutons
6. Tester ESC pour fermer modals
7. Tester navigation menu dropdown (flèches)

**Résultat attendu:**
- Tous éléments accessibles au clavier
- Focus visible (outline)
- Ordre de tabulation logique

---

#### Test 6.3.2: Screen reader (VoiceOver/NVDA)
**Steps:**
1. Activer VoiceOver (Mac) ou NVDA (Windows)
2. Naviguer page d'accueil
3. Vérifier annonces:
   - Heading levels
   - Alt text images
   - Labels formulaires
   - Rôles ARIA
4. Tester ajout panier
5. Tester checkout

**Résultat attendu:**
- Contenu compréhensible audio
- Navigation logique
- Aucune info manquante

---

#### Test 6.3.3: Contrastes couleurs
**Steps:**
1. Utiliser Contrast Checker
2. Vérifier tous textes:
   - Texte principal (noir sur blanc)
   - Texte sur fond orange (--color-accent)
   - Liens
   - Boutons
   - Prix
3. Minimum 4.5:1 (AA)
4. Optimal 7:1 (AAA)

**Résultat attendu:**
- Tous contrastes ≥ 4.5:1

---

#### Test 6.3.4: Zoom 200%
**Steps:**
1. Zoom navigateur 200% (Cmd/Ctrl + +)
2. Vérifier layout ne casse pas
3. Vérifier texte lisible
4. Vérifier scroll horizontal minimal
5. Vérifier fonctionnalités OK

**Résultat attendu:**
- Site utilisable à 200% zoom
- Pas de débordements

---

## 7. TESTS PERFORMANCE

### 7.1 Lighthouse Performance

#### Test 7.1.1: Page d'accueil
**Steps:**
1. DevTools → Lighthouse
2. Mode "Navigation" + "Desktop"
3. Lancer audit
4. Vérifier métriques:
   - FCP (First Contentful Paint) < 1.8s
   - LCP (Largest Contentful Paint) < 2.5s
   - TBT (Total Blocking Time) < 200ms
   - CLS (Cumulative Layout Shift) < 0.1
   - Speed Index < 3.4s
5. Score Performance ≥ 90

**Critère succès:** Score 90+

---

#### Test 7.1.2: Page Produit
**Steps:**
1. Audit Lighthouse page produit
2. Vérifier temps de chargement images
3. Vérifier lazy-loading fonctionne
4. Score ≥ 85

**Critère succès:** Score 85+

---

### 7.2 Optimisation images

#### Test 7.2.1: Poids images
**Steps:**
1. Network tab → Filter images
2. Vérifier chaque image:
   - Hero: < 500KB (JPG optimisé)
   - Produits: < 200KB chacune
   - Icônes: SVG ou WebP
3. Vérifier format moderne (WebP)
4. Vérifier dimensions appropriées

**Résultat attendu:**
- Total images page < 2MB
- Formats optimisés

---

#### Test 7.2.2: Lazy-loading
**Steps:**
1. Network tab → Images
2. Charger page d'accueil
3. Vérifier seules images above-fold chargent
4. Scroller → images below-fold chargent
5. Vérifier attribut `loading="lazy"`

**Résultat attendu:**
- Chargement progressif
- Loading lazy actif

---

### 7.3 Optimisation CSS/JS

#### Test 7.3.1: CSS non-utilisé
**Steps:**
1. Coverage tab (DevTools)
2. Mesurer CSS utilisé vs total
3. Optimal: > 60% utilisé
4. Identifier CSS mort

**Résultat attendu:**
- Minimum 50% CSS utilisé

---

#### Test 7.3.2: JavaScript
**Steps:**
1. Vérifier scripts minifiés
2. Vérifier async/defer
3. Vérifier pas de blocking scripts
4. Console 0 erreurs

**Résultat attendu:**
- JS non-bloquant
- 0 erreurs console

---

### 7.4 Temps de chargement

#### Test 7.4.1: First Load (cache vide)
**Steps:**
1. Vider cache navigateur
2. Hard reload (Cmd+Shift+R)
3. Mesurer temps chargement complet
4. Objectif: < 3s

**Critère succès:** < 3 secondes

---

#### Test 7.4.2: Repeat Load (cache)
**Steps:**
1. Recharger page (cache actif)
2. Mesurer temps
3. Objectif: < 1s

**Critère succès:** < 1 seconde

---

## 8. TESTS SÉCURITÉ

### 8.1 HTTPS

#### Test 8.1.1: Certificat SSL
**Steps:**
1. Vérifier URL commence par `https://`
2. Vérifier cadenas vert navigateur
3. Vérifier certificat valide
4. Vérifier aucune ressource HTTP (mixed content)

**Résultat attendu:**
- HTTPS partout
- Certificat valide

---

### 8.2 Formulaires

#### Test 8.2.1: Validation inputs
**Steps:**
1. Tester injection XSS dans inputs:
   - `<script>alert('XSS')</script>`
   - `<img src=x onerror=alert(1)>`
2. Vérifier échappement HTML
3. Vérifier validation côté serveur

**Résultat attendu:**
- Aucun script exécuté
- Validation stricte

---

#### Test 8.2.2: Protection CSRF
**Steps:**
1. Inspecter formulaires
2. Vérifier présence token CSRF
3. Vérifier tokens uniques par session

**Résultat attendu:**
- Tokens CSRF présents

---

### 8.3 DRM & Protection contenu

#### Test 8.3.1: Protection PDF
**Steps:**
1. Accéder PDF digital (abonné)
2. Essayer clic droit → Enregistrer
3. Vérifier désactivé ou watermarked
4. Essayer copier texte
5. Vérifier protection

**Résultat attendu:**
- Téléchargement contrôlé
- Copie limitée

---

## 9. TESTS E-COMMERCE

### 9.1 Parcours d'achat complet

#### Test 9.1.1: Achat Livre Physique
**Steps:**
1. Visiteur non-connecté
2. Page d'accueil → Recherche "chemot"
3. Cliquer produit "Chemot Hatsadikim"
4. Vérifier prix 24.99€
5. Sélectionner variant "Physique"
6. Ajouter au panier
7. Continuer shopping → Ajouter 2ème produit
8. Aller au panier
9. Vérifier 2 items + total
10. Valider commande
11. Créer compte lors checkout
12. Remplir adresse livraison France
13. Choisir "Colissimo" (gratuit si > 50€)
14. Payer CB test
15. Vérifier confirmation commande
16. Vérifier email confirmation

**Résultat attendu:**
- Parcours fluide sans friction
- Calculs corrects
- Confirmation immédiate

**Temps max:** 5 minutes

---

#### Test 9.1.2: Achat Livre Digital
**Steps:**
1. Client connecté (abonné)
2. Produit → Variant "Digital"
3. Prix 9.99€
4. Ajouter panier
5. Checkout (pas de frais port)
6. Payer
7. Confirmation
8. Vérifier accès immédiat PDF dans compte
9. Tester téléchargement
10. Tester lecteur en ligne

**Résultat attendu:**
- Accès instantané post-achat
- PDF téléchargeable
- Lecteur fonctionnel

---

#### Test 9.1.3: Achat Bundle
**Steps:**
1. Produit → Variant "Physique + Digital"
2. Prix 32.99€ (économie 1.99€)
3. Vérifier badge "Bundle Deal"
4. Ajouter panier
5. Vérifier économie affichée
6. Checkout
7. Payer
8. Vérifier:
   - Commande physique confirmée
   - Accès digital immédiat

**Résultat attendu:**
- Prix bundle correct
- Double accès (physique + digital)

---

### 9.2 Codes promo

#### Test 9.2.1: Code réduction
**Steps:**
1. Panier avec 50€ de produits
2. Page panier → "Code promo"
3. Entrer code invalide → erreur
4. Entrer code valide "BRESLEV10"
5. Vérifier réduction -10% appliquée
6. Vérifier total mis à jour
7. Retirer code → total restauré

**Résultat attendu:**
- Validation code
- Calcul correct
- Amovible

---

### 9.3 Frais de port

#### Test 9.3.1: Livraison France
**Steps:**
1. Panier 30€ (< 50€)
2. Checkout → Adresse France
3. Vérifier frais port 4.90€
4. Ajouter produit → Total > 50€
5. Vérifier "Livraison gratuite"

**Résultat attendu:**
- Frais corrects
- Gratuit si > 50€

---

#### Test 9.3.2: Livraison International
**Steps:**
1. Checkout → Adresse Belgique
2. Vérifier frais port 9.90€
3. Tester autres pays EU
4. Tester hors EU (Suisse)

**Résultat attendu:**
- Frais variables selon pays
- Calcul automatique

---

## 10. PLANNING D'EXÉCUTION

### 10.1 Phase 1: Tests Critiques (Jour 1-2)

**Priorité P0:**
- Navigation principale (header, footer, menu)
- Page d'accueil complète
- Collection & Produits
- Ajout panier
- Checkout basique
- Responsive mobile (iPhone 12)
- Chrome desktop

**Livrable:** Rapport bugs critiques

---

### 10.2 Phase 2: Tests Fonctionnels (Jour 3-4)

**Priorité P1:**
- Recherche
- Compte client
- Abonnement
- Lecteur digital
- Formulaires
- Responsive tablet
- Safari + Firefox

**Livrable:** Checklist QA complète

---

### 10.3 Phase 3: Tests Qualité (Jour 5-6)

**Priorité P2:**
- Accessibilité (WCAG AA)
- Performance (Lighthouse)
- SEO basique
- Multi-devices (5 devices)
- Edge browser

**Livrable:** Rapport accessibilité + performance

---

### 10.4 Phase 4: Tests Avancés (Jour 7)

**Priorité P3:**
- Sécurité basique
- DRM protection
- Tests de régression
- Exploratory testing

**Livrable:** Rapport final + recommandations

---

## 11. CRITÈRES DE VALIDATION FINALE

### Site READY FOR PRODUCTION si:

✅ **Fonctionnel:**
- 100% tests P0 passent
- 95%+ tests P1 passent
- 0 bugs critiques
- < 3 bugs majeurs

✅ **Performance:**
- Lighthouse Performance ≥ 90
- FCP < 1.8s
- LCP < 2.5s
- Images optimisées

✅ **Accessibilité:**
- Lighthouse Accessibility ≥ 95
- WAVE 0 erreurs
- Navigation clavier complète
- Screen reader compatible

✅ **Responsive:**
- 5 devices testés OK
- Mobile perfect
- Tablet perfect
- Desktop perfect

✅ **Navigateurs:**
- Chrome OK
- Safari OK
- Firefox OK
- Edge OK

✅ **E-commerce:**
- Parcours achat fluide
- Paiement fonctionnel
- Emails confirmations OK

---

## 12. OUTILS REQUIS

### Extensions navigateur:
- WAVE (accessibilité)
- axe DevTools (accessibilité)
- Lighthouse (Chrome DevTools)
- React DevTools (si React)
- ColorZilla (contrastes)

### Services en ligne:
- PageSpeed Insights
- GTmetrix
- WebPageTest
- Validator W3C HTML
- Validator W3C CSS

### Devices physiques:
- iPhone (iOS Safari)
- iPad
- Laptop Windows
- Laptop Mac

---

## CONCLUSION

Ce plan de tests couvre exhaustivement tous les aspects du site Breslev Books. L'exécution complète prendra environ 7 jours pour un testeur QA expérimenté.

**Prochaine étape:** Créer la checklist QA actionnable (QA_CHECKLIST.md)

---

**Document créé par:** Agent 7 - Testing & QA
**Date:** 10 Novembre 2024
**Version:** 1.0
**Na Nach Nachma Nachman MeUman!** 🚀
