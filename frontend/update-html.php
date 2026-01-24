<?php
/**
 * Post-build script to automatically update index.html
 * Replaces direct JS file references with PHP wrapper
 * 
 * Usage: php update-html.php
 */

$indexPath = __DIR__ . '/dist/index.html';

if (!file_exists($indexPath)) {
    die("Error: dist/index.html not found. Run 'npm run build' first.\n");
}

$content = file_get_contents($indexPath);

// Replace script src attributes
$content = preg_replace(
    '/(src|href)="\/assets\/([^"]+\.js)"/',
    '$1="/assets/serve-js.php?file=$2"',
    $content
);

// Save updated file
file_put_contents($indexPath, $content);

echo "✅ Updated index.html - JS files now use PHP wrapper\n";
echo "📦 Ready to upload to GoDaddy\n";
