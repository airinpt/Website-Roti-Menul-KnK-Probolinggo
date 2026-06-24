<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function fallback_reviews(): array
{
    return [
        'source' => 'fallback',
        'business' => 'Roti Menull Knk',
        'rating' => 0,
        'ratingCount' => 0,
        'reviews' => [],
        'mapsUrl' => 'https://maps.app.goo.gl/8QjusxA5wBiYtitS6',
        'notice' => 'Set GOOGLE_MAPS_API_KEY dan GOOGLE_MAPS_PLACE_ID untuk menampilkan ulasan Google Maps secara live.'
    ];
}

$apiKey = trim((string)(getenv('GOOGLE_MAPS_API_KEY') ?: ''));
$placeId = trim((string)(getenv('GOOGLE_MAPS_PLACE_ID') ?: ''));

if ($apiKey !== '' && $placeId !== '') {
    $query = http_build_query([
        'place_id' => $placeId,
        'fields' => 'name,rating,user_ratings_total,reviews,url',
        'reviews_sort' => 'newest',
        'language' => 'id',
        'key' => $apiKey,
    ]);

    $url = 'https://maps.googleapis.com/maps/api/place/details/json?' . $query;
    $response = @file_get_contents($url);

    if ($response !== false) {
        $data = json_decode($response, true);
        $result = is_array($data['result'] ?? null) ? $data['result'] : null;

        if (is_array($result)) {
            $reviews = [];
            foreach (($result['reviews'] ?? []) as $review) {
                if (!is_array($review)) {
                    continue;
                }

                $reviews[] = [
                    'author_name' => (string)($review['author_name'] ?? 'Google User'),
                    'rating' => (int)($review['rating'] ?? 0),
                    'relative_time_description' => (string)($review['relative_time_description'] ?? ''),
                    'text' => (string)($review['text'] ?? ''),
                ];
            }

            echo json_encode([
                'source' => 'google',
                'business' => (string)($result['name'] ?? 'Roti Menull Knk'),
                'rating' => (float)($result['rating'] ?? 0),
                'ratingCount' => (int)($result['user_ratings_total'] ?? 0),
                'reviews' => array_slice($reviews, 0, 6),
                'url' => (string)($result['url'] ?? ''),
                'mapsUrl' => (string)($result['url'] ?? 'https://maps.app.goo.gl/8QjusxA5wBiYtitS6'),
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}

echo json_encode(fallback_reviews(), JSON_UNESCAPED_UNICODE);
