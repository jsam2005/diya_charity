<?php
/**
 * Diya NGO Backend API - PHP Version
 * Compatible with GoDaddy Web Hosting Starter
 */

// CRITICAL: Set CORS headers FIRST, before any other code
// This ensures OPTIONS requests get headers even if config loading fails
// SUPPORTS BOTH www and non-www seamlessly
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    
    // Extract origin from referer if needed
    if (empty($origin) && !empty($_SERVER['HTTP_REFERER'])) {
        $parsed = parse_url($_SERVER['HTTP_REFERER']);
        if ($parsed) {
            $origin = ($parsed['scheme'] ?? 'https') . '://' . ($parsed['host'] ?? '');
        }
    }
    
    // CRITICAL: Accept BOTH www and non-www versions of dctnow.ngo
    // This allows the site to work seamlessly on both domains
    $corsOrigin = '*'; // Default fallback
    
    if (!empty($origin)) {
        // Match dctnow.ngo (with or without www) - case insensitive
        if (preg_match('/^https?:\/\/(www\.)?dctnow\.ngo$/i', $origin)) {
            $corsOrigin = $origin; // Return the exact origin (www or non-www)
        }
        // Match diyacharity.org (with or without www) - case insensitive
        elseif (preg_match('/^https?:\/\/(www\.)?diyacharity\.org$/i', $origin)) {
            $corsOrigin = $origin; // Return the exact origin (www or non-www)
        }
        // Localhost for development
        elseif (strpos($origin, 'http://localhost') === 0 || strpos($origin, 'http://127.0.0.1') === 0) {
            $corsOrigin = $origin;
        }
    }
    
    // Set CORS headers
    header('Access-Control-Allow-Origin: ' . $corsOrigin);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Cache-Control, Pragma');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

// Set CORS headers immediately
setCorsHeaders();

// Handle OPTIONS preflight BEFORE loading any other code
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Now load configuration and other files
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/services/GoogleSheetsService.php';
require_once __DIR__ . '/services/RazorpayService.php';

/**
 * Handle CORS origin - MUST be defined before use
 */
function getCorsOrigin() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    
    // Extract origin from referer if needed
    if (empty($origin) && !empty($_SERVER['HTTP_REFERER'])) {
        $parsed = parse_url($_SERVER['HTTP_REFERER']);
        if ($parsed) {
            $origin = ($parsed['scheme'] ?? 'https') . '://' . ($parsed['host'] ?? '');
        }
    }
    
    // For local development, always allow localhost
    if (!empty($origin) && (strpos($origin, 'http://localhost') === 0 || strpos($origin, 'http://127.0.0.1') === 0)) {
        return $origin;
    }
    
    // Explicitly allow both www and non-www versions of dctnow.ngo
    // This must be checked FIRST to ensure it works
    if (!empty($origin)) {
        // Exact match for https://dctnow.ngo
        if ($origin === 'https://dctnow.ngo' || $origin === 'http://dctnow.ngo') {
            return $origin;
        }
        // Exact match for https://www.dctnow.ngo
        if ($origin === 'https://www.dctnow.ngo' || $origin === 'http://www.dctnow.ngo') {
            return $origin;
        }
        // Regex check for dctnow.ngo (with or without www) - case insensitive
        if (preg_match('/^https?:\/\/(www\.)?dctnow\.ngo$/i', $origin)) {
            return $origin;
        }
        // Regex check for diyacharity.org (with or without www) - case insensitive
        if (preg_match('/^https?:\/\/(www\.)?diyacharity\.org$/i', $origin)) {
            return $origin;
        }
    }
    
    // Get allowed origins from environment
    $allowedOriginsStr = getenv('ALLOWED_ORIGINS') ?: 'https://dctnow.ngo,https://www.dctnow.ngo,https://diyacharity.org,http://localhost:3000,http://localhost:5173';
    $allowedOrigins = array_map('trim', explode(',', $allowedOriginsStr));
    
    // Add both www and non-www versions to allowed origins if not already present
    $productionDomains = ['https://dctnow.ngo', 'https://www.dctnow.ngo'];
    foreach ($productionDomains as $domain) {
        if (!in_array($domain, $allowedOrigins)) {
            $allowedOrigins[] = $domain;
        }
    }
    
    // If no origin header, check referer or allow all for development
    if (empty($origin)) {
        // In development, allow all
        if (empty(getenv('ALLOWED_ORIGINS')) || strpos($allowedOriginsStr, 'localhost') !== false) {
            return '*';
        }
        return $allowedOrigins[0] ?? '*';
    }
    
    // Check if origin is in allowed list (exact match or wildcard)
    foreach ($allowedOrigins as $allowed) {
        if ($allowed === $origin || $allowed === '*') {
            return $origin;
        }
    }
    
    // Default: return the origin if it's localhost (for development)
    if (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false) {
        return $origin;
    }
    
    // Final check: For production domains, allow if it matches dctnow.ngo or diyacharity.org (www or non-www)
    if (preg_match('/^https?:\/\/(www\.)?(dctnow\.ngo|diyacharity\.org)$/i', $origin)) {
        return $origin;
    }
    
    return $allowedOrigins[0] ?? '*';
}

// Set Content-Type for JSON responses
header('Content-Type: application/json');

// CORS headers already set by setCorsHeaders() function above
// Use getCorsOrigin() for more precise origin matching if needed
$corsOrigin = getCorsOrigin();
header('Access-Control-Allow-Origin: ' . $corsOrigin);
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Cache-Control, Pragma');

// Get request path
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// Get the path - check multiple sources
$path = '';

// Method 1: Check PATH_INFO (set by RewriteRule with /$1)
// This is the most reliable method when .htaccess rewrites work correctly
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
if (!empty($pathInfo)) {
    $path = trim($pathInfo, '/');
    // Remove leading slash if present
    $path = ltrim($path, '/');
}

// Method 2: Extract from REQUEST_URI if PATH_INFO is empty
if (empty($path)) {
    $requestPath = parse_url($requestUri, PHP_URL_PATH);
    
    // Remove /api/ prefix
    if (strpos($requestPath, '/api/') === 0) {
        $path = substr($requestPath, 5); // Remove '/api/'
    } elseif ($requestPath === '/api' || $requestPath === '/api/') {
        $path = ''; // Just /api -> empty
    } elseif (strpos($requestPath, '/api') === 0) {
        // Handle /api without trailing slash
        $path = substr($requestPath, 4); // Remove '/api'
    } else {
        $path = trim($requestPath, '/');
    }
    
    // Also check if path still starts with 'api/' and remove it
    if (strpos($path, 'api/') === 0) {
        $path = substr($path, 4); // Remove 'api/'
    }
    
    // Remove 'index.php' if it's in the path (direct file access)
    if ($path === 'index.php' || strpos($path, 'index.php/') === 0) {
        if ($path === 'index.php') {
            $path = '';
        } else {
            $path = substr($path, 10); // Remove 'index.php/'
        }
    }
}

// Method 3: Check if SCRIPT_NAME contains /api/ and extract relative path
if (empty($path)) {
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
    if (strpos($scriptName, '/api/index.php') !== false) {
        // We're in /api/ folder, REQUEST_URI should have the full path
        // Extract everything after /api/
        if (strpos($requestUri, '/api/') === 0) {
            $path = substr($requestUri, 5);
            $path = trim(parse_url($path, PHP_URL_PATH), '/');
        }
    }
}

// Final normalization - ensure /api/ prefix is removed
$path = trim($path, '/');

// Remove 'api/' prefix if still present (multiple passes for safety)
while (strpos($path, 'api/') === 0) {
    $path = substr($path, 4);
}
$path = trim($path, '/');

// Also handle if path is just 'api'
if ($path === 'api') {
    $path = '';
}

// Special case: If path is 'index.php' (direct file access), treat as root
if ($path === 'index.php') {
    $path = '';
}

// Route handling - recalculate pathParts after normalization
$pathParts = $path ? explode('/', $path) : [];

// Clean up pathParts - remove 'api' if it's the first element and trim all parts
if (!empty($pathParts)) {
    if (trim($pathParts[0]) === 'api') {
        $pathParts = array_slice($pathParts, 1);
    }
    // Trim all path parts to remove any whitespace
    $pathParts = array_map('trim', $pathParts);
    $pathParts = array_filter($pathParts, function($part) { return $part !== ''; }); // Remove empty parts
    $pathParts = array_values($pathParts); // Re-index array
    $path = implode('/', $pathParts); // Rebuild path without 'api' and trimmed
}

// Debug: Log the path (for troubleshooting)
// Enable this temporarily to debug routing issues
error_log("API Debug - Request URI: " . $requestUri . " | Parsed Path: " . $path . " | Method: " . $requestMethod . " | Path Parts: " . json_encode($pathParts));

// Pre-calculate trimmed values for all endpoint checks
$trimmedPath = trim($path);
$firstPart = !empty($pathParts) ? trim($pathParts[0]) : '';

try {
    // Handle empty path (accessing /api/ or /api/index.php directly)
    // Check multiple conditions to catch all variations
    $isEmptyPath = (empty($path) || $path === '' || trim($path) === '');
    $isEmptyPathParts = (empty($pathParts) || count($pathParts) === 0);
    $isRootPath = ($trimmedPath === '' || $trimmedPath === '/');
    $pathInfoIsRoot = (($_SERVER['PATH_INFO'] ?? '') === '/' || ($_SERVER['PATH_INFO'] ?? '') === '');
    
    if (($isEmptyPath && $isEmptyPathParts) || $isRootPath || ($pathInfoIsRoot && $isEmptyPath)) {
        // Show API info when accessing /api/ directly
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Diya Charitable Trust API',
            'version' => '1.0',
            'endpoints' => [
                'GET /api/health' => 'Health check',
                'GET /api/debug' => 'Debug information',
                'GET /api/running-line' => 'Get running line text',
                'POST /api/running-line' => 'Update running line text',
                'POST /api/volunteer/submit' => 'Submit volunteer form',
                'GET /api/donors' => 'Get donor list',
                'POST /api/donations/create-order' => 'Create one-time donation order',
                'POST /api/donations/create-plan' => 'Create monthly donation plan',
                'POST /api/donations/create-subscription' => 'Create subscription',
                'POST /api/donations/save-subscription' => 'Save subscription details',
            ],
            'currentRequest' => [
                'requestUri' => $requestUri,
                'parsedPath' => $path,
                'trimmedPath' => $trimmedPath,
                'pathParts' => $pathParts,
                'firstPart' => $firstPart,
                'method' => $requestMethod,
                'pathInfo' => $_SERVER['PATH_INFO'] ?? 'not set',
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Test endpoint - helps diagnose routing issues
    if ($trimmedPath === 'test-routing' || $firstPart === 'test-routing') {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Routing test endpoint',
            'debug' => [
                'requestUri' => $requestUri,
                'parsedPath' => $path,
                'trimmedPath' => $trimmedPath,
                'pathParts' => $pathParts,
                'firstPart' => $firstPart,
                'method' => $requestMethod,
                'pathInfo' => $_SERVER['PATH_INFO'] ?? 'not set',
                'scriptName' => $_SERVER['SCRIPT_NAME'] ?? 'not set',
                'queryString' => $_SERVER['QUERY_STRING'] ?? 'not set',
            ],
            'routingChecks' => [
                'isDebug' => ($trimmedPath === 'debug' || $firstPart === 'debug'),
                'isHealth' => ($trimmedPath === 'health' || $firstPart === 'health'),
                'isRunningLine' => ($trimmedPath === 'running-line' || $firstPart === 'running-line'),
                'isVolunteer' => ($trimmedPath === 'volunteer/submit' || ($firstPart === 'volunteer' && !empty($pathParts[1]) && trim($pathParts[1]) === 'submit')),
                'isDonors' => ($trimmedPath === 'donors' || $firstPart === 'donors'),
                'isDonations' => ($firstPart === 'donations'),
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Special handling: If accessing index.php directly with no path, show API info
    if (empty($path) && empty($pathParts) && strpos($requestUri, '/api/index.php') !== false) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Diya Charitable Trust API',
            'version' => '1.0',
            'endpoints' => [
                'GET /api/health' => 'Health check',
                'GET /api/debug' => 'Debug information',
                'GET /api/running-line' => 'Get running line text',
                'POST /api/running-line' => 'Update running line text',
                'POST /api/volunteer/submit' => 'Submit volunteer form',
                'GET /api/donors' => 'Get donor list',
                'POST /api/donations/one-time' => 'Create one-time donation',
                'POST /api/donations/monthly' => 'Create monthly donation',
                'POST /api/donations/subscription' => 'Create subscription',
            ],
            'currentRequest' => [
                'requestUri' => $requestUri,
                'parsedPath' => $path,
                'pathParts' => $pathParts,
                'method' => $requestMethod,
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
    
    // Debug endpoint - MUST be first to help diagnose routing issues
    // Use multiple checks to ensure we catch it - check pathParts first since it's more reliable
    $checkDebug = false;
    
    // Check pathParts first (most reliable)
    if (!empty($pathParts) && is_array($pathParts)) {
        $checkDebug = (trim($pathParts[0]) === 'debug');
    }
    
    // Also check path directly
    if (!$checkDebug) {
        $checkDebug = (trim($path) === 'debug' || $trimmedPath === 'debug' || $firstPart === 'debug');
    }
    
    if ($checkDebug && $requestMethod === 'GET') {
        echo json_encode([
            'success' => true,
            'message' => 'Debug endpoint working!',
            'debug' => [
                'requestUri' => $requestUri,
                'parsedPath' => $path,
                'trimmedPath' => $trimmedPath,
                'pathParts' => $pathParts,
                'firstPart' => $firstPart,
                'method' => $requestMethod,
                'pathInfo' => $_SERVER['PATH_INFO'] ?? 'not set',
                'scriptName' => $_SERVER['SCRIPT_NAME'] ?? 'not set',
                'queryString' => $_SERVER['QUERY_STRING'] ?? 'not set',
                'documentRoot' => $_SERVER['DOCUMENT_ROOT'] ?? 'not set',
                'phpVersion' => PHP_VERSION,
                'pathLength' => strlen($path),
                'pathBytes' => $path ? bin2hex($path) : 'empty',
                'checks' => [
                    'pathEqualsDebug' => ($trimmedPath === 'debug'),
                    'firstPartEqualsDebug' => ($firstPart === 'debug'),
                    'pathParts0EqualsDebug' => (!empty($pathParts[0]) && trim($pathParts[0]) === 'debug'),
                ],
            ],
            'availableEndpoints' => ['health', 'debug', 'running-line', 'volunteer/submit', 'donors', 'donations/*']
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Health check
    $checkHealth = ($trimmedPath === 'health' || $firstPart === 'health' || $path === 'health' || ($pathParts[0] ?? '') === 'health');
    if ($checkHealth && $requestMethod === 'GET') {
        echo json_encode([
            'status' => 'ok',
            'message' => 'Server is running',
            'php_version' => PHP_VERSION,
            'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Running line endpoints
    // Handle both 'running-line' and check pathParts for flexibility
    // Also handle if pathParts has ['api', 'running-line']
    $isRunningLine = ($trimmedPath === 'running-line') || 
                     ($firstPart === 'running-line') ||
                     ($path === 'running-line') ||
                     (($pathParts[0] ?? '') === 'running-line') ||
                     (!empty($pathParts[1]) && trim($pathParts[1]) === 'running-line' && $firstPart === 'api');
    
    if ($isRunningLine) {
        if ($requestMethod === 'GET') {
            handleGetRunningLine();
        } elseif ($requestMethod === 'POST') {
            handleUpdateRunningLine();
        } else {
            // For testing - return info about the endpoint
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Running line endpoint is available',
                'method' => 'GET or POST required',
                'path' => $path,
                'pathParts' => $pathParts,
                'requestUri' => $requestUri
            ], JSON_UNESCAPED_UNICODE);
        }
        exit();
    }

    // Volunteer form submission
    // Check both 'volunteer/submit' and pathParts array
    if ($trimmedPath === 'volunteer/submit' || ($firstPart === 'volunteer' && !empty($pathParts[1]) && trim($pathParts[1]) === 'submit')) {
        if ($requestMethod === 'POST') {
            handleVolunteerSubmit();
            exit();
        } elseif ($requestMethod === 'GET') {
            // For testing - return info about the endpoint
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Volunteer submit endpoint is available',
                'method' => 'POST required',
                'path' => $path,
                'requestUri' => $requestUri
            ]);
            exit();
        }
    }

    // Get donor details (one-time and monthly separately)
    // Handle both 'donors' and 'donars' (common typo)
    if (($path === 'donors' || $path === 'donars') && $requestMethod === 'GET') {
        handleGetDonors();
        exit();
    }

    // Donation endpoints
    if ($firstPart === 'donations') {
        handleDonationRoutes($pathParts, $requestMethod);
        exit();
    }

    // 404 Not Found - Include debug info
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Endpoint not found',
        'debug' => [
            'requestUri' => $requestUri,
            'parsedPath' => $path,
            'trimmedPath' => $trimmedPath,
            'pathParts' => $pathParts,
            'firstPart' => $firstPart,
            'method' => $requestMethod,
            'pathInfo' => $_SERVER['PATH_INFO'] ?? 'not set',
            'scriptName' => $_SERVER['SCRIPT_NAME'] ?? 'not set',
            'pathLength' => strlen($path),
            'pathBytes' => $path ? bin2hex($path) : 'empty',
            'checks' => [
                'pathEqualsDebug' => ($trimmedPath === 'debug'),
                'firstPartEqualsDebug' => ($firstPart === 'debug'),
                'pathEqualsHealth' => ($trimmedPath === 'health'),
                'firstPartEqualsHealth' => ($firstPart === 'health'),
                'pathEqualsRunningLine' => ($trimmedPath === 'running-line'),
                'firstPartEqualsRunningLine' => ($firstPart === 'running-line'),
            ],
            'availableEndpoints' => ['health', 'debug', 'running-line', 'volunteer/submit', 'donors', 'donations/*']
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}


/**
 * Handle volunteer form submission
 */
function handleVolunteerSubmit() {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    
    // Better error handling for JSON parsing
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid JSON data: ' . json_last_error_msg(),
            'debug' => [
                'raw_input_length' => strlen($rawInput),
                'json_error' => json_last_error_msg()
            ]
        ]);
        return;
    }
    
    if (!$input || !is_array($input)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid request data - expected JSON object',
            'debug' => [
                'raw_input' => substr($rawInput, 0, 200),
                'input_type' => gettype($input)
            ]
        ]);
        return;
    }
    
    // Validate required fields
    $missingFields = [];
    if (empty($input['firstName'])) {
        $missingFields[] = 'firstName';
    }
    if (empty($input['email'])) {
        $missingFields[] = 'email';
    }
    
    if (!empty($missingFields)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Missing required fields: ' . implode(', ', $missingFields),
            'debug' => [
                'received_fields' => array_keys($input),
                'missing_fields' => $missingFields
            ]
        ]);
        return;
    }
    
    try {
        $googleSheets = new GoogleSheetsService();
        $result = $googleSheets->submitVolunteerForm($input);
        
        echo json_encode([
            'success' => true,
            'message' => 'Volunteer form submitted successfully',
            'data' => $result
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Handle get donors
 */
function handleGetDonors() {
    try {
        $googleSheets = new GoogleSheetsService();
        $result = $googleSheets->getDonors();
        
        echo json_encode([
            'success' => true,
            'data' => $result
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Handle donation routes
 */
function handleDonationRoutes($pathParts, $method) {
    // Debug: Log pathParts for troubleshooting
    error_log("Donation Routes - pathParts: " . json_encode($pathParts) . " | method: " . $method);
    
    $razorpay = new RazorpayService();
    
    // Get the second part (e.g., 'create-order' from ['donations', 'create-order'])
    $endpoint = trim($pathParts[1] ?? '');
    
    // Also check if pathParts[0] might be the endpoint (in case path parsing is different)
    if (empty($endpoint) && !empty($pathParts[0]) && $pathParts[0] !== 'donations') {
        $endpoint = trim($pathParts[0]);
    }
    
    switch ($endpoint) {
        case 'save-upi-donation':
            if ($method === 'POST') {
                handleSaveUpiDonation();
            }
            break;
            
        case 'create-order':
            if ($method === 'POST') {
                $razorpay->createOrder();
            }
            break;
            
        case 'create-plan':
            if ($method === 'POST') {
                $razorpay->createPlan();
            }
            break;
            
        case 'create-subscription':
            if ($method === 'POST') {
                $razorpay->createSubscription();
            }
            break;
            
        case 'create-upi-mandate':
            if ($method === 'POST') {
                $razorpay->createUpiMandate();
            }
            break;
            
        case 'verify-payment':
            if ($method === 'POST') {
                $razorpay->verifyPayment();
            }
            break;
            
        case 'save-subscription':
            if ($method === 'POST') {
                $razorpay->saveSubscription();
            }
            break;
            
        case 'webhook':
            if ($method === 'POST') {
                $razorpay->handleWebhook();
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Donation endpoint not found',
                'debug' => [
                    'pathParts' => $pathParts,
                    'endpoint' => $endpoint,
                    'method' => $method,
                    'availableEndpoints' => [
                        'create-order',
                        'create-plan',
                        'create-subscription',
                        'create-upi-mandate',
                        'verify-payment',
                        'save-subscription',
                        'save-upi-donation',
                        'webhook'
                    ]
                ]
            ], JSON_UNESCAPED_UNICODE);
    }
}

/**
 * Handle get running line
 */
function handleGetRunningLine() {
    $runningLineFile = __DIR__ . '/data/running-line.json';
    
    // Create default file if it doesn't exist
    if (!file_exists($runningLineFile)) {
        $dataDir = dirname($runningLineFile);
        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true);
        }
        
        $defaultContent = [
            'en' => 'Our mission is wide, but our immediate priority vision is Educational upliftment of marginalized & Feeding the child, old age segment & underprivileged. Support Diya Charitable Trust through your donations or volunteering.',
            'ta' => 'எங்கள் பணி பரந்தது, ஆனால் எங்களின் உடனடி முன்னுரிமை பார்வை விளிம்புநிலை மக்களின் கல்வி முன்னேற்றம் மற்றும் குழந்தை, முதியோர் பிரிவு மற்றும் வறியோருக்கு உணவளித்தல். உங்கள் நன்கொடைகள் அல்லது தன்னார்வலர் மூலம் Diya Charitable Trust-ஐ ஆதரிக்கவும்.'
        ];
        
        file_put_contents($runningLineFile, json_encode($defaultContent, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        echo json_encode([
            'success' => true,
            'data' => $defaultContent
        ], JSON_UNESCAPED_UNICODE);
        return;
    }
    
    try {
        // Clear any output buffer
        if (ob_get_level()) {
            ob_clean();
        }
        
        $content = file_get_contents($runningLineFile);
        $data = json_decode($content, true);
        
        if ($data === null) {
            throw new Exception('Invalid JSON in running-line.json: ' . json_last_error_msg());
        }
        
        // Ensure UTF-8 encoding for Tamil text
        echo json_encode([
            'success' => true,
            'data' => $data
        ], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}

/**
 * Handle update running line
 */
function handleUpdateRunningLine() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid JSON data'
        ]);
        return;
    }
    
    if (empty($input['en']) || empty($input['ta'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Both English (en) and Tamil (ta) content are required'
        ]);
        return;
    }
    
    $runningLineFile = __DIR__ . '/data/running-line.json';
    $dataDir = dirname($runningLineFile);
    
    // Ensure data directory exists
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }
    
    $content = [
        'en' => trim($input['en']),
        'ta' => trim($input['ta'])
    ];
    
    try {
        file_put_contents($runningLineFile, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        echo json_encode([
            'success' => true,
            'message' => 'Running line updated successfully',
            'data' => $content
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
}

/**
 * Handle save UPI donation
 */
function handleSaveUpiDonation() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
        return;
    }
    
    // Validate required fields
    if (empty($input['name']) || empty($input['email']) || empty($input['amount'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Name, email, and amount are required'
        ]);
        return;
    }
    
    try {
        $googleSheets = new GoogleSheetsService();
        $donorData = [
            'name' => $input['name'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? '',
            'amount' => $input['amount'],
            'donationType' => $input['donationType'] ?? 'one-time',
            'upiId' => '',
            'razorpay_payment_id' => '',
            'razorpay_order_id' => '',
            'razorpay_subscription_id' => '',
        ];
        
        $googleSheets->submitDonorDetails($donorData);
        
        echo json_encode([
            'success' => true,
            'message' => 'Donor details saved successfully'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
}
