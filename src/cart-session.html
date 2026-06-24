<?php
declare(strict_types=1);

session_start();
header('Content-Type: application/json; charset=utf-8');

function read_json_input(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function normalize_cart(array $cart): array
{
    $items = [];

    foreach ($cart as $item) {
        if (!is_array($item)) {
            continue;
        }

        // Check if this is enhanced cart format
        if (isset($item['product_name']) && isset($item['subtotal'])) {
            $items[] = [
                'id' => $item['id'] ?? uniqid('item_'),
                'product_name' => $item['product_name'],
                'product_id' => $item['product_id'] ?? 0,
                'category_name' => $item['category_name'] ?? 'Menull',
                'base_price' => $item['base_price'] ?? 0,
                'packaging_fee' => $item['packaging_fee'] ?? 0,
                'serving_option' => $item['serving_option'] ?? 'Dine In',
                'selected_extras' => $item['selected_extras'] ?? [],
                'selected_additional_items' => $item['selected_additional_items'] ?? [],
                'notes' => $item['notes'] ?? '',
                'quantity' => $item['quantity'] ?? 1,
                'unit_price' => $item['unit_price'] ?? 0,
                'subtotal' => $item['subtotal'] ?? 0,
                'timestamp' => $item['timestamp'] ?? time(),
            ];
        } else {
            // Simple cart format (old)
            $id = trim((string)($item['id'] ?? ''));
            $name = trim((string)($item['name'] ?? ''));
            $category = trim((string)($item['category'] ?? ''));
            $price = (int)($item['price'] ?? 0);
            $quantity = (int)($item['quantity'] ?? 0);

            if ($id === '' || $name === '' || $quantity <= 0 || $price <= 0) {
                continue;
            }

            $items[] = [
                'id' => $id,
                'name' => $name,
                'category' => $category,
                'price' => $price,
                'quantity' => $quantity,
            ];
        }
    }

    return $items;
}

$payload = read_json_input();
$action = (string)($payload['action'] ?? 'save');

if ($action === 'clear') {
    unset($_SESSION['menull_cart'], $_SESSION['menull_order_notes'], 
         $_SESSION['menull_cart_enhanced'], $_SESSION['menull_notes_enhanced']);
    echo json_encode(['ok' => true]);
    exit;
}

$cart = normalize_cart(is_array($payload['cart'] ?? null) ? $payload['cart'] : []);
$notes = trim((string)($payload['notes'] ?? ''));

// Check if this is enhanced cart (has product_name)
$isEnhanced = !empty($cart) && isset($cart[0]['product_name']);

if ($isEnhanced) {
    $_SESSION['menull_cart_enhanced'] = $cart;
    $_SESSION['menull_notes_enhanced'] = $notes;
    // Also save simplified version for compatibility
    $_SESSION['menull_cart'] = array_map(function($item) {
        return [
            'id' => $item['id'],
            'name' => $item['product_name'],
            'category' => $item['category_name'] ?? 'Menull',
            'price' => $item['unit_price'] ?? $item['base_price'],
            'quantity' => $item['quantity'],
            'subtotal' => $item['subtotal'],
        ];
    }, $cart);
    $_SESSION['menull_order_notes'] = $notes;
} else {
    $_SESSION['menull_cart'] = $cart;
    $_SESSION['menull_order_notes'] = $notes;
}

echo json_encode([
    'ok' => true,
    'cart' => $cart,
    'notes' => $notes,
    'is_enhanced' => $isEnhanced,
]);