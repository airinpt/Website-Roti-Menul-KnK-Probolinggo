/**
 * Order Configuration Modal System
 */

class OrderConfigurationModal {
  constructor() {
    this.modal = null;
    this.currentProduct = null;
    this.selectedConfig = {
      selectedExtras: [],
      selectedAdditionalItems: [],
      selectedVariants: [],
      selectedPackageItems: [],
      notes: '',
      quantity: 1,
    };
  }

  init() {
    this.createModal();
    this.attachEventListeners();
  }

  createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'orderConfigModal';
    overlay.innerHTML = `
      <div class="modal-content" style="max-width:480px;width:100%;max-height:95vh;overflow:hidden;display:flex;flex-direction:column;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:16px 20px 8px;border-bottom:1px solid #f0e8e0;flex-shrink:0;">
          <div style="flex:1;min-width:0;">
            <h2 id="modalTitle" style="margin:0;font-size:1.1rem;font-weight:700;color:#3b2418;line-height:1.3;"></h2>
            <p id="modalBrand" style="margin:2px 0 0;font-size:0.75rem;color:#9a6b4b;"></p>
            <p id="modalPrice" style="margin:4px 0 0;font-size:1rem;font-weight:700;color:#6b4632;"></p>
          </div>
          <button id="modalCloseBtn" style="background:none;border:none;font-size:1.5rem;color:#9a6b4b;cursor:pointer;padding:0 4px;line-height:1;flex-shrink:0;">✕</button>
        </div>
        
        <div style="padding:8px 16px 0;flex-shrink:0;">
          <img id="modalImage" style="width:100%;height:140px;object-fit:cover;border-radius:10px;background:#f5ede8;" />
        </div>
        
        <div style="padding:12px 16px 8px;flex:1;overflow-y:auto;max-height:calc(95vh - 280px);">
          
          <!-- Package Items -->
          <div id="packageSection" style="display:none;margin-bottom:10px;">
            <div id="packageTitle" style="font-size:0.7rem;font-weight:600;text-transform:uppercase;color:#9a6b4b;margin-bottom:4px;">Pilih Varian</div>
            <div id="packageSubtitle" style="font-size:0.7rem;color:#9a6b4b;margin-bottom:6px;font-style:italic;">Centang varian yang ingin dipesan</div>
            <div id="packageItemsList" style="display:grid;gap:4px;"></div>
          </div>

          <!-- Variants (untuk Roti Menull) -->
          <div id="variantsSection" style="display:none;margin-bottom:10px;">
            <div style="font-size:0.7rem;font-weight:600;text-transform:uppercase;color:#9a6b4b;margin-bottom:4px;">Pilih Varian Rasa</div>
            <div id="variantsList" style="display:grid;gap:4px;"></div>
          </div>

          <!-- Extras -->
          <div id="extrasSection" style="display:none;margin-bottom:10px;">
            <div style="font-size:0.7rem;font-weight:600;text-transform:uppercase;color:#9a6b4b;margin-bottom:4px;">Extra Topping</div>
            <div id="extrasList" style="display:grid;gap:4px;"></div>
          </div>

          <!-- Additional Items -->
          <div id="additionalSection" style="display:none;margin-bottom:10px;">
            <div style="font-size:0.7rem;font-weight:600;text-transform:uppercase;color:#9a6b4b;margin-bottom:4px;">Additional Items</div>
            <div id="additionalItemsList" style="display:grid;gap:4px;"></div>
          </div>

          <!-- Quantity -->
          <div style="margin-bottom:8px;">
            <div style="font-size:0.7rem;font-weight:600;text-transform:uppercase;color:#9a6b4b;margin-bottom:3px;">Quantity</div>
            <div style="display:flex;align-items:center;gap:10px;background:#fdf8f3;padding:4px 12px;border-radius:8px;border:1px solid #e3cbb6;">
              <button id="qtyMinus" style="width:28px;height:28px;border-radius:50%;border:1.5px solid #e3cbb6;background:#fff;color:#6b4632;font-weight:700;cursor:pointer;font-size:0.9rem;">−</button>
              <span id="qtyValue" style="min-width:28px;text-align:center;font-weight:700;color:#3b2418;font-size:0.9rem;">1</span>
              <button id="qtyPlus" style="width:28px;height:28px;border-radius:50%;border:1.5px solid #e3cbb6;background:#fff;color:#6b4632;font-weight:700;cursor:pointer;font-size:0.9rem;">+</button>
            </div>
          </div>

          <!-- Price Summary -->
          <div style="background:#fdf8f3;padding:8px 12px;border-radius:8px;border:1px solid #e3cbb6;margin-top:6px;">
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:#6b4632;padding:2px 0;">
              <span>Base Price</span>
              <span id="priceBase">Rp 0</span>
            </div>
            <div id="extrasRow" style="display:none;justify-content:space-between;font-size:0.8rem;color:#6b4632;padding:2px 0;">
              <span>Extras</span>
              <span id="priceExtras">Rp 0</span>
            </div>
            <div id="additionalRow" style="display:none;justify-content:space-between;font-size:0.8rem;color:#6b4632;padding:2px 0;">
              <span>Additional</span>
              <span id="priceAdditional">Rp 0</span>
            </div>
            <div style="display:flex;justify-content:space-between;border-top:1.5px solid #e3cbb6;margin-top:4px;padding-top:6px;font-weight:700;font-size:0.9rem;color:#3b2418;">
              <span>Subtotal</span>
              <span id="priceSubtotal">Rp 0</span>
            </div>
          </div>
        </div>
        
        <div style="padding:10px 16px 16px;border-top:1px solid #f0e8e0;display:flex;gap:8px;flex-shrink:0;">
          <button id="modalCancelBtn" style="flex:1;padding:8px;border-radius:999px;border:1.5px solid #9a6b4b;background:transparent;color:#6b4632;font-weight:600;font-size:0.85rem;cursor:pointer;">Cancel</button>
          <button id="modalAddCartBtn" style="flex:1;padding:8px;border-radius:999px;border:none;background:#6b4632;color:#fff;font-weight:600;font-size:0.85rem;cursor:pointer;">Add to Cart</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    this.modal = overlay;
  }

  attachEventListeners() {
    document.getElementById('modalCloseBtn').addEventListener('click', () => this.close());
    document.getElementById('modalCancelBtn').addEventListener('click', () => this.close());
    document.getElementById('modalAddCartBtn').addEventListener('click', () => this.addToCart());
    document.getElementById('qtyMinus').addEventListener('click', () => this.changeQuantity(-1));
    document.getElementById('qtyPlus').addEventListener('click', () => this.changeQuantity(1));
    this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.close(); });
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);
  }

  open(product) {
    this.currentProduct = product;
    this.selectedConfig = {
      selectedExtras: [],
      selectedAdditionalItems: [],
      selectedVariants: [],
      selectedPackageItems: [],
      notes: '',
      quantity: 1,
    };

    document.getElementById('modalTitle').textContent = product.name || '';
    document.getElementById('modalBrand').textContent = product.brand_name || '';
    document.getElementById('modalPrice').textContent = this.formatCurrency(product.price);
    document.getElementById('modalImage').src = product.image ? `../assets/${product.image}` : 'https://placehold.co/400x200/f0e1d3/6b4632?text=No+Image';
    document.getElementById('priceBase').textContent = this.formatCurrency(product.price);
    document.getElementById('qtyValue').textContent = '1';

    this.setupPackageItems(product);
    this.setupVariants(product);
    this.setupExtras(product);
    this.setupAdditionalItems(product);

    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.updatePrice();
  }

  setupPackageItems(product) {
    const section = document.getElementById('packageSection');
    const list = document.getElementById('packageItemsList');
    const title = document.getElementById('packageTitle');
    const subtitle = document.getElementById('packageSubtitle');
    list.innerHTML = '';

    if (!product.is_package || !product.package_items || product.package_items.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';
    this.selectedConfig.selectedPackageItems = [];

    // BEDA TEXT BERDASARKAN BRAND
    if (product.brand_id === 1) {
      // MieeNull
      title.textContent = 'Pilih Varian';
      subtitle.textContent = 'Centang varian yang ingin dipesan';
    } else if (product.brand_id === 3) {
      // Teras Menull
      title.textContent = 'Pilih Nasi dan Lauk Pauk';
      subtitle.textContent = 'Centang nasi dan lauk yang ingin dipesan';
    } else {
      title.textContent = 'Pilih Varian';
      subtitle.textContent = 'Centang varian yang ingin dipesan';
    }

    // Tambahkan info FREE khusus Teras Menull
    const hasFreeItems = product.package_items.some(item => item.price === 0);
    if (hasFreeItems && product.brand_id === 3) {
      const infoDiv = document.createElement('div');
      infoDiv.style.cssText = 'font-size:0.7rem;color:#6b4632;margin-bottom:8px;font-style:italic;background:#fef6ee;padding:6px 10px;border-radius:6px;border:1px solid #e3cbb6;';
      infoDiv.textContent = '⚠️ Menu FREE (Sayur, Sambal, Lalapan) bervariasi setiap hari';
      list.appendChild(infoDiv);
    }

    const grouped = {};
    product.package_items.forEach(item => {
      const cat = item.category || 'Lainnya';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    Object.keys(grouped).forEach(category => {
      const header = document.createElement('div');
      header.style.cssText = 'font-size:0.7rem;font-weight:600;color:#6b4632;margin-top:6px;margin-bottom:2px;';
      
      if (product.brand_id === 3 && category === 'FREE - Pilih Sambal') {
        header.textContent = 'FREE - Pilih Sambal';
      } else {
        header.textContent = category;
      }
      list.appendChild(header);

      grouped[category].forEach((item) => {
        const div = document.createElement('div');
        div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 10px;border:1.5px solid #e3cbb6;border-radius:8px;background:#fff;transition:all 0.2s ease;';
        
        const priceDisplay = item.price === 0 ? 'FREE' : this.formatCurrency(item.price);
        const priceColor = item.price === 0 ? '#22c55e' : '#6b4632';
        
        div.innerHTML = `
          <input type="checkbox" id="package_${item.id}" data-price="${item.price}" style="width:16px;height:16px;accent-color:#6b4632;cursor:pointer;flex-shrink:0;" />
          <label for="package_${item.id}" style="flex:1;display:flex;justify-content:space-between;cursor:pointer;margin:0;font-size:0.82rem;color:#3b2418;">
            <span>${item.name}</span>
            <span style="font-weight:600;color:${priceColor};font-size:0.75rem;background:#f0e1d3;padding:0 8px;border-radius:999px;">${priceDisplay}</span>
          </label>
        `;
        list.appendChild(div);

        div.querySelector('input').addEventListener('change', (e) => {
          div.style.borderColor = e.target.checked ? '#6b4632' : '#e3cbb6';
          div.style.background = e.target.checked ? '#fef6ee' : '#fff';
          if (e.target.checked) {
            if (!this.selectedConfig.selectedPackageItems) this.selectedConfig.selectedPackageItems = [];
            this.selectedConfig.selectedPackageItems.push(item);
          } else {
            this.selectedConfig.selectedPackageItems = this.selectedConfig.selectedPackageItems.filter(i => i.id !== item.id);
          }
          this.updatePrice();
        });
      });
    });
  }

  setupVariants(product) {
    const section = document.getElementById('variantsSection');
    const list = document.getElementById('variantsList');
    list.innerHTML = '';

    if (!product.has_variants || !product.variants || product.variants.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';

    product.variants.forEach((variant, index) => {
      const div = document.createElement('div');
      div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 10px;border:1.5px solid #e3cbb6;border-radius:8px;background:#fff;transition:all 0.2s ease;';
      
      div.innerHTML = `
        <input type="checkbox" id="variant_${index}" value="${index}" style="width:16px;height:16px;accent-color:#6b4632;cursor:pointer;flex-shrink:0;" />
        <label for="variant_${index}" style="flex:1;display:flex;justify-content:space-between;cursor:pointer;margin:0;font-size:0.82rem;color:#3b2418;">
          <span>${variant.name}</span>
          <span style="font-weight:600;color:#6b4632;font-size:0.75rem;background:#f0e1d3;padding:0 8px;border-radius:999px;">${this.formatCurrency(variant.price)}</span>
        </label>
      `;
      list.appendChild(div);

      const checkbox = div.querySelector('input');
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          div.style.borderColor = '#6b4632';
          div.style.background = '#fef6ee';
          this.selectedConfig.selectedVariants.push(variant);
        } else {
          div.style.borderColor = '#e3cbb6';
          div.style.background = '#fff';
          this.selectedConfig.selectedVariants = this.selectedConfig.selectedVariants.filter(v => v.name !== variant.name);
        }
        this.updatePrice();
      });
    });
  }

  setupExtras(product) {
    const section = document.getElementById('extrasSection');
    const list = document.getElementById('extrasList');
    list.innerHTML = '';

    if (!product.has_extras || !product.extras || product.extras.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';

    product.extras.forEach(extra => {
      const div = document.createElement('div');
      div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 10px;border:1.5px solid #e3cbb6;border-radius:8px;background:#fff;';
      div.innerHTML = `
        <input type="checkbox" id="extra_${extra.id}" data-price="${extra.price}" style="width:16px;height:16px;accent-color:#6b4632;cursor:pointer;flex-shrink:0;" />
        <label for="extra_${extra.id}" style="flex:1;display:flex;justify-content:space-between;cursor:pointer;margin:0;font-size:0.82rem;color:#3b2418;">
          <span>${extra.name}</span>
          <span style="font-weight:600;color:#6b4632;font-size:0.75rem;background:#f0e1d3;padding:0 8px;border-radius:999px;">${this.formatCurrency(extra.price)}</span>
        </label>
      `;
      list.appendChild(div);

      div.querySelector('input').addEventListener('change', (e) => {
        div.style.borderColor = e.target.checked ? '#6b4632' : '#e3cbb6';
        div.style.background = e.target.checked ? '#fef6ee' : '#fff';
        if (e.target.checked) {
          this.selectedConfig.selectedExtras.push({ id: extra.id, name: extra.name, price: extra.price });
        } else {
          this.selectedConfig.selectedExtras = this.selectedConfig.selectedExtras.filter(i => i.id !== extra.id);
        }
        this.updatePrice();
      });
    });
  }

  setupAdditionalItems(product) {
    const section = document.getElementById('additionalSection');
    const list = document.getElementById('additionalItemsList');
    list.innerHTML = '';

    if (!product.additional_items || product.additional_items.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';

    product.additional_items.forEach(item => {
      const div = document.createElement('div');
      div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 10px;border:1.5px solid #e3cbb6;border-radius:8px;background:#fff;';
      div.innerHTML = `
        <input type="checkbox" id="additional_${item.id}" data-price="${item.price}" style="width:16px;height:16px;accent-color:#6b4632;cursor:pointer;flex-shrink:0;" />
        <label for="additional_${item.id}" style="flex:1;display:flex;justify-content:space-between;cursor:pointer;margin:0;font-size:0.82rem;color:#3b2418;">
          <span>${item.name}</span>
          <span style="font-weight:600;color:#6b4632;font-size:0.75rem;background:#f0e1d3;padding:0 8px;border-radius:999px;">${this.formatCurrency(item.price)}</span>
        </label>
      `;
      list.appendChild(div);

      div.querySelector('input').addEventListener('change', (e) => {
        div.style.borderColor = e.target.checked ? '#6b4632' : '#e3cbb6';
        div.style.background = e.target.checked ? '#fef6ee' : '#fff';
        if (e.target.checked) {
          this.selectedConfig.selectedAdditionalItems.push({ id: item.id, name: item.name, price: item.price });
        } else {
          this.selectedConfig.selectedAdditionalItems = this.selectedConfig.selectedAdditionalItems.filter(i => i.id !== item.id);
        }
        this.updatePrice();
      });
    });
  }

  changeQuantity(delta) {
    const newQty = Math.max(1, this.selectedConfig.quantity + delta);
    this.selectedConfig.quantity = newQty;
    document.getElementById('qtyValue').textContent = String(newQty);
    this.updatePrice();
  }

  updatePrice() {
    const product = this.currentProduct;
    const qty = this.selectedConfig.quantity;

    let basePrice = product.price || 0;
    
    if (this.selectedConfig.selectedVariants && this.selectedConfig.selectedVariants.length > 0) {
      basePrice = this.selectedConfig.selectedVariants[0].price;
    }
    
    if (product.is_package) {
      basePrice = 0;
      if (this.selectedConfig.selectedPackageItems) {
        basePrice = this.selectedConfig.selectedPackageItems.reduce((sum, item) => sum + item.price, 0);
      }
    }
    
    let extrasPrice = this.selectedConfig.selectedExtras ? this.selectedConfig.selectedExtras.reduce((s, e) => s + e.price, 0) : 0;
    let additionalPrice = this.selectedConfig.selectedAdditionalItems ? this.selectedConfig.selectedAdditionalItems.reduce((s, i) => s + i.price, 0) : 0;

    document.getElementById('extrasRow').style.display = extrasPrice > 0 ? 'flex' : 'none';
    document.getElementById('priceExtras').textContent = this.formatCurrency(extrasPrice);
    
    document.getElementById('additionalRow').style.display = additionalPrice > 0 ? 'flex' : 'none';
    document.getElementById('priceAdditional').textContent = this.formatCurrency(additionalPrice);

    const subtotal = (basePrice + extrasPrice + additionalPrice) * qty;
    document.getElementById('priceSubtotal').textContent = this.formatCurrency(subtotal);
  }

  addToCart() {
    if (!this.currentProduct) return;
    
    if (this.currentProduct.is_package && (!this.selectedConfig.selectedPackageItems || this.selectedConfig.selectedPackageItems.length === 0)) {
      alert('Silakan pilih minimal 1 varian!');
      return;
    }
    
    if (this.currentProduct.has_variants && this.selectedConfig.selectedVariants.length === 0) {
      alert('Silakan pilih minimal 1 varian rasa!');
      return;
    }

    this.selectedConfig.notes = '';
    
    const productToSend = { ...this.currentProduct };
    if (this.selectedConfig.selectedVariants && this.selectedConfig.selectedVariants.length > 0) {
      productToSend.price = this.selectedConfig.selectedVariants[0].price;
      productToSend.selectedVariantNames = this.selectedConfig.selectedVariants.map(v => v.name);
    }
    
    if (this.currentProduct.is_package) {
      productToSend.selectedPackageItems = this.selectedConfig.selectedPackageItems;
      productToSend.price = this.selectedConfig.selectedPackageItems.reduce((sum, item) => sum + item.price, 0);
    }
    
    const event = new CustomEvent('addOrderToCart', {
      detail: { 
        product: productToSend, 
        config: this.selectedConfig 
      }
    });
    document.dispatchEvent(event);
    this.close();
  }

  close() {
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.orderModal = new OrderConfigurationModal();
    window.orderModal.init();
  });
} else {
  window.orderModal = new OrderConfigurationModal();
  window.orderModal.init();
}