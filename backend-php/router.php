<?php
/**
 * Router script for PHP built-in development server
 * This handles routing when using: php -S localhost:8000 router.php
 */

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);

// If it's a file that exists, serve it directly
if ($path !== '/' && file_exists(__DIR__ . $path)) {
    return false; // Serve the file as-is
}

// For API routes, route to index.php
if (strpos($path, '/api') === 0) {
    // Remove /api prefix for routing
    $_SERVER['REQUEST_URI'] = $path;
    require __DIR__ . '/index.php';
    return true;
}

// Health check at root
if ($path === '/' || $path === '/health') {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'message' => 'Server is running']);
    return true;
}

// Default: serve index.php
require __DIR__ . '/index.php';
return true;
