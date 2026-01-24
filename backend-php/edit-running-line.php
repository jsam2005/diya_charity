<?php
/**
 * Simple page to edit running line content
 * Access this file directly via browser: yourdomain.com/api/edit-running-line.php
 * 
 * For GoDaddy hosting, you can:
 * 1. Edit the JSON file directly via File Manager: backend-php/data/running-line.json
 * 2. Or use this simple PHP page (if you want a web interface)
 */

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=utf-8');

$runningLineFile = __DIR__ . '/data/running-line.json';
$message = '';
$messageType = '';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $en = $_POST['en'] ?? '';
    $ta = $_POST['ta'] ?? '';
    
    if (empty($en) || empty($ta)) {
        $message = 'Both English and Tamil fields are required!';
        $messageType = 'error';
    } else {
        $dataDir = dirname($runningLineFile);
        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true);
        }
        
        $content = [
            'en' => trim($en),
            'ta' => trim($ta)
        ];
        
        if (file_put_contents($runningLineFile, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
            $message = 'Running line updated successfully!';
            $messageType = 'success';
        } else {
            $message = 'Failed to save. Please check file permissions.';
            $messageType = 'error';
        }
    }
}

// Load current content
$currentEn = '';
$currentTa = '';

if (file_exists($runningLineFile)) {
    $content = json_decode(file_get_contents($runningLineFile), true);
    if ($content) {
        $currentEn = htmlspecialchars($content['en'] ?? '');
        $currentTa = htmlspecialchars($content['ta'] ?? '');
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Running Line - Diya Charitable Trust</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        h1 {
            color: #1C3F75;
            margin-bottom: 10px;
            font-size: 2rem;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1rem;
        }
        .message {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 500;
        }
        .message.success {
            background: #D4EDDA;
            color: #155724;
            border: 1px solid #C3E6CB;
        }
        .message.error {
            background: #F8D7DA;
            color: #721C24;
            border: 1px solid #F5C6CB;
        }
        .form-group {
            margin-bottom: 24px;
        }
        label {
            display: block;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            font-size: 1.1rem;
        }
        textarea {
            width: 100%;
            padding: 12px;
            font-size: 1rem;
            border: 2px solid #E0E0E0;
            border-radius: 8px;
            font-family: inherit;
            resize: vertical;
            min-height: 100px;
        }
        textarea:focus {
            outline: none;
            border-color: #1C3F75;
        }
        .button-group {
            display: flex;
            gap: 12px;
        }
        button {
            flex: 1;
            padding: 12px 30px;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        button:hover {
            transform: scale(1.02);
        }
        button:active {
            transform: scale(0.98);
        }
        .btn-primary {
            background: #1C3F75;
            color: white;
        }
        .btn-secondary {
            background: white;
            color: #1C3F75;
            border: 2px solid #1C3F75;
        }
        .note {
            margin-top: 30px;
            padding: 20px;
            background: #F9F9F9;
            border-radius: 8px;
            font-size: 0.9rem;
            color: #666;
        }
        .note strong {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Edit Running Line</h1>
        <p class="subtitle">Update the running line text that appears at the top of the website</p>
        
        <?php if ($message): ?>
            <div class="message <?php echo $messageType; ?>">
                <?php echo htmlspecialchars($message); ?>
            </div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="form-group">
                <label for="en">English Text</label>
                <textarea id="en" name="en" required><?php echo $currentEn; ?></textarea>
            </div>
            
            <div class="form-group">
                <label for="ta">Tamil Text (தமிழ்)</label>
                <textarea id="ta" name="ta" required><?php echo $currentTa; ?></textarea>
            </div>
            
            <div class="button-group">
                <button type="submit" class="btn-primary">Save Changes</button>
                <button type="reset" class="btn-secondary" onclick="location.reload()">Reset</button>
            </div>
        </form>
        
        <div class="note">
            <strong>Note:</strong> After saving, refresh the main website page to see the updated running line. 
            The changes will be visible immediately.
            <br><br>
            <strong>Alternative Method:</strong> You can also edit the file directly via GoDaddy File Manager:
            <code>backend-php/data/running-line.json</code>
        </div>
    </div>
</body>
</html>
