# 🤖 SYSTÈME D'AUTOMATISATION - AGENTS

**Système réel d'automatisation pour les 10 agents**

## 🚀 DÉMARRAGE

### Mode interactif (voir les logs en direct)
```bash
cd agents
npm start
# ou
node worker.js
```

### Mode arrière-plan (daemon)
```bash
cd agents
npm run start:bg
# ou
./start-worker.sh background
```

## 🛑 ARRÊT

```bash
cd agents
npm run stop
# ou
./stop-worker.sh
```

## 📊 STATUT

```bash
cd agents
npm run status
# ou
./status-worker.sh
```

## 🔧 COMMENT ÇA FONCTIONNE

### 1. **Worker Principal** (`worker.js`)
- Surveille `agents-state.json` toutes les 10 secondes
- Détecte les changements de fichier
- Exécute automatiquement les agents pour les tâches "assigned"
- Met à jour l'état après chaque exécution
- Gère les logs dans `logs/`

### 2. **Système de Queue** (`queue.js`)
- File d'attente pour les tâches
- Priorisation des tâches
- Gestion des erreurs
- Nettoyage automatique

### 3. **Scripts de Gestion**
- `start-worker.sh` → Démarre le worker
- `stop-worker.sh` → Arrête le worker
- `status-worker.sh` → Affiche le statut

## 📝 LOGS

Les logs sont sauvegardés dans :
- `logs/YYYY-MM-DD.log` → Logs quotidiens
- `logs/worker.log` → Logs du worker (mode background)

## 🎯 UTILISATION

### 1. Assigner une tâche
Modifier `agents-state.json` :
```json
{
  "research": {
    "status": "active",
    "tasks": [
      {
        "id": 1234567890,
        "description": "Rechercher librairies en ligne",
        "status": "assigned"
      }
    ]
  }
}
```

### 2. Le worker détecte automatiquement
- Le worker surveille le fichier
- Détecte la nouvelle tâche "assigned"
- Exécute automatiquement `research/research-web.js`
- Met à jour le statut à "completed" ou "failed"

### 3. Voir les résultats
- Les fichiers sont créés automatiquement
- Les logs montrent le progrès
- L'état est mis à jour dans `agents-state.json`

## 🔄 CYCLE DE VIE D'UNE TÂCHE

1. **assigned** → Tâche assignée, en attente
2. **in_progress** → Tâche en cours d'exécution
3. **completed** → Tâche complétée avec succès
4. **failed** → Tâche échouée (erreur)

## 📊 MONITORING

### Voir le statut en temps réel
```bash
tail -f logs/$(date +%Y-%m-%d).log
```

### Voir les processus actifs
```bash
ps aux | grep worker.js
```

### Voir l'état des agents
```bash
cat agents-state.json | jq
```

## 🛠️ DÉVELOPPEMENT

### Ajouter un nouvel agent

1. Créer le dossier `agents/nouvel-agent/`
2. Créer `agents/nouvel-agent/nouvel-agent.js` avec :
```javascript
class NouvelAgent {
  async execute(task) {
    // Code de l'agent
  }
}

if (require.main === module) {
  const agent = new NouvelAgent();
  agent.execute();
}

module.exports = NouvelAgent;
```

3. Ajouter dans `worker.js` :
```javascript
case 'nouvel-agent':
  scriptPath = path.join(agentPath, 'nouvel-agent.js');
  break;
```

## ⚠️ NOTES IMPORTANTES

- Le worker doit tourner en continu pour l'automatisation
- Les scripts des agents doivent être exécutables avec Node.js
- Les logs sont essentiels pour le debugging
- Le fichier `agents-state.json` est la source de vérité

## 🎉 AVANTAGES

✅ **Vraie automatisation** - Les agents s'exécutent automatiquement
✅ **Surveillance continue** - Détection automatique des nouvelles tâches
✅ **Gestion des erreurs** - Retry et logging automatiques
✅ **Monitoring** - Statut en temps réel
✅ **Scalable** - Facile d'ajouter de nouveaux agents

---

**Système d'automatisation réel et fonctionnel! 🚀**

