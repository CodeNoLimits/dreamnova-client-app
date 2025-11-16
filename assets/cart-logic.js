/**
 * BRESLEV BOOKS - CART LOGIC
 * Gestion complète du panier avec AJAX
 * Compatible Shopify 2.0
 */

class BreslevCart {
  constructor() {
    this.cart = null;
    this.isUpdating = false;
    this.init();
  }

  /**
   * Initialisation du système de panier
   */
  init() {
    this.bindEvents();
    this.fetchCart();
    this.initMiniCart();
  }

  /**
   * Liaison des événements
   */
  bindEvents() {
    // Boutons d'ajout au panier
    document.addEventListener('click', (e) => {
      const addToCartBtn = e.target.closest('[data-add-to-cart]');
      if (addToCartBtn) {
        e.preventDefault();
        this.addToCart(addToCartBtn);
      }

      // Ouverture du mini-cart
      const cartToggle = e.target.closest('[data-cart-toggle]');
      if (cartToggle) {
        e.preventDefault();
        this.toggleMiniCart();
      }

      // Mise à jour de quantité
      const updateQty = e.target.closest('[data-cart-update-qty]');
      if (updateQty) {
        e.preventDefault();
        this.updateQuantity(updateQty);
      }

      // Suppression d'item
      const removeItem = e.target.closest('[data-cart-remove]');
      if (removeItem) {
        e.preventDefault();
        this.removeItem(removeItem);
      }
    });

    // Changement de variante
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-variant-select]')) {
        this.handleVariantChange(e.target);
      }
    });
  }

  /**
   * Récupération du panier depuis Shopify
   */
  async fetchCart() {
    try {
      const response = await fetch('/cart.js');
      this.cart = await response.json();
      this.updateCartUI();
      return this.cart;
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      this.showNotification('Erreur de chargement du panier', 'error');
    }
  }

  /**
   * Ajout au panier
   */
  async addToCart(button) {
    if (this.isUpdating) return;

    const form = button.closest('form');
    const formData = new FormData(form);

    // Gestion des variantes
    const variantId = formData.get('id');
    const quantity = parseInt(formData.get('quantity') || 1);

    if (!variantId) {
      this.showNotification('Veuillez sélectionner une option', 'error');
      return;
    }

    this.isUpdating = true;
    this.setButtonLoading(button, true);

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity,
          properties: this.getProductProperties(formData)
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout au panier');
      }

      const item = await response.json();

      // Mise à jour du panier
      await this.fetchCart();

      // Notification de succès
      this.showNotification(
        window.theme?.notifications?.addedToCart || 'Produit ajouté au panier!',
        'success'
      );

      // Ouverture du mini-cart
      this.openMiniCart();

      // Tracking analytics
      this.trackAddToCart(item);

    } catch (error) {
      console.error('Erreur d\'ajout au panier:', error);
      this.showNotification('Impossible d\'ajouter le produit', 'error');
    } finally {
      this.isUpdating = false;
      this.setButtonLoading(button, false);
    }
  }

  /**
   * Mise à jour de quantité
   */
  async updateQuantity(element) {
    if (this.isUpdating) return;

    const lineIndex = parseInt(element.dataset.cartUpdateQty);
    const newQty = parseInt(element.value);

    if (newQty < 0) return;

    this.isUpdating = true;

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          line: lineIndex,
          quantity: newQty
        })
      });

      if (!response.ok) {
        throw new Error('Erreur de mise à jour');
      }

      this.cart = await response.json();
      this.updateCartUI();

    } catch (error) {
      console.error('Erreur de mise à jour:', error);
      this.showNotification('Erreur de mise à jour', 'error');
      await this.fetchCart(); // Rechargement en cas d'erreur
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Suppression d'un item
   */
  async removeItem(button) {
    if (this.isUpdating) return;

    const lineIndex = parseInt(button.dataset.cartRemove);

    this.isUpdating = true;

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          line: lineIndex,
          quantity: 0
        })
      });

      if (!response.ok) {
        throw new Error('Erreur de suppression');
      }

      this.cart = await response.json();
      this.updateCartUI();
      this.showNotification('Produit retiré du panier', 'info');

    } catch (error) {
      console.error('Erreur de suppression:', error);
      this.showNotification('Erreur de suppression', 'error');
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Gestion du changement de variante
   */
  handleVariantChange(select) {
    const variantId = select.value;
    const form = select.closest('form');

    // Mise à jour du prix si disponible
    const priceElement = form.querySelector('[data-product-price]');
    const addToCartBtn = form.querySelector('[data-add-to-cart]');

    if (!variantId) {
      if (addToCartBtn) {
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = 'Sélectionnez une option';
      }
      return;
    }

    // Récupération des données de variante
    fetch(`/products/${select.dataset.productHandle}.js`)
      .then(res => res.json())
      .then(product => {
        const variant = product.variants.find(v => v.id == variantId);

        if (variant) {
          // Mise à jour du prix
          if (priceElement) {
            priceElement.textContent = this.formatMoney(variant.price);
          }

          // Gestion de la disponibilité
          if (addToCartBtn) {
            if (variant.available) {
              addToCartBtn.disabled = false;
              addToCartBtn.textContent = 'Ajouter au panier';
            } else {
              addToCartBtn.disabled = true;
              addToCartBtn.textContent = 'Rupture de stock';
            }
          }

          // Affichage du stock faible
          if (variant.inventory_quantity <= 5 && variant.inventory_quantity > 0) {
            this.showLowStock(variant.inventory_quantity);
          }
        }
      })
      .catch(error => {
        console.error('Erreur de chargement de variante:', error);
      });
  }

  /**
   * Initialisation du mini-cart
   */
  initMiniCart() {
    const miniCart = document.querySelector('[data-mini-cart]');
    if (!miniCart) return;

    // Fermeture en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
      if (!miniCart.contains(e.target) &&
          !e.target.closest('[data-cart-toggle]')) {
        this.closeMiniCart();
      }
    });

    // Fermeture avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMiniCart();
      }
    });
  }

  /**
   * Ouverture du mini-cart
   */
  openMiniCart() {
    const miniCart = document.querySelector('[data-mini-cart]');
    if (miniCart) {
      miniCart.classList.add('is-active');
      document.body.classList.add('cart-open');
    }
  }

  /**
   * Fermeture du mini-cart
   */
  closeMiniCart() {
    const miniCart = document.querySelector('[data-mini-cart]');
    if (miniCart) {
      miniCart.classList.remove('is-active');
      document.body.classList.remove('cart-open');
    }
  }

  /**
   * Toggle du mini-cart
   */
  toggleMiniCart() {
    const miniCart = document.querySelector('[data-mini-cart]');
    if (miniCart && miniCart.classList.contains('is-active')) {
      this.closeMiniCart();
    } else {
      this.openMiniCart();
    }
  }

  /**
   * Mise à jour de l'interface du panier
   */
  updateCartUI() {
    if (!this.cart) return;

    // Mise à jour du compteur
    const cartCounts = document.querySelectorAll('[data-cart-count]');
    cartCounts.forEach(count => {
      count.textContent = this.cart.item_count;
      count.classList.toggle('has-items', this.cart.item_count > 0);
    });

    // Mise à jour du total
    const cartTotals = document.querySelectorAll('[data-cart-total]');
    cartTotals.forEach(total => {
      total.textContent = this.formatMoney(this.cart.total_price);
    });

    // Mise à jour de la liste des items
    this.updateCartItems();

    // Vérification du seuil de livraison gratuite
    this.updateFreeShippingProgress();
  }

  /**
   * Mise à jour de la liste des items
   */
  updateCartItems() {
    const cartItemsContainer = document.querySelector('[data-cart-items]');
    if (!cartItemsContainer || !this.cart) return;

    if (this.cart.item_count === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <p>Votre panier est vide</p>
          <a href="/collections/all" class="btn btn-primary">Continuer vos achats</a>
        </div>
      `;
      return;
    }

    const itemsHTML = this.cart.items.map((item, index) => `
      <div class="cart-item" data-cart-item="${index + 1}">
        <div class="cart-item__image">
          <img src="${item.featured_image?.url || ''}"
               alt="${item.title}"
               loading="lazy">
        </div>
        <div class="cart-item__details">
          <h4 class="cart-item__title">${item.product_title}</h4>
          ${item.variant_title ? `<p class="cart-item__variant">${item.variant_title}</p>` : ''}
          ${this.renderItemProperties(item.properties)}
          <div class="cart-item__price">
            ${this.formatMoney(item.final_line_price)}
            ${item.line_level_discount_allocations.length > 0 ?
              `<span class="cart-item__original-price">${this.formatMoney(item.original_line_price)}</span>` :
              ''}
          </div>
        </div>
        <div class="cart-item__quantity">
          <input type="number"
                 value="${item.quantity}"
                 min="0"
                 data-cart-update-qty="${index + 1}"
                 aria-label="Quantité">
        </div>
        <button type="button"
                class="cart-item__remove"
                data-cart-remove="${index + 1}"
                aria-label="Retirer ${item.title}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>
    `).join('');

    cartItemsContainer.innerHTML = itemsHTML;
  }

  /**
   * Rendu des propriétés de produit
   */
  renderItemProperties(properties) {
    if (!properties || Object.keys(properties).length === 0) return '';

    const propsHTML = Object.entries(properties)
      .filter(([key, value]) => !key.startsWith('_') && value)
      .map(([key, value]) => `
        <div class="cart-item__property">
          <span>${key}:</span> ${value}
        </div>
      `).join('');

    return propsHTML ? `<div class="cart-item__properties">${propsHTML}</div>` : '';
  }

  /**
   * Progression vers la livraison gratuite
   */
  updateFreeShippingProgress() {
    const threshold = window.theme?.freeShippingThreshold;
    if (!threshold || !this.cart) return;

    const progressBar = document.querySelector('[data-free-shipping-progress]');
    const progressText = document.querySelector('[data-free-shipping-text]');

    if (!progressBar || !progressText) return;

    const remaining = threshold - this.cart.total_price;
    const percentage = Math.min((this.cart.total_price / threshold) * 100, 100);

    progressBar.style.width = `${percentage}%`;

    if (remaining <= 0) {
      progressText.textContent = 'Vous bénéficiez de la livraison gratuite!';
      progressText.classList.add('success');
    } else {
      progressText.textContent = `Plus que ${this.formatMoney(remaining)} pour la livraison gratuite`;
      progressText.classList.remove('success');
    }
  }

  /**
   * Récupération des propriétés de produit depuis le formulaire
   */
  getProductProperties(formData) {
    const properties = {};

    for (const [key, value] of formData.entries()) {
      if (key.startsWith('properties[') && value) {
        const propName = key.match(/properties\[(.*?)\]/)[1];
        properties[propName] = value;
      }
    }

    return Object.keys(properties).length > 0 ? properties : null;
  }

  /**
   * État de chargement du bouton
   */
  setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.innerHTML = '<span class="spinner"></span> Ajout en cours...';
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || 'Ajouter au panier';
    }
  }

  /**
   * Affichage de stock faible
   */
  showLowStock(quantity) {
    const message = window.theme?.notifications?.stockLow?.replace('{count}', quantity)
                    || `Plus que ${quantity} en stock!`;
    this.showNotification(message, 'warning');
  }

  /**
   * Affichage de notifications
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => notification.classList.add('is-visible'), 10);

    // Suppression automatique
    setTimeout(() => {
      notification.classList.remove('is-visible');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Formatage de prix
   */
  formatMoney(cents) {
    const amount = cents / 100;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: window.Shopify?.currency?.active || 'EUR'
    }).format(amount);
  }

  /**
   * Tracking analytics - Ajout au panier
   */
  trackAddToCart(item) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        currency: 'EUR',
        value: item.price / 100,
        items: [{
          item_id: item.variant_id,
          item_name: item.product_title,
          item_variant: item.variant_title,
          price: item.price / 100,
          quantity: item.quantity
        }]
      });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'AddToCart', {
        content_ids: [item.variant_id],
        content_type: 'product',
        value: item.price / 100,
        currency: 'EUR'
      });
    }
  }
}

// Initialisation au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.breslevCart = new BreslevCart();
  });
} else {
  window.breslevCart = new BreslevCart();
}
