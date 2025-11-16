# ✅ CHECKLIST 100 POINTS - FIX AUDITS

## Phase 1: Configuration Supabase (20 points)

### Base de données (10 points)
- [ ] 1. Script `FIX_AUDITS_COMPLETE.sql` exécuté sans erreur
- [ ] 2. Colonne `ca_annuel` changée en type `TEXT`
- [ ] 3. Colonne `employees` changée en type `TEXT`
- [ ] 4. Colonne `audit_data` de type `JSONB` existe
- [ ] 5. Index GIN créé sur `audit_data`
- [ ] 6. Colonnes optionnelles permettent `NULL`
- [ ] 7. Table `audits` existe
- [ ] 8. Vérification structure retourne colonnes correctes
- [ ] 9. Contraintes de table correctes
- [ ] 10. Pas d'erreurs dans les logs SQL

### Row Level Security (10 points)
- [ ] 11. RLS activé sur table `audits`
- [ ] 12. Politique "Users can view own audits" créée
- [ ] 13. Politique "Users can create own audits" créée
- [ ] 14. Politique "Users can update own audits" créée
- [ ] 15. Politique "Users can delete own audits" créée
- [ ] 16. Anciennes politiques supprimées
- [ ] 17. Policies utilisent `auth.uid() = user_id`
- [ ] 18. Count politiques RLS >= 4
- [ ] 19. Pas de conflits de politiques
- [ ] 20. Test de requête utilisateur fonctionne

## Phase 2: Code Frontend (30 points)

### Page `/audits` (15 points)
- [ ] 21. Interface `Audit` avec types corrects
- [ ] 22. Column `sector` (pas `secteur_activite`)
- [ ] 23. States `debugInfo` et `errorMessage` ajoutés
- [ ] 24. Logs détaillés dans `chargerAudits()`
- [ ] 25. Test session avant chargement
- [ ] 26. Test user avant chargement
- [ ] 27. Requête avec `count: 'exact'`
- [ ] 28. Normalisation des données après fetch
- [ ] 29. Gestion erreur avec message clair
- [ ] 30. Try-catch autour du chargement
- [ ] 31. Finally avec `setLoading(false)`
- [ ] 32. Logs début et fin chargement
- [ ] 33. Filter logic ultra-permissive
- [ ] 34. SearchTerm vérifie falsy ET trim
- [ ] 35. FilterRisk vérifie 'all' ET empty

### Page `/audits/[id]` (10 points)
- [ ] 36. Logs détaillés ajoutés
- [ ] 37. Normalisation données audit
- [ ] 38. Gestion erreur avec alert
- [ ] 39. Vérification `audit_data` avant PDF
- [ ] 40. Message si `audit_data` manquant
- [ ] 41. Logs génération PDF
- [ ] 42. Try-catch génération PDF
- [ ] 43. Nom fichier PDF avec date formatée
- [ ] 44. Type `cout_estime` géré (string ou number)
- [ ] 45. Finally pour `setIsGeneratingPDF(false)`

### Composant `AuditWizardComplete` (5 points)
- [ ] 46. Colonne `sector` utilisée (pas secteur_activite)
- [ ] 47. `employees` converti en String
- [ ] 48. `ca_annuel` converti en String
- [ ] 49. `audit_data` contient JSON complet
- [ ] 50. Console.log si sauvegarde réussit

## Phase 3: Tests Fonctionnels (25 points)

### Test Création Audit (10 points)
- [ ] 51. Nouvel audit via `/audit`
- [ ] 52. Formulaire step 1 fonctionne
- [ ] 53. Formulaire step 2 fonctionne
- [ ] 54. Formulaire step 3 fonctionne
- [ ] 55. Génération audit AI réussit
- [ ] 56. Redirection vers `/audit-results`
- [ ] 57. Résultats s'affichent
- [ ] 58. Bouton "Sauvegarder" fonctionne
- [ ] 59. Message succès affiché
- [ ] 60. Pas d'erreur console

### Test Affichage Liste (8 points)
- [ ] 61. Page `/audits` charge sans erreur
- [ ] 62. Stats affichent nombre correct
- [ ] 63. Liste affiche tous les audits
- [ ] 64. Carte audit affiche nom entreprise
- [ ] 65. Carte affiche secteur
- [ ] 66. Carte affiche score conformité
- [ ] 67. Carte affiche niveau risque
- [ ] 68. Carte affiche amendes

### Test Filtres & Tri (7 points)
- [ ] 69. Recherche par nom fonctionne
- [ ] 70. Recherche par secteur fonctionne
- [ ] 71. Filtre "Tous les niveaux" affiche tout
- [ ] 72. Filtre par risque fonctionne
- [ ] 73. Tri par date fonctionne
- [ ] 74. Tri par score fonctionne
- [ ] 75. Tri par amendes fonctionne

## Phase 4: Tests Détails & PDF (15 points)

### Test Page Détails (8 points)
- [ ] 76. Click "Voir détails" fonctionne
- [ ] 77. Page `/audits/[id]` charge
- [ ] 78. Infos entreprise affichées
- [ ] 79. Score conformité affiché
- [ ] 80. Niveau risque affiché
- [ ] 81. Amendes affichées
- [ ] 82. Plan migration affiché (si existe)
- [ ] 83. Recommandations affichées (si existent)

### Test Génération PDF (7 points)
- [ ] 84. Bouton "Télécharger PDF" visible
- [ ] 85. Click télécharge PDF
- [ ] 86. PDF s'ouvre correctement
- [ ] 87. PDF contient infos entreprise
- [ ] 88. PDF contient résultats audit
- [ ] 89. PDF contient ROI
- [ ] 90. PDF contient recommandation PDP

## Phase 5: Tests Edge Cases (10 points)

### Données manquantes (5 points)
- [ ] 91. Audit sans `pdp_recommandé` s'affiche
- [ ] 92. Audit sans `duree_migration_estimee` s'affiche
- [ ] 93. Audit sans `cout_estime` s'affiche
- [ ] 94. Audit sans `audit_data` s'affiche (mais pas de PDF)
- [ ] 95. Message clair si PDF impossible

### Erreurs & Edge Cases (5 points)
- [ ] 96. Erreur RLS affiche message clair
- [ ] 97. User non-authentifié redirigé vers login
- [ ] 98. Audit inexistant redirige vers liste
- [ ] 99. Audit d'un autre user non accessible
- [ ] 100. Tous les logs console sont clairs et utiles

---

## 📊 Score Final

**Total: ___/100**

### Interprétation
- **90-100**: Parfait, prêt pour production ✅
- **75-89**: Bon, quelques ajustements mineurs 🟡
- **60-74**: Fonctionnel mais bugs à corriger 🟠
- **<60**: Problèmes majeurs, ne pas déployer ❌

---

## 🎯 Priorisation si score < 100

### Critiques (doivent être 100%)
- Points 1-20: Configuration Supabase
- Points 51-60: Création audit
- Points 61-68: Affichage liste

### Importants (doivent être > 80%)
- Points 21-50: Code frontend
- Points 69-83: Filtres & détails

### Nice-to-have (peuvent être < 80%)
- Points 84-100: PDF & edge cases

---

## 🔍 Comment tester

### Mode DEBUG
1. Ouvrir DevTools (F12)
2. Onglet Console
3. Chercher logs 🔍/✅/❌
4. Vérifier données retournées

### Tests manuels
1. Créer 3 audits différents
2. Vérifier qu'ils apparaissent dans `/audits`
3. Filtrer par risque
4. Trier par date, score, amendes
5. Ouvrir détails de chaque audit
6. Télécharger PDF de chaque audit
7. Vérifier que PDF contient bonnes données

### Validation SQL
```sql
-- Dans Supabase SQL Editor
SELECT
  id,
  company_name,
  sector,
  employees,
  ca_annuel,
  score_conformite,
  niveau_risque,
  audit_data IS NOT NULL as has_data
FROM audits
WHERE user_id = auth.uid()
ORDER BY created_at DESC;
```

Vérifier que :
- Toutes les colonnes ont des valeurs
- `sector` n'est pas null
- `employees` et `ca_annuel` sont en TEXT
- `has_data` est `true`

---

## ✅ Validation finale

Une fois tous les points verts, prendre screenshot de :
1. Page `/audits` avec liste complète
2. Console DevTools avec logs ✅
3. Page détails d'un audit
4. PDF téléchargé et ouvert

**Prêt pour production une fois checklist 100/100 ✅**
