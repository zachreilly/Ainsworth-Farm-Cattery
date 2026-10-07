<?php
// Contact form handler for Ainsworth Farm Cattery.
// Receives JSON from the website's contact form and emails it to the cattery.

header('Content-Type: application/json; charset=utf-8');

$TO_EMAIL = 'Cats@ainsworthfarm.co.uk';

function respond($code, $success, $message) {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(400, false, 'Invalid request.');
}

$clean = function ($value) {
    return trim(str_replace(["\r", "\n"], ' ', (string)($value ?? '')));
};

$name    = $clean($data['name'] ?? '');
$email   = $clean($data['email'] ?? '');
$phone   = $clean($data['phone'] ?? '');
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || mb_strlen($name) > 200) {
    respond(400, false, 'Please enter your name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, 'Please enter a valid email address.');
}
if ($message === '' || mb_strlen($message) > 5000) {
    respond(400, false, 'Please enter a message.');
}
if (mb_strlen($phone) > 50) {
    respond(400, false, 'Please check your phone number.');
}

$host = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'ainsworthfarm.co.uk');
$host = preg_replace('/[^A-Za-z0-9.\-]/', '', $host);

$subject = 'New website enquiry from ' . $name;
$body  = "You have a new enquiry from the Ainsworth Farm Cattery website.\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: " . ($phone !== '' ? $phone : 'Not given') . "\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: Ainsworth Farm Cattery Website <noreply@$host>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($TO_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, "-fnoreply@$host")) {
    respond(200, true, 'Thank you! Your message has been sent.');
}

respond(500, false, 'Sorry, your message could not be sent. Please call or email us instead.');
