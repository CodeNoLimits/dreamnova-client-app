# Guide de Configuration Multistreaming YouTube + TikTok

## Prérequis

### Matériel recommandé
- PC: CPU i5/Ryzen 5 minimum, 16GB RAM
- Upload: 15-20 Mbps minimum
- Webcam ou caméra

### Comptes nécessaires
- [ ] YouTube: Chaîne vérifiée (streaming activé)
- [ ] TikTok: 1000+ followers OU rejoindre un Creator Network

## Option 1: Streamlabs (Recommandé)

### Installation
```bash
# macOS
brew install --cask streamlabs-obs

# Windows
# Télécharger depuis https://streamlabs.com/
```

### Configuration Dual Output
1. Ouvrir Streamlabs Desktop
2. Aller dans Settings > Multistream
3. Activer YouTube + TikTok
4. Configurer "Dual Output" pour format vertical (TikTok)

### Avantages
- Interface simple
- Dual Output natif (horizontal YouTube + vertical TikTok)
- Un seul encodage → moins de charge CPU

## Option 2: OBS + Aitum Plugin (Gratuit)

### Installation OBS
```bash
# macOS
brew install --cask obs

# Installer Aitum Multistream Plugin
# https://obsproject.com/forum/resources/aitum-multistream.1991/
```

### Configuration
1. Télécharger Aitum Multistream depuis le forum OBS
2. Installer dans OBS > Tools > Scripts
3. Configurer chaque plateforme avec ses stream keys

### Stream Keys
**YouTube:**
1. YouTube Studio > Go Live > Stream
2. Copier la "Stream Key"

**TikTok:**
1. Aller sur https://livecenter.tiktok.com
2. Cliquer sur "LIVE Room" (si disponible)
3. Copier Server URL et Stream Key

## Option 3: Restream (Scheduler)

### Avantages
- Planification des streams
- Analytics cross-platform
- Chat unifié

### Configuration
1. Créer compte sur https://restream.io
2. Connecter YouTube et TikTok
3. Utiliser Restream Studio OU OBS avec RTMP Restream

## Script d'Automatisation

### Lancer un stream automatique
```bash
# Voir streaming-launcher.sh
./streaming-launcher.sh start
```

### Arrêter le stream
```bash
./streaming-launcher.sh stop
```

## Optimisation TikTok

### Format Vertical
TikTok préfère le format 9:16 (vertical)

Dans OBS:
1. Settings > Video
2. Base Resolution: 1080x1920
3. Output Resolution: 1080x1920

### Dual Scene (Horizontal + Vertical)
Utiliser Aitum Vertical Plugin pour:
- Scène principale: 1920x1080 (YouTube)
- Scène secondaire: 1080x1920 (TikTok)

## Automatisation Avancée

### Cron Job pour stream programmé
```bash
# Ajouter au crontab
# Streamer tous les jours à 20h
0 20 * * * /path/to/streaming-launcher.sh start

# Arrêter après 2 heures
0 22 * * * /path/to/streaming-launcher.sh stop
```

### Intégration DreamNova
Le streaming peut être utilisé pour:
- **DJ Suno**: Live AI music events
- **Breslev Content**: Enseignements quotidiens
- **Product Demos**: Présentation des Cash Machines

## Contenu Automatisé

### Sources de contenu
1. **Suno AI Music**: Générer musique live
2. **AI Avatar**: HeyGen/D-ID pour présentateur
3. **Clips préenregistrés**: Rotation automatique
4. **Chat IA**: Réponses automatiques aux commentaires

### Exemple: Stream Breslev 24/7
```
Source: Clips vidéo Saba Israel
Audio: Musique Breslev (Suno)
Overlay: Citations Rabbi Nachman
Chat Bot: Réponses spirituelles automatiques
```

## Troubleshooting

### Stream key TikTok non disponible
- Rejoindre un Creator Network
- Atteindre 1000 followers
- Vérifier l'âge (18+)

### Qualité dégradée
- Réduire bitrate: 3000-4500 kbps
- Utiliser x264 au lieu de hardware encoding
- Fermer applications en arrière-plan

### Décalage audio
- Settings > Audio > Sample Rate: 48kHz
- Sync Offset si nécessaire

---

## Ressources

- [Streamlabs Multistream](https://streamlabs.com/multistream)
- [Aitum Plugin](https://obsproject.com/forum/resources/aitum-multistream.1991/)
- [TikTok Live Center](https://livecenter.tiktok.com)
- [YouTube Live Dashboard](https://studio.youtube.com/channel/UC/livestreaming)

---

*DreamNova - Janvier 2026*
