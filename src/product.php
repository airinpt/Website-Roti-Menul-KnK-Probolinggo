<?php
/**
 * Product Class
 * Manages product operations with extras and additional items
 */

require_once __DIR__ . '/Database.php';

class Product {
    private $db;
    private $table = 'products';

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Get product by ID
     */
    public function getById($id) {
        $stmt = $this->db->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug,
                   c.enable_serving, c.packaging_fee,
                   b.id as brand_id, b.name as brand_name, b.slug as brand_slug
            FROM {$this->table} p
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON c.brand_id = b.id
            WHERE p.id = ?
        ");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Get extras for a product
     */
    public function getExtras($productId) {
        $stmt = $this->db->prepare("
            SELECT e.* 
            FROM extras e
            JOIN product_extras pe ON e.id = pe.extra_id
            WHERE pe.product_id = ? AND e.is_available = 1
            ORDER BY e.sort_order, e.name
        ");
        $stmt->execute([$productId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get additional items for a product (Teras Menull)
     */
    public function getAdditionalItems($productId) {
        $stmt = $this->db->prepare("
            SELECT ai.* 
            FROM additional_items ai
            JOIN product_additional_items pai ON ai.id = pai.additional_item_id
            WHERE pai.product_id = ? AND ai.is_available = 1
            ORDER BY ai.sort_order, ai.name
        ");
        $stmt->execute([$productId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get full product data with extras and additional items
     */
    public function getFullProduct($productId) {
        $product = $this->getById($productId);
        if (!$product) return null;
        
        $product['extras'] = $this->getExtras($productId);
        $product['additional_items'] = $this->getAdditionalItems($productId);
        
        return $product;
    }

    /**
     * Get all products
     */
    public function getAll() {
        $stmt = $this->db->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug,
                   b.name as brand_name, b.slug as brand_slug
            FROM {$this->table} p
            JOIN categories c ON p.category_id = c.id
            JOIN brands b ON c.brand_id = b.id
            WHERE p.is_available = 1
            ORDER BY b.name, c.sort_order, p.sort_order, p.name
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get products by brand
     */
    public function getByBrand($brandId) {
        $stmt = $this->db->prepare("
            SELECT p.*, c.name as category_name
            FROM {$this->table} p
            JOIN categories c ON p.category_id = c.id
            WHERE c.brand_id = ? AND p.is_available = 1
            ORDER BY c.sort_order, p.sort_order, p.name
        ");
        $stmt->execute([$brandId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}