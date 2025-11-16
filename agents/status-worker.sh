#!/bin/bash
# Script pour voir le statut du worker
# Usage: ./status-worker.sh

WORKER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$WORKER_DIR/worker.pid"

if [ ! -f "$PID_FILE" ]; then
    echo "❌ Worker n'est pas en cours d'exécution"
    exit 1
fi

PID=$(cat "$PID_FILE")

if ! ps -p "$PID" > /dev/null 2>&1; then
    echo "❌ Processus n'existe plus (PID: $PID)"
    rm "$PID_FILE"
    exit 1
fi

echo "✅ Worker en cours d'exécution (PID: $PID)"
echo ""
echo "📊 Statut détaillé:"
node -e "
const AgentWorker = require('./worker.js');
const worker = new AgentWorker();
const status = worker.getStatus();
console.log(JSON.stringify(status, null, 2));
"

