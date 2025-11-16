# 🔧 INSTALLATION MANUELLE SHOPIFY CLI

## ⚠️ PROBLÈME TERMINAL

Le terminal n'est pas accessible depuis Cursor. Voici comment installer manuellement:

---

## 🚀 MÉTHODE 1: SCRIPT AUTOMATIQUE (Recommandé)

```bash
# Ouvrir Terminal sur Mac
# Aller dans le dossier
cd ~/Desktop/ESTHER\ IFRA/breslev-shopify-complete

# Exécuter le script
bash install-shopify-cli.sh
```

---

## 🚀 MÉTHODE 2: COMMANDES MANUELLES

### 1. Ouvrir Terminal (Mac)
- Cmd + Espace
- Taper "Terminal"
- Entrer

### 2. Installer Shopify CLI
```bash
npm install -g @shopify/cli @shopify/theme
```

**Si erreur de permissions:**
```bash
sudo npm install -g @shopify/cli @shopify/theme
```

### 3. Vérifier installation
```bash
shopify version
```

**Résultat attendu:** Version de Shopify CLI (ex: 3.x.x)

### 4. Se connecter
```bash
cd ~/Desktop/ESTHER\ IFRA/breslev-shopify-complete
shopify login
```

**Cela va:**
- Ouvrir le navigateur
- Demander connexion Shopify
- Générer token automatiquement

### 5. Lancer développement local
```bash
shopify theme dev
```

**Résultat:** URL temporaire Shopify avec hot reload

---

## ✅ VÉRIFICATION

Après installation, vérifier:

```bash
# Vérifier CLI installé
shopify version

# Vérifier packages
npm list -g @shopify/cli @shopify/theme
```

---

## 🆘 TROUBLESHOOTING

### Erreur: "command not found"
```bash
# Vérifier Node.js installé
node --version

# Si pas installé: https://nodejs.org/
```

### Erreur: "permission denied"
```bash
# Utiliser sudo
sudo npm install -g @shopify/cli @shopify/theme
```

### Erreur: "npm not found"
```bash
# Installer Node.js (inclut npm)
# https://nodejs.org/
```

---

## 📋 CHECKLIST

- [ ] Terminal ouvert
- [ ] Node.js installé (`node --version`)
- [ ] npm installé (`npm --version`)
- [ ] Shopify CLI installé (`shopify version`)
- [ ] Connecté au store (`shopify login`)
- [ ] Dev local lancé (`shopify theme dev`)

---

**Exécute le script `install-shopify-cli.sh` ou les commandes manuelles ci-dessus! 🚀**

