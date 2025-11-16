# CHECKLIST QA - BRESLEV BOOKS
## Agent 7: Testing & QA - Liste de vérification exhaustive

**Version:** 1.0
**Date:** 10 Novembre 2024
**Testeur:** _____________________
**Date tests:** _____________________

---

## INSTRUCTIONS D'UTILISATION

- ✅ Cocher chaque item testé et validé
- ❌ Marquer X si test échoue (créer bug dans BUG_TRACKER.md)
- ⚠️ Marquer si warning/amélioration possible
- N/A si non applicable

---

## 1. NAVIGATION & HEADER

### 1.1 Header Desktop (> 1024px)

- [ ] Logo visible et cliquable (retour accueil)
- [ ] Menu principal affiché horizontalement
- [ ] Lien "Tous les livres" fonctionnel
- [ ] Dropdown "Catégories" s'ouvre au hover/click
- [ ] 6 catégories présentes dans dropdown
- [ ] Lien "Nouveautés" fonctionnel
- [ ] Lien "Abonnement" fonctionnel
- [ ] Lien "Contact" fonctionnel
- [ ] Icône recherche présente et cliquable
- [ ] Barre recherche s'ouvre (expansible)
- [ ] Icône compte utilisateur visible
- [ ] Icône panier visible avec compteur
- [ ] Header sticky au scroll (reste visible)
- [ ] Shadow apparaît au scroll
- [ ] Hauteur header appropriée (80-100px)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 1.2 Header Mobile (< 768px)

- [ ] Logo visible (taille adaptée)
- [ ] Icône hamburger (☰) visible à droite
- [ ] Click hamburger ouvre menu full-screen
- [ ] Menu overlay fond semi-transparent
- [ ] Bouton fermer (X) visible
- [ ] Tous liens menu présents
- [ ] Click lien ferme menu et navigue
- [ ] Icône compte visible
- [ ] Icône panier visible avec compteur
- [ ] Header sticky mobile
- [ ] Touch-friendly (éléments > 44px)
- [ ] Pas de débordement horizontal

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 1.3 Recherche

- [ ] Click icône ouvre barre recherche
- [ ] Input recherche visible et focus auto
- [ ] Placeholder texte approprié
- [ ] Saisie déclenche suggestions (debounce 300ms)
- [ ] Suggestions affichent produits avec images
- [ ] Suggestions affichent collections
- [ ] Suggestions affichent pages
- [ ] Click suggestion navigue vers résultat
- [ ] Enter submit recherche → page résultats
- [ ] ESC ferme recherche
- [ ] Click hors recherche ferme dropdown
- [ ] Support multilingue (FR + HE)
- [ ] Pas de résultat → message approprié

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 1.4 Footer

- [ ] Footer visible en bas de page
- [ ] 5 colonnes affichées (desktop)
- [ ] Colonne 1 "À Propos" complète
- [ ] Description texte présente
- [ ] Icônes réseaux sociaux (4 min)
- [ ] Colonne 2 "Navigation" avec liens
- [ ] Tous liens Navigation fonctionnels
- [ ] Colonne 3 "Catégories" avec liens
- [ ] Tous liens Catégories fonctionnels
- [ ] Colonne 4 "Aide" avec liens
- [ ] Tous liens Aide fonctionnels
- [ ] Colonne 5 "Newsletter" présente
- [ ] Input email newsletter
- [ ] Bouton submit newsletter
- [ ] Validation email newsletter
- [ ] Message succès après soumission
- [ ] Badges paiement affichés (4 min)
- [ ] Liens légaux présents (Mentions, CGV, etc.)
- [ ] Copyright 2024 affiché
- [ ] Footer responsive (1 colonne mobile)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 2. PAGE D'ACCUEIL

### 2.1 Hero Section

- [ ] Hero section 90vh minimum
- [ ] Image background chargée et visible
- [ ] Image optimisée (< 500KB)
- [ ] Overlay dégradé présent (lisibilité texte)
- [ ] Badge "Nouveauté" affiché
- [ ] Titre principal lisible et impactant
- [ ] Sous-titre présent et lisible
- [ ] CTA primaire "Explorer Collection" visible
- [ ] CTA primaire fonctionnel → /collections/all
- [ ] CTA secondaire "Abonnement" visible
- [ ] CTA secondaire fonctionnel → /pages/abonnement
- [ ] 3 badges rassurance en bas hero
- [ ] Texte blanc contraste OK (ratio ≥ 4.5:1)
- [ ] Responsive mobile (texte lisible)
- [ ] Pas de décalage de layout (CLS)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 2.2 Section Catégories

- [ ] Titre section "Nos Catégories" présent
- [ ] Grille 6 blocs desktop (3-3)
- [ ] Grille 3 colonnes tablet
- [ ] Grille 2 colonnes mobile
- [ ] Icône pour chaque catégorie
- [ ] Texte catégorie lisible
- [ ] Catégorie 1: Livres d'étude → lien OK
- [ ] Catégorie 2: Contes et récits → lien OK
- [ ] Catégorie 3: Prières et Téfilot → lien OK
- [ ] Catégorie 4: Biographies → lien OK
- [ ] Catégorie 5: Brochures → lien OK
- [ ] Catégorie 6: Nouveautés → lien OK
- [ ] Hover effect sur cards
- [ ] Toutes images/icônes chargées
- [ ] Alignement cohérent

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 2.3 Produits Vedettes

- [ ] Titre section "Produits Vedettes" présent
- [ ] Grille 4 colonnes desktop
- [ ] Grille 3 colonnes tablet
- [ ] Grille 2 colonnes mobile M
- [ ] Grille 1 colonne mobile S
- [ ] Maximum 8 produits affichés
- [ ] Toutes images produits chargées
- [ ] Images ratio 2:3 ou carré
- [ ] Lazy-loading images fonctionne
- [ ] Titre produit lisible
- [ ] Auteur/vendor affiché
- [ ] Prix affiché clairement
- [ ] Prix barré si promo
- [ ] Badge si nouveau/bestseller/promo
- [ ] Hover effect sur card (shadow)
- [ ] Quick actions apparaissent au hover
- [ ] Bouton wishlist (cœur) fonctionnel
- [ ] Bouton quick view fonctionnel
- [ ] Bouton quick add cart fonctionnel
- [ ] Click card → page produit
- [ ] Lien "Voir tout" présent et fonctionnel

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 2.4 Bannière Abonnement

- [ ] Bannière visible et impactante
- [ ] Fond noir/dégradé
- [ ] Titre "Abonnement Illimité" lisible
- [ ] Prix "29€/mois" affiché clairement
- [ ] Liste 3+ avantages avec icônes ✓
- [ ] CTA "S'abonner" visible et contrasté
- [ ] CTA "En savoir plus" visible
- [ ] Click "S'abonner" → /pages/abonnement
- [ ] Click "En savoir plus" → /pages/abonnement
- [ ] Responsive mobile (texte lisible)
- [ ] Contraste texte/fond ≥ 4.5:1

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 2.5 Section Nouveautés

- [ ] Titre section "Nouveautés" présent
- [ ] Grille 4 produits (desktop)
- [ ] Badge "NEW" sur chaque produit
- [ ] Date sortie affichée (optionnel)
- [ ] Toutes cards complètes (image, titre, prix)
- [ ] Hover effects fonctionnent
- [ ] Click produit → page produit
- [ ] Lien "Voir toutes les nouveautés"
- [ ] Lien → /collections/nouveautes

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 2.6 Badges Rassurance

- [ ] Section badges visible
- [ ] 4 badges minimum affichés
- [ ] Badge 1: Livraison gratuite + icône 🚚
- [ ] Badge 2: Paiement sécurisé + icône 🔒
- [ ] Badge 3: Satisfait ou remboursé + icône ✅
- [ ] Badge 4: Service client + icône 📞
- [ ] Icônes visibles et appropriées
- [ ] Texte lisible
- [ ] Grille 4 colonnes desktop
- [ ] Grille 2-2 mobile
- [ ] Alignement centré

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 3. COLLECTIONS & PRODUITS

### 3.1 Page Collection

**Tester sur:** /collections/livres-etude

- [ ] Titre collection affiché (H1)
- [ ] Description collection présente
- [ ] Image header collection (optionnel)
- [ ] Nombre de produits affiché
- [ ] Grille produits 4 colonnes desktop
- [ ] Grille produits 3 colonnes tablet
- [ ] Grille produits 2 colonnes mobile
- [ ] Toutes cards produits uniformes
- [ ] Filtres présents (sidebar ou top)
- [ ] Filtre par prix fonctionne
- [ ] Filtre par langue fonctionne
- [ ] Filtre par auteur fonctionne
- [ ] Filtre par format fonctionne
- [ ] Tri "Bestsellers" fonctionne
- [ ] Tri "Prix croissant" fonctionne
- [ ] Tri "Prix décroissant" fonctionne
- [ ] Tri "Nouveautés" fonctionne
- [ ] Pagination si > 20 produits
- [ ] Pagination numéros cliquables
- [ ] "Précédent/Suivant" fonctionnels
- [ ] Breadcrumb présent (Accueil > Collection)
- [ ] Responsive parfait

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 3.2 Page Produit

**Tester sur:** /products/chemot-hatsadikim

#### Images & Média
- [ ] Image principale visible et grande
- [ ] Zoom image au hover (desktop)
- [ ] Click image ouvre lightbox/zoom
- [ ] Galerie thumbnails présente
- [ ] Click thumbnail change image principale
- [ ] Minimum 3 images par produit
- [ ] Images haute qualité (> 800px)
- [ ] Lazy-loading galerie
- [ ] Vidéo produit (si présente) fonctionne

#### Informations Produit
- [ ] Titre produit (H1)
- [ ] Vendor/Auteur affiché
- [ ] Prix principal visible (gros)
- [ ] Prix barré si promo
- [ ] Badge économie "Économisez X€"
- [ ] Badges statut (Nouveau, Bestseller)
- [ ] Note étoiles (si reviews)
- [ ] Nombre avis cliquable → reviews
- [ ] Stock disponible affiché
- [ ] Message si stock bas
- [ ] Description complète lisible
- [ ] Métadonnées livre:
  - [ ] Auteur
  - [ ] Nombre de pages
  - [ ] Langue
  - [ ] ISBN
  - [ ] Format
  - [ ] Catégorie

#### Variants & Options
- [ ] Sélecteur variant visible
- [ ] Variant "Physique" disponible + prix
- [ ] Variant "Digital" disponible + prix
- [ ] Variant "Bundle" disponible + prix bundle
- [ ] Prix update au changement variant
- [ ] Badge "Deal" si bundle

#### Actions Produit
- [ ] Sélecteur quantité présent (+ / -)
- [ ] Quantité minimum 1
- [ ] Quantité maximum = stock
- [ ] Bouton "Ajouter au panier" visible
- [ ] Click ajouter → confirmation
- [ ] Compteur panier header update
- [ ] Bouton "Acheter maintenant" présent
- [ ] Click acheter → direct checkout
- [ ] Bouton wishlist (cœur) fonctionnel
- [ ] Bouton partager (optionnel)
- [ ] Bouton comparer (optionnel)

#### Sections Additionnelles
- [ ] Onglets/accordéon infos (Description, Infos, Avis)
- [ ] Description HTML formatée
- [ ] Tableau caractéristiques
- [ ] Section avis clients (si app reviews)
- [ ] Formulaire ajouter avis
- [ ] Section "Produits similaires" présente
- [ ] 4+ produits similaires affichés
- [ ] Breadcrumb présent
- [ ] Responsive mobile parfait

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 3.3 Book Card Component

**Tester sur:** Toute grille produits

- [ ] Structure HTML correcte
- [ ] Image wrapper avec aspect-ratio
- [ ] Image lazy-loading
- [ ] Badge overlay (coin haut droit)
- [ ] Titre produit (max 2 lignes, ellipsis)
- [ ] Auteur/vendor (1 ligne)
- [ ] Prix principal visible
- [ ] Prix comparaison barré (si promo)
- [ ] Note étoiles (si data)
- [ ] Nombre avis (si data)
- [ ] Hover card → shadow elevation
- [ ] Hover → quick actions apparaissent
- [ ] Quick action wishlist
- [ ] Quick action quick view
- [ ] Quick action add to cart
- [ ] Click card → page produit
- [ ] Transition smooth (200ms)
- [ ] Accessible au clavier (focus visible)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 4. PANIER & CHECKOUT

### 4.1 Ajout au Panier

- [ ] Page produit → Click "Ajouter"
- [ ] Modal/notification apparaît
- [ ] Message confirmation clair
- [ ] Image produit dans confirmation
- [ ] Titre + variant dans confirmation
- [ ] Prix dans confirmation
- [ ] Bouton "Voir le panier"
- [ ] Bouton "Continuer shopping"
- [ ] Compteur header update immédiat
- [ ] Badge compteur visible "(1)"
- [ ] Ajouter même produit → quantité +1
- [ ] Ajouter produit différent → nouveau item
- [ ] Compteur total items correct

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 4.2 Page Panier

**URL:** /cart

#### Structure Panier
- [ ] Titre page "Votre Panier"
- [ ] Si panier vide → message + CTA
- [ ] Tableau/liste items présente
- [ ] Pour chaque item:
  - [ ] Image produit (thumbnail)
  - [ ] Titre produit + lien
  - [ ] Variant affiché
  - [ ] Prix unitaire
  - [ ] Sélecteur quantité (+ / -)
  - [ ] Prix ligne (quantité × prix)
  - [ ] Bouton supprimer (X ou icône)

#### Modifications Panier
- [ ] Click + augmente quantité
- [ ] Click - diminue quantité
- [ ] Quantité minimum 1
- [ ] Si quantité 0 → item supprimé
- [ ] Click supprimer → item retiré
- [ ] Confirmation avant suppression
- [ ] Update quantité → prix ligne update
- [ ] Update quantité → total update
- [ ] Animations smooth

#### Résumé Commande
- [ ] Sous-total affiché
- [ ] Estimation frais de port
- [ ] Taxes affichées (si applicable)
- [ ] Total général visible (gros)
- [ ] Code promo (champ input)
- [ ] Click "Appliquer code"
- [ ] Code invalide → message erreur
- [ ] Code valide → réduction appliquée
- [ ] Réduction visible dans résumé
- [ ] Bouton retirer code

#### CTAs & Navigation
- [ ] Bouton "Continuer shopping" → retour
- [ ] Bouton "Valider commande" visible
- [ ] Bouton primaire bien contrasté
- [ ] Click "Valider" → /checkout
- [ ] Responsive mobile parfait
- [ ] Sticky résumé (desktop, optionnel)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 4.3 Checkout Shopify

**URL:** /checkout

#### Informations Client
- [ ] Section "Contact" présente
- [ ] Input email avec validation
- [ ] Checkbox "M'envoyer offres" (opt-in)
- [ ] Section "Livraison" présente
- [ ] Champs requis marqués (*)
- [ ] Input Prénom
- [ ] Input Nom
- [ ] Input Adresse
- [ ] Input Ville
- [ ] Input Code postal
- [ ] Select Pays
- [ ] Select Région/État (si applicable)
- [ ] Input Téléphone
- [ ] Validation formulaire temps réel
- [ ] Messages erreur clairs
- [ ] Autocomplete adresse (Google)
- [ ] Checkbox "Adresse facturation différente"

#### Livraison
- [ ] Options livraison affichées
- [ ] Prix livraison calculé automatiquement
- [ ] Livraison gratuite si > 50€
- [ ] Sélection mode livraison fonctionne
- [ ] Estimation délai affichée

#### Paiement
- [ ] Section "Paiement" présente
- [ ] Options paiement affichées
- [ ] CB/Débit principal
- [ ] PayPal (si actif)
- [ ] Apple Pay (si actif)
- [ ] Google Pay (si actif)
- [ ] Inputs CB sécurisés (iframe)
- [ ] Validation numéro carte
- [ ] Validation expiration
- [ ] Validation CVV
- [ ] Badge "Paiement sécurisé"
- [ ] SSL cadenas visible

#### Résumé Commande
- [ ] Résumé produits (droite)
- [ ] Images produits
- [ ] Quantités correctes
- [ ] Prix unitaires
- [ ] Sous-total correct
- [ ] Frais de port corrects
- [ ] Taxes correctes
- [ ] Total général correct
- [ ] Code promo appliqué (si utilisé)

#### Finalisation
- [ ] Checkbox CGV requis
- [ ] Lien CGV fonctionnel
- [ ] Bouton "Payer" visible
- [ ] Bouton disabled si formulaire invalide
- [ ] Click "Payer" → traitement
- [ ] Loading spinner pendant traitement
- [ ] Redirection confirmation
- [ ] Erreur paiement → message clair

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 4.4 Confirmation Commande

**URL:** /checkout/thank_you

- [ ] Page confirmation affichée
- [ ] Numéro commande présent (#1001)
- [ ] Message "Merci pour votre commande"
- [ ] Résumé commande complet
- [ ] Adresse livraison confirmée
- [ ] Mode livraison confirmé
- [ ] Mode paiement confirmé (masqué)
- [ ] Total payé affiché
- [ ] Bouton "Continuer shopping"
- [ ] Email confirmation mentionné
- [ ] Lien suivi commande (si disponible)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 5. COMPTE CLIENT

### 5.1 Inscription

**URL:** /account/register

- [ ] Formulaire inscription visible
- [ ] Input Prénom
- [ ] Input Nom
- [ ] Input Email (unique)
- [ ] Input Mot de passe
- [ ] Input Confirmer mot de passe
- [ ] Validation email format
- [ ] Validation mot de passe (min 8 car)
- [ ] Force mot de passe affichée
- [ ] Mots de passe doivent matcher
- [ ] Checkbox CGV requis
- [ ] Checkbox newsletter (opt-in)
- [ ] Bouton "Créer compte"
- [ ] Erreur si email existe déjà
- [ ] Succès → redirection /account
- [ ] Connexion automatique
- [ ] Email bienvenue envoyé

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 5.2 Connexion

**URL:** /account/login

- [ ] Formulaire connexion visible
- [ ] Input Email
- [ ] Input Mot de passe
- [ ] Checkbox "Se souvenir de moi"
- [ ] Bouton "Se connecter"
- [ ] Lien "Mot de passe oublié"
- [ ] Lien "Créer un compte"
- [ ] Erreur si identifiants incorrects
- [ ] Succès → redirection /account
- [ ] Session persistante (si checkbox)
- [ ] Nom utilisateur header après connexion

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 5.3 Mot de passe oublié

**URL:** /account/recover

- [ ] Page reset password accessible
- [ ] Input email
- [ ] Bouton "Envoyer"
- [ ] Validation email
- [ ] Email reset envoyé
- [ ] Message confirmation affiché
- [ ] Lien dans email fonctionnel
- [ ] Page nouveau mot de passe
- [ ] Validation nouveau mot de passe
- [ ] Confirmation succès
- [ ] Connexion possible avec nouveau mdp

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 5.4 Dashboard Mon Compte

**URL:** /account

- [ ] Titre "Mon Compte" ou nom client
- [ ] Section "Mes Informations"
  - [ ] Nom complet affiché
  - [ ] Email affiché
  - [ ] Bouton "Modifier"
- [ ] Section "Mes Commandes"
  - [ ] Liste commandes (si existantes)
  - [ ] Numéro commande
  - [ ] Date commande
  - [ ] Statut commande
  - [ ] Total commande
  - [ ] Bouton "Voir détails"
  - [ ] Message si 0 commandes
- [ ] Section "Mes Adresses"
  - [ ] Adresse par défaut affichée
  - [ ] Bouton "Ajouter adresse"
  - [ ] Bouton "Modifier" par adresse
  - [ ] Bouton "Supprimer"
- [ ] Section "Mon Abonnement" (si abonné)
  - [ ] Statut abonnement
  - [ ] Plan actuel
  - [ ] Date prochaine facturation
  - [ ] Bouton "Gérer abonnement"
- [ ] Section "Ma Wishlist" (si fonctionnalité)
  - [ ] Produits sauvegardés
  - [ ] Bouton retirer de wishlist
- [ ] Bouton "Déconnexion"
- [ ] Responsive mobile

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 5.5 Détail Commande

**URL:** /account/orders/[id]

- [ ] Numéro commande affiché
- [ ] Date commande
- [ ] Statut commande (badge coloré)
- [ ] Timeline statut (optionnel)
- [ ] Liste produits commandés
- [ ] Quantités correctes
- [ ] Prix corrects
- [ ] Sous-total
- [ ] Frais de port
- [ ] Taxes
- [ ] Total
- [ ] Adresse livraison
- [ ] Mode livraison
- [ ] Numéro suivi (si expédié)
- [ ] Lien tracking transporteur
- [ ] Bouton "Télécharger facture" (PDF)
- [ ] Bouton "Retour commandes"
- [ ] Bouton "Contacter support"

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 6. ABONNEMENT & DIGITAL

### 6.1 Page Abonnement

**URL:** /pages/abonnement

- [ ] Titre page "Abonnement Illimité"
- [ ] Introduction/description
- [ ] 3 plans affichés:
  - [ ] Plan Mensuel (29€/mois)
  - [ ] Plan Annuel (290€/an)
  - [ ] Plan Lifetime (990€ one-time)
- [ ] Pour chaque plan:
  - [ ] Prix affiché clairement
  - [ ] Badge "Économie" (si applicable)
  - [ ] Liste features incluses
  - [ ] Bouton "S'abonner"
- [ ] Plan recommandé mis en avant
- [ ] Section FAQ abonnement
- [ ] Section témoignages (optionnel)
- [ ] CTA bas de page
- [ ] Click "S'abonner" → checkout

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 6.2 Checkout Abonnement

- [ ] Produit abonnement dans panier
- [ ] Prix récurrent affiché
- [ ] Mention "Renouvelé automatiquement"
- [ ] Checkbox acceptation renouvellement
- [ ] Checkout standard fonctionne
- [ ] Paiement accepté
- [ ] Confirmation abonnement
- [ ] Email confirmation reçu
- [ ] Statut "Abonné" dans /account
- [ ] Accès digital activé immédiatement

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 6.3 Lecteur Digital

**Prérequis:** Abonné actif

- [ ] Page produit digital → Bouton "Lire en ligne"
- [ ] Click bouton ouvre lecteur
- [ ] FlipHTML5 player charge
- [ ] Interface lecteur claire
- [ ] Navigation pages (flèches clavier)
- [ ] Navigation pages (click)
- [ ] Barre progression
- [ ] Bouton zoom +
- [ ] Bouton zoom -
- [ ] Bouton plein écran
- [ ] Bouton télécharger (si autorisé)
- [ ] Bouton partager
- [ ] Bouton fermer lecteur
- [ ] Responsive mobile
- [ ] DRM protection active
- [ ] Clic droit désactivé (ou watermark)
- [ ] Copie texte limitée/interdite
- [ ] Performance fluide (60fps)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 6.4 Téléchargement PDF

**Prérequis:** Abonné actif

- [ ] Page produit → Bouton "Télécharger PDF"
- [ ] Click bouton → download démarre
- [ ] PDF watermarked avec email client
- [ ] PDF protégé par mot de passe (optionnel)
- [ ] PDF impression limitée (optionnel)
- [ ] Limite téléchargements respectée
- [ ] Tracking téléchargement (analytics)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 7. FORMULAIRES

### 7.1 Newsletter Footer

- [ ] Input email visible
- [ ] Placeholder approprié
- [ ] Bouton submit visible (flèche/icône)
- [ ] Validation email format
- [ ] Email vide → erreur
- [ ] Email invalide → erreur
- [ ] Email valide → message succès
- [ ] Email déjà inscrit → message
- [ ] Email confirmation envoyé
- [ ] Lien désinscription dans email
- [ ] Design cohérent avec footer

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 7.2 Contact

**URL:** /pages/contact

- [ ] Titre page "Contact"
- [ ] Informations contact affichées:
  - [ ] Email
  - [ ] Téléphone (optionnel)
  - [ ] Adresse (optionnel)
  - [ ] Horaires (optionnel)
- [ ] Formulaire contact présent
  - [ ] Input Nom
  - [ ] Input Email
  - [ ] Select Sujet (dropdown)
  - [ ] Textarea Message
  - [ ] Checkbox CGV (optionnel)
  - [ ] Bouton "Envoyer"
- [ ] Validation champs requis
- [ ] Validation format email
- [ ] Message minimum longueur (10 car)
- [ ] Soumission → message succès
- [ ] Email reçu par admin
- [ ] Email confirmation client
- [ ] Reset formulaire après envoi
- [ ] Protection spam (honeypot/captcha)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 8. RESPONSIVE DESIGN

### 8.1 Mobile Small (< 480px)

**Device:** iPhone SE (375px)

- [ ] Layout 1 colonne partout
- [ ] Header compact et fonctionnel
- [ ] Menu hamburger OK
- [ ] Hero section lisible
- [ ] Catégories 1 colonne
- [ ] Produits 1 colonne
- [ ] Footer 1 colonne
- [ ] Boutons min 44×44px (touch-friendly)
- [ ] Texte lisible sans zoom (16px min)
- [ ] Pas de scroll horizontal
- [ ] Images responsive
- [ ] Formulaires utilisables
- [ ] Panier utilisable
- [ ] Checkout mobile parfait

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 8.2 Mobile Medium (480-768px)

**Device:** iPhone 12 (390px)

- [ ] Grille produits 2 colonnes
- [ ] Catégories 2 colonnes
- [ ] Footer 2 colonnes
- [ ] Hero proportionné
- [ ] Navigation tactile fluide
- [ ] Zoom images fonctionne
- [ ] Touch events responsifs
- [ ] Pas de débordement

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 8.3 Tablet (768-1024px)

**Device:** iPad (768px)

- [ ] Header intermédiaire
- [ ] Grille produits 3 colonnes
- [ ] Catégories 3 colonnes
- [ ] Footer 3-4 colonnes
- [ ] Portrait ET paysage OK
- [ ] Touch + hover coexistent
- [ ] Recherche adaptée
- [ ] Checkout responsive
- [ ] Pas de layout cassé

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 8.4 Desktop (1024-1440px)

**Device:** Laptop (1366px)

- [ ] Header complet
- [ ] Menu horizontal complet
- [ ] Grille produits 4 colonnes
- [ ] Catégories 6 colonnes (2 rangées)
- [ ] Footer 5 colonnes
- [ ] Hover effects fonctionnent
- [ ] Dropdowns OK
- [ ] Sidebar filtres (optionnel)
- [ ] Layout aéré et lisible
- [ ] Container max-width respecté

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 8.5 Desktop XL (> 1440px)

**Device:** 1920×1080

- [ ] Container max-width 1280px
- [ ] Contenu centré
- [ ] Pas de stretch excessif images
- [ ] Espacement cohérent
- [ ] Pas de vide inutile latéral
- [ ] Images haute résolution
- [ ] Typographie proportionnée
- [ ] Layout premium

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 8.6 Tests Rotation

- [ ] Mobile portrait → paysage smooth
- [ ] Paysage → portrait smooth
- [ ] Tablet portrait → paysage smooth
- [ ] Paysage → portrait smooth
- [ ] Pas de cassure layout
- [ ] Contenu s'adapte
- [ ] Performance OK

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 9. NAVIGATEURS

### 9.1 Chrome (Desktop)

**Version:** _______

- [ ] Design System CSS OK
- [ ] Fonts Playfair + Montserrat chargées
- [ ] Animations smooth 60fps
- [ ] Flexbox rendu correct
- [ ] Grid rendu correct
- [ ] JavaScript 0 erreurs console
- [ ] Console 0 warnings critiques
- [ ] Performance OK
- [ ] Extensions pas de conflit

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 9.2 Safari (macOS/iOS)

**Version:** _______

- [ ] Layout identique Chrome
- [ ] Vendor prefixes OK (-webkit-)
- [ ] Sticky header fonctionne
- [ ] Smooth scroll
- [ ] Backdrop-filter (si utilisé)
- [ ] Forms natifs iOS corrects
- [ ] Touch events iOS
- [ ] Pas de glitches Safari
- [ ] Fonts rendering OK

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 9.3 Firefox

**Version:** _______

- [ ] Layout identique Chrome
- [ ] CSS Grid support complet
- [ ] Flexbox OK
- [ ] Animations 60fps
- [ ] JavaScript OK
- [ ] Console 0 erreurs
- [ ] Performance comparable
- [ ] Fonts rendering

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 9.4 Edge

**Version:** _______

- [ ] Chromium engine (similaire Chrome)
- [ ] Layout correct
- [ ] Spécificités Windows OK
- [ ] Fonts rendering Windows
- [ ] Performance OK
- [ ] 0 erreurs console

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 10. ACCESSIBILITÉ (WCAG 2.1 AA)

### 10.1 Structure Sémantique

- [ ] HTML5 sémantique (<header>, <nav>, <main>, <footer>)
- [ ] Hiérarchie headings logique (H1 → H6)
- [ ] 1 seul H1 par page
- [ ] Landmarks ARIA (si nécessaire)
- [ ] Listes sémantiques (<ul>, <ol>)
- [ ] Tableaux avec <th> et scope
- [ ] Forms avec <label> pour inputs
- [ ] Boutons <button> (pas <div>)
- [ ] Liens <a> avec href

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.2 Navigation Clavier

- [ ] TAB parcourt tous éléments interactifs
- [ ] Ordre tabulation logique
- [ ] Focus visible sur tous éléments
- [ ] Outline/ring focus customisé
- [ ] ENTER active liens/boutons
- [ ] SPACE active checkboxes/boutons
- [ ] ESC ferme modals/dropdowns
- [ ] Flèches navigation dropdowns
- [ ] Shift+TAB navigue en arrière
- [ ] Pas de piège clavier (keyboard trap)
- [ ] Skip to content link (optionnel)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.3 Screen Reader

**Tool:** VoiceOver (Mac) ou NVDA (Windows)

- [ ] Page title annoncé
- [ ] Headings annoncés avec level
- [ ] Images alt text annoncé
- [ ] Links texte descriptif
- [ ] Buttons label clair
- [ ] Forms labels associés
- [ ] Erreurs formulaires annoncées
- [ ] ARIA labels pertinents
- [ ] ARIA live regions (notifications)
- [ ] Navigation logique et compréhensible
- [ ] Contenu décoratif masqué (aria-hidden)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.4 Images & Médias

- [ ] Toutes images ont alt text
- [ ] Alt text descriptif et pertinent
- [ ] Images décoratives alt="" (vide)
- [ ] Logos alt = nom entreprise
- [ ] Icônes fonctionnelles aria-label
- [ ] Vidéos ont sous-titres (si contenu)
- [ ] Audio a transcription (si contenu)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.5 Contrastes Couleurs

**Tool:** Contrast Checker / WAVE

- [ ] Texte principal noir sur blanc ≥ 4.5:1
- [ ] Texte sur fond orange ≥ 4.5:1
- [ ] Liens bleus ≥ 4.5:1
- [ ] Boutons primaires ≥ 4.5:1
- [ ] Prix ≥ 4.5:1
- [ ] Texte gris léger ≥ 4.5:1
- [ ] Focus outline ≥ 3:1
- [ ] Placeholders ≥ 4.5:1 (si lisibilité importante)
- [ ] Icônes ≥ 3:1

**Résultats Contrast Checker:**
```
Élément                 Ratio      Pass/Fail
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Texte principal        _______    ______
Bouton primaire        _______    ______
Liens                  _______    ______
Prix                   _______    ______
```

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.6 Zoom & Taille Texte

- [ ] Zoom 200% → site utilisable
- [ ] Pas de scroll horizontal excessif
- [ ] Texte lisible à 200%
- [ ] Layout ne casse pas
- [ ] Fonctionnalités OK à 200%
- [ ] Zoom 150% parfait
- [ ] Paramètres OS taille texte respectés

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.7 Formulaires Accessibles

- [ ] Tous inputs ont <label> visible
- [ ] Label associé (for="id")
- [ ] Placeholders informatifs (mais pas seul label)
- [ ] Champs requis marqués visuellement
- [ ] Champs requis aria-required="true"
- [ ] Erreurs affichées clairement
- [ ] Erreurs aria-invalid="true"
- [ ] Messages erreur aria-describedby
- [ ] Groupes inputs <fieldset> + <legend>
- [ ] Autocomplete attributs appropriés

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.8 WAVE Scan

**Tool:** WAVE extension

- [ ] 0 erreurs (rouge)
- [ ] < 5 alertes (jaune) acceptables
- [ ] 0 contrastes insuffisants
- [ ] Structure HTML validée
- [ ] ARIA usage correct

**Résultats WAVE:**
```
Erreurs:    _______
Alertes:    _______
Features:   _______
Struct:     _______
Contraste:  _______
```

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 10.9 Lighthouse Accessibility

**Tool:** Chrome DevTools Lighthouse

- [ ] Score ≥ 95
- [ ] Toutes best practices respectées
- [ ] Corrections issues appliquées

**Score Lighthouse Accessibility:** _______/100

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 11. PERFORMANCE

### 11.1 Lighthouse Performance

**Page d'accueil:**

- [ ] FCP (First Contentful Paint) < 1.8s
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] TBT (Total Blocking Time) < 200ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Speed Index < 3.4s
- [ ] Time to Interactive < 3.8s
- [ ] Score Performance ≥ 90

**Métriques:**
```
FCP:            _______ s
LCP:            _______ s
TBT:            _______ ms
CLS:            _______
Speed Index:    _______ s
TTI:            _______ s
Score:          _______/100
```

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

**Page Produit:**

- [ ] Score ≥ 85
- [ ] Images lazy-load OK
- [ ] Galerie performante

**Score:** _______/100

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 11.2 Poids Page

**Page d'accueil (cache vide):**

- [ ] Total page < 3MB
- [ ] Images totales < 2MB
- [ ] CSS total < 100KB
- [ ] JS total < 500KB
- [ ] Fonts < 200KB

**Poids réels:**
```
Total:          _______ MB
Images:         _______ MB
CSS:            _______ KB
JS:             _______ KB
Fonts:          _______ KB
```

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 11.3 Temps de Chargement

- [ ] First Load (cache vide) < 3s
- [ ] Repeat Load (cache) < 1s
- [ ] Connexion 4G simulée OK
- [ ] Connexion 3G acceptable

**Temps mesurés:**
```
First Load:     _______ s
Repeat Load:    _______ s
4G:             _______ s
3G:             _______ s
```

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 11.4 Images Optimisées

- [ ] Formats modernes (WebP priorité)
- [ ] Fallback JPG/PNG
- [ ] Dimensions appropriées (pas oversized)
- [ ] Compression optimale (qualité 80-85%)
- [ ] Lazy-loading actif (loading="lazy")
- [ ] Hero image < 500KB
- [ ] Images produits < 200KB chacune
- [ ] Thumbnails < 50KB
- [ ] Responsive images (srcset)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 11.5 CSS/JS Optimisé

- [ ] CSS minifié
- [ ] JS minifié
- [ ] Pas de CSS/JS bloquant critique
- [ ] Async/defer scripts
- [ ] Critical CSS inline (optionnel)
- [ ] Fonts preload
- [ ] < 50% CSS inutilisé (Coverage tab)
- [ ] Console 0 erreurs

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 11.6 Caching

- [ ] Cache headers présents
- [ ] Assets statiques cache long (1 an)
- [ ] HTML cache court
- [ ] Service worker (optionnel PWA)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 12. SEO BASIQUE

### 12.1 Meta Tags

**Chaque page principale:**

- [ ] <title> unique et descriptif (< 60 car)
- [ ] <meta description> unique (< 160 car)
- [ ] <meta viewport> présent
- [ ] <meta charset="utf-8">
- [ ] <link rel="canonical">
- [ ] Open Graph tags (og:title, og:image, etc.)
- [ ] Twitter Card tags

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 12.2 Structure HTML

- [ ] Hiérarchie H1-H6 logique
- [ ] 1 seul H1 par page
- [ ] URLs descriptives (/collections/livres-etude)
- [ ] Breadcrumbs (schema.org)
- [ ] Schema.org Product markup
- [ ] Schema.org Organization
- [ ] Sitemap.xml accessible
- [ ] Robots.txt présent

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 12.3 Contenu

- [ ] Texte lisible et indexable (pas images)
- [ ] Alt text images descriptifs
- [ ] Links texte descriptif (pas "cliquez ici")
- [ ] Contenu unique par page
- [ ] Pas de contenu dupliqué
- [ ] Ratio texte/HTML acceptable

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 12.4 Performance SEO

- [ ] Mobile-friendly (Google test)
- [ ] HTTPS partout
- [ ] Vitesse chargement < 3s
- [ ] Core Web Vitals pass
- [ ] Pas d'erreurs 404
- [ ] Redirections 301 (si nécessaire)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 13. SÉCURITÉ

### 13.1 HTTPS & SSL

- [ ] Certificat SSL valide
- [ ] Toutes URLs https://
- [ ] Pas de mixed content (HTTP)
- [ ] Cadenas vert navigateur
- [ ] Redirection HTTP → HTTPS

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 13.2 Formulaires Sécurisés

- [ ] Validation côté client ET serveur
- [ ] Échappement HTML inputs
- [ ] Protection XSS
- [ ] Tokens CSRF présents
- [ ] Pas d'injection SQL (Shopify géré)
- [ ] Rate limiting (anti-spam)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 13.3 Protection Contenu Digital

- [ ] DRM actif sur PDFs
- [ ] Watermark email client
- [ ] Clic droit désactivé/limité
- [ ] Copie texte limitée
- [ ] Téléchargement sécurisé (tokens)
- [ ] Limite téléchargements respectée

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 13.4 Données Utilisateur

- [ ] Mots de passe hashés (Shopify)
- [ ] Pas de données sensibles en clair
- [ ] Conformité RGPD (EU)
  - [ ] Consentement cookies
  - [ ] Politique confidentialité
  - [ ] Droit à l'oubli
- [ ] Paiements PCI-DSS (Shopify)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 14. FONCTIONNALITÉS AVANCÉES

### 14.1 Wishlist (si implémenté)

- [ ] Bouton cœur sur cards produits
- [ ] Click ajoute/retire wishlist
- [ ] Feedback visuel (cœur plein)
- [ ] Page /wishlist accessible
- [ ] Liste produits sauvegardés
- [ ] Bouton retirer de wishlist
- [ ] Persistance (logged in)
- [ ] LocalStorage (guest, optionnel)

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 14.2 Quick View (si implémenté)

- [ ] Bouton Quick View sur cards
- [ ] Click ouvre modal
- [ ] Modal overlay semi-transparent
- [ ] Image produit dans modal
- [ ] Infos produit essentielles
- [ ] Sélecteur variant
- [ ] Bouton ajouter panier
- [ ] Lien "Voir détails complets"
- [ ] Bouton fermer (X)
- [ ] ESC ferme modal
- [ ] Click overlay ferme modal

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 14.3 Comparateur (si implémenté)

- [ ] Bouton comparer sur cards
- [ ] Sélection multiple produits
- [ ] Page /compare accessible
- [ ] Tableau comparatif clair
- [ ] Caractéristiques alignées
- [ ] Bouton retirer produit
- [ ] Bouton vider comparaison
- [ ] Maximum 4 produits

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

### 14.4 Reviews/Avis (si app installée)

- [ ] Note étoiles affichée (cards + produit)
- [ ] Nombre avis affiché
- [ ] Section avis page produit
- [ ] Liste avis clients
- [ ] Note + texte + auteur + date
- [ ] Formulaire ajouter avis
- [ ] Validation avis (modération)
- [ ] Tri avis (récents, mieux notés)
- [ ] Filtrage par étoiles

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 15. TESTS DE RÉGRESSION

**Après chaque modification majeure, re-tester:**

- [ ] Navigation principale
- [ ] Ajout panier
- [ ] Checkout
- [ ] Responsive mobile
- [ ] Page d'accueil
- [ ] Page produit
- [ ] Performance Lighthouse
- [ ] Console 0 erreurs

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## 16. TESTS EXPLORATOIRES

**Scénarios utilisateur atypiques:**

- [ ] Panier 50+ items
- [ ] Recherche caractères spéciaux
- [ ] Spam formulaire contact
- [ ] Navigation rapide (spam clicks)
- [ ] Retour arrière navigateur
- [ ] Refresh pendant checkout
- [ ] Double-click boutons
- [ ] Très long scroll
- [ ] Copy/paste navigation
- [ ] Bookmarks fonctionnent

**Notes testeur:**
```
_____________________________________________
_____________________________________________
```

---

## VALIDATION FINALE

### Critères Go/No-Go Production:

**GO si:**
- ✅ 100% tests P0 passés
- ✅ ≥ 95% tests P1 passés
- ✅ ≥ 85% tests P2 passés
- ✅ 0 bugs critiques
- ✅ < 3 bugs majeurs
- ✅ Lighthouse Performance ≥ 90
- ✅ Lighthouse Accessibility ≥ 95
- ✅ WAVE 0 erreurs
- ✅ 5 devices testés OK
- ✅ 4 browsers OK

**NO-GO si:**
- ❌ Tests P0 < 100%
- ❌ Bugs critiques non résolus
- ❌ Performance < 80
- ❌ Accessibilité < 90
- ❌ Checkout cassé

---

## SIGNATURE & VALIDATION

**Tests effectués par:** _____________________

**Date:** _____________________

**Environnement:** _____________________

**Score global:** _______% tests passés

**Décision finale:** ☐ GO PRODUCTION  ☐ NO-GO (corrections requises)

**Prochaines étapes:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```

---

**Rapport créé par:** Agent 7 - Testing & QA
**Date création:** 10 Novembre 2024
**Version:** 1.0
**Na Nach Nachma Nachman MeUman!** 🚀
