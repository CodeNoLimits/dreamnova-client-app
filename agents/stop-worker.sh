#!/bin/bash
# Script d'arrêt du worker
# Usage: ./stop-worker.sh

WORKER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$WORKER_DIR/worker.pid"

if [ ! -f "$PID_FILE" ]; then
    echo "⚠️  Worker n'est pas en cours d'exécution"
    exit 1
fi

PID=$(cat "$PID_FILE")

if ! ps -p "$PID" > /dev/null 2>&1; then
    echo "⚠️  Processus n'existe plus (PID: $PID)"
    rm "$PID_FILE"
    exit 1
fi

echo "🛑 Arrêt du worker (PID: $PID)..."
kill "$PID"

# Attendre l'arrêt
for i in {1..10}; do
    if ! ps -p "$PID" > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

# Forcer l'arrêt si nécessaire
if ps -p "$PID" > /dev/null 2>&1; then
    echo "⚠️  Forçage de l'arrêt..."
    kill -9 "$PID"
fi

rm "$PID_FILE"
echo "✅ Worker arrêté"

