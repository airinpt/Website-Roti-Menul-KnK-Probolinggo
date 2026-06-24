<?php
declare(strict_types=1);

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'menull_db');
define('DB_PORT', 3306);
define('DB_CHARSET', 'utf8mb4');

try {
    // Connect without database to create it
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';charset=' . DB_CHARSET,
        DB_USER,
        DB_PASSWORD,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    // Create database
    $pdo->exec('CREATE DATABASE IF NOT EXISTS ' . DB_NAME . ' CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    $pdo->exec('USE ' . DB_NAME);

    // Create tables
    $tables = [
        'brands' => "
            CREATE TABLE IF NOT EXISTS brands (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ",
        
        'categories' => "
            CREATE TABLE IF NOT EXISTS categories (
                id INT PRIMARY KEY AUTO_INCREMENT,
                brand_id INT NOT NULL,
                name VARCHAR(150) NOT NULL,
                enable_serving BOOLEAN DEFAULT FALSE,
                packaging_fee INT DEFAULT 0,
                active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
            )
        ",
        
        'products' => "
            CREATE TABLE IF NOT EXISTS products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                category_id INT NOT NULL,
                name VARCHAR(150) NOT NULL,
                description TEXT,
                price INT NOT NULL,
                image VARCHAR(255),
                active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
            )
        ",
        
        'extras' => "
            CREATE TABLE IF NOT EXISTS extras (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL UNIQUE,
                price INT NOT NULL,
                active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ",
        
        'product_extras' => "
            CREATE TABLE IF NOT EXISTS product_extras (
                id INT PRIMARY KEY AUTO_INCREMENT,
                product_id INT NOT NULL,
                extra_id INT NOT NULL,
                UNIQUE KEY unique_product_extra (product_id, extra_id),
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (extra_id) REFERENCES extras(id) ON DELETE CASCADE
            )
        ",
        
        'additional_items' => "
            CREATE TABLE IF NOT EXISTS additional_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL UNIQUE,
                price INT NOT NULL,
                active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ",
        
        'product_additional_items' => "
            CREATE TABLE IF NOT EXISTS product_additional_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                product_id INT NOT NULL,
                additional_item_id INT NOT NULL,
                UNIQUE KEY unique_product_additional (product_id, additional_item_id),
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (additional_item_id) REFERENCES additional_items(id) ON DELETE CASCADE
            )
        ",
        
        'cart' => "
            CREATE TABLE IF NOT EXISTS cart (
                id INT PRIMARY KEY AUTO_INCREMENT,
                session_id VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        ",
        
        'cart_items' => "
            CREATE TABLE IF NOT EXISTS cart_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                cart_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                serving_option VARCHAR(20),
                selected_extras JSON,
                selected_additional_items JSON,
                notes TEXT,
                subtotal INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
            )
        ",
        
        'orders' => "
            CREATE TABLE IF NOT EXISTS orders (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_number VARCHAR(50) NOT NULL UNIQUE,
                customer_name VARCHAR(150) NOT NULL,
                customer_phone VARCHAR(20) NOT NULL,
                customer_address TEXT,
                total INT NOT NULL,
                notes TEXT,
                status VARCHAR(50) DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ",
        
        'order_items' => "
            CREATE TABLE IF NOT EXISTS order_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                product_name VARCHAR(150) NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                serving_option VARCHAR(20),
                selected_extras JSON,
                selected_additional_items JSON,
                notes TEXT,
                unit_price INT NOT NULL,
                subtotal INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            )
        ",
    ];

    foreach ($tables as $name => $sql) {
        $pdo->exec($sql);
        echo "✓ Created table: $name\n";
    }

    echo "\n✓ Database setup completed successfully!\n";

} catch (PDOException $e) {
    echo "✗ Database error: " . $e->getMessage() . "\n";
    exit(1);
}
