#!/bin/bash

# 🚀 SCRIPT DE DÉPLOIEMENT NETLIFY AUTOMATIQUE
# Ce script déploie le site Breslev Books sur Netlify

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🚀 DÉPLOIEMENT NETLIFY - BRESLEV BOOKS  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "netlify.toml" ]; then
    echo -e "${RED}❌ Erreur: netlify.toml introuvable${NC}"
    echo "Exécutez ce script depuis la racine du projet"
    exit 1
fi

# Vérifier que Netlify CLI est installé
if ! command -v netlify &> /dev/null; then
    echo -e "${RED}❌ Netlify CLI n'est pas installé${NC}"
    echo "Installez-le avec: npm install -g netlify-cli"
    exit 1
fi

# Vérifier authentification
echo -e "${BLUE}🔐 Vérification authentification Netlify...${NC}"
if ! netlify status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Non authentifié. Connexion...${NC}"
    netlify login
fi

echo -e "${GREEN}✅ Authentifié${NC}"
netlify status | grep "Email:"
echo ""

# Vérifier que le dossier public existe
if [ ! -d "public" ]; then
    echo -e "${RED}❌ Erreur: Dossier public/ introuvable${NC}"
    exit 1
fi

# Vérifier que index-v2.html existe
if [ ! -f "public/index-v2.html" ]; then
    echo -e "${RED}❌ Erreur: public/index-v2.html introuvable${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Fichiers vérifiés${NC}"
echo ""

# Demander confirmation
echo -e "${YELLOW}📊 Récapitulatif du déploiement:${NC}"
echo "  - Dossier à déployer: public/"
echo "  - Fichier principal: index-v2.html"
echo "  - Configuration: netlify.toml"
echo ""

read -p "Voulez-vous continuer le déploiement en PRODUCTION? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠️  Déploiement annulé${NC}"
    exit 0
fi

# Option 1: Créer un nouveau site (si premier déploiement)
if [ ! -d ".netlify" ]; then
    echo -e "${BLUE}🆕 Création d'un nouveau site Netlify...${NC}"

    # Générer nom de site unique
    SITE_NAME="breslev-books-$(date +%s)"

    echo "  Nom du site: $SITE_NAME"
    echo ""

    # Créer et déployer
    netlify deploy \
        --prod \
        --dir=public \
        --site="$SITE_NAME" \
        --message="🎉 Initial deployment - Breslev Books v1.0"

    echo ""
    echo -e "${GREEN}✅ Site créé et déployé!${NC}"

else
    # Option 2: Mettre à jour site existant
    echo -e "${BLUE}🔄 Mise à jour du site existant...${NC}"

    netlify deploy \
        --prod \
        --dir=public \
        --message="🚀 Update - $(date '+%Y-%m-%d %H:%M:%S')"

    echo ""
    echo -e "${GREEN}✅ Site mis à jour!${NC}"
fi

# Récupérer l'URL du site
SITE_URL=$(netlify status --json 2>/dev/null | jq -r '.siteUrl' 2>/dev/null || echo "URL non disponible")

echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 DÉPLOIEMENT RÉUSSI!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}🔗 URL du site:${NC}"
echo "   $SITE_URL"
echo ""
echo -e "${BLUE}📊 Prochaines étapes:${NC}"
echo "  1. Tester le site déployé"
echo "  2. Configurer custom domain (si souhaité)"
echo "  3. Vérifier SSL (activé automatiquement)"
echo "  4. Uploader les PDFs FlipHTML5"
echo "  5. Configurer les variables d'environnement"
echo ""
echo -e "${YELLOW}💡 Commandes utiles:${NC}"
echo "  netlify open        # Ouvrir dashboard Netlify"
echo "  netlify open:site   # Ouvrir le site déployé"
echo "  netlify logs        # Voir les logs"
echo ""

# Ouvrir le site automatiquement
read -p "Ouvrir le site dans le navigateur? (y/N) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    netlify open:site
fi

exit 0
