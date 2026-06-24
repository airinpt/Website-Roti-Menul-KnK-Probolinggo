<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
session_start();

require_once __DIR__ . '/../config/database.php';

// Simple authentication check (can be enhanced later)
function requireAdmin() {
    // For now, just check if there's an admin session
    // Later this can be implemented with proper authentication
    // For development, we allow all requests
    return true;
}

function getResponse(bool $success, array $data = [], string $message = ''): array {
    return [
        'success' => $success,
        'data' => $data,
        'message' => $message,
    ];
}

function getRequestBody(): array {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    return is_array($data) ? $data : [];
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if (!requireAdmin()) {
    http_response_code(401);
    echo json_encode(getResponse(false, [], 'Unauthorized'));
    exit;
}

try {
    // ═══════════════════════════════════════════════════════════
    // CATEGORY MANAGEMENT
    // ═══════════════════════════════════════════════════════════

    if ($action === 'create_category' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            INSERT INTO categories (brand_id, name, enable_serving, packaging_fee) 
            VALUES (:brand_id, :name, :enable_serving, :packaging_fee)
        ');
        $stmt->execute([
            ':brand_id' => (int)$body['brand_id'],
            ':name' => (string)$body['name'],
            ':enable_serving' => $body['enable_serving'] ? 1 : 0,
            ':packaging_fee' => (int)$body['packaging_fee'],
        ]);
        echo json_encode(getResponse(true, ['id' => $pdo->lastInsertId()], 'Category created'));
        exit;
    }

    if ($action === 'update_category' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            UPDATE categories 
            SET brand_id = :brand_id, name = :name, enable_serving = :enable_serving, packaging_fee = :packaging_fee 
            WHERE id = :id
        ');
        $stmt->execute([
            ':id' => (int)$body['id'],
            ':brand_id' => (int)$body['brand_id'],
            ':name' => (string)$body['name'],
            ':enable_serving' => $body['enable_serving'] ? 1 : 0,
            ':packaging_fee' => (int)$body['packaging_fee'],
        ]);
        echo json_encode(getResponse(true, [], 'Category updated'));
        exit;
    }

    if ($action === 'delete_category' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('DELETE FROM categories WHERE id = :id');
        $stmt->execute([':id' => (int)$body['id']]);
        echo json_encode(getResponse(true, [], 'Category deleted'));
        exit;
    }

    // ═══════════════════════════════════════════════════════════
    // PRODUCT MANAGEMENT
    // ═══════════════════════════════════════════════════════════

    if ($action === 'create_product' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            INSERT INTO products (category_id, name, description, price, image) 
            VALUES (:category_id, :name, :description, :price, :image)
        ');
        $stmt->execute([
            ':category_id' => (int)$body['category_id'],
            ':name' => (string)$body['name'],
            ':description' => (string)($body['description'] ?? ''),
            ':price' => (int)$body['price'],
            ':image' => (string)($body['image'] ?? ''),
        ]);
        echo json_encode(getResponse(true, ['id' => $pdo->lastInsertId()], 'Product created'));
        exit;
    }

    if ($action === 'update_product' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            UPDATE products 
            SET category_id = :category_id, name = :name, description = :description, price = :price, image = :image 
            WHERE id = :id
        ');
        $stmt->execute([
            ':id' => (int)$body['id'],
            ':category_id' => (int)$body['category_id'],
            ':name' => (string)$body['name'],
            ':description' => (string)($body['description'] ?? ''),
            ':price' => (int)$body['price'],
            ':image' => (string)($body['image'] ?? ''),
        ]);
        echo json_encode(getResponse(true, [], 'Product updated'));
        exit;
    }

    if ($action === 'delete_product' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id');
        $stmt->execute([':id' => (int)$body['id']]);
        echo json_encode(getResponse(true, [], 'Product deleted'));
        exit;
    }

    // ═══════════════════════════════════════════════════════════
    // PRODUCT-EXTRAS LINKING
    // ═══════════════════════════════════════════════════════════

    if ($action === 'link_extra' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            INSERT IGNORE INTO product_extras (product_id, extra_id) 
            VALUES (:product_id, :extra_id)
        ');
        $stmt->execute([
            ':product_id' => (int)$body['product_id'],
            ':extra_id' => (int)$body['extra_id'],
        ]);
        echo json_encode(getResponse(true, [], 'Extra linked'));
        exit;
    }

    if ($action === 'unlink_extra' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            DELETE FROM product_extras 
            WHERE product_id = :product_id AND extra_id = :extra_id
        ');
        $stmt->execute([
            ':product_id' => (int)$body['product_id'],
            ':extra_id' => (int)$body['extra_id'],
        ]);
        echo json_encode(getResponse(true, [], 'Extra unlinked'));
        exit;
    }

    // ═══════════════════════════════════════════════════════════
    // EXTRAS MANAGEMENT
    // ═══════════════════════════════════════════════════════════

    if ($action === 'create_extra' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            INSERT INTO extras (name, price) 
            VALUES (:name, :price)
        ');
        $stmt->execute([
            ':name' => (string)$body['name'],
            ':price' => (int)$body['price'],
        ]);
        echo json_encode(getResponse(true, ['id' => $pdo->lastInsertId()], 'Extra created'));
        exit;
    }

    if ($action === 'update_extra' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            UPDATE extras 
            SET name = :name, price = :price 
            WHERE id = :id
        ');
        $stmt->execute([
            ':id' => (int)$body['id'],
            ':name' => (string)$body['name'],
            ':price' => (int)$body['price'],
        ]);
        echo json_encode(getResponse(true, [], 'Extra updated'));
        exit;
    }

    if ($action === 'delete_extra' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('DELETE FROM extras WHERE id = :id');
        $stmt->execute([':id' => (int)$body['id']]);
        echo json_encode(getResponse(true, [], 'Extra deleted'));
        exit;
    }

    // ═══════════════════════════════════════════════════════════
    // ADDITIONAL ITEMS MANAGEMENT
    // ═══════════════════════════════════════════════════════════

    if ($action === 'create_additional_item' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            INSERT INTO additional_items (name, price) 
            VALUES (:name, :price)
        ');
        $stmt->execute([
            ':name' => (string)$body['name'],
            ':price' => (int)$body['price'],
        ]);
        echo json_encode(getResponse(true, ['id' => $pdo->lastInsertId()], 'Additional item created'));
        exit;
    }

    if ($action === 'update_additional_item' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            UPDATE additional_items 
            SET name = :name, price = :price 
            WHERE id = :id
        ');
        $stmt->execute([
            ':id' => (int)$body['id'],
            ':name' => (string)$body['name'],
            ':price' => (int)$body['price'],
        ]);
        echo json_encode(getResponse(true, [], 'Additional item updated'));
        exit;
    }

    if ($action === 'delete_additional_item' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('DELETE FROM additional_items WHERE id = :id');
        $stmt->execute([':id' => (int)$body['id']]);
        echo json_encode(getResponse(true, [], 'Additional item deleted'));
        exit;
    }

    // ═══════════════════════════════════════════════════════════
    // PRODUCT-ADDITIONAL ITEMS LINKING
    // ═══════════════════════════════════════════════════════════

    if ($action === 'link_additional_item' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            INSERT IGNORE INTO product_additional_items (product_id, additional_item_id) 
            VALUES (:product_id, :additional_item_id)
        ');
        $stmt->execute([
            ':product_id' => (int)$body['product_id'],
            ':additional_item_id' => (int)$body['additional_item_id'],
        ]);
        echo json_encode(getResponse(true, [], 'Additional item linked'));
        exit;
    }

    if ($action === 'unlink_additional_item' && $method === 'POST') {
        $body = getRequestBody();
        $stmt = $pdo->prepare('
            DELETE FROM product_additional_items 
            WHERE product_id = :product_id AND additional_item_id = :additional_item_id
        ');
        $stmt->execute([
            ':product_id' => (int)$body['product_id'],
            ':additional_item_id' => (int)$body['additional_item_id'],
        ]);
        echo json_encode(getResponse(true, [], 'Additional item unlinked'));
        exit;
    }

    http_response_code(400);
    echo json_encode(getResponse(false, [], 'Unknown action'));

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(getResponse(false, [], $e->getMessage()));
}
