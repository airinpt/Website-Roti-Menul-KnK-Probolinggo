# Quick Start Guide - Menull Order Configuration System

## ⚡ 5-Minute Setup

### 1. Initialize Database (30 seconds)

```bash
cd c:\laragon\www\webmenullknk
php config/setup-db.html
php config/seed-data.html
```

**Expected Output**:
```
✓ Database setup completed successfully!
✓ Database seeded successfully!
```

### 2. Test the System (2 minutes)

#### Test Data API
```bash
# Get all brands
curl "http://localhost/webmenullknk/api/data.html?action=brands"

# Get all products
curl "http://localhost/webmenullknk/api/data.html?action=products"
```

#### Access Admin Panel
Open in browser:
```
http://localhost/webmenullknk/admin/
```

You should see dashboard with statistics.

### 3. Integrate into Category Pages (2 minutes)

Add this to **mie-minull/index.html** inside `<body>` tag:

```html
<!-- Add before closing </body> tag -->
<script src="../src/order-modal.js"></script>
<script src="../src/enhanced-cart.js"></script>
<script src="../src/product-loader.js"></script>

<script>
  document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ProductLoader();
    await loader.init();
  });
</script>
```

Repeat for **roti-menull/index.html** and **teras-menull/index.html**.

## ✅ Verify It Works

1. **Test Product Loading**:
   - Visit http://localhost/webmenullknk/mie-minull/
   - Products should load from database
   - Click on any product → Modal should open

2. **Test Modal**:
   - Select different options
   - Change quantity
   - Watch prices update in real-time
   - Click "Add to Cart"

3. **Test Admin Panel**:
   - Go to http://localhost/webmenullknk/admin/
   - Try creating a new category
   - Add a new product
   - Changes should appear on product pages

## 📁 File Structure

```
webmenullknk/
├── config/
│   ├── database.html              ← Database config
│   ├── setup-db.html              ← Run once to create tables
│   └── seed-data.html             ← Run once to add sample data
│
├── api/
│   ├── data.html                  ← Data retrieval API
│   └── admin.html                 ← Admin management API
│
├── src/
│   ├── order-modal.js            ← Modal component
│   ├── enhanced-cart.js          ← Cart system
│   └── product-loader.js         ← Product loader
│
├── admin/
│   ├── index.html                 ← Admin panel UI
│   └── admin-panel.js            ← Admin logic
│
├── mie-minull/index.html          ← Update these
├── roti-menull/index.html         ├── Add modal scripts
└── teras-menull/index.html        └── and product loader

└── SETUP_GUIDE.md                ← Detailed documentation
└── IMPLEMENTATION_SUMMARY.md     ← Technical overview
```

## 🔧 Customization

### Change Brand Names
Edit `config/seed-data.html`:
```php
$brands = [
    ['id' => 1, 'name' => 'YourBrandName1'],
    ['id' => 2, 'name' => 'YourBrandName2'],
    ['id' => 3, 'name' => 'YourBrandName3'],
];
```

Then reseed:
```bash
php config/seed-data.html
```

### Change Modal Colors
Edit `css/style.css`:
```css
.modal-content {
  background: #your-color;
}
```

### Change Serving Options
Edit `src/order-modal.js` → `setupServingOptions()`:
```javascript
const options = ['Your Option 1', 'Your Option 2'];
```

## 🐛 Troubleshooting

### "Products not loading"
Check browser console (F12):
- Do you see any red errors?
- Is the API accessible? Visit:
  `http://localhost/webmenullknk/api/data.html?action=products`

### "Modal not appearing"
- Verify `order-modal.js` is loaded (check HTML source)
- Check browser console for errors
- Try full page refresh (Ctrl+F5)

### "Cart not saving"
- Check if localStorage is enabled
- Open DevTools → Application → LocalStorage
- Should see `menull-cart-enhanced-v1` key

### "Database errors"
- Check `config/database.html` database credentials
- Verify MySQL is running
- Run setup again: `php config/setup-db.html`

## 📊 Sample Data Included

After seeding, you'll have:

**Brands**:
- MieeNull
- Roti Menull
- Teras Menull

**Categories** (6 total):
- Roti Menull Original (Roti Menull, no serving)
- Brownies (Roti Menull, no serving)
- Bolu Menull (Roti Menull, no serving)
- Mie Ayam (MieeNull, with serving, Rp2.000 packaging)
- Drinks (MieeNull, with serving, Rp1.000 packaging)
- Lauk Pauk (Teras Menull, with serving, Rp2.000 packaging)

**Extras** (4 total):
- Egg (Rp3.000)
- Cheese (Rp5.000)
- Mozzarella (Rp5.000)
- Extra Meat (Rp7.000)

**Additional Items** (6 total):
- Rice (Rp4.000)
- Egg (Rp6.000)
- Perkedel (Rp3.000)
- Sambal (Rp1.000)
- Vegetables (Rp2.000)
- Drink (Rp4.000)

## 🎯 Next Features to Add (Optional)

- [ ] Order history
- [ ] Favorites/wishlist
- [ ] Promo codes
- [ ] Quantity discounts
- [ ] Special dietary options (vegan, halal, etc.)
- [ ] Real admin authentication
- [ ] Order tracking
- [ ] Customer reviews per item
- [ ] Staff notifications
- [ ] Analytics dashboard

## 💾 Backup Database

Before making changes, backup your data:

```bash
# Export database
mysqldump -u root menull_db > backup.sql

# Restore database
mysql -u root menull_db < backup.sql
```

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Setup database | `php config/setup-db.html` |
| Add sample data | `php config/seed-data.html` |
| Access admin | `http://localhost/webmenullknk/admin/` |
| View all products API | `http://localhost/webmenullknk/api/data.html?action=products` |
| Get one product | `http://localhost/webmenullknk/api/data.html?action=product&product_id=1` |

## 🚀 You're Ready!

The system is fully functional. You can now:
- ✅ Configure products with extras and options
- ✅ Calculate prices dynamically
- ✅ Save configurations in cart
- ✅ Manage everything from admin panel
- ✅ Handle multiple brands with different rules

**Next Step**: Integrate the scripts into your category pages and test!

---

**Need Help?** Check `SETUP_GUIDE.md` for detailed documentation.
