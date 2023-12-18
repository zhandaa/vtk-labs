<?php
$botToken = '6853464073:AAEIGZ0pPg6oQHRsgyG4sJWrI-8wxfgMlMU';
$chatId = '457645509';

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$telegramMessage = "Новое сообщение из формы:\n\nИмя: $name\nEmail: $email\nСообщение: $message";

$telegramApiUrl = "https://api.telegram.org/bot$botToken/sendMessage";
$telegramApiParams = [
    'chat_id' => $chatId,
    'text' => $telegramMessage,
];

$ch = curl_init($telegramApiUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $telegramApiParams);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo 'Success';
?>