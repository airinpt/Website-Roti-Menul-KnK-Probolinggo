/**
 * Order Summary Renderer
 * Renders the checkout.html and customer-info.html pages using the
 * configured cart produced by the order modal (enhanced-cart.js).
 *
 * Replaces the older cart-system.js rendering on these two pages, which
 * only understood the plain {id, name, category, price, quantity} cart
 * shape and was never connected to the order configuration modal.
 */

const ORDER_NOTES_KEY = 'menull-order-notes-v1';

const ORDER_SUMMARY_CONTEXT = window.MENULL_PAGE_CONTEXT || {};
const ORDER_SUMMARY_ROUTES = {
  checkout: ORDER_SUMMARY_CONTEXT.checkoutUrl || './checkout.html',
  customerInfo: ORDER_SUMMARY_CONTEXT.customerInfoUrl || './customer-info.html',
  sessionEndpoint: ORDER_SUMMARY_CONTEXT.sessionEndpoint || '',
};

const ORDER_SUMMARY_WA_NUMBER = ORDER_SUMMARY_CONTEXT.waNumber || '6281292401513';

function osEsc(value) {
  return String(value).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[m]));
}

function getOrderNotes() {
  try {
    return localStorage.getItem(ORDER_NOTES_KEY) || '';
  } catch (error) {
    return '';
  }
}

function setOrderNotes(value) {
  try {
    localStorage.setItem(ORDER_NOTES_KEY, value);
  } catch (error) {
    // localStorage may be unavailable; nothing else we can do here.
  }
}

/**
 * If the browser's enhanced cart is empty but the server session carried
 * an initial cart (e.g. set from another device/tab, or the page was
 * opened fresh from a saved session), hydrate localStorage from it so the
 * configured items aren't lost.
 */
function hydrateEnhancedCartFromSession() {
  const initialCart = Array.isArray(window.MENULL_INITIAL_CART) ? window.MENULL_INITIAL_CART : [];
  const initialNotes = typeof window.MENULL_INITIAL_NOTES === 'string' ? window.MENULL_INITIAL_NOTES : '';

  if (!EnhancedCartSystem.getCart().length && initialCart.length) {
    EnhancedCartSystem.setCart(initialCart);
  }

  if (!getOrderNotes() && initialNotes) {
    setOrderNotes(initialNotes);
  }
}

async function syncCartToSession(notes) {
  if (!ORDER_SUMMARY_ROUTES.sessionEndpoint) return;

  try {
    await fetch(ORDER_SUMMARY_ROUTES.sessionEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        action: 'save',
        cart: EnhancedCartSystem.getCart(),
        notes: typeof notes === 'string' ? notes : getOrderNotes(),
      }),
    });
  } catch (error) {
    // Silent fallback: localStorage still holds the source of truth.
  }
}

/**
 * Build the configuration detail lines for one cart item, matching the
 * cart summary format from the order configuration spec, e.g.:
 *   Take Away (+Rp 2.000)
 *   Extra: Egg, Cheese
 *   Catatan: No scallions
 */
function buildConfigLines(item) {
  const lines = [];

  if (item.packageItemNames && item.packageItemNames.length) {
    lines.push(`Varian: ${item.packageItemNames.map((n) => osEsc(n)).join(', ')}`);
  }

  if (item.selectedVariantNames && item.selectedVariantNames.length) {
    lines.push(`Varian: ${item.selectedVariantNames.map((n) => osEsc(n)).join(', ')}`);
  }

  if (item.serving_option) {
    const feeNote = item.packaging_fee > 0
      ? ` (+${EnhancedCartSystem.formatCurrency(item.packaging_fee)})`
      : '';
    lines.push(`${osEsc(item.serving_option)}${feeNote}`);
  }

  if (item.selected_extras && item.selected_extras.length) {
    lines.push(`Extra: ${item.selected_extras.map((e) => osEsc(e.name)).join(', ')}`);
  }

  if (item.selected_additional_items && item.selected_additional_items.length) {
    lines.push(`Tambahan: ${item.selected_additional_items.map((i) => osEsc(i.name)).join(', ')}`);
  }

  if (item.notes) {
    lines.push(`Catatan: ${osEsc(item.notes)}`);
  }

  return lines;
}

function renderCartItemCard(item, { editable }) {
  const configLines = buildConfigLines(item);

  return `
    <div class="cart-item configured-cart-item" data-cart-id="${osEsc(item.id)}">
      <div class="cart-item-main">
        <div class="cart-item-title">${osEsc(item.product_name)}</div>
        ${configLines.length ? `<div class="cart-item-config">${configLines.map((line) => `<div class="cart-item-config-line">${line}</div>`).join('')}</div>` : ''}
        <div class="cart-item-price">${EnhancedCartSystem.formatCurrency(item.unit_price)} / item</div>
      </div>
      <div class="cart-item-actions">
        ${editable ? `
          <div class="qty-control qty-control-sm" aria-label="Ubah jumlah">
            <button class="qty-btn qty-btn-sm" type="button" data-qty-step="-1">-</button>
            <span class="qty-value" data-qty-display>${item.quantity}</span>
            <button class="qty-btn qty-btn-sm" type="button" data-qty-step="1">+</button>
          </div>
        ` : `<span class="cart-item-qty">x${item.quantity}</span>`}
        <strong>${EnhancedCartSystem.formatCurrency(item.subtotal)}</strong>
        ${editable ? `<button class="cart-remove" type="button" data-remove-id="${osEsc(item.id)}">Remove</button>` : ''}
      </div>
    </div>
  `;
}

function attachCartItemHandlers(container, onChange) {
  container.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', () => {
      EnhancedCartSystem.removeItem(button.dataset.removeId);
      onChange();
    });
  });

  container.querySelectorAll('[data-qty-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-cart-id]');
      const id = card?.dataset.cartId;
      const item = EnhancedCartSystem.getCart().find((entry) => entry.id === id);
      if (!item) return;

      const delta = Number(button.dataset.qtyStep || 0);
      const nextQty = Math.max(1, item.quantity + delta);
      EnhancedCartSystem.updateItemQuantity(id, nextQty);
      onChange();
    });
  });
}

function renderCheckoutPage() {
  const list = document.getElementById('checkoutList');
  const total = document.getElementById('checkoutTotal');
  const empty = document.getElementById('checkoutEmpty');
  const noteField = document.getElementById('orderNotes');
  const continueButton = document.getElementById('continueToCustomerInfo');

  if (!list || !total || !empty || !noteField || !continueButton) return;

  const cart = EnhancedCartSystem.getCart();
  noteField.value = getOrderNotes();

  if (!cart.length) {
    empty.hidden = false;
    list.innerHTML = '';
    total.textContent = EnhancedCartSystem.formatCurrency(0);
    continueButton.disabled = true;
    return;
  }

  empty.hidden = true;
  continueButton.disabled = false;

  list.innerHTML = cart.map((item) => renderCartItemCard(item, { editable: true })).join('');
  total.textContent = EnhancedCartSystem.formatCurrency(EnhancedCartSystem.getCartTotal());

  attachCartItemHandlers(list, renderCheckoutPage);

  noteField.oninput = () => setOrderNotes(noteField.value);

  continueButton.onclick = async () => {
    if (!EnhancedCartSystem.getCart().length) return;
    setOrderNotes(noteField.value.trim());
    await syncCartToSession(noteField.value.trim());
    window.location.href = ORDER_SUMMARY_ROUTES.customerInfo;
  };
}

function renderCustomerInfoPage() {
  const summary = document.getElementById('customerSummary');
  const notesSummary = document.getElementById('customerNotes');
  const form = document.getElementById('customerForm');

  if (!summary || !form) return;

  const cart = EnhancedCartSystem.getCart();
  const notes = getOrderNotes();

  if (!cart.length) {
    summary.innerHTML = '<div class="customer-empty">Belum ada produk di keranjang. Silakan kembali ke menu untuk memilih pesanan.</div>';
  } else {
    summary.innerHTML = `
      <div class="summary-list">
        ${cart.map((item) => renderCartItemCard(item, { editable: false })).join('')}
      </div>
      <div class="customer-summary-total">
        <span>Total</span>
        <span>${EnhancedCartSystem.formatCurrency(EnhancedCartSystem.getCartTotal())}</span>
      </div>
    `;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = !cart.length;
  }

  if (notesSummary) {
    const text = notes || 'Tidak ada catatan tambahan dari halaman checkout.';
    if ('value' in notesSummary) {
      notesSummary.value = text;
    } else {
      notesSummary.textContent = text;
    }
  }

  form.onsubmit = (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('nama') || '').trim();
    const phone = String(data.get('nohp') || '').trim();
    const pickupDate = String(data.get('tanggal_ambil') || '').trim();
    const pickupTime = String(data.get('jam_ambil') || '').trim();
    const currentCart = EnhancedCartSystem.getCart();

    if (!name || !phone || !pickupDate || !pickupTime || !currentCart.length) {
      return;
    }

    const lines = ['Halo Roti Menull Knk', 'Saya ingin melanjutkan pesanan:', ''];

    currentCart.forEach((item) => {
      lines.push(`- ${item.product_name} x${item.quantity}`);
      buildConfigLines(item).forEach((line) => {
        // Strip the HTML entities used for on-page rendering; WA text is plain.
        const plain = line.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        lines.push(`  ${plain}`);
      });
      lines.push(`  Subtotal: ${EnhancedCartSystem.formatCurrency(item.subtotal)}`);
    });

    lines.push('');
    lines.push(`Total: ${EnhancedCartSystem.formatCurrency(EnhancedCartSystem.getCartTotal())}`);
    lines.push(`Catatan Pesanan: ${getOrderNotes() || '-'}`);
    lines.push(`Nama: ${name}`);
    lines.push(`No HP: ${phone}`);
    lines.push(`Tanggal Ambil: ${pickupDate}`);
    lines.push(`Jam Ambil: ${pickupTime}`);

    const url = `https://wa.me/${ORDER_SUMMARY_WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  };
}

function bootstrapOrderSummary() {
  hydrateEnhancedCartFromSession();

  if (document.getElementById('checkoutList')) {
    renderCheckoutPage();
  }

  if (document.getElementById('customerSummary')) {
    renderCustomerInfoPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapOrderSummary);
} else {
  bootstrapOrderSummary();
}
