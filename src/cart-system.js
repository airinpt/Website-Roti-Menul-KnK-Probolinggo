const CART_STORAGE_KEY = 'menull-cart-v1';
const NOTES_STORAGE_KEY = 'menull-notes-v1';

const PAGE_CONTEXT = window.MENULL_PAGE_CONTEXT || {};
const PAGE_ROUTES = {
  checkout: PAGE_CONTEXT.checkoutUrl || '../checkout.html',
  customerInfo: PAGE_CONTEXT.customerInfoUrl || '../customer-info.html',
  sessionEndpoint: PAGE_CONTEXT.sessionEndpoint || ''
};

const WA_NUMBER = PAGE_CONTEXT.waNumber || '6281292401513';

const CATEGORY_MENUS = {
  'roti-menull': {
    title: 'Roti Menull Menu',
    subtitle: 'Pilihan roti lembut signature dengan topping favorit pelanggan.',
    items: []
  },
  'mie-minull': {
    title: 'Mie Menull Menu',
    subtitle: 'Mie gurih hangat untuk teman santai dan makan cepat.',
    items: []
  },
  'teras-menull': {
    title: 'Teras Menull Menu',
    subtitle: 'Snack dan teman nongkrong terbaik ala Teras Menull.',
    items: []
  }
};

function rp(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value || 0);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function hydrateStorageFromSession() {
  const initialCart = Array.isArray(window.MENULL_INITIAL_CART) ? window.MENULL_INITIAL_CART : [];
  const initialNotes = typeof window.MENULL_INITIAL_NOTES === 'string' ? window.MENULL_INITIAL_NOTES : '';

  try {
    const cartExists = localStorage.getItem(CART_STORAGE_KEY);
    if ((!cartExists || cartExists === '[]') && initialCart.length) {
      writeStorage(CART_STORAGE_KEY, initialCart);
    }

    const notesExists = localStorage.getItem(NOTES_STORAGE_KEY);
    if ((!notesExists || notesExists === '') && initialNotes) {
      localStorage.setItem(NOTES_STORAGE_KEY, initialNotes);
    }
  } catch (error) {}
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCart() {
  const cart = readStorage(CART_STORAGE_KEY, []);
  return Array.isArray(cart)
    ? cart
        .map((item) => ({
          id: String(item.id || ''),
          name: String(item.name || ''),
          category: String(item.category || ''),
          price: Number(item.price || 0),
          quantity: Number(item.quantity || 0),
          extras: item.extras || [],
          additional_items: item.additional_items || [],
          package_items: item.package_items || [],
          selected_variants: item.selected_variants || []
        }))
        .filter((item) => item.id && item.name && item.price > 0 && item.quantity > 0)
    : [];
}

function setCart(cart) {
  writeStorage(CART_STORAGE_KEY, cart);
  renderCartPreview();
  renderCheckoutPage();
  renderCustomerInfoPage();
}

function getNotes() {
  return String(readStorage(NOTES_STORAGE_KEY, '') || '');
}

function setNotes(notes) {
  localStorage.setItem(NOTES_STORAGE_KEY, notes);
}

async function syncSession() {
  if (!PAGE_ROUTES.sessionEndpoint) return;

  try {
    await fetch(PAGE_ROUTES.sessionEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        action: 'save',
        cart: getCart(),
        notes: getNotes()
      })
    });
  } catch (error) {}
}

function updateQuantityDisplay(control, value) {
  const qtyEl = control.querySelector('[data-qty]');
  if (qtyEl) qtyEl.textContent = String(value);

  const button = control.closest('.menu-actions')?.querySelector('.buy-btn');
  if (button) {
    button.textContent = value > 0 ? `Add ${value} to Cart` : 'Add to Cart';
  }
}

function addToCart(pageKey, item, quantity) {
  const cart = getCart();
  const id = `${pageKey}::${item.name}`;
  const existingIndex = cart.findIndex((entry) => entry.id === id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id,
      name: item.name,
      category: CATEGORY_MENUS[pageKey]?.title || '',
      price: item.price,
      quantity,
      extras: item.extras || [],
      additional_items: item.additional_items || [],
      package_items: item.package_items || [],
      selected_variants: item.selected_variants || []
    });
  }

  setCart(cart);
}

function removeCartItem(id) {
  const cart = getCart().filter((item) => item.id !== id);
  setCart(cart);
}

function renderCategoryPage() {
  const pageKey = document.body.dataset.categoryPage;
  const config = CATEGORY_MENUS[pageKey];
  const grid = document.getElementById('categoryProductGrid');
  const title = document.getElementById('categoryTitle');
  const subtitle = document.getElementById('categorySubtitle');

  if (!config || !grid || !title || !subtitle) return;

  title.textContent = config.title;
  subtitle.textContent = config.subtitle;

  grid.innerHTML = config.items.map((item, index) => `
    <article class="menu-card menu-item-card" data-product-id="${pageKey}::${esc(item.name)}" style="animation-delay:${index * 80}ms">
      <div class="menu-photo">
        <img src="../assets/${esc(item.image)}" alt="${esc(item.name)}" loading="lazy"
             onerror="this.onerror=null;this.src='https://placehold.co/300x300/f0e1d3/6b4632?text=No+Image';" />
      </div>
      <div class="menu-meta">
        <div class="menu-name">${esc(item.name)}</div>
        <p class="menu-desc">${esc(item.desc || '')}</p>
        <div class="menu-price">${rp(item.price)}</div>
        <div class="menu-actions">
          <div class="qty-control" aria-label="Quantity control">
            <button class="qty-btn" type="button" data-step="-1" aria-label="Kurangi jumlah">-</button>
            <span class="qty-value" data-qty>0</span>
            <button class="qty-btn" type="button" data-step="1" aria-label="Tambah jumlah">+</button>
          </div>
          <button class="btn btn-primary buy-btn" type="button">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.menu-card').forEach((card, index) => {
    const qtyControl = card.querySelector('.qty-control');
    const buyButton = card.querySelector('.buy-btn');
    const item = config.items[index];
    let selectedQty = 0;

    qtyControl.addEventListener('click', (event) => {
      const button = event.target.closest('.qty-btn');
      if (!button) return;

      const delta = Number(button.dataset.step || 0);
      selectedQty = Math.max(0, selectedQty + delta);
      updateQuantityDisplay(qtyControl, selectedQty);
    });

    buyButton.addEventListener('click', async () => {
      if (selectedQty <= 0) return;

      addToCart(pageKey, item, selectedQty);
      selectedQty = 0;
      updateQuantityDisplay(qtyControl, selectedQty);
      buyButton.textContent = 'Added';
      setTimeout(() => {
        buyButton.textContent = 'Add to Cart';
      }, 900);
    });
  });

  const continueButton = document.getElementById('continueToCheckout');
  if (continueButton) {
    continueButton.addEventListener('click', async () => {
      if (!getCart().length) return;
      await syncSession();
      window.location.href = PAGE_ROUTES.checkout;
    });
  }

  renderCartPreview();
}

function renderCartPreview() {
  const preview = document.getElementById('cartPreview');
  const list = document.getElementById('cartPreviewList');
  const total = document.getElementById('cartPreviewTotal');
  const continueButton = document.getElementById('continueToCheckout');

  if (!preview || !list || !total || !continueButton) return;

  let cart = [];
  if (typeof EnhancedCartSystem !== 'undefined') {
    cart = EnhancedCartSystem.getCart();
  } else {
    cart = getCart();
  }
  
  if (!cart || !cart.length) {
    preview.hidden = true;
    continueButton.disabled = true;
    list.innerHTML = '';
    total.textContent = rp(0);
    return;
  }

  const grandTotal = cart.reduce((sum, item) => sum + (item.subtotal || item.price * item.quantity), 0);

  preview.hidden = false;
  continueButton.disabled = false;
  list.innerHTML = cart.map((item) => {
    const itemName = item.product_name || item.name;
    const itemQty = item.quantity;
    const itemSubtotal = item.subtotal || (item.unit_price || item.price) * itemQty;
    
    let details = '';
    if (item.packageItemNames && item.packageItemNames.length > 0) {
      details = ` (${item.packageItemNames.join(', ')})`;
    } else if (item.selectedVariantNames && item.selectedVariantNames.length > 0) {
      details = ` (${item.selectedVariantNames.join(', ')})`;
    }
    
    return `
    <div class="preview-item">
      <span>${esc(itemName)}${details} <em style="color: var(--brown-500); font-style: normal;">x${itemQty}</em></span>
      <div class="preview-actions">
        <span style="white-space: nowrap">${rp(itemSubtotal)}</span>
        <button class="cart-remove preview-remove" type="button" data-remove-id="${esc(item.id)}">Hapus</button>
      </div>
    </div>
  `}).join('');
  total.textContent = rp(grandTotal);

  list.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', () => {
      if (typeof EnhancedCartSystem !== 'undefined') {
        EnhancedCartSystem.removeItem(button.dataset.removeId);
        renderCartPreview();
        renderCheckoutPage();
      } else {
        removeCartItem(button.dataset.removeId);
      }
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

  let cart = [];
  if (typeof EnhancedCartSystem !== 'undefined') {
    cart = EnhancedCartSystem.getCart();
  } else {
    cart = getCart();
  }
  
  const notes = getNotes();

  noteField.value = notes;

  if (!cart || !cart.length) {
    empty.hidden = false;
    list.innerHTML = '';
    total.textContent = rp(0);
    continueButton.disabled = true;
    return;
  }

  empty.hidden = true;
  continueButton.disabled = false;

  const grandTotal = cart.reduce((sum, item) => sum + (item.subtotal || item.price * item.quantity), 0);

  list.innerHTML = cart.map((item) => {
    const itemName = item.product_name || item.name;
    const itemPrice = item.unit_price || item.price;
    const itemQty = item.quantity;
    const itemSubtotal = item.subtotal || (itemPrice * itemQty);
    
    let detailsHtml = '';
    if (item.packageItemNames && item.packageItemNames.length > 0) {
      detailsHtml += `<div style="font-size:0.7rem;color:var(--brown-500);margin-top:4px;"><strong>Detail:</strong> ${item.packageItemNames.join(', ')}</div>`;
    }
    if (item.selectedVariantNames && item.selectedVariantNames.length > 0) {
      detailsHtml += `<div style="font-size:0.7rem;color:var(--brown-500);margin-top:4px;"><strong>Varian:</strong> ${item.selectedVariantNames.join(', ')}</div>`;
    }
    if (item.selected_extras && item.selected_extras.length > 0) {
      const extraNames = item.selected_extras.map(e => e.name).join(', ');
      detailsHtml += `<div style="font-size:0.7rem;color:var(--brown-500);margin-top:4px;"><strong>Extra:</strong> ${extraNames}</div>`;
    }
    if (item.selected_additional_items && item.selected_additional_items.length > 0) {
      const additionalNames = item.selected_additional_items.map(i => i.name).join(', ');
      detailsHtml += `<div style="font-size:0.7rem;color:var(--brown-500);margin-top:4px;"><strong>Tambahan:</strong> ${additionalNames}</div>`;
    }

    return `
    <div class="cart-item" data-cart-id="${esc(item.id)}">
      <div>
        <div class="cart-item-title">${esc(itemName)}</div>
        <div class="cart-item-meta">${esc(item.category_name || 'Menull')} x${itemQty}</div>
        <div class="cart-item-price">${rp(itemPrice)} / item</div>
        ${detailsHtml}
      </div>
      <div class="cart-item-actions">
        <strong>${rp(itemSubtotal)}</strong>
        <button class="cart-remove" type="button" data-remove-id="${esc(item.id)}">Hapus</button>
      </div>
    </div>
  `}).join('');

  total.textContent = rp(grandTotal);

  list.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', () => {
      if (typeof EnhancedCartSystem !== 'undefined') {
        EnhancedCartSystem.removeItem(button.dataset.removeId);
        renderCheckoutPage();
        renderCartPreview();
      } else {
        removeCartItem(button.dataset.removeId);
      }
    });
  });

  noteField.oninput = () => {
    setNotes(noteField.value);
  };

  continueButton.onclick = async () => {
    const cartItems = typeof EnhancedCartSystem !== 'undefined' ? EnhancedCartSystem.getCart() : getCart();
    if (!cartItems || !cartItems.length) return;
    setNotes(noteField.value.trim());
    await syncSession();
    window.location.href = PAGE_ROUTES.customerInfo;
  };
}

function renderCustomerInfoPage() {
  const summary = document.getElementById('customerSummary');
  const notesSummary = document.getElementById('customerNotes');
  const form = document.getElementById('customerForm');

  if (!summary || !form) return;

  let cart = [];
  if (typeof EnhancedCartSystem !== 'undefined') {
    cart = EnhancedCartSystem.getCart();
  } else {
    cart = getCart();
  }
  
  const notes = getNotes();

  if (!cart || !cart.length) {
    summary.innerHTML = '<div class="customer-empty">Belum ada produk di keranjang. Silakan kembali ke menu untuk memilih pesanan.</div>';
  } else {
    const grandTotal = cart.reduce((sum, item) => sum + (item.subtotal || item.price * item.quantity), 0);
    summary.innerHTML = `
      <div class="summary-list">
        ${cart.map((item) => {
          const itemName = item.product_name || item.name;
          const itemPrice = item.unit_price || item.price;
          const itemQty = item.quantity;
          
          let detailsHtml = '';
          if (item.packageItemNames && item.packageItemNames.length > 0) {
            detailsHtml += `<div style="font-size:0.7rem;color:var(--brown-500);margin-top:4px;"><strong>Detail:</strong> ${item.packageItemNames.join(', ')}</div>`;
          }
          if (item.selectedVariantNames && item.selectedVariantNames.length > 0) {
            detailsHtml += `<div style="font-size:0.7rem;color:var(--brown-500);margin-top:4px;"><strong>Varian:</strong> ${item.selectedVariantNames.join(', ')}</div>`;
          }
          if (item.selected_extras && item.selected_extras.length > 0) {
            const extraNames = item.selected_extras.map(e => e.name).join(', ');
            detailsHtml += `<div style="font-size:0.7rem;color:var(--brown-500);margin-top:4px;"><strong>Extra:</strong> ${extraNames}</div>`;
          }
          
          return `
          <div class="cart-item">
            <div>
              <div class="cart-item-title">${esc(itemName)}</div>
              <div class="cart-item-meta">${esc(item.category_name || 'Menull')} x${itemQty}</div>
              <div class="cart-item-price">${rp(itemPrice)} / item</div>
              ${detailsHtml}
            </div>
            <div class="cart-item-actions">
              <strong>${rp(item.subtotal || itemPrice * itemQty)}</strong>
            </div>
          </div>
        `}).join('')}
      </div>
      <div class="customer-summary-total">
        <span>Total</span>
        <span>${rp(grandTotal)}</span>
      </div>
    `;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = !cart || !cart.length;
  }

  if (notesSummary) {
    if ('value' in notesSummary) {
      notesSummary.value = notes || '';
    } else {
      notesSummary.textContent = notes || '';
    }
  }

  form.onsubmit = (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('nama') || '').trim();
    const phone = String(data.get('nohp') || '').trim();
    const pickupDate = String(data.get('tanggal_ambil') || '').trim();
    const pickupTime = String(data.get('jam_ambil') || '').trim();

    if (!name || !phone || !pickupDate || !pickupTime || !cart || !cart.length) {
      return;
    }

    const lines = [
      'Halo Roti Menull Knk',
      'Saya ingin melanjutkan pesanan:',
      '',
      ...cart.map((item) => {
        const itemName = item.product_name || item.name;
        const itemPrice = item.unit_price || item.price;
        const itemQty = item.quantity;
        let detail = `- ${itemName} x${itemQty} = ${rp(itemPrice * itemQty)}`;
        
        if (item.packageItemNames && item.packageItemNames.length > 0) {
          const items = item.packageItemNames.map(i => `  - ${i}`).join('\n');
          detail += `\n  Detail:\n${items}`;
        }
        if (item.selectedVariantNames && item.selectedVariantNames.length > 0) {
          const variants = item.selectedVariantNames.map(v => `  - ${v}`).join('\n');
          detail += `\n  Varian:\n${variants}`;
        }
        if (item.selected_extras && item.selected_extras.length > 0) {
          const extras = item.selected_extras.map(e => `  - ${e.name}`).join('\n');
          detail += `\n  Extra:\n${extras}`;
        }
        if (item.selected_additional_items && item.selected_additional_items.length > 0) {
          const additional = item.selected_additional_items.map(i => `  - ${i.name}`).join('\n');
          detail += `\n  Tambahan:\n${additional}`;
        }
        return detail;
      }),
      '',
      `Catatan Pesanan: ${notes || '-'}`,
      `Nama: ${name}`,
      `No HP: ${phone}`,
      `Tanggal Ambil: ${pickupDate}`,
      `Jam Ambil: ${pickupTime}`
    ];

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  };
}

function bootstrap() {
  hydrateStorageFromSession();

  if (document.getElementById('categoryProductGrid')) {
    renderCategoryPage();
  }

  if (document.getElementById('checkoutList')) {
    renderCheckoutPage();
  }

  if (document.getElementById('customerSummary')) {
    renderCustomerInfoPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
