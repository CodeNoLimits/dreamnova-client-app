# 📱 SYSTÈME DE QR CODE POUR PAIRING MOBILE

**Date:** 2025-01-27
**Fonctionnalité:** Scanner des documents depuis le téléphone même en mode desktop

---

## 🎯 FONCTIONNEMENT

### Sur Desktop :
1. L'utilisateur clique sur "Générer le QR code" dans le dashboard
2. Un QR code unique est généré avec une session temporaire (10 minutes)
3. Le QR code contient l'URL : `/mobile-scan?session={sessionId}`

### Sur Mobile :
1. L'utilisateur scanne le QR code avec l'appareil photo de son téléphone
2. Le téléphone ouvre automatiquement la page `/mobile-scan`
3. La session est automatiquement appairée
4. L'utilisateur peut scanner des documents depuis son téléphone
5. Les documents sont automatiquement synchronisés avec le compte desktop

---

## 🏗️ ARCHITECTURE

### Composants Créés

1. **`QRCodePairing.tsx`** - Composant pour générer et afficher le QR code
   - Génère une session via API
   - Affiche le QR code
   - Polling pour vérifier l'état de pairing
   - Écoute les uploads depuis mobile

2. **`mobile-scan/page.tsx`** - Page mobile dédiée au scan
   - S'ouvre automatiquement après scan du QR code
   - Utilise le composant `DocumentUpload` optimisé mobile
   - Synchronise automatiquement avec la session desktop

### API Routes Créées

1. **`/api/pairing/create-session`** - Crée une nouvelle session de pairing
   - Génère un UUID unique
   - Stocke dans `pairing_sessions` (expire après 10 min)
   - Retourne le `sessionId`

2. **`/api/pairing/check-session`** - Vérifie l'état d'une session
   - Vérifie si la session est appairée
   - Vérifie si la session a expiré
   - Retourne le statut

3. **`/api/pairing/pair-mobile`** - Appaire le mobile avec la session
   - Appelé automatiquement quand le mobile ouvre la page
   - Met à jour le statut de la session à "paired"

4. **`/api/pairing/get-uploads`** - Récupère les uploads depuis mobile
   - Polling depuis le desktop
   - Retourne les nouveaux documents scannés
   - Marque les uploads comme traités

5. **`/api/pairing/save-upload`** - Sauvegarde un upload depuis mobile
   - Appelé après chaque scan sur mobile
   - Enregistre dans `mobile_uploads` pour synchronisation

### Tables Supabase

1. **`pairing_sessions`**
   - `id` (UUID) - ID de session
   - `user_id` (UUID) - Utilisateur propriétaire
   - `status` (TEXT) - 'pending' | 'paired' | 'expired'
   - `mobile_device` (TEXT) - Info du device mobile
   - `paired_at` (TIMESTAMP) - Date de pairing
   - `expires_at` (TIMESTAMP) - Expiration (10 min)

2. **`mobile_uploads`**
   - `id` (UUID) - ID upload
   - `session_id` (UUID) - Session associée
   - `document_id` (UUID) - Document créé
   - `file_name`, `file_type`, `file_url`
   - `processed` (BOOLEAN) - Si déjà traité par desktop

---

## 🔄 FLUX DE DONNÉES

```
Desktop                          Mobile
  │                                │
  │─── POST /create-session ──────>│
  │<─── { sessionId } ─────────────│
  │                                │
  │ [Affiche QR Code]              │
  │                                │
  │                                │ [Scanne QR Code]
  │                                │
  │                                │─── GET /mobile-scan?session=xxx
  │                                │
  │                                │─── POST /pair-mobile
  │<─── { paired: true } ──────────│
  │                                │
  │ [Polling /check-session]      │
  │                                │
  │                                │ [Utilisateur scanne document]
  │                                │
  │                                │─── POST /documents/convert
  │                                │─── POST /pairing/save-upload
  │                                │
  │ [Polling /get-uploads]        │
  │<─── { uploads: [...] } ────────│
  │                                │
  │ [Affiche nouveau document]     │
```

---

## 📋 INSTRUCTIONS D'UTILISATION

### 1. Mettre à jour le schéma Supabase

Exécutez le script SQL mis à jour dans Supabase :
- Le script inclut maintenant les tables `pairing_sessions` et `mobile_uploads`
- Les politiques RLS sont configurées

### 2. Tester le système

1. **Sur Desktop :**
   - Connectez-vous au dashboard
   - Cliquez sur "Générer le QR code"
   - Le QR code s'affiche

2. **Sur Mobile :**
   - Ouvrez l'appareil photo
   - Scannez le QR code
   - La page mobile s'ouvre automatiquement
   - Autorisez l'accès à la caméra
   - Scannez un document

3. **Vérification :**
   - Le desktop devrait afficher "Téléphone connecté"
   - Après le scan mobile, le document apparaît sur le desktop

---

## ⚙️ CONFIGURATION

### Dépendances Installées

```json
{
  "qrcode.react": "^3.x",
  "uuid": "^9.x",
  "@types/uuid": "^9.x"
}
```

### Variables d'environnement

Aucune variable supplémentaire nécessaire. Le système utilise :
- Supabase (déjà configuré)
- Les routes API Next.js

---

## 🎨 DESIGN

- **QR Code :** 256x256px, niveau de correction H (haute)
- **Couleur :** Primary-600 (#6366F1)
- **Expiration :** 10 minutes
- **Polling :** Toutes les 2-3 secondes

---

## ⚠️ NOTES IMPORTANTES

1. **Sécurité :** Les sessions expirent après 10 minutes
2. **RLS :** Seul le propriétaire de la session peut voir ses uploads
3. **Performance :** Le polling peut être optimisé avec WebSockets (futur)
4. **Mobile :** Fonctionne sur tous les navigateurs modernes avec support caméra

---

## 🚀 AMÉLIORATIONS FUTURES

- [ ] WebSockets pour synchronisation temps réel (au lieu de polling)
- [ ] Notifications push quand un document est scanné
- [ ] Support multi-appareils (plusieurs téléphones connectés)
- [ ] Historique des sessions de pairing
- [ ] Expiration automatique des sessions inactives

---

**Le système est maintenant fonctionnel ! 🎉**

