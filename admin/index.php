<?php
declare(strict_types=1);
session_start();

// Simple authentication - in production, implement proper login
if (!isset($_SESSION['admin_logged_in'])) {
    $_SESSION['admin_logged_in'] = true; // Allow access for now
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Panel - Roti Menull Knk</title>
  <link rel="icon" type="image/png" href="../assets/logomenulnew.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #6b4632;
      --primary-dark: #3b2418;
      --primary-light: #9a6b4b;
      --accent: #c48758;
      --gray-50: #fdf8f3;
      --gray-100: #f8f1ea;
      --gray-200: #f0e1d3;
      --gray-300: #e3cbb6;
      --border: #ecddd0;
      --success: #22c55e;
      --error: #ef4444;
      --warning: #eab308;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: var(--gray-50);
      color: var(--primary-dark);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    header {
      background: var(--primary-dark);
      color: white;
      padding: 20px;
      margin-bottom: 30px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    header h1 {
      font-size: 1.8rem;
      font-family: 'Playfair Display', serif;
    }

    nav {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    nav button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      background: var(--gray-200);
      color: var(--primary);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    nav button.active {
      background: var(--primary);
      color: white;
    }

    nav button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(107, 70, 50, 0.2);
    }

    .section {
      display: none;
    }

    .section.active {
      display: block;
    }

    .form-group {
      margin-bottom: 15px;
      display: grid;
      gap: 8px;
    }

    label {
      font-weight: 500;
      color: var(--primary);
      font-size: 0.9rem;
    }

    input, select, textarea {
      padding: 10px;
      border: 1.5px solid var(--border);
      border-radius: 6px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.9rem;
      transition: border-color 0.3s;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(107, 70, 50, 0.1);
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'Poppins', sans-serif;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
    }

    .btn-danger {
      background: var(--error);
      color: white;
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    .btn-success {
      background: var(--success);
      color: white;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }

    th {
      background: var(--primary);
      color: white;
      padding: 15px;
      text-align: left;
      font-weight: 600;
    }

    td {
      padding: 12px 15px;
      border-bottom: 1px solid var(--border);
    }

    tr:hover {
      background: var(--gray-50);
    }

    .action-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 0.85rem;
    }

    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }

    .modal.open {
      display: flex;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .modal-header {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--primary);
    }

    .alert {
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .alert-success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    .alert-error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .loading {
      text-align: center;
      padding: 40px 20px;
      color: var(--primary-light);
    }

    .loading::after {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid var(--gray-200);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid var(--primary);
    }

    .stat-card h3 {
      color: var(--primary-light);
      font-size: 0.9rem;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .stat-card .value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-dark);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      table {
        font-size: 0.85rem;
      }

      .modal-content {
        max-width: 95%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🍞 Roti Menull Admin Panel</h1>
      <div style="color: #ccc; font-size: 0.9rem;">Admin Dashboard</div>
    </header>

    <!-- Navigation -->
    <nav>
      <button class="nav-btn active" data-section="dashboard">Dashboard</button>
      <button class="nav-btn" data-section="categories">Categories</button>
      <button class="nav-btn" data-section="products">Products</button>
      <button class="nav-btn" data-section="extras">Extras</button>
      <button class="nav-btn" data-section="additional">Additional Items</button>
    </nav>

    <!-- Dashboard Section -->
    <section id="dashboard" class="section active">
      <h2 style="margin-bottom: 20px; color: var(--primary);">Dashboard</h2>
      <div class="stats" id="stats"></div>
    </section>

    <!-- Categories Section -->
    <section id="categories" class="section">
      <h2 style="margin-bottom: 20px; color: var(--primary);">Manage Categories</h2>
      <button class="btn btn-primary" id="addCategoryBtn">+ Add Category</button>
      <div id="categoriesContainer" class="loading">Loading...</div>
    </section>

    <!-- Products Section -->
    <section id="products" class="section">
      <h2 style="margin-bottom: 20px; color: var(--primary);">Manage Products</h2>
      <button class="btn btn-primary" id="addProductBtn">+ Add Product</button>
      <div id="productsContainer" class="loading">Loading...</div>
    </section>

    <!-- Extras Section -->
    <section id="extras" class="section">
      <h2 style="margin-bottom: 20px; color: var(--primary);">Manage Extras</h2>
      <button class="btn btn-primary" id="addExtraBtn">+ Add Extra</button>
      <div id="extrasContainer" class="loading">Loading...</div>
    </section>

    <!-- Additional Items Section -->
    <section id="additional" class="section">
      <h2 style="margin-bottom: 20px; color: var(--primary);">Manage Additional Items</h2>
      <button class="btn btn-primary" id="addAdditionalBtn">+ Add Additional Item</button>
      <div id="additionalContainer" class="loading">Loading...</div>
    </section>
  </div>

  <!-- Modals -->
  <div id="categoryModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span id="categoryModalTitle">Add Category</span>
        <button class="close-btn" onclick="closeModal('categoryModal')">×</button>
      </div>
      <form id="categoryForm" onsubmit="handleCategorySubmit(event)">
        <div class="form-group">
          <label>Brand</label>
          <select id="categoryBrand" required>
            <option value="">Select Brand</option>
          </select>
        </div>
        <div class="form-group">
          <label>Category Name</label>
          <input type="text" id="categoryName" required />
        </div>
        <div class="form-group checkbox-group">
          <input type="checkbox" id="categoryServing" />
          <label for="categoryServing" style="margin: 0;">Enable Serving Options</label>
        </div>
        <div class="form-group">
          <label>Packaging Fee (Rp)</label>
          <input type="number" id="categoryFee" value="0" min="0" />
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="submit" class="btn btn-primary" style="flex: 1;">Save</button>
          <button type="button" class="btn" style="flex: 1; background: var(--gray-200);" onclick="closeModal('categoryModal')">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <script src="../api/admin.js" defer></script>
  <script src="admin-panel.js" defer></script>
</body>
</html>
