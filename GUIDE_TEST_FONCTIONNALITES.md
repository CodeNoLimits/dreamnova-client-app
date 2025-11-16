# 🧪 GUIDE DE TEST DES FONCTIONNALITÉS

**Date:** 2025-01-27  
**Pour:** Tests utilisateur

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Connexion Testeur

1. Aller sur **http://localhost:3000/login**
2. Cliquer sur **"Se connecter en mode Testeur (Growth)"**
3. ✅ Vous êtes automatiquement connecté avec plan Growth
4. ✅ Redirection vers `/dashboard`

---

## 📋 FONCTIONNALITÉS À TESTER

### ✅ 1. Faire un Audit

**Où trouver:**
- **Dashboard** → Section "Actions rapides" → Bouton **"Nouvel audit"**
- **Page d'accueil** → Bouton **"Démarrer l'audit gratuit"**

**Test:**
1. Cliquer sur "Nouvel audit"
2. Remplir le formulaire d'audit
3. Vérifier que l'audit se sauvegarde
4. Vérifier que vous restez connecté après l'audit
5. Refaire un autre audit (sans se déconnecter)

**URLs:**
- `/audit` - Page d'audit
- `/audit-results` - Résultats de l'audit

---

### ✅ 2. Boutons Bleus de la Checklist

**Où trouver:**
- **Dashboard** → Section "Checklist de Conformité"

**Boutons à tester:**

1. **"Faire un audit"** → `/audit`
2. **"Voir les offres"** → `/pricing`
3. **"Configurer PDP"** → Scroll vers section `#pdp-integration`
4. **"Configurer Factur-X"** → Scroll vers section `#document-upload`
5. **"Accéder à la formation"** → `/formation`
6. **"Tester"** → Scroll vers section `#test-flow`
7. **"Configurer" (Archivage)** → Scroll vers section `#archivage`
8. **"Configurer" (E-reporting)** → Scroll vers section `#e-reporting`

**Test:**
- Cliquer sur chaque bouton
- Vérifier que la navigation fonctionne
- Vérifier que les sections s'affichent correctement

---

### ✅ 3. Upload de Documents

**Où trouver:**
- **Dashboard** → Section `#document-upload`

**Test:**
1. Cliquer sur "Configurer Factur-X" dans la checklist
2. OU aller directement à `/dashboard#document-upload`
3. Uploader un PDF
4. Vérifier que la conversion Factur-X fonctionne
5. Vérifier que le document est sauvegardé

---

### ✅ 4. QR Code Pairing (Mobile)

**Où trouver:**
- **Dashboard** → Section `#pdp-integration`

**Test:**
1. Cliquer sur "Configurer PDP" dans la checklist
2. Générer un QR code
3. Scanner avec votre téléphone
4. Uploader un document depuis mobile
5. Vérifier que le document apparaît sur desktop

---

### ✅ 5. Génération PDF

**Où trouver:**
- **Dashboard** → Section "Actions rapides" → **"Télécharger PDF"**
- **Page résultats audit** → Bouton **"Télécharger PDF"**

**Test:**
1. Faire un audit
2. Aller sur `/audit-results`
3. Cliquer sur "Télécharger PDF"
4. Vérifier que le PDF se génère (10 pages)
5. Vérifier que toutes les informations sont présentes

---

### ✅ 6. Session Persistante

**Test:**
1. Se connecter en mode Testeur
2. Faire un audit
3. Naviguer entre les pages
4. Fermer l'onglet
5. Rouvrir l'onglet → Vérifier que vous êtes toujours connecté
6. Faire un autre audit → Vérifier que vous restez connecté

---

## 🎯 CHECKLIST DE TEST

- [ ] Connexion Testeur fonctionne
- [ ] Bouton "Nouvel audit" visible et fonctionnel
- [ ] Audit se complète sans erreur
- [ ] Session persiste après audit
- [ ] Peut faire plusieurs audits sans se déconnecter
- [ ] Tous les boutons bleus de la checklist fonctionnent
- [ ] Upload documents fonctionne
- [ ] QR Code pairing fonctionne
- [ ] Génération PDF fonctionne
- [ ] Navigation fluide entre les pages

---

## 🔍 URLS IMPORTANTES

- **Accueil:** http://localhost:3000/
- **Login:** http://localhost:3000/login
- **Dashboard:** http://localhost:3000/dashboard
- **Audit:** http://localhost:3000/audit
- **Résultats:** http://localhost:3000/audit-results
- **Pricing:** http://localhost:3000/pricing
- **Réglementation:** http://localhost:3000/reglementation
- **Formation:** http://localhost:3000/formation

---

## 💡 NOTES

- ✅ **Toutes les fonctionnalités sont RÉELLES** (pas de mocks)
- ✅ **Bouton Testeurs** crée automatiquement un compte Growth
- ✅ **Session persiste** 7 jours (cookies configurés)
- ✅ **Boutons checklist** pointent vers des sections réelles

---

**Document créé par Cursor - 2025-01-27**

