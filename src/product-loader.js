/**
 * Product Loader - Fetches products from API
 */
class ProductLoader {
  constructor(options = {}) {
    this.gridId = options.gridId || 'categoryProductGrid';
    this.products = [];
    this.apiUrl = options.apiUrl || '../api/data.html';
  }

  async loadProducts() {
    try {
      const response = await fetch(`${this.apiUrl}?action=products`);
      const data = await response.json();
      
      if (data.success && data.data.products && data.data.products.length > 0) {
        this.products = data.data.products;
        return this.products;
      }
      
      this.products = this.getSampleProducts();
      return this.products;
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = this.getSampleProducts();
      return this.products;
    }
  }

  getSampleProducts() {
    return [
      { id: 1, name: "Burger", price: 0, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/burger.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: true, variants: [], extras: [{"id": 101, "name": "Telur", "price": 3000}, {"id": 102, "name": "Keju", "price": 5000}, {"id": 103, "name": "Crispy Chicken", "price": 7000}, {"id": 104, "name": "Beef", "price": 9000}], additional_items: [], package_items: [{"id": 1, "name": "Ayam", "price": 14000, "category": "Pilih Varian Burger"}, {"id": 2, "name": "Beef", "price": 16000, "category": "Pilih Varian Burger"}] },
      { id: 2, name: "Mie Ayam", price: 0, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/hotplate.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: true, variants: [], extras: [{"id": 105, "name": "Pentol (3pcs)", "price": 5000}, {"id": 106, "name": "Pangsit Isi (3pcs)", "price": 5000}, {"id": 107, "name": "Ceker (3pcs)", "price": 5000}], additional_items: [], package_items: [{"id": 4, "name": "Ori", "price": 10000, "category": "Pilih Varian Mie Ayam"}, {"id": 5, "name": "Pedas", "price": 12000, "category": "Pilih Varian Mie Ayam"}, {"id": 6, "name": "Extra Pedas", "price": 13000, "category": "Pilih Varian Mie Ayam"}] },
      { id: 3, name: "Nasi Daun Jeruk", price: 12000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/nasi_daun_jeruk.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: false, variants: [], extras: [{"id": 108, "name": "Moza", "price": 5000}], additional_items: [], package_items: [] },
      { id: 4, name: "Spicy Wings", price: 12000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/spicy_wings.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: false, variants: [], extras: [{"id": 108, "name": "Moza", "price": 5000}], additional_items: [], package_items: [] },
      { id: 5, name: "Pentol Cilok", price: 0, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/pentol_cilok.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"id": 10, "name": "Kuah Pedas", "price": 12000, "category": "Pilih Varian Pentol Cilok"}, {"id": 11, "name": "Kuah Ori", "price": 12000, "category": "Pilih Varian Pentol Cilok"}, {"id": 12, "name": "Saos Pedas", "price": 12000, "category": "Pilih Varian Pentol Cilok"}, {"id": 13, "name": "Saos Ori", "price": 12000, "category": "Pilih Varian Pentol Cilok"}] },
      { id: 6, name: "Chicken Patota Saos Creamy", price: 15000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/spicyy_wings_with_potato.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 7, name: "Roti Bakar", price: 0, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/roti_bakar.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"id": 16, "name": "Coklat + Kacang", "price": 9000, "category": "Pilih Varian Roti Bakar"}, {"id": 17, "name": "Ice Cream (Coklat + Ice Cream)", "price": 11000, "category": "Pilih Varian Roti Bakar"}, {"id": 18, "name": "Brown Sugar", "price": 11000, "category": "Pilih Varian Roti Bakar"}] },
      { id: 8, name: "Kentang", price: 8000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/spicyy_wings_with_potato.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 9, name: "Ayam Keju (3pcs)", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/ayam_keju.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 10, name: "Ayam Rambutan (3pcs)", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/ayam_keju.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 11, name: "Nuget (5pcs)", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/ayam_keju.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 12, name: "Tahu Pentol (3pcs)", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/pentol_cilok.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 13, name: "Tahu Walik (5pcs)", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/pentol_cilok.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 14, name: "Mix Platter", price: 15000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/spicyy_wings_with_potato.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 15, name: "Sogem", price: 13000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/sogem.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 16, name: "Teh", price: 4000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/americano.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 17, name: "Jeruk", price: 5000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/jeruk.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 18, name: "Air Mineral Kecil", price: 4000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/air_mineral_kecil.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 19, name: "Air Mineral Besar", price: 6000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/air_mineral_besar.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 20, name: "Es Cendol", price: 12000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/es_cendol.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 21, name: "Americano", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/americano.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 22, name: "Lemon Tea", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/lemon_tea.png", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 23, name: "Kopi Susu Gula Aren", price: 10000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/kopi_susu_gula_aren.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 24, name: "Teh Sharing (5 orang)", price: 20000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/teh_sharing.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 25, name: "Milkshake", price: 0, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/milkshake.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: true, variants: [], extras: [{"id": 109, "name": "Ice Cream", "price": 2000}], additional_items: [], package_items: [{"id": 51, "name": "Taro", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 52, "name": "Red Velvet", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 53, "name": "Coklat", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 54, "name": "Thai Tea", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 55, "name": "Milo", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 56, "name": "Salted Caramel", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 57, "name": "Matcha", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 58, "name": "Cappuccino", "price": 10000, "category": "Pilih Varian Milkshake"}, {"id": 59, "name": "Brown Sugar", "price": 12000, "category": "Pilih Varian Milkshake"}, {"id": 60, "name": "Strawberry", "price": 12000, "category": "Pilih Varian Milkshake"}, {"id": 61, "name": "Vanilla Oreo", "price": 12000, "category": "Pilih Varian Milkshake"}] },
      { id: 26, name: "Hotplate", price: 0, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/hotplate.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: true, variants: [], extras: [{"id": 110, "name": "Keju", "price": 5000}, {"id": 111, "name": "Moza", "price": 5000}], additional_items: [], package_items: [{"id": 70, "name": "Ori", "price": 15000, "category": "Pilih Varian Hotplate"}, {"id": 71, "name": "Pedas", "price": 17000, "category": "Pilih Varian Hotplate"}, {"id": 72, "name": "Ekstra Pedas", "price": 18000, "category": "Pilih Varian Hotplate"}] },
      { id: 27, name: "Spicy Wings with Potato", price: 15000, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/spicyy_wings_with_potato.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: false, variants: [], extras: [{"id": 112, "name": "Keju", "price": 5000}, {"id": 113, "name": "Moza", "price": 5000}], additional_items: [], package_items: [] },
      { id: 28, name: "Ayam Pok Pok", price: 0, brand_id: 1, brand_name: "MieeNull", image: "foto_produk_mieenull/ayam_pok_pok.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"id": 73, "name": "Ori", "price": 15000, "category": "Pilih Varian Ayam Pok Pok"}, {"id": 74, "name": "BBQ", "price": 12000, "category": "Pilih Varian Ayam Pok Pok"}] },
      { id: 100, name: "Roti Menull", price: 0, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/rotimenull.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: true, is_package: true, variants: [], extras: [{"id": 201, "name": "Keju", "price": 3000}, {"id": 202, "name": "Kacang", "price": 3000}, {"id": 203, "name": "Moza", "price": 3000}], additional_items: [], package_items: [{"name": "Roti Menull Coklat", "price": 17000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Keju", "price": 17000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Tiramisu", "price": 17000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Green Tea", "price": 17000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Sarikaya Pandan", "price": 17000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Vanilla", "price": 17000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Kacang", "price": 17000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Choco Crunchy Oreo", "price": 20000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Milky Crunchy Oreo", "price": 20000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Coklat Extra Kacang", "price": 20000, "category": "Varian Rasa Manis"}, {"name": "Roti Menull Abon Mayo", "price": 23000, "category": "Varian Rasa Gurih"}, {"name": "Roti Menull Sosis Moza", "price": 23000, "category": "Varian Rasa Gurih"}] },
      { id: 101, name: "Baby Menull", price: 0, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/babymenull.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"name": "Baby Menull Coklat", "price": 10000, "category": "Pilih Varian Baby Menull"}, {"name": "Baby Menull Keju", "price": 11000, "category": "Pilih Varian Baby Menull"}, {"name": "Baby Menull Tiramisu", "price": 11000, "category": "Pilih Varian Baby Menull"}, {"name": "Baby Menull Green Tea", "price": 11000, "category": "Pilih Varian Baby Menull"}, {"name": "Baby Menull Choco Crunchy Oreo", "price": 12000, "category": "Pilih Varian Baby Menull"}, {"name": "Baby Menull Milky Crunchy Oreo", "price": 12000, "category": "Pilih Varian Baby Menull"}, {"name": "Baby Menull Abon Mayo", "price": 13000, "category": "Pilih Varian Baby Menull"}, {"name": "Baby Menull Sosis Moza", "price": 13000, "category": "Pilih Varian Baby Menull"}] },
      { id: 102, name: "Mini Menull", price: 0, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/rotimenull_minimenull.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"name": "Mini Menull Coklat", "price": 4000, "category": "Pilih Varian Mini Menull"}, {"name": "Mini Menull Keju", "price": 5000, "category": "Pilih Varian Mini Menull"}, {"name": "Mini Menull Tiramisu", "price": 5000, "category": "Pilih Varian Mini Menull"}, {"name": "Mini Menull Green Tea", "price": 5000, "category": "Pilih Varian Mini Menull"}, {"name": "Mini Menull Choco Crunchy", "price": 5000, "category": "Pilih Varian Mini Menull"}, {"name": "Mini Menull Cream", "price": 5000, "category": "Pilih Varian Mini Menull"}, {"name": "Mini Menull Abon", "price": 6000, "category": "Pilih Varian Mini Menull"}] },
      { id: 103, name: "Roti Sobek Menull", price: 0, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/rotisobek.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"name": "Roti Sobek Menull Coklat", "price": 25000, "category": "Pilih Varian Roti Sobek"}, {"name": "Roti Sobek Menull Keju", "price": 28000, "category": "Pilih Varian Roti Sobek"}, {"name": "Roti Sobek Menull Choco Crunchy", "price": 28000, "category": "Pilih Varian Roti Sobek"}, {"name": "Roti Sobek Menull Tiramisu Crunchy", "price": 28000, "category": "Pilih Varian Roti Sobek"}, {"name": "Roti Sobek Menull Green Tea Crunchy", "price": 28000, "category": "Pilih Varian Roti Sobek"}, {"name": "Roti Sobek Menull Coklat Extra Kacang", "price": 30000, "category": "Pilih Varian Roti Sobek"}, {"name": "Roti Sobek Menull Abon Mayo", "price": 30000, "category": "Pilih Varian Roti Sobek"}] },
      { id: 104, name: "Brownies Kukus", price: 0, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/brownies_kukus.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"name": "Brownies Kukus Original", "price": 28000, "category": "Pilih Varian Brownies Kukus"}, {"name": "Brownies Kukus Coklat", "price": 32000, "category": "Pilih Varian Brownies Kukus"}, {"name": "Brownies Kukus Keju", "price": 32000, "category": "Pilih Varian Brownies Kukus"}, {"name": "Brownies Kukus Choco Crunchy", "price": 34000, "category": "Pilih Varian Brownies Kukus"}, {"name": "Brownies Kukus Tiramisu Crunchy", "price": 34000, "category": "Pilih Varian Brownies Kukus"}, {"name": "Brownies Kukus Green Tea Crunchy", "price": 34000, "category": "Pilih Varian Brownies Kukus"}] },
      { id: 105, name: "Brownies Cepuk", price: 0, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/brownies_cepuk.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"name": "Brownies Cepuk Coklat", "price": 14000, "category": "Pilih Varian Brownies Cepuk"}, {"name": "Brownies Cepuk Choco Crunchy", "price": 14000, "category": "Pilih Varian Brownies Cepuk"}, {"name": "Brownies Cepuk Tiramisu", "price": 14000, "category": "Pilih Varian Brownies Cepuk"}, {"name": "Brownies Cepuk Green Tea", "price": 14000, "category": "Pilih Varian Brownies Cepuk"}] },
      { id: 106, name: "Bolu Menull", price: 0, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/bolumenull_bolu.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"name": "Bolu Menull Original (Kecil)", "price": 15000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Original (Besar)", "price": 26000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Keju (Kecil)", "price": 17000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Keju (Besar)", "price": 30000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Choco Crunchy (Kecil)", "price": 18000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Choco Crunchy (Besar)", "price": 32000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Tiramisu Crunchy (Kecil)", "price": 18000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Tiramisu Crunchy (Besar)", "price": 32000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Green Tea (Kecil)", "price": 18000, "category": "Pilih Varian Bolu Menull"}, {"name": "Bolu Menull Green Tea (Besar)", "price": 32000, "category": "Pilih Varian Bolu Menull"}] },
      { id: 107, name: "Menull Nyoklaaat", price: 16000, brand_id: 2, brand_name: "Roti Menull", image: "foto_produk_roti/rotimenull_nyoklat.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 200, name: "Nasi Padang", price: 0, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/nasi_padang.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: true, variants: [], extras: [], additional_items: [], package_items: [{"id": 301, "name": "Nasi Putih", "price": 4000, "category": "Pilih Nasi"}, {"id": 302, "name": "Nasi Daun Jeruk", "price": 5000, "category": "Pilih Nasi"}, {"id": 303, "name": "Ayam Serundeng", "price": 8000, "category": "Lauk Utama"}, {"id": 304, "name": "Ayam Crispy", "price": 9000, "category": "Lauk Utama"}, {"id": 305, "name": "Ayam Gulai", "price": 9000, "category": "Lauk Utama"}, {"id": 306, "name": "Ayam Rendang", "price": 10000, "category": "Lauk Utama"}, {"id": 307, "name": "Ayam Balado", "price": 9000, "category": "Lauk Utama"}, {"id": 308, "name": "Sayap Pedas", "price": 9000, "category": "Lauk Utama"}, {"id": 309, "name": "Ayam Bakar", "price": 14000, "category": "Lauk Utama"}, {"id": 310, "name": "Ayam Bakar Utuh", "price": 64000, "category": "Lauk Utama"}, {"id": 311, "name": "Iga Bakar", "price": 23000, "category": "Lauk Utama"}, {"id": 312, "name": "Bebek Bakar Kecil", "price": 10000, "category": "Lauk Utama"}, {"id": 313, "name": "Bebek Bakar Besar", "price": 21000, "category": "Lauk Utama"}, {"id": 314, "name": "Bebek Bakar Utuh", "price": 84000, "category": "Lauk Utama"}, {"id": 315, "name": "Rendang Daging", "price": 14000, "category": "Lauk Utama"}, {"id": 316, "name": "Rendang Ati", "price": 14000, "category": "Lauk Utama"}, {"id": 317, "name": "Paru Goreng", "price": 14000, "category": "Lauk Utama"}, {"id": 318, "name": "Gulai Otak", "price": 15000, "category": "Lauk Utama"}, {"id": 319, "name": "Gulai Tunjang", "price": 23000, "category": "Lauk Utama"}, {"id": 320, "name": "Ikan Goreng", "price": 9000, "category": "Lauk Utama"}, {"id": 321, "name": "Ikan Gulai", "price": 10000, "category": "Lauk Utama"}, {"id": 322, "name": "Ikan Balado", "price": 10000, "category": "Lauk Utama"}, {"id": 323, "name": "Balado Teri", "price": 9000, "category": "Lauk Utama"}, {"id": 324, "name": "Ati Balado Lilit", "price": 9000, "category": "Lauk Utama"}, {"id": 325, "name": "Gulai Ati Lilit", "price": 9000, "category": "Lauk Utama"}, {"id": 326, "name": "Tongkol Balado", "price": 9000, "category": "Lauk Utama"}, {"id": 327, "name": "Gulai Tongkol", "price": 9000, "category": "Lauk Utama"}, {"id": 328, "name": "Pentol Pedas (isi 5)", "price": 6000, "category": "Lauk Utama"}, {"id": 329, "name": "Telur Dadar", "price": 6000, "category": "Lauk Pendamping"}, {"id": 330, "name": "Telur Balado", "price": 6000, "category": "Lauk Pendamping"}, {"id": 331, "name": "Telur Gulai", "price": 6000, "category": "Lauk Pendamping"}, {"id": 332, "name": "Tahu", "price": 4000, "category": "Lauk Pendamping"}, {"id": 333, "name": "Tempe", "price": 4000, "category": "Lauk Pendamping"}, {"id": 334, "name": "Dadar Jagung", "price": 5000, "category": "Lauk Pendamping"}, {"id": 335, "name": "Tempe Tepung", "price": 3000, "category": "Lauk Pendamping"}, {"id": 336, "name": "Bakwan Sayur", "price": 2000, "category": "Lauk Pendamping"}, {"id": 337, "name": "Naget", "price": 3000, "category": "Lauk Pendamping"}, {"id": 338, "name": "Tahu Bakso", "price": 3000, "category": "Lauk Pendamping"}, {"id": 339, "name": "Perkedel", "price": 6000, "category": "Lauk Pendamping"}, {"id": 340, "name": "Mie/Bihun", "price": 0, "category": "FREE - Sayur (Berganti Setiap Hari)"}, {"id": 341, "name": "Sayur Gulai (Nangka, Singkong, Labu Siam)", "price": 0, "category": "FREE - Sayur (Berganti Setiap Hari)"}, {"id": 342, "name": "Tumisan Sayur (Pare, Jamur, Sawi Putih, Acer)", "price": 0, "category": "FREE - Sayur (Berganti Setiap Hari)"}, {"id": 343, "name": "Sayur Bening (SOP, Sayur Adam, Lingkiri)", "price": 0, "category": "FREE - Sayur (Berganti Setiap Hari)"}, {"id": 344, "name": "Sayur Padang (Daun Singkong, Gubis Kuning)", "price": 0, "category": "FREE - Sayur (Berganti Setiap Hari)"}, {"id": 345, "name": "Sambal Bawang", "price": 0, "category": "FREE - Pilih Sambal"}, {"id": 346, "name": "Sambal Ijo", "price": 0, "category": "FREE - Pilih Sambal"}, {"id": 347, "name": "Sambal Bakar", "price": 0, "category": "FREE - Pilih Sambal"}, {"id": 348, "name": "Lalapan", "price": 0, "category": "FREE - Lalapan"}] },
      { id: 210, name: "Es Teh (Free)", price: 0, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/esteh.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 211, name: "Teh Hangat", price: 4000, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/teh_hangat.png", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 212, name: "Es Jeruk", price: 6000, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/es_jeruk.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 213, name: "Air Mineral Kecil", price: 4000, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/airmineral.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 214, name: "Air Mineral Besar", price: 6000, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/airmineral.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 220, name: "Kerupuk Udang", price: 1000, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/kerupukudang.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 221, name: "Kerupuk Putih", price: 2000, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/kerupukputih.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] },
      { id: 222, name: "Kerupuk Kulit", price: 7000, brand_id: 3, brand_name: "Teras Menull", image: "foto_produk_teras/kerupukkulit.jpeg", enable_serving: false, packaging_fee: 0, has_variants: false, has_extras: false, is_package: false, variants: [], extras: [], additional_items: [], package_items: [] }
    
    ];
  }

  renderProducts() {
    const grid = document.getElementById(this.gridId);
    if (!grid) return;

    const products = this.products.length > 0 ? this.products : this.getSampleProducts();

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--brown-500);">
          No products available
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map((product, index) => this.renderCard(product, index)).join('');
  }

  getAssetBasePath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const depth = path.split('/').filter(Boolean).length;
    return depth > 2 ? '../assets/' : './assets/';
  }

  resolveImagePath(imagePath) {
    if (!imagePath) {
      return 'https://placehold.co/300x300/f0e1d3/6b4632?text=No+Image';
    }

    if (/^(https?:)?\/\//i.test(imagePath) || imagePath.startsWith('data:') || imagePath.startsWith('/')) {
      return imagePath;
    }

    const normalized = imagePath
      .replace(/^(\.\.\/)?assets\//, '')
      .replace(/^\.\/assets\//, '')
      .replace(/^assets\//, '');

    return `${this.getAssetBasePath()}${normalized}`;
  }

  renderCard(product, index) {
      const variantsJson = JSON.stringify(product.variants || []).replace(/'/g, "&#39;");
      const extrasJson = JSON.stringify(product.extras || []).replace(/'/g, "&#39;");
      const additionalJson = JSON.stringify(product.additional_items || []).replace(/'/g, "&#39;");
      const packageJson = JSON.stringify(product.package_items || []).replace(/'/g, "&#39;");
      
      // Tentukan text tombol
      let buttonText = 'Add to Cart';
      if (product.is_package) {
        buttonText = 'Pilih Varian';
      } else if (product.has_variants) {
        buttonText = 'Pilih Varian';
      }
      
      return `
      <article class="menu-card menu-item-card" 
               data-product-id="${product.id}"
               data-product-name="${this.escapeHtml(product.name)}"
               data-product-price="${product.price}"
               data-product-brand="${this.escapeHtml(product.brand_name || '')}"
               data-product-brand-id="${product.brand_id || ''}"
               data-product-category="${product.category_id || ''}"
               data-product-image="${product.image || ''}"
               data-enable-serving="${product.enable_serving ? '1' : '0'}"
               data-packaging-fee="${product.packaging_fee || 0}"
               data-has-variants="${product.has_variants ? '1' : '0'}"
               data-has-extras="${product.has_extras ? '1' : '0'}"
               data-is-package="${product.is_package ? '1' : '0'}"
               data-package-items='${packageJson}'
               data-variants='${variantsJson}'
               data-extras='${extrasJson}'
               data-additional-items='${additionalJson}'
               style="animation-delay: ${index * 60}ms">
        <div class="menu-photo">
          <img src="${this.resolveImagePath(product.image)}" 
               alt="${this.escapeHtml(product.name)}" 
               loading="lazy"
               onerror="this.onerror=null;this.src='https://placehold.co/300x300/f0e1d3/6b4632?text=No+Image';" />
        </div>
        <div class="menu-meta">
          <div class="menu-name">${this.escapeHtml(product.name)}</div>
          <div class="menu-brand">${this.escapeHtml(product.brand_name || '')}</div>
          ${product.is_package ? `<div style="font-size:0.7rem;color:var(--brown-400);">Pilih Varian</div>` : ''}
          ${product.has_variants ? `<div style="font-size:0.7rem;color:var(--brown-400);">${product.variants.length} varian rasa</div>` : ''}
          ${product.price > 0 ? `<div class="menu-price">${this.formatCurrency(product.price)}</div>` : ''}
          <div class="menu-actions">
            <button class="btn btn-primary btn-add-to-cart" 
                    type="button"
                    data-product-id="${product.id}"
                    onclick="openOrderModal(this)">
              ${buttonText}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

window.ProductLoader = ProductLoader;

function openOrderModal(button) {
  const card = button.closest('.menu-item-card') || button.closest('.menu-card');
  if (!card) return;

  const hasVariants = card.dataset.hasVariants === '1';
  const hasExtras = card.dataset.hasExtras === '1';
  const isPackage = card.dataset.isPackage === '1';
  
  let variants = [];
  let extras = [];
  let additionalItems = [];
  let packageItems = [];
  
  try { variants = JSON.parse(card.dataset.variants || '[]'); } catch(e) { variants = []; }
  try { extras = JSON.parse(card.dataset.extras || '[]'); } catch(e) { extras = []; }
  try { additionalItems = JSON.parse(card.dataset.additionalItems || '[]'); } catch(e) { additionalItems = []; }
  try { packageItems = JSON.parse(card.dataset.packageItems || '[]'); } catch(e) { packageItems = []; }

  const product = {
    id: card.dataset.productId || button.dataset.productId,
    name: card.dataset.productName || '',
    price: parseInt(card.dataset.productPrice) || 0,
    brand_name: card.dataset.productBrand || '',
    brand_id: parseInt(card.dataset.productBrandId) || null,
    category_id: card.dataset.productCategory || null,
    image: card.dataset.productImage || '',
    enable_serving: card.dataset.enableServing === '1' || card.dataset.enableServing === 'true',
    packaging_fee: parseInt(card.dataset.packagingFee) || 0,
    has_variants: hasVariants,
    has_extras: hasExtras,
    is_package: isPackage,
    variants: variants,
    extras: extras,
    additional_items: additionalItems,
    package_items: packageItems
  };

  if (window.orderModal) {
    window.orderModal.open(product);
  } else {
    console.error('Order modal not initialized');
  }
}
