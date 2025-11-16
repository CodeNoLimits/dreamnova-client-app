// Configuration des zones de livraison
const shippingZones = {
  // ISRAËL
  IL: {
    name: 'Israël',
    currency: 'ILS',
    methods: [
      {
        name: 'Livraison standard (5-7 jours)',
        price: 25, // ILS
        minOrder: 0,
        freeFrom: 200 // Gratuit à partir de 200 ILS
      },
      {
        name: 'Livraison express (2-3 jours)',
        price: 45, // ILS
        minOrder: 0,
        freeFrom: 500
      },
      {
        name: 'Retrait Jérusalem',
        price: 0,
        address: '110 Rue Méa Chéarim, Jérusalem'
      }
    ]
  },
  
  // FRANCE
  FR: {
    name: 'France',
    currency: 'EUR',
    methods: [
      {
        name: 'Colissimo (3-5 jours)',
        price: 8, // EUR
        minOrder: 0,
        freeFrom: 50 // Gratuit à partir de 50€
      },
      {
        name: 'Chronopost (24-48h)',
        price: 15, // EUR
        minOrder: 0,
        freeFrom: 100
      },
      {
        name: 'Point relais',
        price: 5, // EUR
        minOrder: 0,
        freeFrom: 35
      }
    ]
  },
  
  // CANADA
  CA: {
    name: 'Canada',
    currency: 'CAD',
    methods: [
      {
        name: 'Standard (7-10 jours)',
        price: 15, // CAD
        minOrder: 0,
        freeFrom: 75
      },
      {
        name: 'Express (3-5 jours)',
        price: 25, // CAD
        minOrder: 0,
        freeFrom: 150
      }
    ]
  },
  
  // NUMÉRIQUE (Tous pays)
  DIGITAL: {
    name: 'Téléchargement',
    currency: 'EUR',
    methods: [
      {
        name: 'Téléchargement immédiat',
        price: 0,
        instant: true
      }
    ]
  }
};

// Calculateur de frais de port
class ShippingCalculator {
  constructor(cart) {
    this.cart = cart;
    this.country = this.detectCountry();
  }
  
  detectCountry() {
    // Détecter le pays via IP ou sélection manuelle
    if(typeof Shopify !== 'undefined' && Shopify.country) {
      return Shopify.country;
    }
    
    // Fallback: détecter via timezone ou langue
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if(timezone.includes('Jerusalem') || timezone.includes('Tel_Aviv')) {
      return 'IL';
    }
    
    return 'FR'; // Par défaut France
  }
  
  calculate() {
    const zone = shippingZones[this.country];
    if(!zone) {
      return shippingZones.FR.methods; // Fallback France
    }
    
    const subtotal = this.cart.total_price / 100;
    
    // Vérifier si uniquement produits numériques
    const hasPhysical = this.cart.items.some(item => 
      !item.product_type || !item.product_type.includes('digital')
    );
    
    if(!hasPhysical) {
      return shippingZones.DIGITAL.methods;
    }
    
    // Calculer meilleure option
    const availableMethods = zone.methods.map(method => {
      let finalPrice = method.price;
      
      // Livraison gratuite ?
      if(method.freeFrom && subtotal >= method.freeFrom) {
        finalPrice = 0;
      }
      
      return {
        ...method,
        finalPrice,
        isFree: finalPrice === 0
      };
    });
    
    return availableMethods;
  }
  
  getBestOption() {
    const methods = this.calculate();
    // Retourner la méthode la moins chère
    return methods.reduce((best, current) => 
      current.finalPrice < best.finalPrice ? current : best
    );
  }
}

// Exporter pour utilisation dans Shopify
if(typeof window !== 'undefined') {
  window.ShippingCalculator = ShippingCalculator;
  window.shippingZones = shippingZones;
}

