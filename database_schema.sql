-- ============================================
-- MENULL ORDER CONFIGURATION SYSTEM
-- Database Schema
-- ============================================

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS product_additional_items;
DROP TABLE IF EXISTS additional_items;
DROP TABLE IF EXISTS product_extras;
DROP TABLE IF EXISTS extras;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS users;

-- ============================================
-- BRANDS TABLE
-- ============================================
CREATE TABLE brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    brand_id INT NOT NULL,
    enable_serving BOOLEAN DEFAULT FALSE,
    packaging_fee INT DEFAULT 0,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
    INDEX idx_brand (brand_id)
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INT NOT NULL,
    price INT NOT NULL,
    description TEXT,
    image VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_available (is_available)
);

-- ============================================
-- EXTRAS TABLE
-- ============================================
CREATE TABLE extras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- PRODUCT EXTRAS (Many-to-Many)
-- ============================================
CREATE TABLE product_extras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    extra_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (extra_id) REFERENCES extras(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_extra (product_id, extra_id)
);

-- ============================================
-- ADDITIONAL ITEMS TABLE (for Teras Menull)
-- ============================================
CREATE TABLE additional_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- PRODUCT ADDITIONAL ITEMS (Many-to-Many)
-- ============================================
CREATE TABLE product_additional_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    additional_item_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (additional_item_id) REFERENCES additional_items(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_additional (product_id, additional_item_id)
);

-- ============================================
-- CART TABLE
-- ============================================
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) NOT NULL UNIQUE,
    user_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_session (session_id)
);

-- ============================================
-- CART ITEMS TABLE
-- ============================================
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    serving_option VARCHAR(20) DEFAULT 'Dine In',
    notes TEXT,
    extras JSON,
    additional_items JSON,
    base_price INT NOT NULL,
    packaging_fee INT DEFAULT 0,
    extras_total INT DEFAULT 0,
    additional_items_total INT DEFAULT 0,
    subtotal INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_cart (cart_id)
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    customer_address TEXT,
    total_amount INT NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_number (order_number),
    INDEX idx_status (status)
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    serving_option VARCHAR(20) DEFAULT 'Dine In',
    notes TEXT,
    extras JSON,
    additional_items JSON,
    base_price INT NOT NULL,
    packaging_fee INT DEFAULT 0,
    extras_total INT DEFAULT 0,
    additional_items_total INT DEFAULT 0,
    subtotal INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order (order_id)
);

-- ============================================
-- USERS TABLE (for admin)
-- ============================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    role ENUM('admin', 'staff') DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Insert Brands
INSERT INTO brands (name, slug, description, sort_order) VALUES
('MieeNull', 'mieenull', 'Mie dan aneka olahan', 1),
('Roti Menull', 'roti-menull', 'Roti dan bakery', 2),
('Teras Menull', 'teras-menull', 'Menu khas Indonesia', 3);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, email, full_name, role, is_active) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@menull.com', 'Administrator', 'admin', 1);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_cart_items_product ON cart_items(product_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_categories_brand ON categories(brand_id);

-- ============================================
-- SAMPLE DATA (Optional - uncomment to add)
-- ============================================
/*
-- Insert Categories
INSERT INTO categories (name, slug, brand_id, enable_serving, packaging_fee, description, sort_order) VALUES
('Mie Ayam', 'mie-ayam', 1, 1, 2000, 'Mie Ayam Original dan varian', 1),
('Burger', 'burger', 1, 1, 2000, 'Burger dengan berbagai pilihan', 2),
('Roti Menull', 'roti-menull', 2, 0, 0, 'Roti dengan berbagai rasa', 10),
('Brownies', 'brownies', 2, 0, 0, 'Brownies kukus', 11),
('Prasmanan', 'prasmanan', 3, 1, 2000, 'Menu khas Padang', 20);

-- Insert Extras
INSERT INTO extras (name, price, description, sort_order) VALUES
('Telur', 3000, 'Telur', 1),
('Keju', 5000, 'Keju', 2),
('Moza', 5000, 'Mozzarella', 3);

-- Insert Additional Items
INSERT INTO additional_items (name, price, description, sort_order) VALUES
('Nasi', 4000, 'Nasi Putih', 1),
('Telur', 6000, 'Telur', 2),
('Perkedel', 3000, 'Perkedel', 3);
*/