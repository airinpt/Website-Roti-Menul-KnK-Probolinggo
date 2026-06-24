<?php
/**
 * API: Get Product Configuration
 * Returns extras and additional items for a product
 */

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/Product.php';

// Check if product ID is provided
$productId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($productId <= 0) {
    echo json_encode(['success' => false, 'error' => 'Product ID required']);
    exit;
}

try {
    $product = new Product();
    $productData = $product->getById($productId);
    
    if (!$productData) {
        echo json_encode(['success' => false, 'error' => 'Product not found']);
        exit;
    }
    
    $extras = $product->getExtras($productId);
    $additionalItems = $product->getAdditionalItems($productId);
    
    echo json_encode([
        'success' => true,
        'product' => $productData,
        'extras' => $extras,
        'additional_items' => $additionalItems
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'error' => $e->getMessage()
    ]);
}