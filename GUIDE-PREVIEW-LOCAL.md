# 🖥️ GUIDE PREVIEW LOCAL - BRESLEV BOOKS

**Serveur actif sur:** http://localhost:8000

---

## 📍 PAGES DISPONIBLES POUR TESTER

### 1. Page d'accueil
**URL:** http://localhost:8000/

**Ce que tu verras:**
- ✅ Hero section avec titre "La Sagesse de Rabbi Nachman"
- ✅ Animation glow dorée
- ✅ 2 boutons CTA (Explorer / S'abonner)
- ✅ Catalogue de 6 livres avec cartes produits
- ✅ Section abonnement en bas

**Produits affichés:**
1. Chemot Hatsadikim - 25€
2. La Vie d'un Breslever - 32€
3. Likoutey Moharane Tome 1 - 35€
4. Sippurei Maasiyot - 28€
5. Tikoun Phonétique - 18€
6. Likoutey Tefilot - 22€

---

### 2. Collection complète
**URL:** http://localhost:8000/collections/all

**Ce que tu verras:**
- ✅ Titre "Livres de Rabbi Nachman"
- ✅ Description de la collection
- ✅ Barre de filtres (Tous / Livres / Brochures / Numériques / Packs)
- ✅ Tri par prix, titre, nouveauté
- ✅ Grid de produits responsive
- ✅ Pagination

---

### 3. Page produit individuelle
**URL:** http://localhost:8000/products/1

**Ce que tu verras:**
- ✅ Galerie d'images produit
- ✅ Titre + auteur + description
- ✅ Prix et options (physique/numérique/bundle)
- ✅ Informations de livraison (IL/FR/CA)
- ✅ Bouton "Ajouter au panier"
- ✅ Section recommandations produits similaires

**Autres produits à tester:**
- /products/2 (La Vie d'un Breslever)
- /products/3 (Likoutey Moharane)
- /products/4 (Sippurei Maasiyot)
- /products/5 (Tikoun Phonétique)
- /products/6 (Likoutey Tefilot)

---

### 4. Page abonnement
**URL:** http://localhost:8000/pages/abonnement

**Ce que tu verras:**
- ✅ 2 plans abonnement Sky Pilot
- ✅ Mensuel: 29€/mois (essai 7 jours)
- ✅ Annuel: 279€/an (essai 14 jours)
- ✅ Comparaison des avantages
- ✅ Boutons d'inscription

---

## 🎨 ÉLÉMENTS À VÉRIFIER

### Design & Couleurs
- [ ] Palette Breslev (bleu royal #1a237e, or sacré #ffd700)
- [ ] Animation glow sur hero
- [ ] Hover effects sur cartes produits
- [ ] Responsive mobile (redimensionner navigateur)
- [ ] Typographie lisible

### Fonctionnalités
- [ ] Filtres collection fonctionnent
- [ ] Tri par prix/titre fonctionne
- [ ] Boutons "Ajouter au panier" cliquables
- [ ] Navigation entre pages fluide
- [ ] Badges (nouveau, digital, promo) visibles

### Contenu
- [ ] Descriptions produits complètes
- [ ] Prix affichés correctement
- [ ] Images placeholder présentes
- [ ] Infos livraison visibles

---

## 🔧 ACTIONS DISPONIBLES

### Arrêter le serveur:
```bash
Ctrl+C dans le terminal
```

### Relancer le serveur:
```bash
cd "/Users/codenolimits-dreamai-nanach/Desktop/ESTHER IFRA/breslev-shopify-complete"
npm start
```

### Modifier le contenu:
- Éditer `server-local.js` ligne 11-92 (mockProducts)
- Relancer le serveur après modifications

---

## 📝 FEEDBACK À DONNER

Quand tu testes le site, note:

1. **Design:**
   - Couleurs OK ou à modifier?
   - Typographie lisible?
   - Espacements corrects?

2. **Structure:**
   - Navigation claire?
   - Informations bien placées?
   - Appels à l'action visibles?

3. **Contenu:**
   - Descriptions appropriées?
   - Prix bien affichés?
   - Manque-t-il des éléments?

4. **Améliorations:**
   - Qu'est-ce qui devrait être ajouté?
   - Qu'est-ce qui devrait être changé?
   - Fonctionnalités manquantes?

---

## ⚠️ LIMITATIONS DU PREVIEW LOCAL

**Ce qui NE fonctionne PAS en local:**
- ❌ FlipHTML5 lecteur numérique (besoin licence)
- ❌ LemonInk watermarking (besoin API)
- ❌ Sky Pilot abonnements (besoin app Shopify)
- ❌ Vrai panier d'achat
- ❌ Checkout Shopify
- ❌ Multi-devises réel

**Ce qui FONCTIONNE:**
- ✅ Design et mise en page complète
- ✅ Navigation entre pages
- ✅ Structure et contenu
- ✅ Responsive mobile/tablet/desktop
- ✅ Animations CSS
- ✅ Filtres et tri (simulation)

---

## 🚀 PROCHAINE ÉTAPE

Après validation du design en local:
1. Upload sur Shopify via CLI
2. Installation des apps (FlipHTML5, LemonInk, Sky Pilot)
3. Configuration API keys
4. Import des vrais 30 produits
5. Tests complets en production

---

**Na Nach! Teste tout ça et dis-moi ce qu'il faut améliorer! 🎉**

---

**Dernière mise à jour:** 9 Novembre 2024
**Serveur actif:** ✅ Port 8000
