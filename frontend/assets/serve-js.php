<?php
/**
 * PHP Wrapper to Serve JavaScript Files with Correct MIME Type
 * This bypasses Apache MIME type issues by serving JS files through PHP
 * 
 * Automatically called by .htaccess RewriteRule for all .js files
 */

// Security: Only allow files from assets directory
$allowedDir = __DIR__;

// Get file from query parameter (set by .htaccess RewriteRule)
$requestedFile = $_GET['file'] ?? '';

// If file parameter is empty, try to get from REQUEST_URI
if (empty($requestedFile)) {
    $requestUri = $_SERVER['REQUEST_URI'] ?? '';
    $requestedFile = basename(parse_url($requestUri, PHP_URL_PATH));
}

// Validate file name (prevent directory traversal)
if (empty($requestedFile) || preg_match('/[\/\\\\]/', $requestedFile) || preg_match('/\.\./', $requestedFile)) {
    http_response_code(400);
    header('Content-Type: text/plain');
    die('Invalid file name');
}

$filePath = $allowedDir . '/' . $requestedFile;

// Check if file exists and is a .js file
if (!file_exists($filePath) || !is_file($filePath) || !preg_match('/\.js$/', $requestedFile)) {
    http_response_code(404);
    header('Content-Type: text/plain');
    die('File not found: ' . htmlspecialchars($requestedFile));
}

// Set correct headers for ES modules
header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: public, max-age=31536000, immutable');
header('X-Content-Type-Options: nosniff');

// CORS headers for ES modules (required for crossorigin attribute)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read and output file
readfile($filePath);
exit;
