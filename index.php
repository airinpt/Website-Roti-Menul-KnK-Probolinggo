<?php
declare(strict_types=1);
session_start();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Roti Menull Knk | Bakery</title>
  <link rel="icon" type="image/png" sizes="32x32" href="./assets/logomenulnew.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="./assets/logomenulnew.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/style.css" />
  <style>
    /* ── Hero Full Viewport + Slideshow ── */
    .site-header { position: relative; }

    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 100px 5vw 80px;
      gap: 2rem;
    }

    .hero-slides {
      position: absolute;
      inset: 0;
      z-index: 0;
      overflow: hidden;
    }
    .hero-slide {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      opacity: 0;
      transition: opacity 1.4s ease-in-out;
      will-change: opacity;
    }
    .hero-slide.active { opacity: 1; }

    /* Gradient overlay — kiri lebih gelap untuk area teks */
    .hero-slides::after {
      content: '';
      position: absolute;
      inset: 0;
      background:
        linear-gradient(to right, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.15) 100%),
        linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.0) 40%, rgba(0,0,0,.5) 100%);
      z-index: 1;
    }

    .hero-text,
    .hero-card { position: relative; z-index: 2; }

    /* ── Teks hero — putih dengan shadow ── */
    .hero-text .hero-kicker {
      color: #f5d8b0 !important;
      text-shadow: 0 1px 6px rgba(0,0,0,.6);
      letter-spacing: .12em;
      font-weight: 600;
    }
    .hero-text h1 {
      color: #ffffff !important;
      text-shadow: 0 2px 16px rgba(0,0,0,.7), 0 1px 4px rgba(0,0,0,.9);
    }
    .hero-text .hero-subtitle {
      color: #f0e4d4 !important;
      text-shadow: 0 1px 8px rgba(0,0,0,.75);
    }

    /* ── Card Freshly Baked — semi-transparan gelap ── */
    .hero-card {
      background: rgba(20, 12, 6, 0.72) !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 16px;
      color: #fff !important;
    }
    .hero-card h3 {
      color: #f5d8b0 !important;
      text-shadow: 0 1px 4px rgba(0,0,0,.5);
    }
    .hero-card li {
      color: #f0e4d4 !important;
    }
    .hero-card .hero-badge {
      background: rgba(255,255,255,.15) !important;
      color: #fff !important;
      border: 1px solid rgba(255,255,255,.25) !important;
    }

    /* Dot indicator */
    .slide-dots {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 3;
    }
    .slide-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,.4);
      border: 2px solid rgba(255,255,255,.6);
      cursor: pointer;
      padding: 0;
      transition: background .3s, transform .3s;
    }
    .slide-dot.active {
      background: #fff;
      transform: scale(1.3);
      border-color: #fff;
    }
  </style>
</head>
<body>

  <header class="site-header" id="beranda">
    <nav class="navbar">
      <a class="brand" href="./index.php">
        <img src="./assets/logomenulnew.png" alt="Roti Menull Knk" class="brand-logo" />
        <span class="brand-name">Roti Menull Knk</span>
      </a>
      <ul class="nav-links">
        <li><a href="#beranda">Beranda</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#location">Location</a></li>
        <li><a href="#review">Review</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Buka navigasi">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <section class="hero">
      <!-- Background slideshow -->
      <div class="hero-slides" id="heroSlides"></div>
      <div class="hero-text">
        <p class="hero-kicker">Made With Love! Welcome</p>
        <h1>Roti Menull Knk</h1>
        <p class="hero-subtitle">Roti hangat, lembut, dan manis dengan cita rasa rumahan yang selalu bikin rindu.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#menu">Order Now</a>
        </div>
      </div>
      <div class="hero-card">
        <h3>Freshly Baked Today</h3>
        <ul>
          <li>Roti Menull signature</li>
          <li>Mie Minull khas</li>
          <li>Teras Menull enak</li>
        </ul>
        <div class="hero-badge">Senin-Sabtu 09.00-22.00</div>
      </div>
    </section>
  </header>

  <main>
    <section class="section menu-categories" id="menu">
      <div class="section-header">
        <h2>Menu Categories</h2>
        <p>Pilih kategori favoritmu untuk lihat menu lengkap dan kenali produknya dulu sebelum memesan.</p>
      </div>
      <div class="menu-grid category-grid" id="allProductGrid"></div>
    </section>

    <section class="section location" id="location">
      <div class="section-header">
        <h2>Location</h2>
        <p>Temukan kami dan ambil pesananmu tepat waktu.</p>
      </div>
      <div class="map-full">
        <iframe
          src="https://www.google.com/maps?q=Roti%20Menull%20KnK,%20Jl.%20Sunan%20Muria,%20Kebonsari%20Wetan,%20Kec.%20Kanigaran,%20Kota%20Probolinggo,%20Jawa%20Timur%2067214,%20Indonesia&output=embed"
          width="100%" height="420" style="border:0;display:block;" allowfullscreen="" loading="lazy"></iframe>
        <p class="address">Jl. Sunan Muria, Kebonsari Wetan, Kec. Kanigaran, Kota Probolinggo, Jawa Timur 67214.</p>
      </div>
    </section>

    <section class="section reviews" id="review">
      <div class="section-header">
        <h2>Google Maps Reviews</h2>
        <p>Ulasan asli dari pelanggan kami di Google Maps.</p>
      </div>
      <div class="reviews-shell" id="reviewShell"></div>
    </section>
  </main>

  <button class="back-to-top" id="backToTop" aria-label="Kembali ke atas">↑</button>

  <div class="floating-socials" aria-label="Akses sosial media cepat">
    <a class="floating-social is-wa" href="https://wa.me/6281292401513" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.94 9.94 0 0 0-8.48 15.18L2 22l5.04-1.5A10 10 0 1 0 12 2Zm0 18.2a8.17 8.17 0 0 1-4.2-1.16l-.3-.18-2.97.88.9-2.9-.2-.3A8.19 8.19 0 1 1 12 20.2Zm4.7-4.68c-.26-.13-1.5-.74-1.73-.83s-.4-.13-.56.13-.65.83-.8 1-.3.2-.56.07a6.7 6.7 0 0 1-2-1.24 7.5 7.5 0 0 1-1.39-1.73c-.14-.26 0-.4.1-.53.12-.13.26-.3.4-.45.13-.16.17-.26.26-.43.1-.17.04-.32-.02-.45-.06-.13-.56-1.34-.77-1.84s-.4-.42-.56-.43h-.48c-.17 0-.45.07-.68.32s-.9.88-.9 2.13.93 2.46 1.06 2.63c.13.17 1.83 2.8 4.43 3.93.62.27 1.1.43 1.47.55.62.2 1.2.17 1.64.1.5-.08 1.5-.6 1.7-1.18.2-.6.2-1.1.14-1.18-.06-.08-.23-.13-.5-.26Z"/></svg>
    </a>
    <a class="floating-social is-ig" href="https://www.instagram.com/roti_menull_knk" target="_blank" rel="noopener" aria-label="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7a2 2 0 0 0-2-2Zm-5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"/></svg>
    </a>
    <a class="floating-social is-tt" href="https://www.tiktok.com/@roti_menull_knk" target="_blank" rel="noopener" aria-label="TikTok">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z"/></svg>
    </a>
  </div>

  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <h3>Roti Menull Knk</h3>
        <p>Roti hangat dengan cita rasa rumahan.</p>
        <p>Senin-Sabtu 09.00-22.00</p>
      </div>
      <div>
        <h4>Navigasi</h4>
        <ul>
          <li><a href="#beranda">Beranda</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#review">Review</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>0812-9240-1513</li>
          <li>@roti_menull_knk</li>
          <li>@roti_menull_knk</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Roti Menull Knk. All rights reserved.</span>
    </div>
  </footer>

  <script>
    // Menu categories
    const MENU_CATEGORIES = [
      {
        name: 'MieeNull',
        image: 'foto_produk_mieenull/burger.jpeg',
        desc: 'Berbagai menu makanan hangat untuk santai atau makan cepat.',
        link: './mie-minull/index.php'
      },
      {
        name: 'Roti Menull',
        image: 'foto_produk_roti/rotimenull.jpeg',
        desc: 'Roti lembut signature dengan topping favorit pelanggan.',
        link: './roti-menull/index.php'
      },
      {
        name: 'Teras Menull',
        image: 'foto_produk_teras/nasi_padang.jpeg',
        desc: 'Prasmanan nasi padang lengkap serta gorengan nikmat.',
        link: './teras-menull/index.php'
      }
    ];

    function renderAllProducts() {
      const grid = document.getElementById('allProductGrid');
      if (!grid) return;
      grid.innerHTML = MENU_CATEGORIES.map((item, index) => `
        <article class="menu-card category-card" style="animation-delay:${index * 90}ms">
          <div class="menu-photo">
            <img src="./assets/${item.image}" alt="${item.name}" loading="lazy"
                 onerror="this.onerror=null;this.src='https://placehold.co/300x300/f0e1d3/6b4632?text=No+Image';" />
          </div>
          <div class="menu-meta">
            <div class="menu-name">${item.name}</div>
            <p class="category-card-desc">${item.desc}</p>
            <a class="btn btn-primary btn-block" href="${item.link}">View Menu</a>
          </div>
        </article>
      `).join('');
    }

    // Reviews
    function renderReviews() {
      const shell = document.getElementById('reviewShell');
      if (!shell) return;
      
      const reviews = [
        {
          author_name: 'Caca Triani',
          rating: 5,
          text: 'Alhamdulillah enak banget, sambel e mantep 🤤 🤤 🤤',
          time: '2 bulan lalu'
        },
        {
          author_name: 'Maulana Yusuf',
          rating: 5,
          text: 'Roti menullnya enak banget, lembut dan manisnya pas. Cocok buat yang suka roti manis.',
          time: '2 bulan lalu'
        },
        {
          author_name: 'Kurniawan',
          rating: 5,
          text: 'Roti paling enak se Probolinggo',
          time: '2 bulan lalu'
        }
      ];

      shell.innerHTML = `
        <div class="reviews-summary-bar">
          <div class="rsb-score">
            <span class="rsb-number">5.0</span>
            <div class="rsb-stars">${'<svg class="rev-star filled" viewBox="0 0 20 20"><path d="M10 1l2.39 5.26 5.61.54-4.14 3.86 1.23 5.54L10 13.27l-5.09 2.93 1.23-5.54L2 6.8l5.61-.54z"/></svg>'.repeat(5)}</div>
            <span class="rsb-label">dari 3 ulasan</span>
          </div>
          <a class="rsb-cta" href="https://maps.app.goo.gl/8QjusxA5wBiYtitS6" target="_blank" rel="noopener">Lihat di Google Maps</a>
        </div>
        <div class="reviews-card-grid">
          ${reviews.map(r => `
            <article class="rev-card">
              <div class="rev-card-stars">${'<svg class="rev-star filled" viewBox="0 0 20 20"><path d="M10 1l2.39 5.26 5.61.54-4.14 3.86 1.23 5.54L10 13.27l-5.09 2.93 1.23-5.54L2 6.8l5.61-.54z"/></svg>'.repeat(r.rating)}</div>
              <p class="rev-card-text">"${r.text}"</p>
              <div class="rev-card-footer">
                <div class="rev-card-author">
                  <div class="rev-avatar" style="background:#c0765a">${r.author_name.charAt(0)}</div>
                  <div class="rev-author-info">
                    <strong>${r.author_name}</strong>
                    <span>Google Maps • ${r.time}</span>
                  </div>
                </div>
                <div class="rev-card-score">${r.rating}/5</div>
              </div>
            </article>
          `).join('')}
        </div>
      `;
    }

    // ── Hero Slideshow ──
    (function () {
      const SLIDES = [
        './assets/beranda_menull_1.jpeg',
        './assets/beranda_menull_2.jpeg',
        './assets/beranda_menull_3.jpeg'
      ];
      const INTERVAL = 4500; // ms per slide

      const container = document.getElementById('heroSlides');
      if (!container) return;

      // Buat elemen slide
      const slideEls = SLIDES.map((src, i) => {
        const el = document.createElement('div');
        el.className = 'hero-slide' + (i === 0 ? ' active' : '');
        el.style.backgroundImage = `url('${src}')`;
        container.appendChild(el);
        return el;
      });

      // Buat dot indicator
      const dotsWrap = document.createElement('div');
      dotsWrap.className = 'slide-dots';
      const dots = SLIDES.map((_, i) => {
        const d = document.createElement('button');
        d.className = 'slide-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Slide ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
        return d;
      });
      container.parentElement.appendChild(dotsWrap);

      let current = 0;
      let timer;

      function goTo(idx) {
        slideEls[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (idx + SLIDES.length) % SLIDES.length;
        slideEls[current].classList.add('active');
        dots[current].classList.add('active');
        resetTimer();
      }

      function next() { goTo(current + 1); }

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, INTERVAL);
      }

      resetTimer();
    })();

    // Nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
      });
    }

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
      });
      backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderAllProducts();
      renderReviews();
    });
  </script>
</body>
</html>