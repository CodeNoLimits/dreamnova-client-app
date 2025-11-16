# 🔑 CONFIGURATION GEMINI API - GUIDE RAPIDE

**⚠️ OBLIGATOIRE:** La clé API Gemini est **requise** pour que l'application fonctionne.  
**Aucun fallback n'est utilisé** - vous devez configurer la vraie clé API.

**Problème:** L'erreur `GEMINI_API_KEY is required for AI agents` apparaît.

**Solution:** Configurer la clé API Gemini dans le fichier `.env.local`

---

## 📋 ÉTAPE 1: Obtenir votre Clé API Gemini

1. **Allez sur:** https://makersuite.google.com/app/apikey
2. **Connectez-vous** avec votre compte Google
3. **Cliquez sur "Create API Key"** ou utilisez une clé existante
4. **Copiez la clé** (elle commence par `AIza...`)

---

## 📋 ÉTAPE 2: Configurer dans `.env.local`

1. **Ouvrez le fichier** `.env.local` à la racine du projet `dreamnova-client/`

2. **Ajoutez ou modifiez ces lignes:**

```env
NEXT_PUBLIC_GEMINI_API_KEY=AIza...votre_cle_ici
GEMINI_API_KEY=AIza...votre_cle_ici
```

**⚠️ IMPORTANT:** 
- Remplacez `AIza...votre_cle_ici` par votre vraie clé
- Les deux variables doivent avoir la même valeur
- Pas d'espaces autour du `=`

**Exemple:**
```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz
GEMINI_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz
```

---

## 📋 ÉTAPE 3: Redémarrer le Serveur

**⚠️ CRITIQUE:** Après avoir modifié `.env.local`, vous DEVEZ redémarrer le serveur de développement.

1. **Arrêtez le serveur** (Ctrl+C dans le terminal)
2. **Redémarrez:**
   ```bash
   npm run dev
   ```

**Pourquoi?** Next.js charge les variables d'environnement uniquement au démarrage.

---

## ✅ VÉRIFICATION

Une fois configuré, l'application devrait fonctionner sans erreur. Les agents IA utiliseront Gemini pour:
- ✅ Analyse de conformité
- ✅ Calcul du ROI
- ✅ Recommandations PDP

**⚠️ IMPORTANT:** Si la clé n'est pas configurée, l'application **ne fonctionnera pas** et affichera une erreur. Aucun fallback n'est utilisé.

---

## 🆘 DÉPANNAGE

### Erreur persiste après configuration?

1. **Vérifiez que `.env.local` existe** à la racine de `dreamnova-client/`
2. **Vérifiez qu'il n'y a pas d'espaces** autour du `=`
3. **Vérifiez que la clé est complète** (commence par `AIza`)
4. **Redémarrez le serveur** (très important!)
5. **Vérifiez la console** pour voir si la clé est bien chargée

### La clé ne fonctionne pas?

- Vérifiez que la clé est active dans Google AI Studio
- Vérifiez que vous n'avez pas dépassé le quota
- Essayez de créer une nouvelle clé

---

## 📝 NOTE

Le fichier `.env.local` est dans `.gitignore` et ne sera pas commité dans Git. C'est normal et sécurisé.

---

**Besoin d'aide?** Voir `COMPLETE_AUDIT_AND_DEPLOYMENT.md` pour plus de détails.

