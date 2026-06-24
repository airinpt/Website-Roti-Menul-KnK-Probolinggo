# Menull Order Configuration System

Complete setup guide for the new order configuration system with modal, database, and admin panel.

## 📋 Overview

This system implements a modern order configuration modal for the Menull website, allowing customers to:
- Configure their orders before adding to cart
- Select serving options (Dine In / Take Away)
- Add extras/toppings
- Add additional items (for Teras Menull)
- Add special notes
- See real-time price calculations

## 🗄️ Database Setup

### 1. Initialize Database

Run the setup script to create all tables:

```bash
php config/setup-db.html
```

This will create:
- brands
- categories  
- products
- extras
- additional_items
- product_extras
- product_additional_items
- cart
- cart_items
- orders
- order_items

### 2. Seed Sample Data

Populate the database with sample data:

```bash
php config/seed-data.html
```

This creates:
- 3 Brands (MieeNull, Roti Menull, Teras Menull)
- Sample categories with proper settings
- Sample products
- Sample extras and additional items

## 🔧 API Endpoints

### Data Retrieval API (`api/data.html`)

All endpoints are GET requests and return JSON responses.

#### Get All Brands
```
GET /api/data.html?action=brands
```

#### Get Categories
```
GET /api/data.html?action=categories&brand_id=1
```

#### Get All Products
```
GET /api/data.html?action=products&category_id=1
```

#### Get Single Product
```
GET /api/data.html?action=product&product_id=1
```

#### Get Extras
```
GET /api/data.html?action=extras
```

#### Get Additional Items
```
GET /api/data.html?action=additional_items
```

### Admin Management API (`api/admin.html`)

All admin endpoints require POST requests.

#### Category Management
```
POST /api/admin.html?action=create_category
Body: {brand_id, name, enable_serving, packaging_fee}

POST /api/admin.html?action=update_category
Body: {id, brand_id, name, enable_serving, packaging_fee}

POST /api/admin.html?action=delete_category
Body: {id}
```

#### Product Management
```
POST /api/admin.html?action=create_product
Body: {category_id, name, description, price, image}

POST /api/admin.html?action=update_product
Body: {id, category_id, name, description, price, image}

POST /api/admin.html?action=delete_product
Body: {id}
```

#### Extras Management
```
POST /api/admin.html?action=create_extra
Body: {name, price}

POST /api/admin.html?action=update_extra
Body: {id, name, price}

POST /api/admin.html?action=delete_extra
Body: {id}

POST /api/admin.html?action=link_extra
Body: {product_id, extra_id}

POST /api/admin.html?action=unlink_extra
Body: {product_id, extra_id}
```

#### Additional Items Management
```
POST /api/admin.html?action=create_additional_item
Body: {name, price}

POST /api/admin.html?action=update_additional_item
Body: {id, name, price}

POST /api/admin.html?action=delete_additional_item
Body: {id}

POST /api/admin.html?action=link_additional_item
Body: {product_id, additional_item_id}

POST /api/admin.html?action=unlink_additional_item
Body: {product_id, additional_item_id}
```

## 💻 Frontend Integration

### 1. Include Required Scripts

Add to your HTML pages (in this order):

```html
<!-- Order Modal Component -->
<script src="./src/order-modal.js"></script>

<!-- Enhanced Cart System -->
<script src="./src/enhanced-cart.js"></script>

<!-- Product Loader -->
<script src="./src/product-loader.js"></script>
```

### 2. Update Category Pages

In your category page (e.g., `mie-minull/index.html`):

```html
<div class="menu-grid" id="categoryProductGrid"></div>

<script>
  document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ProductLoader({
      categoryPageKey: 'mie-minull'  // Match your category key
    });
    
    // Optional: Load specific category by ID
    // await loader.init(categoryId);
    
    // Or load all products
    await loader.init();
  });
</script>
```

### 3. Modal Integration

The `OrderConfigurationModal` is automatically initialized when `order-modal.js` is loaded.

To open the modal programmatically:

```javascript
// Get product from API or create product object
const product = {
  id: 1,
  name: 'Product Name',
  price: 10000,
  image: 'path/to/image.jpg',
  brand_name: 'MieeNull',
  enable_serving: true,
  packaging_fee: 2000,
  extras: [...],
  additional_items: [...]
};

window.orderModal.open(product);
```

### 4. Cart Integration

Listen for cart events:

```javascript
document.addEventListener('addOrderToCart', (event) => {
  const { product, config } = event.detail;
  console.log('Product:', product);
  console.log('Configuration:', config);
  
  // EnhancedCartSystem automatically handles this
});
```

## 📦 Brand-Specific Behavior

### Roti Menull
- **No serving options**
- **No packaging fee**
- Configuration shows only: Quantity, Notes

### MieeNull  
- **Serving options**: Dine In / Take Away
- **Packaging fee**: Depends on category
- Configuration shows: Serving, Extras, Quantity, Notes

### Teras Menull
- **Serving options**: Dine In / Take Away  
- **Packaging fee**: Depends on category
- Configuration shows: Serving, Additional Items, Quantity, Notes

## 💾 Cart Data Structure

Enhanced cart items include full configuration:

```javascript
{
  id: 'item_[timestamp]_[random]',
  product_id: 1,
  category_id: 1,
  brand_id: 1,
  brand_name: 'MieeNull',
  product_name: 'Mie Ayam',
  category_name: 'Mie Ayam',
  image: 'path/to/image.jpg',
  base_price: 12000,
  packaging_fee: 0 or 2000,
  serving_option: 'Take Away' or 'Dine In' or null,
  selected_extras: [{id, name, price}, ...],
  selected_additional_items: [{id, name, price}, ...],
  notes: 'Special instructions...',
  quantity: 2,
  unit_price: 17000,  // base + fees + extras
  subtotal: 34000,    // unit_price * quantity
  timestamp: 1234567890
}
```

## 🎨 Customization

### Styling

Modal styles are in `css/style.css`:

```css
.modal-overlay
.modal-content  
.modal-header
.modal-body
.serving-options
.extras-list
.additional-items-list
.price-summary
.quantity-selector
```

### Modal Behavior

Customize in `src/order-modal.js`:

- Change `formatCurrency()` for different locales
- Modify `setupServingOptions()` to change serving options
- Update `updatePrice()` for custom price calculations

### API Endpoints

Modify in `api/data.html` and `api/admin.html`:

- Add authentication in `requireAdmin()` function
- Add logging or analytics
- Add validation rules

## 🧪 Testing

### Manual Testing Steps

1. **Setup Database**:
   ```bash
   php config/setup-db.html
   php config/seed-data.html
   ```

2. **Test Product Loading**:
   - Visit category page
   - Verify products load from API
   - Check modal opens on product card click

3. **Test Modal Configuration**:
   - Select serving option (if available)
   - Add extras
   - Add notes
   - Verify price updates in real-time
   - Verify quantity controls work

4. **Test Cart**:
   - Add multiple items with different configs
   - Verify cart saves to localStorage
   - Check cart persists on page reload

5. **Test Checkout**:
   - Verify all configurations display correctly
   - Check totals are calculated properly
   - Verify notes are preserved

## 🔒 Security Considerations

- **Input Validation**: All API endpoints validate input
- **SQL Injection**: Using prepared statements  
- **CSRF**: Add CSRF token validation in production
- **Authentication**: Implement proper admin authentication
- **Rate Limiting**: Add rate limiting to API endpoints

## 📱 Mobile Responsiveness

The modal is fully responsive:
- Adjusts layout on screens < 768px
- Stacks buttons vertically on mobile
- Maintains usability on small screens

## 🐛 Troubleshooting

### Products not loading
- Check browser console for errors
- Verify API endpoint is accessible
- Check database connection in `config/database.html`

### Modal not appearing
- Check `order-modal.js` is loaded
- Verify DOM is ready before opening
- Check browser console for JavaScript errors

### Prices not calculating
- Verify product has correct `packaging_fee`
- Check extras have prices set
- Review `updatePrice()` logic in modal

### Cart not persisting
- Check localStorage is enabled
- Verify `enhanced-cart.js` is loaded
- Check browser storage quota

## 📝 Example Integration

Complete example for `mie-minull/index.html`:

```html
<?php
declare(strict_types=1);
session_start();
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mie Minull | Roti Menull Knk</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body data-category-page="mie-minull">
  <script>
    window.MENULL_PAGE_CONTEXT = {
      checkoutUrl: '../checkout.html',
      customerInfoUrl: '../customer-info.html',
      sessionEndpoint: '../src/cart-session.html',
      waNumber: '6281292401513'
    };
  </script>

  <nav class="navbar navbar-order">
    <a class="brand" href="../index.html">
      <img src="../assets/logomenulnew.png" alt="Logo" />
      <span class="brand-name">Roti Menull Knk</span>
    </a>
    <a href="../index.html#menu" class="btn btn-outline btn-back">Back</a>
  </nav>

  <main>
    <section class="section menu-categories" id="menu">
      <div class="section-header">
        <h2>Mie Minull Menu</h2>
        <p>Mie gurih hangat untuk teman santai dan makan cepat.</p>
      </div>
      <div class="menu-grid" id="categoryProductGrid"></div>
    </section>
  </main>

  <!-- Load modal and cart system -->
  <script src="../src/order-modal.js"></script>
  <script src="../src/enhanced-cart.js"></script>
  <script src="../src/product-loader.js"></script>

  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      const loader = new ProductLoader();
      await loader.init();
    });
  </script>
</body>
</html>
```

## 📞 Support

For issues or questions, review the code comments in:
- `src/order-modal.js` - Modal logic
- `src/enhanced-cart.js` - Cart system
- `api/data.html` - Data retrieval
- `api/admin.html` - Admin operations
