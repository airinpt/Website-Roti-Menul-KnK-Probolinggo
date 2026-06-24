<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/database.php';

try {
    // Clear existing data
    $pdo->exec('SET FOREIGN_KEY_CHECKS=0');
    $pdo->exec('TRUNCATE brands');
    $pdo->exec('TRUNCATE categories');
    $pdo->exec('TRUNCATE products');
    $pdo->exec('TRUNCATE extras');
    $pdo->exec('TRUNCATE additional_items');
    $pdo->exec('SET FOREIGN_KEY_CHECKS=1');

    // Insert brands
    $brands = [
        ['id' => 1, 'name' => 'mieenull'],
        ['id' => 2, 'name' => 'Roti Menull'],
        ['id' => 3, 'name' => 'Teras Menull'],
    ];

    foreach ($brands as $brand) {
        $stmt = $pdo->prepare('INSERT INTO brands (id, name) VALUES (:id, :name)');
        $stmt->execute($brand);
    }

    // Insert categories
    $categories = [
        ['brand_id' => 2, 'name' => 'Roti Menull Original', 'enable_serving' => false, 'packaging_fee' => 0],
        ['brand_id' => 2, 'name' => 'Brownies', 'enable_serving' => false, 'packaging_fee' => 0],
        ['brand_id' => 2, 'name' => 'Bolu Menull', 'enable_serving' => false, 'packaging_fee' => 0],
        ['brand_id' => 1, 'name' => 'Burger', 'enable_serving' => true, 'packaging_fee' => 2000],
        ['brand_id' => 1, 'name' => 'Mie Ayam', 'enable_serving' => true, 'packaging_fee' => 2000],
        ['brand_id' => 1, 'name' => 'Pentol & Cilok', 'enable_serving' => true, 'packaging_fee' => 2000],
        ['brand_id' => 1, 'name' => 'Hotplate Mieenull', 'enable_serving' => true, 'packaging_fee' => 2000],
        ['brand_id' => 1, 'name' => 'Nasi', 'enable_serving' => true, 'packaging_fee' => 2000],
        ['brand_id' => 1, 'name' => 'Roti Bakar', 'enable_serving' => true, 'packaging_fee' => 2000],
        ['brand_id' => 1, 'name' => 'Minuman', 'enable_serving' => true, 'packaging_fee' => 1000],
        ['brand_id' => 3, 'name' => 'Prasmanan', 'enable_serving' => true, 'packaging_fee' => 2000],
    ];

    foreach ($categories as $i => $category) {
        $stmt = $pdo->prepare('INSERT INTO categories (brand_id, name, enable_serving, packaging_fee) VALUES (:brand_id, :name, :enable_serving, :packaging_fee)');
        $stmt->execute([
            ':brand_id' => $category['brand_id'],
            ':name' => $category['name'],
            ':enable_serving' => $category['enable_serving'] ? 1 : 0,
            ':packaging_fee' => $category['packaging_fee'],
        ]);
    }

    // Get category IDs
    $stmt = $pdo->prepare('SELECT id, name FROM categories');
    $stmt->execute();
    $categoryIds = [];
    foreach ($stmt->fetchAll() as $row) {
        $categoryIds[$row['name']] = $row['id'];
    }

    // Insert products for Roti Menull
    $products = [
        ['category_id' => $categoryIds['Roti Menull Original'], 'name' => 'Roti Menull Original', 'price' => 17000, 'image' => 'foto_produk_roti/rotimenull.jpeg'],
        ['category_id' => $categoryIds['Roti Menull Original'], 'name' => 'Roti Menull Coklat', 'price' => 20000, 'image' => 'foto_produk_roti/rotimenull_nyoklat.jpeg'],
        ['category_id' => $categoryIds['Brownies'], 'name' => 'Brownies Slice', 'price' => 15000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Bolu Menull'], 'name' => 'Bolu Menull', 'price' => 26000, 'image' => 'foto_produk_roti/bolumenull_bolu.jpeg'],
        
        // MieeNull products
        ['category_id' => $categoryIds['Burger'], 'name' => 'Chicken Burger', 'price' => 15000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Burger'], 'name' => 'Beef Burger', 'price' => 17000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Mie Ayam'], 'name' => 'Mie Ayam Original', 'price' => 12000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Mie Ayam'], 'name' => 'Mie Ayam Pedas', 'price' => 12000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Pentol & Cilok'], 'name' => 'Pentol Cilok', 'price' => 12000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Pentol & Cilok'], 'name' => 'Cilok Saos', 'price' => 12000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Hotplate Mieenull'], 'name' => 'Hotplate Mieenull', 'price' => 15000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Nasi'], 'name' => 'Nasi Goreng', 'price' => 13000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Roti Bakar'], 'name' => 'Roti Bakar Coklat', 'price' => 9000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Minuman'], 'name' => 'Iced Tea', 'price' => 5000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        ['category_id' => $categoryIds['Minuman'], 'name' => 'Milkshake', 'price' => 11000, 'image' => 'foto_produk_roti/brownies_slice.jpeg'],
        
        // Teras Menull (Prasmanan Padang) products
        ['category_id' => $categoryIds['Prasmanan'], 'name' => 'Rendang Daging', 'price' => 25000, 'image' => 'foto_produk_roti/bolumenull_bolu.jpeg'],
        ['category_id' => $categoryIds['Prasmanan'], 'name' => 'Gulai Ayam', 'price' => 20000, 'image' => 'foto_produk_roti/bolumenull_bolu.jpeg'],
        ['category_id' => $categoryIds['Prasmanan'], 'name' => 'Perkedel', 'price' => 8000, 'image' => 'foto_produk_roti/bolumenull_bolu.jpeg'],
        ['category_id' => $categoryIds['Prasmanan'], 'name' => 'Nasi Putih', 'price' => 5000, 'image' => 'foto_produk_roti/bolumenull_bolu.jpeg'],
    ];

    foreach ($products as $product) {
        $stmt = $pdo->prepare('INSERT INTO products (category_id, name, price, image) VALUES (:category_id, :name, :price, :image)');
        $stmt->execute($product);
    }

    // Insert extras
    $extras = [
        ['name' => 'Egg', 'price' => 3000],
        ['name' => 'Cheese', 'price' => 5000],
        ['name' => 'Mozzarella', 'price' => 5000],
        ['name' => 'Extra Meat', 'price' => 7000],
    ];

    foreach ($extras as $extra) {
        $stmt = $pdo->prepare('INSERT INTO extras (name, price) VALUES (:name, :price)');
        $stmt->execute($extra);
    }

    // Get extra IDs
    $stmt = $pdo->prepare('SELECT id, name FROM extras');
    $stmt->execute();
    $extraIds = [];
    foreach ($stmt->fetchAll() as $row) {
        $extraIds[$row['name']] = $row['id'];
    }

    // Link extras to Mie Ayam
    $stmt = $pdo->prepare('SELECT id FROM products WHERE name = :name');
    $stmt->bindValue(':name', 'Mie Ayam Original', PDO::PARAM_STR);
    $stmt->execute();
    $mieAyam = $stmt->fetch();

    if ($mieAyam) {
        foreach (['Egg', 'Cheese', 'Extra Meat'] as $extraName) {
            $stmt = $pdo->prepare('INSERT INTO product_extras (product_id, extra_id) VALUES (:product_id, :extra_id)');
            $stmt->execute([
                ':product_id' => $mieAyam['id'],
                ':extra_id' => $extraIds[$extraName],
            ]);
        }
    }

    // Insert additional items
    $additionalItems = [
        ['name' => 'Rice', 'price' => 4000],
        ['name' => 'Egg', 'price' => 6000],
        ['name' => 'Perkedel', 'price' => 3000],
        ['name' => 'Sambal', 'price' => 1000],
        ['name' => 'Vegetables', 'price' => 2000],
        ['name' => 'Drink', 'price' => 4000],
    ];

    foreach ($additionalItems as $item) {
        $stmt = $pdo->prepare('INSERT INTO additional_items (name, price) VALUES (:name, :price)');
        $stmt->execute($item);
    }

    // Get additional item IDs
    $stmt = $pdo->prepare('SELECT id, name FROM additional_items');
    $stmt->execute();
    $additionalIds = [];
    foreach ($stmt->fetchAll() as $row) {
        $additionalIds[$row['name']] = $row['id'];
    }

    // Link additional items to Lauk Pauk
    $stmt = $pdo->prepare('SELECT id FROM products WHERE name = :name');
    $stmt->bindValue(':name', 'Perkedel', PDO::PARAM_STR);
    $stmt->execute();
    $laukProduct = $stmt->fetch();

    if ($laukProduct) {
        foreach (['Rice', 'Egg', 'Sambal'] as $itemName) {
            $stmt = $pdo->prepare('INSERT INTO product_additional_items (product_id, additional_item_id) VALUES (:product_id, :additional_item_id)');
            $stmt->execute([
                ':product_id' => $laukProduct['id'],
                ':additional_item_id' => $additionalIds[$itemName],
            ]);
        }
    }

    echo "✓ Database seeded successfully!\n";
    echo "\nBrands created:\n";
    foreach ($brands as $brand) {
        echo "  - {$brand['name']}\n";
    }

    echo "\nCategories created:\n";
    foreach ($categories as $category) {
        echo "  - {$category['name']} (Brand ID: {$category['brand_id']}, Serving: " . ($category['enable_serving'] ? 'Yes' : 'No') . ")\n";
    }

} catch (PDOException $e) {
    echo "✗ Database seeding failed: " . $e->getMessage() . "\n";
    exit(1);
}
