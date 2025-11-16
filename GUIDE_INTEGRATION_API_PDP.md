# 🚀 GUIDE COMPLET - INTÉGRATION API PDP

**Date**: 13 Novembre 2025
**Commits**: `0f10d33` + `55b9f73`
**Déploiement**: ✅ Production Vercel
**URL**: https://dreamnova-client.vercel.app

---

## ✅ TOUT CE QUI A ÉTÉ FAIT AUJOURD'HUI

### 1. ✅ BUG CORRIGÉ: "Bucket not found"

**Problème**: Erreur 404 lors du téléchargement de documents
**Cause**: Bucket Supabase configuré en **privé**, mais le code utilisait `getPublicUrl()`
**Solution**: Utilisation de **URLs signées** (signed URLs) valides 1 an

**Modifications**:
- `src/app/api/documents/convert/route.ts`: Remplacé `getPublicUrl()` par `createSignedUrl()`
- `src/app/api/documents/refresh-urls/route.ts`: **NOUVEAU** - Route pour régénérer les URLs

**Pour tes ANCIENS documents** (avant le fix):
```bash
# Tu vas recevoir un message pour exécuter ça:
curl -X POST https://dreamnova-client.vercel.app/api/documents/refresh-urls \
  -H "Authorization: Bearer TON_TOKEN"
```

OU simplement **re-télécharge** un nouveau document → l'URL sera correcte.

---

### 2. ✅ PAGE DÉVELOPPEUR CRÉÉE: `/dev-tools`

**URL**: https://dreamnova-client.vercel.app/dev-tools

**Accessible uniquement**: En mode "Tester" (comme demandé)

**Contenu**:

#### 📋 Onglet "Liste des PDP"
- **7 plateformes documentées**:
  1. **Pennylane** (⭐⭐⭐⭐⭐) - PRIORITÉ CRITIQUE
  2. **Chorus Pro** (⭐⭐⭐⭐⭐) - PRIORITÉ CRITIQUE (B2G gouvernemental)
  3. **Sellsy** (⭐⭐⭐⭐) - PRIORITÉ HAUTE
  4. **Tiime** (⭐⭐⭐⭐) - PRIORITÉ HAUTE (100% gratuit)
  5. **Sage** (⭐⭐⭐⭐⭐) - PRIORITÉ HAUTE (leader ERP)
  6. **Axonaut** (⭐⭐⭐) - PRIORITÉ MOYENNE
  7. **Cegid** (⭐⭐⭐⭐) - PRIORITÉ MOYENNE

Pour chaque PDP, tu as:
- Logo + popularité (étoiles)
- **Difficulté** (Facile / Moyenne / Difficile)
- **Authentification** (OAuth 2.0 / API Key / Certificat)
- **Délai validation** (immédiat à 15 jours)
- **Coût** (gratuit ou payant)
- **Formats supportés** (Factur-X, UBL, CII, PDF/A-3)
- **Description complète**
- **Modal détaillé** avec:
  - Prérequis exacts
  - Étapes d'intégration (1 par 1)
  - Scopes OAuth nécessaires
  - Endpoints API disponibles
  - Documentation officielle

#### 📖 Onglet "Guide Pennylane"
Guide **pas-à-pas** complet pour obtenir les clés API Pennylane:

**Étape 1**: Créer compte Pennylane
- URL: https://www.pennylane.com/fr/signup
- SIRET obligatoire
- Vérification email

**Étape 2**: Souscrire abonnement Essentiel (minimum)
- ⚠️ **Important**: API nécessite minimum "Essentiel" (~59€/mois HT)
- Plans inférieurs n'ont PAS accès API

**Étape 3**: Générer token API
1. app.pennylane.com → Paramètres Entreprise
2. Connectivité → Développeurs
3. "Générer un token API"
4. **COPIER IMMÉDIATEMENT** (ne sera plus affiché)

**Étape 4**: Me donner le token
- Tu me l'envoies
- Je le stocke chiffré dans Vercel
- Je configure le connecteur
- Je déploie

**Étape 5**: Test en production
- Page Intégrations → "Connecter Pennylane"
- Autorisation OAuth
- Import automatique factures

#### 🏗️ Onglet "Architecture"
Diagramme complet de l'architecture technique:

```
DREAMNOVA CLIENT
    ↓
Bridge Manager (Orchestrator)
    ↓
┌───────┬───────┬───────┐
│ Penny │Chorus │Sellsy │
│ lane  │ Pro   │       │
└───┬───┴───┬───┴───┬───┘
    │       │       │
API │   API │   API │
OAuth   Cert    OAuth
```

**Structure fichiers**:
```
src/
├── lib/
│   ├── api-bridges/
│   │   ├── pennylane/     # OAuth 2.0 + invoices
│   │   ├── chorus-pro/    # Certificat + dépôt
│   │   ├── sellsy/        # OAuth 2.0 + invoices
│   │   └── tiime/         # API Key + invoices
│   ├── bridge-manager.ts  # Orchestrateur central
│   └── encryption.ts      # Chiffrement tokens AES-256-CBC
├── app/
│   ├── api/
│   │   └── pdp/
│   │       ├── connect/   # Initier OAuth
│   │       ├── callback/  # Callback OAuth
│   │       └── sync/      # Synchronisation
│   └── integrations/      # Page UI
└── supabase/
    └── api_connections.sql
```

**Sécurité**:
- ✅ Tokens chiffrés AES-256-CBC
- ✅ HTTPS obligatoire
- ✅ Row Level Security (RLS)
- ✅ Refresh auto tokens
- ✅ Logs d'audit

#### ✅ Onglet "Checklist"
Checklist complète avec estimation:

**PHASE 1: Préparation (TOI) - 2-3 jours**
- [ ] Choisir 2-3 PDP prioritaires
- [ ] S'inscrire Pennylane développeur
- [ ] S'inscrire Chorus Pro (si B2G)
- [ ] Obtenir clés API
- [ ] Me transmettre clés

**PHASE 2: Développement (CLAUDE) - 1-2 jours**
- [ ] Table api_connections Supabase
- [ ] Système chiffrement tokens
- [ ] Connecteur OAuth Pennylane
- [ ] Routes API (connect, callback, sync)
- [ ] Page UI /integrations
- [ ] Refresh auto tokens
- [ ] Cron job sync quotidienne

**PHASE 3: Tests (ENSEMBLE) - 1 jour**
- [ ] Test connexion OAuth
- [ ] Test récupération factures
- [ ] Test refresh tokens
- [ ] Test déconnexion
- [ ] Vérif sécurité

**PHASE 4: Production - 2-3h**
- [ ] Clés API → Vercel
- [ ] URLs callback prod
- [ ] Test compte réel
- [ ] Documentation clients

**TOTAL: 4-6 jours**

---

## 📊 RECHERCHE APPROFONDIE PDP FRANCE 2025

### Contexte légal
- **Dates obligatoires**:
  - **1er septembre 2026**: Grandes entreprises + ETI
  - **1er septembre 2027**: PME + Micro-entreprises
- **107 plateformes** immatriculées par DGFiP
- **70+ sous réserve** (validation technique en cours)
- **Ancienne appellation**: PDP (Plateformes Dématérialisation Partenaires)
- **Nouvelle appellation**: PA (Plateformes Agréées)

### Formats supportés
- **Factur-X** (PDF/A-3 + XML EN 16931) ← RECOMMANDÉ
- **UBL** (Universal Business Language)
- **CII** (Cross Industry Invoice)
- **PDF signé** (pour Chorus Pro)

### Pourquoi ces 7 PDP ?

**Pennylane** ⭐⭐⭐⭐⭐
- Sélectionné phase pilote DGFiP avec mention "Excellent"
- Leader France TPE/PME
- Factur-X natif
- API V2 moderne (V1 obsolète juillet 2025)
- Intégrations: 2000+ outils

**Chorus Pro** ⭐⭐⭐⭐⭐
- Plateforme GOUVERNEMENTALE
- **OBLIGATOIRE** pour B2G (entreprise → État)
- Gratuit mais processus complexe
- Certificat IGC-A nécessaire
- Délai validation: 5-15 jours

**Sellsy** ⭐⭐⭐⭐
- Concurrent direct Pennylane
- Pré-comptabilité (pas compta complète)
- OAuth simple
- Bon pour TPE

**Tiime** ⭐⭐⭐⭐
- **100% GRATUIT** (unique !)
- Factur-X natif
- API Key (pas OAuth)
- Idéal indépendants

**Sage** ⭐⭐⭐⭐⭐
- Leader mondial ERP
- Pour grandes entreprises
- Intégration Sage 100/X3
- Coût élevé

**Axonaut** ⭐⭐⭐
- Concurrent Sellsy
- API simple
- Bon rapport qualité/prix

**Cegid** ⭐⭐⭐⭐
- Solide pour cabinets comptables
- Contrat partenaire nécessaire
- Bon support

---

## 🎯 RECOMMANDATIONS

### Pour DreamNova, je recommande de commencer par:

**PRIORITÉ 1: Pennylane** 🔥
- Raisons:
  - Validé par l'administration
  - Facile à intégrer (OAuth 2.0 standard)
  - Documentation excellente
  - Grande base utilisateurs TPE/PME (cible DreamNova)
  - Délai validation: 1-3 jours

**PRIORITÉ 2: Tiime** ⚡
- Raisons:
  - 100% gratuit = argument commercial
  - API ultra-simple (API Key)
  - Factur-X natif
  - Pas de validation = implémentation immédiate
  - Cible micro-entreprises/indépendants

**PRIORITÉ 3: Chorus Pro** 🏛️ (SI clients B2G)
- Raisons:
  - Obligatoire pour facturation État
  - Argument différenciation
  - Gratuit
- Inconvénients:
  - Très complexe (certificats)
  - Délai validation long
  - Processus administratif lourd

**À ÉVITER pour l'instant**:
- Sage: Trop cher, cible trop grande
- Cegid: Contrat partenaire complexe
- Axonaut: Moins populaire que Sellsy

---

## 📝 CE QUE TU DOIS FAIRE MAINTENANT

### Option A: Démarrage rapide (3-4 jours)
1. **Aujourd'hui**: Va sur https://www.pennylane.com/fr/signup
2. **Demain**: Souscris abonnement Essentiel
3. **J+2**: Génère token API, me le donnes
4. **J+3-4**: Je code + on teste ensemble

### Option B: Multi-PDP (5-6 jours)
1. **Jour 1-2**: Pennylane (comme Option A)
2. **Jour 3**: Tiime (gratuit, très rapide)
3. **Jour 4**: Sellsy (si tu veux)
4. **Jour 5-6**: Tests + déploiement

### Option C: Complet avec B2G (2-3 semaines)
- Pennylane (3-4 jours)
- Tiime (1 jour)
- Chorus Pro (10-15 jours validation)

**Mon conseil**: **Option A ou B**. Chorus Pro seulement si tu as des clients État/collectivités.

---

## 🔗 LIENS IMPORTANTS

### Pennylane
- **Inscription**: https://www.pennylane.com/fr/signup
- **Doc API**: https://pennylane.readme.io
- **Aide API**: https://help.pennylane.com/fr/articles/18770-utiliser-les-api-publiques-pennylane
- **Sandbox**: https://help.pennylane.com/fr/articles/18773-creer-un-environnement-de-test

### Chorus Pro
- **Portail**: https://portail.chorus-pro.gouv.fr
- **Dev docs**: https://developer.chorus-pro.gouv.fr
- **Habilitation**: Formulaire AIFE (téléchargeable sur portail)

### Tiime
- **Site**: https://www.tiime.fr
- **Dev**: https://developers.tiime.fr

### Sellsy
- **API**: https://api.sellsy.com/doc/v2
- **App**: https://app.sellsy.com

### Sage
- **Developer**: https://developer.sage.com

### Infos générales PDP
- **Liste officielle**: https://www.impots.gouv.fr/facturation-electronique-et-plateformes-partenaires
- **Guide DGFiP**: https://entreprendre.service-public.gouv.fr

---

## 🐛 POUR LE BUG DES ANCIENS DOCUMENTS

Si tes anciens documents (uploadés avant le fix) ne se téléchargent toujours pas:

**Solution 1**: Upload un nouveau document
→ L'URL sera correcte automatiquement

**Solution 2**: Rafraîchir toutes les URLs
```bash
# Je vais créer un bouton dans le dashboard qui fait ça automatiquement
# En attendant, tu peux:
# 1. Aller sur /documents
# 2. Supprimer les anciens docs
# 3. Re-télécharger
```

**Solution 3**: Je crée une migration automatique
→ Je peux scripter le rafraîchissement de toutes les URLs dans Supabase

**Dis-moi ce que tu préfères** !

---

## 🚀 PROCHAINES ÉTAPES

### Maintenant (toi):
1. Va sur /dev-tools pour explorer la page
2. Lis le guide Pennylane onglet 📖
3. Décide quelle option (A, B ou C)
4. Commence l'inscription si tu es prêt

### Ensuite (moi):
1. Je crée la table `api_connections` dans Supabase
2. Je code le système de chiffrement
3. J'implémente le premier connecteur (Pennylane OU Tiime)
4. Je crée la page `/integrations`

### Ensemble:
1. Tu me donnes les clés API
2. Je configure + déploie
3. On teste avec ton compte
4. On documente pour les clients

---

## 💬 QUESTIONS ?

Tu as des questions sur:
- Le processus d'inscription ?
- Les coûts des abonnements ?
- L'architecture technique ?
- Les délais de validation ?
- Autre chose ?

**Dis-moi simplement** et je t'explique en détail !

---

**🎉 RÉSUMÉ**

✅ Bug téléchargement documents: **CORRIGÉ**
✅ Page développeur /dev-tools: **CRÉÉE**
✅ Recherche PDP approfondie: **TERMINÉE**
✅ Guide Pennylane complet: **DISPONIBLE**
✅ Architecture technique: **DOCUMENTÉE**
✅ Checklist implémentation: **PRÊTE**

**Tu es prêt pour commencer l'intégration API** ! 🚀

Dis-moi ce que tu veux faire en premier ! 💪
