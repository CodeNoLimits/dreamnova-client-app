#!/bin/bash
# Script de démarrage du worker
# Usage: ./start-worker.sh [background]

WORKER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKER_SCRIPT="$WORKER_DIR/worker.js"
PID_FILE="$WORKER_DIR/worker.pid"
LOG_FILE="$WORKER_DIR/logs/worker.log"

# Créer dossier logs si nécessaire
mkdir -p "$WORKER_DIR/logs"

# Vérifier si le worker est déjà en cours
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p "$PID" > /dev/null 2>&1; then
        echo "⚠️  Worker déjà en cours (PID: $PID)"
        exit 1
    else
        # PID file existe mais processus n'existe plus
        rm "$PID_FILE"
    fi
fi

# Démarrer le worker
if [ "$1" == "background" ] || [ "$1" == "bg" ]; then
    echo "🚀 Démarrage du worker en arrière-plan..."
    nohup node "$WORKER_SCRIPT" > "$LOG_FILE" 2>&1 &
    PID=$!
    echo $PID > "$PID_FILE"
    echo "✅ Worker démarré (PID: $PID)"
    echo "📝 Logs: $LOG_FILE"
    echo "🛑 Pour arrêter: ./stop-worker.sh"
else
    echo "🚀 Démarrage du worker en mode interactif..."
    node "$WORKER_SCRIPT"
fi

