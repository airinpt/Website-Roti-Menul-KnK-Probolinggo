/**
 * Admin Panel JavaScript
 * Handles all admin functionality for managing products, categories, extras, and items
 */

const API_BASE = '../api/data.html';
const ADMIN_API = '../api/admin.html';

class AdminPanel {
  constructor() {
    this.brands = [];
    this.categories = [];
    this.products = [];
    this.extras = [];
    this.additionalItems = [];
    this.editingId = null;
  }

  async init() {
    this.setupEventListeners();
    await this.loadAllData();
    this.renderDashboard();
  }

  setupEventListeners() {
    document.querySelectorAll('.nav-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.switchSection(e.target.dataset.section);
      });
    });

    document.getElementById('addCategoryBtn').addEventListener('click', () => this.openCategoryModal());
    document.getElementById('addProductBtn').addEventListener('click', () => this.openProductModal());
    document.getElementById('addExtraBtn').addEventListener('click', () => this.openExtraModal());
    document.getElementById('addAdditionalBtn').addEventListener('click', () => this.openAdditionalModal());

    document.getElementById('categoryForm').addEventListener('submit', (e) => this.handleCategorySubmit(e));
  }

  async loadAllData() {
    try {
      // Load brands
      const brandsRes = await fetch(`${API_BASE}?action=brands`);
      const brandsData = await brandsRes.json();
      this.brands = brandsData.data.brands || [];

      // Load categories
      const categoriesRes = await fetch(`${API_BASE}?action=categories`);
      const categoriesData = await categoriesRes.json();
      this.categories = categoriesData.data.categories || [];

      // Load products
      const productsRes = await fetch(`${API_BASE}?action=products`);
      const productsData = await productsRes.json();
      this.products = productsData.data.products || [];

      // Load extras
      const extrasRes = await fetch(`${API_BASE}?action=extras`);
      const extrasData = await extrasRes.json();
      this.extras = extrasData.data.extras || [];

      // Load additional items
      const itemsRes = await fetch(`${API_BASE}?action=additional_items`);
      const itemsData = await itemsRes.json();
      this.additionalItems = itemsData.data.additional_items || [];
    } catch (error) {
      console.error('Error loading data:', error);
      this.showAlert('Error loading data', 'error');
    }
  }

  switchSection(section) {
    document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
    event.target.classList.add('active');

    if (section === 'categories') this.renderCategories();
    if (section === 'products') this.renderProducts();
    if (section === 'extras') this.renderExtras();
    if (section === 'additional') this.renderAdditionalItems();
  }

  async renderDashboard() {
    const statsHtml = `
      <div class="stat-card">
        <h3>Total Brands</h3>
        <div class="value">${this.brands.length}</div>
      </div>
      <div class="stat-card">
        <h3>Total Categories</h3>
        <div class="value">${this.categories.length}</div>
      </div>
      <div class="stat-card">
        <h3>Total Products</h3>
        <div class="value">${this.products.length}</div>
      </div>
      <div class="stat-card">
        <h3>Total Extras</h3>
        <div class="value">${this.extras.length}</div>
      </div>
      <div class="stat-card">
        <h3>Additional Items</h3>
        <div class="value">${this.additionalItems.length}</div>
      </div>
    `;
    document.getElementById('stats').innerHTML = statsHtml;
  }

  renderCategories() {
    const html = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Serving Option</th>
            <th>Packaging Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.categories.map((cat) => `
            <tr>
              <td>${cat.name}</td>
              <td>${cat.brand_name}</td>
              <td>${cat.enable_serving ? '✓' : '✗'}</td>
              <td>Rp ${cat.packaging_fee.toLocaleString('id-ID')}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn btn-primary btn-sm" onclick="admin.editCategory(${cat.id})">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="admin.deleteCategory(${cat.id})">Delete</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    document.getElementById('categoriesContainer').innerHTML = html;
  }

  renderProducts() {
    const html = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.products.map((prod) => {
            const cat = this.categories.find((c) => c.id === prod.category_id);
            return `
              <tr>
                <td>${prod.name}</td>
                <td>${cat?.name || 'N/A'}</td>
                <td>Rp ${prod.price.toLocaleString('id-ID')}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="admin.editProduct(${prod.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="admin.deleteProduct(${prod.id})">Delete</button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
    document.getElementById('productsContainer').innerHTML = html;
  }

  renderExtras() {
    const html = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.extras.map((extra) => `
            <tr>
              <td>${extra.name}</td>
              <td>Rp ${extra.price.toLocaleString('id-ID')}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn btn-primary btn-sm" onclick="admin.editExtra(${extra.id})">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="admin.deleteExtra(${extra.id})">Delete</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    document.getElementById('extrasContainer').innerHTML = html;
  }

  renderAdditionalItems() {
    const html = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.additionalItems.map((item) => `
            <tr>
              <td>${item.name}</td>
              <td>Rp ${item.price.toLocaleString('id-ID')}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn btn-primary btn-sm" onclick="admin.editAdditional(${item.id})">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="admin.deleteAdditional(${item.id})">Delete</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    document.getElementById('additionalContainer').innerHTML = html;
  }

  openCategoryModal(id = null) {
    this.editingId = id;
    const modal = document.getElementById('categoryModal');
    const titleEl = document.getElementById('categoryModalTitle');

    // Load brands
    const brandSelect = document.getElementById('categoryBrand');
    brandSelect.innerHTML = '<option value="">Select Brand</option>' +
      this.brands.map((b) => `<option value="${b.id}">${b.name}</option>`).join('');

    if (id) {
      titleEl.textContent = 'Edit Category';
      const cat = this.categories.find((c) => c.id === id);
      if (cat) {
        document.getElementById('categoryBrand').value = cat.brand_id;
        document.getElementById('categoryName').value = cat.name;
        document.getElementById('categoryServing').checked = !!cat.enable_serving;
        document.getElementById('categoryFee').value = cat.packaging_fee;
      }
    } else {
      titleEl.textContent = 'Add Category';
      document.getElementById('categoryForm').reset();
    }

    modal.classList.add('open');
  }

  async handleCategorySubmit(event) {
    event.preventDefault();

    const data = {
      brand_id: parseInt(document.getElementById('categoryBrand').value),
      name: document.getElementById('categoryName').value,
      enable_serving: document.getElementById('categoryServing').checked,
      packaging_fee: parseInt(document.getElementById('categoryFee').value),
    };

    try {
      const action = this.editingId ? 'update_category' : 'create_category';
      if (this.editingId) {
        data.id = this.editingId;
      }

      const response = await fetch(`${ADMIN_API}?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        this.showAlert(result.message, 'success');
        closeModal('categoryModal');
        await this.loadAllData();
        this.renderCategories();
      } else {
        this.showAlert(result.message || 'Error', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      this.showAlert('Error saving category', 'error');
    }
  }

  async deleteCategory(id) {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`${ADMIN_API}?action=delete_category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.success) {
        this.showAlert('Category deleted', 'success');
        await this.loadAllData();
        this.renderCategories();
      }
    } catch (error) {
      this.showAlert('Error deleting category', 'error');
    }
  }

  openProductModal(id = null) {
    // Implementation similar to category modal
    console.log('Open product modal:', id);
  }

  editProduct(id) {
    this.openProductModal(id);
  }

  async deleteProduct(id) {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`${ADMIN_API}?action=delete_product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.success) {
        this.showAlert('Product deleted', 'success');
        await this.loadAllData();
        this.renderProducts();
      }
    } catch (error) {
      this.showAlert('Error deleting product', 'error');
    }
  }

  openExtraModal(id = null) {
    // Implementation
    console.log('Open extra modal:', id);
  }

  editExtra(id) {
    this.openExtraModal(id);
  }

  async deleteExtra(id) {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`${ADMIN_API}?action=delete_extra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.success) {
        this.showAlert('Extra deleted', 'success');
        await this.loadAllData();
        this.renderExtras();
      }
    } catch (error) {
      this.showAlert('Error deleting extra', 'error');
    }
  }

  openAdditionalModal(id = null) {
    // Implementation
    console.log('Open additional modal:', id);
  }

  editAdditional(id) {
    this.openAdditionalModal(id);
  }

  async deleteAdditional(id) {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`${ADMIN_API}?action=delete_additional_item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.success) {
        this.showAlert('Item deleted', 'success');
        await this.loadAllData();
        this.renderAdditionalItems();
      }
    } catch (error) {
      this.showAlert('Error deleting item', 'error');
    }
  }

  showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    document.querySelector('.container').insertBefore(alertDiv, document.querySelector('header').nextSibling);

    setTimeout(() => alertDiv.remove(), 3000);
  }
}

// Global functions
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

// Initialize admin panel
const admin = new AdminPanel();
document.addEventListener('DOMContentLoaded', () => {
  admin.init();
});
