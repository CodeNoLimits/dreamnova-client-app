# 🔧 FIX AUDITS - INSTRUCTIONS SIMPLES

## 🎯 Problème identifié

Les audits ne s'affichent pas car les colonnes `ca_annuel` et `employees` dans Supabase sont en type `numeric`/`integer`, mais notre code envoie des strings comme `"100k-500k"` ou `"10-50"`.

**Résultat**: Les insertions échouent silencieusement et aucun audit n'est sauvegardé. ❌

## ✅ Solution en 3 étapes

### Étape 1: Ouvrir Supabase SQL Editor

1. Aller sur [supabase.com](https://supabase.com)
2. Sélectionner votre projet DreamNova
3. Cliquer sur **SQL Editor** dans la sidebar gauche
4. Cliquer sur **New Query**

### Étape 2: Exécuter le script de correction

1. Ouvrir le fichier `supabase/FIX_AUDITS_COMPLETE.sql`
2. Copier TOUT le contenu
3. Coller dans SQL Editor
4. Cliquer sur **Run** (bouton vert en bas à droite)

### Étape 3: Vérifier que ça a marché

Vous devriez voir en bas de l'écran :

```
✅ check_1: exists = true
✅ check_2: enabled = true
✅ check_3: count >= 4
```

Et une liste de colonnes avec :
- `ca_annuel` → `text`
- `employees` → `text`
- `audit_data` → `jsonb`

## 🧪 Tester (optionnel)

Si vous voulez vérifier en détail, exécutez le fichier `supabase/TEST_AUDITS.sql` qui va :
- Compter les audits existants
- Vérifier les politiques RLS
- Lister la structure complète
- Identifier tout problème restant

## 🎉 C'est tout !

Une fois le script exécuté :
1. Retourner sur le site DreamNova
2. Aller dans **Dashboard** → **Total Audits**
3. Les audits devraient maintenant s'afficher correctement

Si vous faites un **nouvel audit**, il sera maintenant sauvegardé correctement.

---

## 📊 Logs de debug ajoutés

Le code a été amélioré avec des logs ultra-détaillés. Pour voir ce qui se passe :

1. Ouvrir les DevTools (F12)
2. Aller dans l'onglet **Console**
3. Chercher les messages :
   - 🔍 `[Audits] Chargement audits...`
   - ✅ `[Audits] Audits chargés: X audits`
   - 📊 `[Audits] Données:` (montre les audits chargés)

Si vous voyez des erreurs ❌ en rouge, copier-coller le message pour investigation.

---

## ⚠️ Note importante

Si vous avez créé des audits AVANT cette correction, ils ne sont probablement **PAS dans la base de données** (car l'insertion échouait silencieusement).

Vous devrez refaire ces audits pour qu'ils soient sauvegardés correctement.

Pour vérifier combien d'audits sont vraiment dans la DB, exécutez dans SQL Editor :

```sql
SELECT COUNT(*) FROM audits WHERE user_id = auth.uid();
```

Si ça retourne `0`, c'est normal - faites un nouvel audit et il sera sauvegardé correctement.
