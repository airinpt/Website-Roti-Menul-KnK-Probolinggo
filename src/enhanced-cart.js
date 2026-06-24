/**
 * Enhanced Cart System with Order Configurations
 * Works in conjunction with order-modal.js
 */

const ENHANCED_CART_KEY = 'menull-cart-enhanced-v1';
const ENHANCED_NOTES_KEY = 'menull-notes-enhanced-v1';

class EnhancedCartSystem {
  
  static formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  static getCart() {
    try {
      const raw = localStorage.getItem(ENHANCED_CART_KEY);
      const cart = raw ? JSON.parse(raw) : [];
      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      return [];
    }
  }

  static setCart(cart) {
    localStorage.setItem(ENHANCED_CART_KEY, JSON.stringify(cart));
  }

  static generateCartItemId() {
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static addConfiguredItem(product, config) {
    const cart = this.getCart();

    let itemTotal = product.price;
    itemTotal += config.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    itemTotal += config.selectedAdditionalItems.reduce((sum, item) => sum + item.price, 0);

    if (config.servingOption === 'Take Away' && product.packaging_fee) {
      itemTotal += product.packaging_fee;
    }

    // Get package item names for display
    let packageItemNames = [];
    if (config.selectedPackageItems && config.selectedPackageItems.length > 0) {
      packageItemNames = config.selectedPackageItems.map(item => item.name);
    }

    // Get variant names for display
    let variantNames = [];
    if (product.selectedVariantNames && product.selectedVariantNames.length > 0) {
      variantNames = product.selectedVariantNames;
    }

    const cartItem = {
      id: this.generateCartItemId(),
      product_id: product.id,
      category_id: product.category_id,
      brand_id: product.brand_id,
      brand_name: product.brand_name,
      product_name: product.name,
      category_name: product.category_name || '',
      image: product.image,
      base_price: product.price,
      packaging_fee: config.servingOption === 'Take Away' ? (product.packaging_fee || 0) : 0,
      serving_option: config.servingOption || null,
      selected_extras: config.selectedExtras,
      selected_additional_items: config.selectedAdditionalItems,
      selectedPackageItems: config.selectedPackageItems || [],
      packageItemNames: packageItemNames,
      selectedVariantNames: variantNames,
      notes: config.notes || '',
      quantity: config.quantity || 1,
      unit_price: itemTotal,
      subtotal: itemTotal * (config.quantity || 1),
      timestamp: Date.now(),
    };

    cart.push(cartItem);
    this.setCart(cart);
    return cartItem;
  }

  static removeItem(itemId) {
    const cart = this.getCart().filter((item) => item.id !== itemId);
    this.setCart(cart);
  }

  static updateItemQuantity(itemId, quantity) {
    const cart = this.getCart();
    const item = cart.find((i) => i.id === itemId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      item.subtotal = item.unit_price * quantity;
      this.setCart(cart);
    }
  }

  static getCartTotal() {
    return this.getCart().reduce((sum, item) => sum + item.subtotal, 0);
  }

  static clearCart() {
    this.setCart([]);
  }

  static formatCartItemDisplay(item) {
    let summary = `${item.product_name}`;
    if (item.serving_option) {
      summary += ` • ${item.serving_option}`;
    }
    if (item.selected_extras && item.selected_extras.length > 0) {
      const extras = item.selected_extras.map((e) => e.name).join(', ');
      summary += `\n+ ${extras}`;
    }
    if (item.selected_additional_items && item.selected_additional_items.length > 0) {
      const items = item.selected_additional_items.map((i) => i.name).join(', ');
      summary += `\n+ ${items}`;
    }
    if (item.packageItemNames && item.packageItemNames.length > 0) {
      const pkg = item.packageItemNames.join(', ');
      summary += `\n+ ${pkg}`;
    }
    if (item.selectedVariantNames && item.selectedVariantNames.length > 0) {
      const vars = item.selectedVariantNames.join(', ');
      summary += `\n+ ${vars}`;
    }
    if (item.notes) {
      summary += `\n✎ ${item.notes}`;
    }
    return summary;
  }

  static formatPriceBreakdown(item) {
    let breakdown = `Base: ${this.formatCurrency(item.base_price)}`;
    if (item.packaging_fee > 0) {
      breakdown += ` + Packaging: ${this.formatCurrency(item.packaging_fee)}`;
    }
    if (item.selected_extras && item.selected_extras.length > 0) {
      const extrasTotal = item.selected_extras.reduce((sum, e) => sum + e.price, 0);
      breakdown += ` + Extras: ${this.formatCurrency(extrasTotal)}`;
    }
    if (item.selected_additional_items && item.selected_additional_items.length > 0) {
      const itemsTotal = item.selected_additional_items.reduce((sum, i) => sum + i.price, 0);
      breakdown += ` + Items: ${this.formatCurrency(itemsTotal)}`;
    }
    return breakdown;
  }

  static async syncToSession() {
    try {
      const response = await fetch('../src/cart-session.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          cart: this.getCart(),
          notes: ''
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Sync error:', error);
      return null;
    }
  }
}

function showCartNotification(message) {
  let notification = document.getElementById('cartNotification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cartNotification';
    notification.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--brown-800);
      color: #fff;
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
      box-shadow: var(--shadow-lg);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    `;
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.style.opacity = '1';
  notification.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('addOrderToCart', (event) => {
      const { product, config } = event.detail;
      EnhancedCartSystem.addConfiguredItem(product, config);
      EnhancedCartSystem.syncToSession();
      showCartNotification('Added to cart successfully!');
    });
  });
} else {
  document.addEventListener('addOrderToCart', (event) => {
    const { product, config } = event.detail;
    EnhancedCartSystem.addConfiguredItem(product, config);
    EnhancedCartSystem.syncToSession();
    showCartNotification('Added to cart successfully!');
  });
}