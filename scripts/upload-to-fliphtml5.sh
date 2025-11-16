#!/bin/bash

# 📚 SCRIPT D'UPLOAD AUTOMATIQUE VERS FLIPHTML5
# Utilise l'API FlipHTML5 pour uploader tous les PDFs

set -e

# Couleurs pour output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  📚 UPLOAD PDFS VERS FLIPHTML5           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Configuration
API_KEY="YOUR_FLIPHTML5_API_KEY"
API_ENDPOINT="https://api.fliphtml5.com/v1"
PDF_DIR="./public/pdfs"
MAPPING_FILE="./config/fliphtml5-mapping.json"

# Vérifier si l'API key est configurée
if [ "$API_KEY" == "YOUR_FLIPHTML5_API_KEY" ]; then
    echo -e "${RED}❌ Erreur: API KEY non configurée${NC}"
    echo "Éditez ce script et remplacez YOUR_FLIPHTML5_API_KEY"
    exit 1
fi

# Vérifier si le dossier PDFs existe
if [ ! -d "$PDF_DIR" ]; then
    echo -e "${RED}❌ Erreur: Dossier $PDF_DIR introuvable${NC}"
    exit 1
fi

# Compteurs
TOTAL=0
SUCCESS=0
FAILED=0

# Fonction d'upload d'un PDF
upload_pdf() {
    local pdf_file=$1
    local pdf_name=$(basename "$pdf_file" .pdf)

    echo -e "${BLUE}📤 Upload: $pdf_name...${NC}"

    # Upload vers FlipHTML5
    response=$(curl -s -X POST "$API_ENDPOINT/upload" \
        -H "Authorization: Bearer $API_KEY" \
        -F "file=@$pdf_file" \
        -F "title=$pdf_name" \
        -F "drm_enabled=true" \
        -F "watermark_enabled=true" \
        -F "download_disabled=true" \
        -F "print_disabled=true")

    # Vérifier succès
    if echo "$response" | grep -q '"status":"success"'; then
        fliphtml5_id=$(echo "$response" | jq -r '.data.id')
        book_id=$(echo "$response" | jq -r '.data.book_id')
        embed_url=$(echo "$response" | jq -r '.data.embed_url')

        echo -e "${GREEN}✅ Succès: $pdf_name${NC}"
        echo "   ID: $fliphtml5_id"
        echo "   Book ID: $book_id"
        echo "   URL: $embed_url"
        echo ""

        # Mettre à jour le mapping JSON
        update_mapping "$pdf_name" "$fliphtml5_id" "$book_id" "$embed_url"

        ((SUCCESS++))
    else
        echo -e "${RED}❌ Échec: $pdf_name${NC}"
        echo "   Réponse API: $response"
        echo ""
        ((FAILED++))
    fi

    ((TOTAL++))
}

# Fonction de mise à jour du mapping
update_mapping() {
    local name=$1
    local flip_id=$2
    local book_id=$3
    local url=$4

    # Utiliser jq pour mettre à jour le JSON
    jq --arg name "$name" \
       --arg flip_id "$flip_id" \
       --arg book_id "$book_id" \
       --arg url "$url" \
       '.books[$name].fliphtml5_id = $flip_id |
        .books[$name].book_id = $book_id |
        .books[$name].embed_url = $url' \
       "$MAPPING_FILE" > "${MAPPING_FILE}.tmp"

    mv "${MAPPING_FILE}.tmp" "$MAPPING_FILE"
}

# Uploader tous les PDFs du dossier
echo "🔍 Recherche des PDFs dans $PDF_DIR..."
echo ""

# Livres principaux
for pdf in "$PDF_DIR"/*.pdf; do
    if [ -f "$pdf" ]; then
        upload_pdf "$pdf"
        sleep 2 # Pause pour éviter rate limiting
    fi
done

# Brochures
if [ -d "$PDF_DIR/brochures" ]; then
    for pdf in "$PDF_DIR/brochures"/*.pdf; do
        if [ -f "$pdf" ]; then
            upload_pdf "$pdf"
            sleep 2
        fi
    done
fi

# Résumé
echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Succès: $SUCCESS / $TOTAL${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Échecs: $FAILED / $TOTAL${NC}"
fi
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

if [ $SUCCESS -gt 0 ]; then
    echo "📝 Le fichier $MAPPING_FILE a été mis à jour"
    echo "🔗 Les embed URLs sont maintenant disponibles"
    echo ""
    echo "Prochaine étape:"
    echo "  1. Vérifier les uploads sur FlipHTML5.com"
    echo "  2. Configurer LemonInk watermarking"
    echo "  3. Tester les embeds dans Shopify"
fi

exit 0
