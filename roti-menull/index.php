<?php
declare(strict_types=1);
session_start();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Roti Menull | Roti Menull Knk</title>
  <link rel="icon" type="image/png" href="../assets/logomenulnew.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body data-category-page="roti-menull">
  <script>
    window.MENULL_PAGE_CONTEXT = {
      checkoutUrl: '../checkout.php',
      customerInfoUrl: '../customer-info.php',
      sessionEndpoint: '../src/cart-session.php',
      waNumber: '6281292401513'
    };
  </script>

  <nav class="navbar navbar-order">
    <a class="brand" href="../index.php">
      <img src="../assets/logomenulnew.png" alt="Roti Menull Knk" class="brand-logo" />
      <span class="brand-name">Roti Menull Knk</span>
    </a>
    <a href="../index.php#menu" class="btn btn-outline btn-back">Kembali</a>
  </nav>

  <main>
    <section class="section menu-categories" id="menu">
      <div class="section-header">
        <h2>Roti Menull Menu</h2>
        <p>Pilihan roti lembut signature dengan topping favorit pelanggan.</p>
      </div>
      <div class="menu-grid" id="categoryProductGrid"></div>

      <div class="cart-panel order-preview is-sticky-bottom" id="cartPreview" hidden>
        <h4 style="margin-bottom: 12px; font-family: var(--font-display); color: var(--brown-800);">Cart Preview</h4>
        <div id="cartPreviewList" class="summary-list"></div>
        <div class="checkout-summary-total">
          <span>Subtotal</span>
          <span id="cartPreviewTotal">Rp 0</span>
        </div>
        <div class="checkout-actions">
          <button class="btn btn-primary btn-lg btn-block" id="continueToCheckout" type="button">CONTINUE TO CHECKOUT</button>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <h3>Roti Menull Knk</h3>
        <p>Senin-Sabtu 09.00-22.00</p>
      </div>
      <div>
        <h4>Navigasi</h4>
        <ul>
          <li><a href="../index.php#beranda">Beranda</a></li>
          <li><a href="../index.php#menu">Menu</a></li>
          <li><a href="../index.php#location">Location</a></li>
          <li><a href="../index.php#review">Review</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>0812-9240-1513</li>
          <li>@roti_menull_knk</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Roti Menull Knk. All rights reserved.</span>
    </div>
  </footer>

  <script src="../src/order-modal.js"></script>
  <script src="../src/enhanced-cart.js"></script>
  <script src="../src/product-loader.js"></script>

  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      const loader = new ProductLoader({
        gridId: 'categoryProductGrid'
      });
      
      const allProducts = await loader.loadProducts();
      loader.products = allProducts.filter(p => p.brand_id === 2);
      loader.renderProducts();
      
      const checkoutBtn = document.getElementById('continueToCheckout');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async () => {
          const cart = EnhancedCartSystem.getCart();
          if (cart.length === 0) return;
          
          try {
            await fetch('../src/cart-session.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'save',
                cart: cart,
                notes: ''
              })
            });
          } catch (e) { }
          
          window.location.href = '../checkout.php';
        });
      }
      
      function updateCartPreview() {
        const cart = EnhancedCartSystem.getCart();
        const preview = document.getElementById('cartPreview');
        const list = document.getElementById('cartPreviewList');
        const total = document.getElementById('cartPreviewTotal');
        
        if (!cart.length) {
          preview.hidden = true;
          return;
        }
        
        preview.hidden = false;
        const grandTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
        
        list.innerHTML = cart.map((item) => `
          <div class="preview-item">
            <span><strong>${item.product_name}</strong> × ${item.quantity}</span>
            <span class="preview-item-actions">
              ${EnhancedCartSystem.formatCurrency(item.subtotal)}
              <button class="preview-remove-btn" type="button" data-remove-id="${item.id}" aria-label="Hapus pesanan">&minus;</button>
            </span>
          </div>
        `).join('');
        
        total.textContent = EnhancedCartSystem.formatCurrency(grandTotal);

        list.querySelectorAll('[data-remove-id]').forEach((button) => {
          button.addEventListener('click', () => {
            EnhancedCartSystem.removeItem(button.dataset.removeId);
            updateCartPreview();
          });
        });
      }
      
      document.addEventListener('addOrderToCart', updateCartPreview);
      updateCartPreview();
    });
  </script>
</body>
</html>