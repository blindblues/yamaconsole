<?php
// Test API semplice per verificare il funzionamento
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'API test working',
    'timestamp' => date('c'),
    'server_info' => [
        'php_version' => phpversion(),
        'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
        'method' => $_SERVER['REQUEST_METHOD'],
        'uri' => $_SERVER['REQUEST_URI']
    ]
]);
?>
