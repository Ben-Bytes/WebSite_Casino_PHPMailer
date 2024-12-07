<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Adjust the path to PHPMailer based on your project structure
require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

// Check if the script is accessed via a web server
if (php_sapi_name() === 'cli') {
    echo "This script should be run from a web server.";
    exit;
}

// Assuming the form is submitted to this PHP script
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Access the data from the POST request
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $em = "Invalid email format";
        header("Location:index.php?error=$em");
        exit; // Stop further execution
    }

    // Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'ylainbiay.casinointer@gmail.com';     // SMTP username
        $mail->Password   = 'akcyeubfxcaucqta';                    // SMTP password
        $mail->SMTPSecure = "ssl";                                  // Enable implicit TLS encryption
        $mail->Port       = 465;                                    // TCP port to connect to

        // Recipients
        $mail->setFrom($email, $name);                             // Add a recipient
        $mail->addAddress('biaylaintshimanga@gmail.com');      // Name is optional

        // Content
        $mail->isHTML(true);                                       // Set email format to HTML
        $mail->Subject = "New Contact Form Submission";            // Set a subject
        $mail->Body    = "
        <h3>Contact Form</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Message:</strong> $message</p>
        ";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Message has been sent']);
    } catch (Exception $e) {
        // Log the error message for debugging
        error_log("Mailer Error: {$mail->ErrorInfo}");
        // Return a user-friendly error message
        echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Please try again later."]);
    }
}
?>