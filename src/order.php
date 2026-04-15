<!DOCTYPE html>
<?php /* Converted to PHP; markup stays the same. */ ?>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order | Roti Menull Knk</title>
  <link rel="icon" type="image/png" href="../assets/logomenul.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
  <!-- Navbar -->
  <header class="site-header compact">
    <nav class="navbar">
      <a class="brand" href="index.php">
        <img src="../assets/logomenul.png" alt="Roti Menull Knk" class="brand-logo" />
        <span class="brand-name">Roti Menull Knk</span>
      </a>
      <button class="nav-toggle" aria-label="Buka navigasi">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        <li><a href="index.php#beranda">Beranda</a></li>
        <li><a href="index.php#menu">Menu</a></li>
        <li><a href="index.php#location">Location</a></li>
        <li><a href="index.php#contact">Contact</a></li>
        <li><a href="index.php#review">Review</a></li>
      </ul>
    </nav>
  </header>

  <!-- Order -->
  <main class="order-page">
    <section class="section order-section">
      <div class="section-header">
        <h1>Form Pemesanan</h1>
        <p>Isi data dengan lengkap agar pesanan siap tepat waktu.</p>
      </div>
      <form class="order-form" id="orderForm" data-wa-number="6281234567890">
        <div class="form-grid">
          <label>
            Nama
            <input type="text" name="nama" placeholder="Nama lengkap" required />
          </label>
          <label>
            No HP / WhatsApp
            <input type="tel" name="nohp" placeholder="08xxxxxxxxxx" required />
          </label>
          <label>
            Pesanan
            <select name="pesanan" required>
              <option value="">Pilih menu</option>
              <option>Roti Menul Original</option>
              <option>Roti Menul Pandan</option>
              <option>Baby Menul Cokelat</option>
              <option>Roti Sobek Keju</option>
              <option>Brownies Choco</option>
              <option>Lainnya</option>
            </select>
          </label>
          <label>
            Jumlah
            <input type="number" name="jumlah" min="1" placeholder="Jumlah" required />
          </label>
          <label>
            Tanggal Pesan
            <input type="date" name="tanggal_pesan" required />
          </label>
          <label>
            Tanggal Ambil
            <input type="date" name="tanggal_ambil" required />
          </label>
          <label>
            Jam Ambil
            <input type="time" name="jam_ambil" required />
          </label>
          <label class="full">
            Keterangan Tambahan
            <textarea name="keterangan" rows="4" placeholder="Contoh: tanpa keju, tambah cokelat"></textarea>
          </label>
        </div>
        <button class="btn btn-primary" type="submit">Kirim ke WhatsApp</button>
      </form>
    </section>
  </main>

  <button class="back-to-top" id="backToTop" aria-label="Kembali ke Beranda">↑</button>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <h3>Roti Menull Knk</h3>
        <p>Operasional: Senin–Sabtu 09.00–22.00</p>
      </div>
      <div>
        <h4>Navigasi</h4>
        <ul>
          <li><a href="index.php#beranda">Beranda</a></li>
          <li><a href="index.php#menu">Menu</a></li>
          <li><a href="index.php#location">Location</a></li>
          <li><a href="index.php#contact">Contact</a></li>
          <li><a href="index.php#review">Review</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>WhatsApp: 0812-3456-7890</li>
          <li>Instagram: @roti.menullknk</li>
          <li>Gmail: roti.menullknk@gmail.com</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Roti Menull Knk. All rights reserved.</span>
      <div class="socials">
        <a href="https://wa.me/6281234567890" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.94 9.94 0 0 0-8.48 15.18L2 22l5.04-1.5A10 10 0 1 0 12 2Zm0 18.2a8.17 8.17 0 0 1-4.2-1.16l-.3-.18-2.97.88.9-2.9-.2-.3A8.19 8.19 0 1 1 12 20.2Zm4.7-4.68c-.26-.13-1.5-.74-1.73-.83s-.4-.13-.56.13-.65.83-.8 1-.3.2-.56.07a6.7 6.7 0 0 1-2-1.24 7.5 7.5 0 0 1-1.39-1.73c-.14-.26 0-.4.1-.53.12-.13.26-.3.4-.45.13-.16.17-.26.26-.43.1-.17.04-.32-.02-.45-.06-.13-.56-1.34-.77-1.84s-.4-.42-.56-.43h-.48c-.17 0-.45.07-.68.32s-.9.88-.9 2.13.93 2.46 1.06 2.63c.13.17 1.83 2.8 4.43 3.93.62.27 1.1.43 1.47.55.62.2 1.2.17 1.64.1.5-.08 1.5-.6 1.7-1.18.2-.6.2-1.1.14-1.18-.06-.08-.23-.13-.5-.26Z\"/></svg>
          <span class="sr-only">WhatsApp</span>
        </a>
        <a href="https://instagram.com" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7a2 2 0 0 0-2-2Zm-5 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5ZM17.8 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z\"/></svg>
          <span class="sr-only">Instagram</span>
        </a>
        <a href="mailto:roti.menullknk@gmail.com" aria-label="Gmail">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 5 8-5V8H4Zm16 8V10.4l-8 5-8-5V16h16Z\"/></svg>
          <span class="sr-only">Gmail</span>
        </a>
      </div>
    </div>
  </footer>

  <script src="script.php"></script>
</body>
</html>
