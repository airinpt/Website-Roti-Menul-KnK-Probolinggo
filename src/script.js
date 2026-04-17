const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const setActiveNav = (id) => {
  navItems.forEach((link) => {
    const target = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("active", target === id);
  });
};

if (navItems.length) {
  const sections = Array.from(navItems)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href")?.replace("#", "");
      if (targetId) {
        setActiveNav(targetId);
      }
      navLinks?.classList.remove("open");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

const carouselTrack = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

if (carouselTrack && prevBtn && nextBtn) {
  const scrollAmount = () => carouselTrack.firstElementChild?.offsetWidth || 260;

  prevBtn.addEventListener("click", () => {
    carouselTrack.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carouselTrack.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });
}

const productTrack = document.getElementById("productTrack");
const categoryButtons = document.querySelectorAll(".category-button");
const categoryLabel = document.getElementById("categoryLabel");

const productData = {
  "Roti Menul": [
    { name: "Roti Menul Original", desc: "Lembut, manis, dan harum butter.", price: "Rp 5.000" },
    { name: "Roti Menul Pandan", desc: "Wangi pandan lembut dan segar.", price: "Rp 7.000" },
    { name: "Roti Menul Keju", desc: "Isi keju melimpah dan gurih.", price: "Rp 8.000" },
    { name: "Roti Menul Cokelat", desc: "Cokelat lumer di setiap gigitan.", price: "Rp 7.000" }
  ],
  "Baby Menul": [
    { name: "Baby Menul Cokelat", desc: "Ukuran mini dengan isian cokelat.", price: "Rp 3.000" },
    { name: "Baby Menul Keju", desc: "Keju lembut untuk camilan.", price: "Rp 3.000" },
    { name: "Baby Menul Kismis", desc: "Manis segar dengan kismis.", price: "Rp 3.500" }
  ],
  "Roti Sobek": [
    { name: "Roti Sobek Keju", desc: "Tarik sobek penuh taburan keju.", price: "Rp 12.000" },
    { name: "Roti Sobek Cokelat", desc: "Isian cokelat melimpah.", price: "Rp 12.000" },
    { name: "Roti Sobek Pandan", desc: "Aroma pandan menenangkan.", price: "Rp 12.000" }
  ],
  "Brownies": [
    { name: "Brownies Choco", desc: "Tekstur fudgy dengan cokelat pekat.", price: "Rp 20.000" },
    { name: "Brownies Keju", desc: "Lapisan keju lembut di atasnya.", price: "Rp 22.000" },
    { name: "Brownies Kacang", desc: "Renya kacang di setiap potong.", price: "Rp 21.000" }
  ]
};

const renderProducts = (category) => {
  if (!productTrack) return;
  const items = productData[category] || [];
  productTrack.innerHTML = items
    .map(
      (item) => `
        <article class="product-card">
          <div class="product-image" aria-hidden="true"></div>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <span class="price">${item.price}</span>
        </article>
      `
    )
    .join("");
  if (categoryLabel) {
    categoryLabel.textContent = `Kategori: ${category}`;
  }
  productTrack.scrollTo({ left: 0, behavior: "smooth" });
};

if (categoryButtons.length) {
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      renderProducts(button.dataset.category);
    });
  });
  renderProducts(categoryButtons[0].dataset.category);
}

const orderForm = document.getElementById("orderForm");
const testimonialForm = document.getElementById("testimonialForm");
const testimonialBox = document.getElementById("testimonialBox");

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(orderForm);
    const waNumber = orderForm.dataset.waNumber || "";

    const message = `Halo Roti Menull Knk!\n` +
      `Nama: ${data.get("nama")}\n` +
      `No HP: ${data.get("nohp")}\n` +
      `Pesanan: ${data.get("pesanan")}\n` +
      `Jumlah: ${data.get("jumlah")}\n` +
      `Tanggal Pesan: ${data.get("tanggal_pesan")}\n` +
      `Tanggal Ambil: ${data.get("tanggal_ambil")}\n` +
      `Jam Ambil: ${data.get("jam_ambil")}\n` +
      `Catatan: ${data.get("keterangan") || "-"}`;

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  });
}

if (testimonialForm && testimonialBox) {
  testimonialForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(testimonialForm);
    const name = (data.get("nama") || "").toString().trim();
    const message = (data.get("pesan") || "").toString().trim();

    if (!name || !message) {
      return;
    }

    const item = document.createElement("div");
    item.className = "testimonial-item";

    const strong = document.createElement("strong");
    strong.textContent = name;

    const p = document.createElement("p");
    p.textContent = message;

    item.appendChild(strong);
    item.appendChild(p);
    testimonialBox.prepend(item);

    testimonialForm.reset();
  });
}

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
