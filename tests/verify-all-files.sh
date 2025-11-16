#!/bin/bash

echo "🔍 VÉRIFICATION DE L'EXISTENCE DE TOUS LES FICHIERS"
echo "=================================================================="

# APIs PDP
echo -e "\n📦 1. FICHIERS APIS PDP"
for file in pennylane.ts qonto.ts sellsy.ts tiime.ts index.ts; do
  if [ -f "src/adapters/pdp/$file" ]; then
    echo "  ✅ src/adapters/pdp/$file"
  else
    echo "  ❌ MANQUANT: src/adapters/pdp/$file"
  fi
done

# APIs Paiement
echo -e "\n📦 2. FICHIERS APIS PAIEMENT"
for file in stripe.ts paypal.ts index.ts; do
  if [ -f "src/adapters/payment/$file" ]; then
    echo "  ✅ src/adapters/payment/$file"
  else
    echo "  ❌ MANQUANT: src/adapters/payment/$file"
  fi
done

# Agents IA
echo -e "\n📦 3. FICHIERS AGENTS IA"
if [ -f "src/adapters/ai/agents.ts" ]; then
  echo "  ✅ src/adapters/ai/agents.ts"
  echo "  Contient:"
  grep "export class" src/adapters/ai/agents.ts | sed 's/^/    - /'
else
  echo "  ❌ MANQUANT: src/adapters/ai/agents.ts"
fi

# Routes API
echo -e "\n📦 4. FICHIERS ROUTES API"
for route in api/checkout/stripe/route.ts api/checkout/paypal/route.ts api/webhooks/stripe/route.ts api/documents/convert/route.ts api/pairing/create-session/route.ts; do
  if [ -f "src/app/$route" ]; then
    echo "  ✅ src/app/$route"
  else
    echo "  ❌ MANQUANT: src/app/$route"
  fi
done

# Composants
echo -e "\n📦 5. FICHIERS COMPOSANTS"
for comp in Hero.tsx PenaltyCalculator.tsx AuditWizardComplete.tsx RapportPDFComplet.tsx DocumentUpload.tsx QRCodePairing.tsx; do
  if [ -f "src/components/features/$comp" ]; then
    echo "  ✅ src/components/features/$comp"
  else
    echo "  ❌ MANQUANT: src/components/features/$comp"
  fi
done

# Lib
echo -e "\n📦 6. FICHIERS LIB"
if [ -f "src/lib/subscription.ts" ]; then
  echo "  ✅ src/lib/subscription.ts"
  echo "  Fonctions disponibles:"
  grep "^export function" src/lib/subscription.ts | sed 's/^/    - /'
else
  echo "  ❌ MANQUANT: src/lib/subscription.ts"
fi

echo -e "\n=================================================================="
echo "✅ VÉRIFICATION TERMINÉE"
