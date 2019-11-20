<?php

// TODO: Put elsewhere
function guidv4() {
    if (function_exists('com_create_guid') === true)
        return trim(com_create_guid(), '{}');

    $data = openssl_random_pseudo_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

$router->map('OPTIONS', '/auth/register', function() {});
$router->map('POST', '/auth/register', function() {
  $requestData = json_decode(file_get_contents('php://input'), true);
  jsonResponse(registerUser($requestData['token'], $requestData['username'], $requestData['password']));
});

// TODO: Better
$router->map('OPTIONS', '/auth/registerlink', function() {});
$router->map('POST', '/auth/registerlink', function() {
  $requestData = json_decode(file_get_contents("php://input"), true);
  jsonResponse(registrationLink($requestData['email']));
});

?>
