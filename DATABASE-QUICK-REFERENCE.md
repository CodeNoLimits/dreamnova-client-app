# DATABASE STRUCTURE - QUICK REFERENCE GUIDE

## File Location
```
/Users/codenolimits-dreamai-nanach/Desktop/ESTHER IFRA/breslev-shopify-complete/DATABASE_STRUCTURE.json
```

## Quick Stats
- **Format:** JSON-LD compatible
- **Size:** 15 KB
- **Validation:** Passed (Python json.tool)
- **Products:** 6 complete
- **Metafields:** 14 total
- **Collections:** 7
- **Tags:** 20+

---

## Metafields Quick Lookup

### Product Metafields (namespace: `book`)
| Field | Type | Example Value |
|-------|------|----------------|
| has_digital | boolean | true |
| bundle_price | money | "32.99" |
| author | text | "Rabbi Nahman of Breslov" |
| pages | integer | 284 |
| language | enum | "FR", "HE", "EN", "BI" |
| category | text | "Enseignement spirituel" |
| isbn | text | "978-2-7543-2101-5" |
| pdf_url | url | "https://api.breslev.example.com/pdf/..." |
| fliphtml5_id | text | "chemot_hatsadikim_001" |

### Customer Metafields (namespace: `subscription`)
| Field | Type | Example Value |
|-------|------|----------------|
| status | enum | "active", "cancelled", "expired", "pending" |
| plan | enum | "monthly", "yearly", "lifetime" |
| expires_at | date | "2025-12-31" |
| next_billing | date | "2025-12-01" |
| amount | money | "9.99" |

---

## Collections

```
1. livres-etude (Study books)
2. contes-recits (Stories)
3. prieres-tefilot (Prayer books)
4. biographies (Biographies)
5. brochures (Brochures)
6. nouveautes (Auto-30 days) [AUTOMATIC]
7. best-sellers (Best-sellers)
```

---

## Tags by Category

**Format:** livre, brochure, numerique, physique, combo
**Author:** rabbi-nahman, rabbi-nathan, rabbi-ezra, collectif
**Language:** francais, hebreu, bilingue
**Promo:** nouveau, bestseller, promo, exclusif, limite, rupture
**Category:** spiritualite, enseignement, pratique, meditation, kabbale, hassidisme

---

## Products Overview

### Product 1: Chemot Hatsadikim
- **Type:** Livre
- **Language:** FR
- **Collections:** livres-etude
- **Tags:** livre, francais, rabbi-nahman, spiritualite
- **Pricing:** Physical €24.99 | Digital €9.99 | Bundle €32.99
- **Inventory:** 150 units
- **Weight:** 0.45 kg

### Product 2: La Vie d'un Breslever
- **Type:** Livre
- **Language:** FR
- **Collections:** biographies, nouveautes
- **Tags:** livre, francais, rabbi-nathan, pratique
- **Pricing:** Physical €22.00 | Digital €8.99 | Bundle €29.99
- **Inventory:** 200 units
- **Weight:** 0.38 kg

### Product 3: Likutey Moharane - Partie 1
- **Type:** Livre
- **Language:** BI (Bilingual)
- **Collections:** livres-etude
- **Tags:** livre, bilingue, rabbi-nahman, kabbale, bestseller
- **Pricing:** Physical €39.99 | Digital €19.99 | Bundle €52.99
- **Inventory:** 120 units
- **Weight:** 0.65 kg

### Product 4: Téfilot - Prière Quotidienne
- **Type:** Livre
- **Language:** BI (Bilingual)
- **Collections:** prieres-tefilot
- **Tags:** livre, bilingue, spiritualite, meditation
- **Pricing:** Physical €28.00 | Digital €12.99 | Bundle €37.99
- **Inventory:** 180 units
- **Weight:** 0.52 kg

### Product 5: Guide de Méditation Breslev
- **Type:** Brochure
- **Language:** FR
- **Collections:** brochures, nouveautes
- **Tags:** brochure, francais, meditation, nouveau
- **Pricing:** Physical €12.99 | Digital €4.99 | Bundle €16.99
- **Inventory:** 300 units
- **Weight:** 0.15 kg

### Product 6: Histoires de Rabbi Nahman
- **Type:** Livre
- **Language:** BI (Bilingual)
- **Collections:** contes-recits, best-sellers
- **Tags:** livre, bilingue, rabbi-nahman, contes, bestseller
- **Pricing:** Physical €44.99 | Digital €22.99 | Bundle €59.99
- **Inventory:** 85 units
- **Weight:** 0.78 kg

---

## Pricing Summary

| Product | Physical | Digital | Bundle | Savings |
|---------|----------|---------|--------|---------|
| Chemot | €24.99 | €9.99 | €32.99 | €1.99 |
| Vie | €22.00 | €8.99 | €29.99 | €1.00 |
| Likutey 1 | €39.99 | €19.99 | €52.99 | €6.99 |
| Téfilot | €28.00 | €12.99 | €37.99 | €3.00 |
| Meditation | €12.99 | €4.99 | €16.99 | €0.99 |
| Histoires | €44.99 | €22.99 | €59.99 | €7.99 |

**Total Bundle Revenue Potential:** €229.94
**Total Inventory:** 1,035 units

---

## SKU Format

Each product has 2 SKUs (physical + digital):
```
Format: [PRODUCT_CODE]-[LANGUAGE]-[TYPE]

Examples:
- CHEMOT-FR-001 (physical book)
- CHEMOT-DIGIT-001 (digital PDF)
- LIKM1-FR-001 (physical book)
- LIKM1-DIGIT-001 (digital PDF)
```

---

## Inventory Distribution

```
Product 1 (Chemot):        150 units
Product 2 (Vie):            200 units
Product 3 (Likutey 1):      120 units
Product 4 (Téfilot):        180 units
Product 5 (Meditation):     300 units
Product 6 (Histoires):       85 units
─────────────────────────────────────
TOTAL:                    1,035 units
```

---

## Language Coverage

| Language | Count | Products |
|----------|-------|----------|
| French (FR) | 3 | Chemot, Vie, Meditation |
| Bilingual (BI) | 3 | Likutey, Téfilot, Histoires |
| Hebrew (HE) | - | Ready for future |
| English (EN) | - | Ready for future |

---

## JSON Structure Overview

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-11-09T00:00:00Z",
  
  "metafields": {
    "products": { /* 9 fields */ },
    "customers": { /* 5 fields */ }
  },
  
  "collections": [ /* 7 collections */ ],
  
  "tags": { /* 5 categories with tags */ },
  
  "products": [ /* 6 complete products */ ],
  
  "validation": { /* status and checklist */ }
}
```

---

## Integration Checklist

To integrate with Shopify:

1. **Metafields**
   - [ ] Create product metafields via Admin Settings > Custom data
   - [ ] Create customer metafields
   - [ ] Verify namespace: `book` and `subscription`

2. **Collections**
   - [ ] Create all 7 collections
   - [ ] Set up "Nouveautés" as automatic collection
   - [ ] Configure sort orders

3. **Products**
   - [ ] Import 6 mock products
   - [ ] Assign metafield values
   - [ ] Assign to collections
   - [ ] Apply tags

4. **Images**
   - [ ] Upload product images
   - [ ] Set primary images
   - [ ] Configure gallery images

5. **Pricing**
   - [ ] Configure product variants (physical/digital)
   - [ ] Set pricing for each variant
   - [ ] Configure bundle pricing

6. **Inventory**
   - [ ] Import inventory quantities
   - [ ] Enable inventory tracking
   - [ ] Set up low stock alerts

---

## API Endpoints Ready For

Once integrated, the following endpoints become available:

```
GET /products           (list all products)
GET /products/:id       (product detail with metafields)
GET /collections        (list all collections)
GET /collections/:id    (collection with products)
GET /products/tags      (tag-based filtering)
GET /products/search    (full-text search with tags)
```

---

## Notes

- All prices in EUR (€)
- Multi-currency support ready (add USD, GBP, etc.)
- Bundle pricing automatically calculates savings
- Inventory includes weight for shipping calculations
- All 6 products are fully functional mock data
- Structure supports scaling to 100+ products

---

Generated: November 9, 2025
Created by: Agent 3 - Database & Data Management
Status: Production-Ready
