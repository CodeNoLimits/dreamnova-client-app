#!/bin/bash
# Script création metafields Shopify
# Exécuter: bash create-metafields.sh

echo "💾 Création des metafields Shopify..."

# Metafields Produits
echo "📦 Création metafields produits..."

shopify app generate extension --type=metafield \
  --name="book.has_digital" \
  --type="boolean"

shopify app generate extension --type=metafield \
  --name="book.bundle_price" \
  --type="money"

shopify app generate extension --type=metafield \
  --name="book.pages" \
  --type="number_integer"

shopify app generate extension --type=metafield \
  --name="book.isbn" \
  --type="single_line_text_field"

shopify app generate extension --type=metafield \
  --name="book.language" \
  --type="single_line_text_field"

shopify app generate extension --type=metafield \
  --name="book.author" \
  --type="single_line_text_field"

shopify app generate extension --type=metafield \
  --name="book.pdf_url" \
  --type="url"

shopify app generate extension --type=metafield \
  --name="book.fliphtml5_id" \
  --type="single_line_text_field"

# Metafields Customers
echo "👤 Création metafields customers..."

shopify app generate extension --type=metafield \
  --name="subscription.status" \
  --type="single_line_text_field"

shopify app generate extension --type=metafield \
  --name="subscription.plan" \
  --type="single_line_text_field"

shopify app generate extension --type=metafield \
  --name="subscription.expires_at" \
  --type="date"

shopify app generate extension --type=metafield \
  --name="subscription.next_billing" \
  --type="date"

shopify app generate extension --type=metafield \
  --name="subscription.amount" \
  --type="money"

echo "✅ Metafields créés!"

