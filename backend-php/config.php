<?php
/**
 * Configuration file for PHP Backend
 * Loads environment variables from .env file or system environment
 */

// Load .env file if it exists
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Parse KEY=VALUE
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            
            // Remove quotes if present
            if ((substr($value, 0, 1) === '"' && substr($value, -1) === '"') ||
                (substr($value, 0, 1) === "'" && substr($value, -1) === "'")) {
                $value = substr($value, 1, -1);
            }
            
            // Set environment variable if not already set
            if (!getenv($key)) {
                putenv("$key=$value");
                $_ENV[$key] = $value;
            }
        }
    }
}

// Helper function to get environment variable with default
function env($key, $default = null) {
    $value = getenv($key);
    return $value !== false ? $value : $default;
}

// Define constants for easy access
define('GOOGLE_SERVICE_ACCOUNT_EMAIL', env('GOOGLE_SERVICE_ACCOUNT_EMAIL'));
define('GOOGLE_PRIVATE_KEY', env('GOOGLE_PRIVATE_KEY'));
define('GOOGLE_SHEET_ID', env('GOOGLE_SHEET_ID'));
define('GOOGLE_SHEET_NAME', env('GOOGLE_SHEET_NAME', 'Volunteers'));
define('GOOGLE_DONOR_SHEET_NAME', env('GOOGLE_DONOR_SHEET_NAME', 'Donors'));

// Razorpay Configuration - General Donations (HDFC Bank)
define('RAZORPAY_KEY_ID_GENERAL', env('RAZORPAY_KEY_ID_GENERAL'));
define('RAZORPAY_KEY_SECRET_GENERAL', env('RAZORPAY_KEY_SECRET_GENERAL'));

// Razorpay Configuration - Annathanam Donations (Indus Bank)
define('RAZORPAY_KEY_ID_ANNATHANAM', env('RAZORPAY_KEY_ID_ANNATHANAM'));
define('RAZORPAY_KEY_SECRET_ANNATHANAM', env('RAZORPAY_KEY_SECRET_ANNATHANAM'));

// Legacy support - fallback to old keys if new ones not set
define('RAZORPAY_KEY_ID', env('RAZORPAY_KEY_ID', env('RAZORPAY_KEY_ID_GENERAL')));
define('RAZORPAY_KEY_SECRET', env('RAZORPAY_KEY_SECRET', env('RAZORPAY_KEY_SECRET_GENERAL')));

define('RAZORPAY_WEBHOOK_SECRET', env('RAZORPAY_WEBHOOK_SECRET'));
define('ALLOWED_ORIGINS', env('ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:5173'));
