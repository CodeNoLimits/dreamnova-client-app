# 💾 MÉTAFIELDS SHOPIFY - ESTHER IFRAH

## 📋 PRODUITS

### `book.has_digital`
- **Type:** boolean
- **Description:** Le livre a une version numérique

### `book.bundle_price`
- **Type:** money
- **Description:** Prix du pack physique + numérique

### `book.pages`
- **Type:** number_integer
- **Description:** Nombre de pages

### `book.isbn`
- **Type:** single_line_text_field
- **Description:** ISBN du livre

### `book.language`
- **Type:** single_line_text_field
- **Description:** Langue (fr, he, en)

### `book.author`
- **Type:** single_line_text_field
- **Description:** Auteur du livre

### `book.pdf_url`
- **Type:** url
- **Description:** URL du PDF protégé

### `book.fliphtml5_id`
- **Type:** single_line_text_field
- **Description:** ID FlipHTML5 pour lecture en ligne

---

## 👤 CUSTOMERS

### `subscription.status`
- **Type:** single_line_text_field
- **Description:** Statut abonnement (active, cancelled, expired)

### `subscription.plan`
- **Type:** single_line_text_field
- **Description:** Type de plan (monthly, yearly)

### `subscription.expires_at`
- **Type:** date
- **Description:** Date expiration abonnement

### `subscription.next_billing`
- **Type:** date
- **Description:** Prochaine facturation

### `subscription.amount`
- **Type:** money
- **Description:** Montant abonnement

---

## 🔧 CRÉATION

Exécuter: `bash agents/database/scripts/create-metafields.sh`

Ou créer manuellement dans Shopify Admin → Settings → Custom data

