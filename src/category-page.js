const CATEGORY_MENUS = {
  "roti-menull": {
    title: "Roti Menull Menu",
    subtitle: "Pilihan roti lembut signature dengan topping favorit pelanggan.",
    items: [
      { name: "Roti Menull Original", price: 17000, image: "foto_produk_roti/rotimenull.jpeg" },
      { name: "Roti Menull Coklat", price: 20000, image: "foto_produk_roti/rotimenull_nyoklat.jpeg" },
      { name: "Roti Sobek Menull", price: 28000, image: "foto_produk_roti/rotisobek.jpeg" },
      { name: "Roti Menull Kering", price: 15000, image: "foto_produk_roti/rotimenull_kering.jpeg" },
      { name: "Mini Menull", price: 5000, image: "foto_produk_roti/rotimenull_minimenull.jpeg" },
      { name: "Mie Minull Original", price: 12000, image: "foto_produk_roti/brownies_slice.jpeg" },
      { name: "Mie Minull Nyemek", price: 14000, image: "foto_produk_roti/brownies_cepuk.jpeg" },
      { name: "Mie Minull Keju", price: 15000, image: "foto_produk_roti/brownies_kukus.jpeg" },
      { name: "Mie Minull Pedas Level", price: 16000, image: "foto_produk_roti/brownies_mini.jpeg" },
      { name: "Bolu Menull", price: 26000, image: "foto_produk_roti/bolumenull_bolu.jpeg" },
      { name: "Bolu Menull Mini", price: 18000, image: "foto_produk_roti/bolumenull_bolumini.jpeg" },
      { name: "Bolu Potong", price: 15000, image: "foto_produk_roti/bolumenull_bolupotong.jpeg" },
      { name: "Baby Menull", price: 11000, image: "foto_produk_roti/babymenull.jpeg" }
    ]
  },
  "mie-minull": {
    title: "Mie Minull Menu",
    subtitle: "Mie gurih hangat untuk teman santai dan makan cepat.",
    items: []
  },
  "teras-menull": {
    title: "Teras Menull Menu",
    subtitle: "Snack dan teman nongkrong terbaik ala Teras Menull.",
    items: []
  }
};

function rp(value) {
  return "Rp " + value.toLocaleString("id-ID");
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[m]));
}

function renderCategoryPage() {
  const page = document.body.dataset.categoryPage;
  const config = CATEGORY_MENUS[page];
  const grid = document.getElementById("categoryProductGrid");
  const title = document.getElementById("categoryTitle");
  const subtitle = document.getElementById("categorySubtitle");

  if (!config || !grid || !title || !subtitle) return;

  title.textContent = config.title;
  subtitle.textContent = config.subtitle;

  grid.innerHTML = config.items.map((item, idx) => `
    <article class="menu-card menu-item-card" style="animation-delay:${idx * 80}ms">
      <div class="menu-photo">
        <img src="../assets/${esc(item.image)}" alt="${esc(item.name)}" loading="lazy"
             onerror="this.onerror=null;this.src='https://placehold.co/300x300/f0e1d3/6b4632?text=No+Image';" />
      </div>
      <div class="menu-meta">
        <div class="menu-name">${esc(item.name)}</div>
        <div class="menu-price">${rp(item.price)}</div>
        <div class="menu-actions">
          <div class="qty-control" data-item="${esc(item.name)}">
            <button class="qty-btn" type="button" data-act="minus">-</button>
            <span class="qty-value" data-qty>0</span>
            <button class="qty-btn" type="button" data-act="plus">+</button>
          </div>
          <button class="btn btn-primary buy-btn" type="button">Tambah ke Cart</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".qty-control").forEach((ctrl) => {
    const valueEl = ctrl.querySelector("[data-qty]");
    ctrl.addEventListener("click", (e) => {
      const btn = e.target.closest(".qty-btn");
      if (!btn) return;
      const current = Number(valueEl.textContent) || 0;
      const next = btn.dataset.act === "plus" ? current + 1 : Math.max(0, current - 1);
      valueEl.textContent = String(next);
    });
  });

  grid.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".menu-actions");
      const qty = Number(parent.querySelector("[data-qty]").textContent) || 0;
      if (qty <= 0) return;
      btn.textContent = "Added";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Tambah ke Cart";
        btn.disabled = false;
      }, 1000);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderCategoryPage);
} else {
  renderCategoryPage();
}