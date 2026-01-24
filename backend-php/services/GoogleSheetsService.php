<?php
/**
 * Google Sheets Service for PHP
 * Handles volunteer and donor form submissions
 */

require_once __DIR__ . '/../vendor/autoload.php';

use Google\Client;
use Google\Service\Sheets;
use Google\Service\Sheets\ValueRange;

class GoogleSheetsService {
    private $client;
    private $service;
    private $spreadsheetId;
    private $volunteerSheetName;
    private $donorSheetName;
    
    public function __construct() {
        $this->spreadsheetId = getenv('GOOGLE_SHEET_ID');
        $this->volunteerSheetName = getenv('GOOGLE_SHEET_NAME') ?: 'Volunteers';
        $this->donorSheetName = getenv('GOOGLE_DONOR_SHEET_NAME') ?: 'Donors';
        
        if (!$this->spreadsheetId) {
            throw new Exception('GOOGLE_SHEET_ID is not configured');
        }
        
        $this->initializeClient();
    }
    
    private function initializeClient() {
        $this->client = new Client();
        $this->client->setApplicationName('Diya NGO Backend');
        $this->client->setScopes([Sheets::SPREADSHEETS]);
        $this->client->setAccessType('offline');
        
        // Configure SSL certificate for Windows
        $caCertPath = 'C:\php\cacert.pem';
        if (file_exists($caCertPath)) {
            // Set CA certificate path for cURL
            $httpClient = $this->client->getHttpClient();
            if (method_exists($httpClient, 'getConfig')) {
                $config = $httpClient->getConfig();
                if (isset($config['verify'])) {
                    $config['verify'] = $caCertPath;
                }
            }
        }
        
        // Set credentials
        $serviceAccountEmail = getenv('GOOGLE_SERVICE_ACCOUNT_EMAIL');
        $privateKey = getenv('GOOGLE_PRIVATE_KEY');
        
        if (!$serviceAccountEmail || !$privateKey) {
            throw new Exception('Google Sheets credentials not configured');
        }
        
        // Replace \n with actual newlines in private key
        $privateKey = str_replace('\\n', "\n", $privateKey);
        
        $credentials = [
            'type' => 'service_account',
            'project_id' => 'diya-ngo',
            'private_key_id' => '',
            'private_key' => $privateKey,
            'client_email' => $serviceAccountEmail,
            'client_id' => '',
            'auth_uri' => 'https://accounts.google.com/o/oauth2/auth',
            'token_uri' => 'https://oauth2.googleapis.com/token',
            'auth_provider_x509_cert_url' => 'https://www.googleapis.com/oauth2/v1/certs',
            'client_x509_cert_url' => ''
        ];
        
        $this->client->setAuthConfig($credentials);
        $this->service = new Sheets($this->client);
    }
    
    /**
     * Submit volunteer form data
     */
    public function submitVolunteerForm($formData) {
        $timestamp = $this->getTimestamp();
        
        $row = [
            $timestamp,
            $formData['firstName'] ?? '',
            $formData['lastName'] ?? '',
            $formData['gender'] ?? '',
            $formData['email'] ?? '',
            $formData['phone'] ?? '',
            isset($formData['volunteerPreferences']) && is_array($formData['volunteerPreferences']) 
                ? implode(', ', $formData['volunteerPreferences']) 
                : '',
            isset($formData['availability']) && is_array($formData['availability']) 
                ? implode(', ', $formData['availability']) 
                : '',
            $formData['message'] ?? '',
        ];
        
        // Ensure sheet exists and has headers
        $this->ensureSheetExists($this->volunteerSheetName);
        $this->ensureHeaders($this->volunteerSheetName, [
            'Timestamp', 'First Name', 'Last Name', 'Gender', 'Email', 
            'Phone', 'Volunteer Preferences', 'Availability', 'Message'
        ]);
        
        // Append row
        $range = $this->volunteerSheetName . '!A:I';
        $body = new ValueRange([
            'values' => [$row]
        ]);
        
        $params = [
            'valueInputOption' => 'USER_ENTERED',
            'insertDataOption' => 'INSERT_ROWS'
        ];
        
        $result = $this->service->spreadsheets_values->append(
            $this->spreadsheetId,
            $range,
            $body,
            $params
        );
        
        return [
            'success' => true,
            'updatedRows' => $result->getUpdates()->getUpdatedRows() ?? 0,
            'spreadsheetId' => $this->spreadsheetId,
            'sheetName' => $this->volunteerSheetName
        ];
    }
    
    /**
     * Submit donor details
     */
    public function submitDonorDetails($donorData) {
        $timestamp = $this->getTimestamp();
        
        $row = [
            $timestamp,
            $donorData['name'] ?? '',
            $donorData['email'] ?? '',
            $donorData['phone'] ?? '',
            $donorData['amount'] ?? '',
            $donorData['donationType'] ?? '',
            $donorData['upiId'] ?? '',
            $donorData['razorpay_payment_id'] ?? '',
            $donorData['razorpay_order_id'] ?? '',
            $donorData['razorpay_subscription_id'] ?? '',
            'Success', // Payment status
        ];
        
        // Ensure sheet exists and has headers
        $this->ensureSheetExists($this->donorSheetName);
        $this->ensureHeaders($this->donorSheetName, [
            'Timestamp', 'Name', 'Email', 'Phone', 'Amount', 'Donation Type',
            'UPI ID', 'Payment ID', 'Order ID', 'Subscription ID', 'Status'
        ]);
        
        // Append row
        $range = $this->donorSheetName . '!A:K';
        $body = new ValueRange([
            'values' => [$row]
        ]);
        
        $params = [
            'valueInputOption' => 'USER_ENTERED',
            'insertDataOption' => 'INSERT_ROWS'
        ];
        
        $result = $this->service->spreadsheets_values->append(
            $this->spreadsheetId,
            $range,
            $body,
            $params
        );
        
        return [
            'success' => true,
            'updatedRows' => $result->getUpdates()->getUpdatedRows() ?? 0,
            'spreadsheetId' => $this->spreadsheetId,
            'sheetName' => $this->donorSheetName
        ];
    }
    
    /**
     * Ensure sheet exists
     */
    private function ensureSheetExists($sheetName) {
        try {
            $spreadsheet = $this->service->spreadsheets->get($this->spreadsheetId);
            $sheets = $spreadsheet->getSheets();
            
            foreach ($sheets as $sheet) {
                if ($sheet->getProperties()->getTitle() === $sheetName) {
                    return; // Sheet exists
                }
            }
            
            // Sheet doesn't exist, create it
            $this->createSheet($sheetName);
        } catch (Exception $e) {
            throw new Exception('Failed to check sheet existence: ' . $e->getMessage());
        }
    }
    
    /**
     * Create a new sheet
     */
    private function createSheet($sheetName) {
        $request = new \Google\Service\Sheets\Request([
            'addSheet' => [
                'properties' => [
                    'title' => $sheetName
                ]
            ]
        ]);
        
        $batchUpdateRequest = new \Google\Service\Sheets\BatchUpdateSpreadsheetRequest([
            'requests' => [$request]
        ]);
        
        $this->service->spreadsheets->batchUpdate($this->spreadsheetId, $batchUpdateRequest);
    }
    
    /**
     * Ensure headers exist
     */
    private function ensureHeaders($sheetName, $headers) {
        try {
            $range = $sheetName . '!A1:' . chr(64 + count($headers)) . '1';
            $response = $this->service->spreadsheets_values->get($this->spreadsheetId, $range);
            $values = $response->getValues();
            
            if (empty($values) || empty($values[0]) || $values[0][0] !== $headers[0]) {
                // Headers don't exist, add them
                $body = new ValueRange([
                    'values' => [$headers]
                ]);
                
                $this->service->spreadsheets_values->update(
                    $this->spreadsheetId,
                    $range,
                    $body,
                    ['valueInputOption' => 'USER_ENTERED']
                );
            }
        } catch (Exception $e) {
            // If range doesn't exist, add headers
            $range = $sheetName . '!A1:' . chr(64 + count($headers)) . '1';
            $body = new ValueRange([
                'values' => [$headers]
            ]);
            
            $this->service->spreadsheets_values->update(
                $this->spreadsheetId,
                $range,
                $body,
                ['valueInputOption' => 'USER_ENTERED']
            );
        }
    }
    
    /**
     * Get formatted timestamp
     */
    private function getTimestamp() {
        $date = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
        return $date->format('Y-m-d H:i:s');
    }
    
    /**
     * Get all donors from Google Sheets
     * Returns donors separated by type (one-time and monthly)
     */
    public function getDonors() {
        try {
            // Ensure sheet exists
            $this->ensureSheetExists($this->donorSheetName);
            
            // Get all data from Donors sheet
            $range = $this->donorSheetName . '!A2:K'; // Skip header row
            $response = $this->service->spreadsheets_values->get($this->spreadsheetId, $range);
            $values = $response->getValues() ?? [];
            
            $oneTimeDonors = [];
            $monthlyDonors = [];
            
            // Headers: Timestamp, Name, Email, Phone, Amount, Donation Type, UPI ID, Payment ID, Order ID, Subscription ID, Status
            foreach ($values as $row) {
                if (empty($row) || count($row) < 6) {
                    continue; // Skip incomplete rows
                }
                
                $donor = [
                    'timestamp' => $row[0] ?? '',
                    'name' => $row[1] ?? '',
                    'email' => $row[2] ?? '',
                    'phone' => $row[3] ?? '',
                    'amount' => $row[4] ?? '',
                    'donationType' => $row[5] ?? 'one-time',
                    'upiId' => $row[6] ?? '',
                    'paymentId' => $row[7] ?? '',
                    'orderId' => $row[8] ?? '',
                    'subscriptionId' => $row[9] ?? '',
                    'status' => $row[10] ?? 'Success',
                ];
                
                // Separate by donation type
                $donationType = strtolower(trim($donor['donationType']));
                if ($donationType === 'monthly' || !empty($donor['subscriptionId'])) {
                    $monthlyDonors[] = $donor;
                } else {
                    $oneTimeDonors[] = $donor;
                }
            }
            
            // Sort by timestamp (newest first)
            usort($oneTimeDonors, function($a, $b) {
                return strtotime($b['timestamp']) - strtotime($a['timestamp']);
            });
            
            usort($monthlyDonors, function($a, $b) {
                return strtotime($b['timestamp']) - strtotime($a['timestamp']);
            });
            
            return [
                'oneTime' => $oneTimeDonors,
                'monthly' => $monthlyDonors,
                'totalOneTime' => count($oneTimeDonors),
                'totalMonthly' => count($monthlyDonors),
            ];
        } catch (Exception $e) {
            throw new Exception('Failed to get donors: ' . $e->getMessage());
        }
    }
}
