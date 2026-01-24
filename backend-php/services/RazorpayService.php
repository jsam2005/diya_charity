<?php
/**
 * Razorpay Service for PHP
 * Handles payment processing
 */

require_once __DIR__ . '/../vendor/autoload.php';

use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

class RazorpayService {
    private $api;
    private $googleSheets;
    private $purpose; // 'general' or 'annathanam'
    
    /**
     * Get Razorpay API instance based on purpose
     * @param string $purpose 'general' or 'annathanam'
     * @return Api|null
     */
    private function getApi($purpose = 'general') {
        // Determine which keys to use based on purpose
        if ($purpose === 'annathanam') {
            $keyId = getenv('RAZORPAY_KEY_ID_ANNATHANAM') ?: getenv('RAZORPAY_KEY_ID');
            $keySecret = getenv('RAZORPAY_KEY_SECRET_ANNATHANAM') ?: getenv('RAZORPAY_KEY_SECRET');
        } else {
            // Default to general (HDFC Bank)
            $keyId = getenv('RAZORPAY_KEY_ID_GENERAL') ?: getenv('RAZORPAY_KEY_ID');
            $keySecret = getenv('RAZORPAY_KEY_SECRET_GENERAL') ?: getenv('RAZORPAY_KEY_SECRET');
        }
        
        if (!$keyId || !$keySecret) {
            error_log("Warning: Razorpay keys not configured for {$purpose} donations. Payment features will be disabled.");
            return null;
        }
        
        try {
            return new Api($keyId, $keySecret);
        } catch (Exception $e) {
            error_log("Error initializing Razorpay for {$purpose}: " . $e->getMessage());
            return null;
        }
    }
    
    public function __construct($purpose = 'general') {
        $this->purpose = $purpose;
        $this->api = $this->getApi($purpose);
        $this->googleSheets = new GoogleSheetsService();
    }
    
    /**
     * Create payment order
     */
    public function createOrder() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['amount']) || $input['amount'] <= 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid amount']);
            return;
        }
        
        // Determine purpose from input or use default
        $purpose = $input['purpose'] ?? $this->purpose ?? 'general';
        $api = $this->getApi($purpose);
        
        if (!$api) {
            http_response_code(503);
            echo json_encode(['success' => false, 'error' => 'Razorpay not configured for ' . $purpose . ' donations']);
            return;
        }
        
        try {
            $amount = round($input['amount'] * 100); // Convert to paise
            $currency = $input['currency'] ?? 'INR';
            
            $order = $api->order->create([
                'amount' => $amount,
                'currency' => $currency,
                'receipt' => 'receipt_' . time()
            ]);
            
            echo json_encode([
                'success' => true,
                'orderId' => $order['id'],
                'amount' => $order['amount']
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
     * Create subscription plan
     */
    public function createPlan() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['amount']) || $input['amount'] <= 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Invalid amount']);
            return;
        }
        
        // Determine purpose from input or use default
        $purpose = $input['purpose'] ?? $this->purpose ?? 'general';
        $api = $this->getApi($purpose);
        
        if (!$api) {
            http_response_code(503);
            echo json_encode(['success' => false, 'error' => 'Razorpay not configured for ' . $purpose . ' donations. Please add RAZORPAY_KEY_ID_' . strtoupper($purpose) . ' and RAZORPAY_KEY_SECRET_' . strtoupper($purpose) . ' to environment variables.']);
            return;
        }
        
        try {
            // Frontend sends amount in paise already, so use it directly
            $amount = round($input['amount']); // Amount is already in paise
            $amountInRupees = $amount / 100; // For display purposes
            $period = $input['period'] ?? 'monthly';
            $interval = $input['interval'] ?? 1;
            
            $planName = $purpose === 'annathanam' 
                ? 'Monthly Annathanam Donation - ₹' . $amountInRupees
                : 'Monthly Donation - ₹' . $amountInRupees;
            
            $plan = $api->plan->create([
                'period' => $period,
                'interval' => $interval,
                'item' => [
                    'name' => $planName,
                    'amount' => $amount,
                    'currency' => 'INR',
                ],
            ]);
            
            echo json_encode([
                'success' => true,
                'planId' => $plan['id']
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
     * Create subscription
     */
    public function createSubscription() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['planId'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Plan ID is required']);
            return;
        }
        
        // Determine purpose from input or use default
        $purpose = $input['purpose'] ?? $this->purpose ?? 'general';
        $api = $this->getApi($purpose);
        
        if (!$api) {
            http_response_code(503);
            echo json_encode(['success' => false, 'error' => 'Razorpay not configured for ' . $purpose . ' donations. Please add RAZORPAY_KEY_ID_' . strtoupper($purpose) . ' and RAZORPAY_KEY_SECRET_' . strtoupper($purpose) . ' to environment variables.']);
            return;
        }
        
        try {
            $customerDetails = $input['customerDetails'] ?? [];
            $upiId = $input['upiId'] ?? '';
            
            // Create customer
            $customer = null;
            if (!empty($customerDetails)) {
                try {
                    $customer = $api->customer->create([
                        'name' => $customerDetails['name'] ?? '',
                        'email' => $customerDetails['email'] ?? '',
                        'contact' => $customerDetails['phone'] ?? '',
                    ]);
                } catch (Exception $e) {
                    // Customer might already exist
                }
            }
            
            // Create subscription
            // For UPI mandates, Razorpay has a strict 30-year limit on expire_at
            // When using end_at, Razorpay requires start_at to be set
            // start_at must be in the future (at least a few minutes from now)
            $startDate = new DateTime();
            $startDate->modify('+5 minutes'); // Set to 5 minutes in future to ensure it's not in the past
            $startAt = $startDate->getTimestamp();
            
            // Calculate end_at as 29 years from start_at to be safely under 30 years
            // Using 29 years gives us a 1-year buffer to account for any calculation differences
            $endDate = clone $startDate;
            $endDate->modify('+29 years'); // 29 years = safely under 30 years limit
            $endAt = $endDate->getTimestamp();
            
            // Additional safety check: verify it's definitely under 30 years
            $secondsIn30Years = 30 * 365.25 * 24 * 60 * 60; // 30 years in seconds (accounting for leap years)
            $actualDifference = $endAt - $startAt;
            
            if ($actualDifference >= $secondsIn30Years) {
                // If somehow we're at or over 30 years, reduce to 28 years
                $endDate = clone $startDate;
                $endDate->modify('+28 years');
                $endAt = $endDate->getTimestamp();
                $actualDifference = $endAt - $startAt;
            }
            
            // Log for debugging
            $yearsDifference = $actualDifference / (365.25 * 24 * 60 * 60);
            error_log("Subscription date calculation: start_at=" . date('Y-m-d H:i:s', $startAt) . 
                      ", end_at=" . date('Y-m-d H:i:s', $endAt) . 
                      ", years=" . round($yearsDifference, 2) . 
                      ", seconds_diff=" . $actualDifference);
            
            $subscriptionData = [
                'plan_id' => $input['planId'],
                'customer_notify' => 1,
                'start_at' => $startAt, // Required when end_at is present, must be in future
                'end_at' => $endAt, // Explicitly set to 30 years (maximum for UPI)
                'notes' => [
                    'donation_type' => 'monthly',
                    'upi_id' => $upiId ?: 'N/A',
                ],
            ];
            
            if ($customer && isset($customer['id'])) {
                $subscriptionData['customer_id'] = $customer['id'];
            }
            
            $subscription = $api->subscription->create($subscriptionData);
            
            echo json_encode([
                'success' => true,
                'subscriptionId' => $subscription['id'],
                'customerId' => $customer['id'] ?? null
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
     * Create UPI mandate
     */
    public function createUpiMandate() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (empty($input['amount']) || empty($input['upiId']) || empty($input['subscriptionId'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Amount, UPI ID, and Subscription ID are required'
            ]);
            return;
        }
        
        // Determine purpose from input or use default
        $purpose = $input['purpose'] ?? $this->purpose ?? 'general';
        $api = $this->getApi($purpose);
        
        if (!$api) {
            http_response_code(503);
            echo json_encode(['success' => false, 'error' => 'Razorpay not configured for ' . $purpose . ' donations']);
            return;
        }
        
        try {
            $customerDetails = $input['customerDetails'] ?? [];
            
            // Create customer
            $customer = null;
            if (!empty($customerDetails)) {
                try {
                    $customer = $api->customer->create([
                        'name' => $customerDetails['name'] ?? '',
                        'email' => $customerDetails['email'] ?? '',
                        'contact' => $customerDetails['phone'] ?? '',
                    ]);
                } catch (Exception $e) {
                    // Customer might already exist
                }
            }
            
            // Create order for mandate
            $order = $api->order->create([
                'amount' => round($input['amount'] * 100),
                'currency' => 'INR',
                'receipt' => 'mandate_' . time(),
                'notes' => [
                    'subscription_id' => $input['subscriptionId'],
                    'upi_id' => $input['upiId'],
                    'purpose' => 'UPI_MANDATE',
                ],
            ]);
            
            echo json_encode([
                'success' => true,
                'orderId' => $order['id'],
                'amount' => $order['amount'],
                'customerId' => $customer['id'] ?? null
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
     * Verify payment
     */
    public function verifyPayment() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $orderId = $input['razorpay_order_id'] ?? '';
        $paymentId = $input['razorpay_payment_id'] ?? '';
        $signature = $input['razorpay_signature'] ?? '';
        $donationData = $input['donationData'] ?? [];
        
        if (empty($orderId) || empty($paymentId) || empty($signature)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing payment verification data']);
            return;
        }
        
        // Determine purpose from donationData or use default
        $purpose = $donationData['purpose'] ?? $input['purpose'] ?? $this->purpose ?? 'general';
        $api = $this->getApi($purpose);
        
        if (!$api) {
            http_response_code(503);
            echo json_encode(['success' => false, 'error' => 'Razorpay not configured for ' . $purpose . ' donations']);
            return;
        }
        
        try {
            $attributes = [
                'razorpay_order_id' => $orderId,
                'razorpay_payment_id' => $paymentId,
                'razorpay_signature' => $signature
            ];
            
            $api->utility->verifyPaymentSignature($attributes);
            
            // Payment verified - save to Google Sheets
            try {
                $donorData = array_merge($donationData, [
                    'razorpay_payment_id' => $paymentId,
                    'razorpay_order_id' => $orderId,
                    'razorpay_subscription_id' => '',
                ]);
                
                $this->googleSheets->submitDonorDetails($donorData);
            } catch (Exception $e) {
                // Don't fail if Google Sheets save fails
                error_log('Failed to save donor details: ' . $e->getMessage());
            }
            
            echo json_encode([
                'success' => true,
                'status' => 'success',
                'message' => 'Payment verified successfully'
            ]);
        } catch (SignatureVerificationError $e) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'status' => 'failure',
                'message' => 'Invalid signature'
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
     * Save subscription
     */
    public function saveSubscription() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $subscriptionId = $input['razorpay_subscription_id'] ?? '';
        $donationData = $input['donationData'] ?? [];
        
        if (empty($subscriptionId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Subscription ID is required']);
            return;
        }
        
        // Determine purpose from donationData or use default
        $purpose = $donationData['purpose'] ?? $input['purpose'] ?? $this->purpose ?? 'general';
        $api = $this->getApi($purpose);
        
        if (!$api) {
            http_response_code(503);
            echo json_encode(['success' => false, 'error' => 'Razorpay not configured for ' . $purpose . ' donations']);
            return;
        }
        
        // Verify signature if provided
        if (!empty($input['razorpay_payment_id']) && !empty($input['razorpay_signature'])) {
            try {
                $attributes = [
                    'razorpay_subscription_id' => $subscriptionId,
                    'razorpay_payment_id' => $input['razorpay_payment_id'],
                    'razorpay_signature' => $input['razorpay_signature']
                ];
                
                $api->utility->verifyPaymentSignature($attributes);
            } catch (SignatureVerificationError $e) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid signature']);
                return;
            }
        }
        
        // Save to Google Sheets
        try {
            $donorData = array_merge($donationData, [
                'razorpay_subscription_id' => $subscriptionId,
                'razorpay_payment_id' => $input['razorpay_payment_id'] ?? '',
                'razorpay_order_id' => '',
            ]);
            
            $this->googleSheets->submitDonorDetails($donorData);
            
            echo json_encode([
                'success' => true,
                'status' => 'success',
                'message' => 'Subscription saved successfully'
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
     * Handle webhook
     */
    public function handleWebhook() {
        $webhookSecret = getenv('RAZORPAY_WEBHOOK_SECRET');
        $payload = file_get_contents('php://input');
        $signature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] ?? '';
        
        if ($webhookSecret && $signature) {
            $expectedSignature = hash_hmac('sha256', $payload, $webhookSecret);
            
            if ($expectedSignature !== $signature) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid webhook signature']);
                return;
            }
        }
        
        $data = json_decode($payload, true);
        $event = $data['event'] ?? '';
        $payload_data = $data['payload'] ?? [];
        
        // Handle different events
        switch ($event) {
            case 'subscription.charged':
                error_log('Subscription charged: ' . json_encode($payload_data));
                break;
            case 'subscription.failed':
                error_log('Subscription failed: ' . json_encode($payload_data));
                break;
            case 'subscription.cancelled':
                error_log('Subscription cancelled: ' . json_encode($payload_data));
                break;
            case 'subscription.activated':
                error_log('Subscription activated: ' . json_encode($payload_data));
                break;
            case 'payment.authorized':
                error_log('Payment authorized (Mandate): ' . json_encode($payload_data));
                break;
            default:
                error_log('Unhandled webhook event: ' . $event);
        }
        
        echo json_encode(['success' => true, 'received' => true]);
    }
}
