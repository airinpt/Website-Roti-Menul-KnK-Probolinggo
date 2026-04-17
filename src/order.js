const MENU = [
  {
    kategori: "Roti Menull",
    emoji: "🍞",
    produk: [
      {
        nama: "Roti Menull",
        varian: [
          { rasa: "Coklat",        harga: 17000 },
          { rasa: "Keju",          harga: 17000 },
          { rasa: "Tiramisu",      harga: 17000 },
          { rasa: "Green Tea",     harga: 17000 },
          { rasa: "Sarikaya Pandan",     harga: 17000 },
          { rasa: "Vanilla",   harga: 17000 },
          { rasa: "Kacang",   harga: 17000 },
          { rasa: "Choco Cruncy Oreo",   harga: 20000 },
          { rasa: "Milky Crunchy Oreo",  harga: 20000 },
          { rasa: "Coklat Extra Kacang",   harga: 20000 },
          { rasa: "Abon Mayo",  harga: 23000 },
          { rasa: "Sosis Moza",  harga: 23000 },
          { rasa: "Menull Nyoklaaat", harga: 16000},
        ]
      },
      {
        nama: "Baby Menull",
        varian: [
          { rasa: "Coklat",        harga: 10000 },
          { rasa: "Keju",          harga: 11000 },
          { rasa: "Tiramisu",   harga: 11000 },
          { rasa: "Green Tea",    harga: 11000 },
          { rasa: "Choco Cruncy Oreo",   harga: 12000 },
          { rasa: "Milky Crunchy Oreo",  harga: 12000 },
          { rasa: "Abon Mayo",  harga: 13000 },
          { rasa: "Sosis Moza",  harga: 13000 },
        ]
      },
      {
        nama: "Roti Sobek Menull",
        varian: [
          { rasa: "Coklat",        harga: 25000 },
          { rasa: "Keju",          harga: 28000 },
          { rasa: "Coklat Crunchy",   harga: 28000 },
          { rasa: "Tiramisu",   harga: 28000 },
          { rasa: "Green Tea",    harga: 28000 },
          { rasa: "Coklat Extra Kacang",   harga: 30000 },
          { rasa: "Abon Mayo",  harga: 30000 },
        ]
      },
      {
        nama: "Mini Menull",
        varian: [
          { rasa: "Coklat",       harga: 4000},
          { rasa: "Keju",         harga: 5000},
          { rasa: "Tiramisu",     harga: 5000},
          { rasa: "Green Tea",    harga: 5000},
          { rasa: "Choco Crunchy", harga: 5000},
          { rasa: "Cream",        harga: 5000},
          { rasa: "Abon",         harga: 6000},
        ]
      }
    ]
  },
  {
    kategori: "Bolu",
    emoji: "🎂",
    produk: [
      {
        nama: "Bolu Menull",
        varian: [ 
          { rasa: "Original Kecil",      harga: 15000 },
          { rasa: "Original Besar",      harga: 26000 },
          { rasa: "Keju Kecil", harga: 17000 },
          { rasa: "Keju Besar", harga: 30000 },
          { rasa: "Choco Crunchy Kecil", harga: 18000},
          { rasa: "Choco Crunchy Besar", harga: 32000},
          { rasa: "Tiramisu Crunchy Kecil", harga: 18000},
          { rasa: "Tiramisu Crunchy Besar", harga: 32000},
          { rasa: "Green Tea Crunchy Kecil", harga: 18000},
          { rasa: "Green Tea Crunchy Besar", harga: 32000},
        ]
      }]
  } , 
  {
    kategori: "Brownies",
    emoji: "🍫",
    produk: [
      {
        nama: "Brownies Kukus",
        varian: [
          { rasa: "Original",      harga: 28000 },
          { rasa: "Coklat",          harga: 32000 },
          { rasa: "Keju",        harga: 32000 },
          { rasa: "Choco Crunchy", harga: 34000},
          { rasa: "Tiramisu Crunchy", harga: 34000},
          { rasa: "Green Tea Crunchy", harga: 34000},
        ]
      },
      {
        nama: "Brownies Cepuk",
        varian: [
          { rasa: "Coklat",      harga: 14000 },
          { rasa: "Tiramisu",          harga: 14000 },
          { rasa: "Green Tea",   harga: 14000 },
          { rasa: "Choco Crunchy", harga: 14000},
        ]
      },
    ]
  }
];

const WA_NUMBER = "6289523896740";
const pesanan = {};

let modalKi = null;
let modalPi = null;

function rp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function renderMenu() {
  const container = document.getElementById('orderMenu');
  container.innerHTML = MENU.map((kat, ki) => `
    <div class="kat-block">
      <button class="kat-header" type="button" aria-expanded="false"
              onclick="toggleKat(this, ${ki})">
        <span class="kat-left">
          <span class="kat-emoji">${kat.emoji}</span>
          <span class="kat-name">${kat.kategori}</span>
        </span>
        <span class="kat-arrow">▾</span>
      </button>
      <div class="kat-body" id="kat-body-${ki}" style="display:none">
        ${kat.produk.map((p, pi) => {
          return `
            <div class="varian-row" id="vrow-${ki}_${pi}">
              <div class="varian-info">
                <span class="varian-name">${p.nama}</span>
                <span class="varian-badge" id="badge-${ki}_${pi}" style="display:none">0</span>
              </div>
              <button class="btn-pilih-rasa" id="btnRasa-${ki}_${pi}"
                      type="button"
                      onclick="openRasa(${ki}, ${pi})">
                Pilih Rasa ▾
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}

function toggleKat(btn, ki) {
  const body = document.getElementById(`kat-body-${ki}`);
  const open = body.style.display !== 'none';
  document.querySelectorAll('.kat-body').forEach(b => b.style.display = 'none');
  document.querySelectorAll('.kat-header').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    b.querySelector('.kat-arrow').textContent = '▾';
  });
  if (!open) {
    body.style.display = 'block';
    btn.setAttribute('aria-expanded', 'true');
    btn.querySelector('.kat-arrow').textContent = '▴';
  }
}

function openRasa(ki, pi) {
  modalKi = ki;
  modalPi = pi;
  const kat = MENU[ki];
  const produk = kat.produk[pi];

  document.getElementById('rasaTitle').textContent = produk.nama;
  document.getElementById('rasaSub').textContent = `${kat.emoji} ${kat.kategori} — pilih varian rasa`;

  const list = document.getElementById('rasaList');
  list.innerHTML = produk.varian.map((v, vi) => {
    const key = `${ki}_${pi}_${vi}`;
    const qty = pesanan[key] ? pesanan[key].qty : 0;
    return `
      <div class="rasa-item ${qty > 0 ? 'rasa-has-qty' : ''}" id="ritem-${key}">
        <div class="rasa-info">
          <div class="rasa-nama">${v.rasa}</div>
          <div class="rasa-harga">${rp(v.harga)}</div>
        </div>
        <div class="rasa-qty-ctrl">
          <button class="rasa-qty-btn" type="button"
                  onclick="changeRasaQty(${ki},${pi},${vi},-1)">−</button>
          <span class="rasa-qty-num" id="rqty-${key}">${qty}</span>
          <button class="rasa-qty-btn" type="button"
                  onclick="changeRasaQty(${ki},${pi},${vi},1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('rasaOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRasa() {
  document.getElementById('rasaOverlay').classList.remove('open');
  document.body.style.overflow = '';
  updateVarianBadge(modalKi, modalPi);
  updatePreview();
  modalKi = null;
  modalPi = null;
}

document.getElementById('rasaClose').addEventListener('click', closeRasa);
document.getElementById('rasaDone').addEventListener('click', closeRasa);
document.getElementById('rasaOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeRasa();
});

function changeRasaQty(ki, pi, vi, delta) {
  const key = `${ki}_${pi}_${vi}`;
  const kat  = MENU[ki];
  const prod = kat.produk[pi];
  const v    = prod.varian[vi];

  const current = pesanan[key] ? pesanan[key].qty : 0;
  const next    = Math.max(0, current + delta);

  if (next === 0) {
    delete pesanan[key];
  } else {
    pesanan[key] = {
      nama: prod.nama,
      kategori: kat.kategori,
      rasa: v.rasa,
      harga: v.harga,
      qty: next
    };
  }

  const qtyEl = document.getElementById(`rqty-${key}`);
  if (qtyEl) qtyEl.textContent = next;

  const ritem = document.getElementById(`ritem-${key}`);
  if (ritem) ritem.classList.toggle('rasa-has-qty', next > 0);
}

function updateVarianBadge(ki, pi) {
  const totalQty = MENU[ki].produk[pi].varian.reduce((sum, _, vi) => {
    const key = `${ki}_${pi}_${vi}`;
    return sum + (pesanan[key] ? pesanan[key].qty : 0);
  }, 0);

  const badge  = document.getElementById(`badge-${ki}_${pi}`);
  const btnEl  = document.getElementById(`btnRasa-${ki}_${pi}`);
  const rowEl  = document.getElementById(`vrow-${ki}_${pi}`);

  if (badge) {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? 'inline-flex' : 'none';
  }
  if (btnEl) {
    btnEl.classList.toggle('has-order', totalQty > 0);
    btnEl.textContent = totalQty > 0 ? `${totalQty} dipilih ✓` : 'Pilih Rasa ▾';
  }
  if (rowEl) rowEl.classList.toggle('varian-selected', totalQty > 0);
}

function updatePreview() {
  const items   = Object.values(pesanan).filter(p => p.qty > 0);
  const preview = document.getElementById('orderPreview');
  const btnNext = document.getElementById('btnNext');
  const hint    = document.getElementById('stepHint');

  if (items.length === 0) {
    preview.style.display = 'none';
    btnNext.disabled = true;
    hint.style.display = 'block';
    return;
  }

  preview.style.display = 'block';
  btnNext.disabled = false;
  hint.style.display = 'none';

  const total = items.reduce((s, i) => s + i.harga * i.qty, 0);

  document.getElementById('previewList').innerHTML = items.map(i =>
    `<div class="preview-item">
       <span>${i.kategori} — ${i.nama} <em style="color:#9a6b4b">(${i.rasa})</em></span>
       <span style="white-space:nowrap">${rp(i.harga)} ×${i.qty}</span>
     </div>`
  ).join('');

  document.getElementById('previewTotal').textContent = rp(total);
}

document.getElementById('btnNext').addEventListener('click', () => {
  const items = Object.values(pesanan).filter(p => p.qty > 0);
  if (items.length === 0) return;

  const total = items.reduce((s, i) => s + i.harga * i.qty, 0);

  const box = document.getElementById('summaryBox');
  box.innerHTML = `
    <h4>🛒 Ringkasan Pesanan</h4>
    ${items.map(i =>
      `<div class="summary-item">
         <span>${i.kategori} — ${i.nama} <em style="color:#9a6b4b">(${i.rasa})</em></span>
         <span style="white-space:nowrap">${rp(i.harga)} ×${i.qty}</span>
       </div>`
    ).join('')}
    <div style="margin-top:10px;text-align:right;font-weight:700;color:#6b4632">
      Total: ${rp(total)}
    </div>
  `;

  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  document.getElementById('stepDot1').classList.remove('active');
  document.getElementById('stepDot2').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const today = new Date().toISOString().split('T')[0];
  const tgl   = document.querySelector('[name="tanggal_ambil"]');
  if (tgl) tgl.min = today;
});

document.getElementById('btnBack').addEventListener('click', () => {
  document.getElementById('step1').style.display = 'block';
  document.getElementById('step2').style.display = 'none';
  document.getElementById('stepDot1').classList.add('active');
  document.getElementById('stepDot2').classList.remove('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fd   = new FormData(this);
  const data = Object.fromEntries(fd.entries());
  const items = Object.values(pesanan).filter(p => p.qty > 0);
  const total = items.reduce((s, i) => s + i.harga * i.qty, 0);

  if (!data.nama.trim())   { toast('Nama belum diisi!'); return; }
  if (!data.nohp.trim())   { toast('No WA belum diisi!'); return; }
  if (!data.tanggal_ambil) { toast('Tanggal ambil belum dipilih!'); return; }
  if (!data.jam_ambil)     { toast('Jam ambil belum dipilih!'); return; }

  const lines = [
    'Halo Roti Menull Knk',
    'Saya ingin memesan:',
    '',
    ...items.map(i => `- ${i.nama} (${i.rasa}) x${i.qty} = ${rp(i.harga * i.qty)}`),
    '',
    `Total: ${rp(total)}`,
    `Nama: ${data.nama}`,
    `No WA: ${data.nohp}`,
    `Tgl Ambil: ${data.tanggal_ambil}`,
    `Jam Ambil: ${data.jam_ambil}`,
  ];
  if (data.keterangan.trim()) {
    lines.push(`Catatan: ${data.keterangan}`);
  }

  const msg = lines.join('\n');
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
});

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2800);
}

const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => btt.classList.toggle('show', scrollY > 300));
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

renderMenu();
