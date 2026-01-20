#!/bin/bash

# ============================================
# DreamNova Streaming Launcher
# Multistream to YouTube + TikTok
# ============================================

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/streaming.log"
PID_FILE="$SCRIPT_DIR/streaming.pid"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

check_dependencies() {
    log "Checking dependencies..."

    # Check for ffmpeg (needed for some streaming setups)
    if ! command -v ffmpeg &> /dev/null; then
        warn "ffmpeg not found. Install with: brew install ffmpeg"
    fi

    # Check for OBS
    if [[ -d "/Applications/OBS.app" ]]; then
        log "OBS found"
    else
        warn "OBS not found. Install from https://obsproject.com"
    fi

    # Check for Streamlabs
    if [[ -d "/Applications/Streamlabs Desktop.app" ]]; then
        log "Streamlabs found"
    else
        warn "Streamlabs not found. Install from https://streamlabs.com"
    fi
}

start_obs() {
    log "Starting OBS..."

    if [[ -d "/Applications/OBS.app" ]]; then
        open -a "OBS"
        sleep 3
        log "OBS started"
    else
        error "OBS not installed"
        exit 1
    fi
}

start_streamlabs() {
    log "Starting Streamlabs..."

    if [[ -d "/Applications/Streamlabs Desktop.app" ]]; then
        open -a "Streamlabs Desktop"
        sleep 3
        log "Streamlabs started"
    else
        error "Streamlabs not installed"
        exit 1
    fi
}

start_stream() {
    local app="${1:-obs}"

    log "Starting stream with $app..."

    case "$app" in
        obs)
            start_obs
            ;;
        streamlabs)
            start_streamlabs
            ;;
        *)
            error "Unknown app: $app"
            exit 1
            ;;
    esac

    echo $$ > "$PID_FILE"
    log "Stream launcher started (PID: $$)"
}

stop_stream() {
    log "Stopping stream..."

    # Stop OBS
    pkill -f "OBS" 2>/dev/null || true

    # Stop Streamlabs
    pkill -f "Streamlabs" 2>/dev/null || true

    # Remove PID file
    rm -f "$PID_FILE"

    log "Stream stopped"
}

status() {
    echo ""
    echo "=== DreamNova Streaming Status ==="
    echo ""

    # Check OBS
    if pgrep -f "OBS" > /dev/null; then
        echo -e "OBS: ${GREEN}Running${NC}"
    else
        echo -e "OBS: ${RED}Stopped${NC}"
    fi

    # Check Streamlabs
    if pgrep -f "Streamlabs" > /dev/null; then
        echo -e "Streamlabs: ${GREEN}Running${NC}"
    else
        echo -e "Streamlabs: ${RED}Stopped${NC}"
    fi

    echo ""
}

show_help() {
    echo ""
    echo "DreamNova Streaming Launcher"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  start [obs|streamlabs]  Start streaming app (default: obs)"
    echo "  stop                    Stop all streaming apps"
    echo "  status                  Show streaming status"
    echo "  check                   Check dependencies"
    echo "  help                    Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 start               Start OBS"
    echo "  $0 start streamlabs    Start Streamlabs"
    echo "  $0 stop                Stop streaming"
    echo ""
}

# Main
case "${1:-help}" in
    start)
        check_dependencies
        start_stream "${2:-obs}"
        ;;
    stop)
        stop_stream
        ;;
    status)
        status
        ;;
    check)
        check_dependencies
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
