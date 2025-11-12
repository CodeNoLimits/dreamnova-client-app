# Génération des icônes PWA

Pour générer les icônes PNG à partir du SVG:

1. Utiliser un outil en ligne (https://realfavicongenerator.net/)
2. Ou utiliser ImageMagick:
   convert icon.svg -resize 192x192 icon-192.png
   convert icon.svg -resize 512x512 icon-512.png

Pour l'instant, le SVG fonctionne pour le favicon.
Les icônes PNG seront nécessaires pour la PWA complète.
