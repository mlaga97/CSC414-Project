<?php

// TODO: Auth token?
// TODO: Reload user settings?

$router->map('OPTIONS', '/auth', function() {
  jsonResponse([
    '/' => 'Check authentication status',
    '/login' => 'Login with username and password',
    '/logout' => 'Logout',
  ]);
});

// TODO: Put elsewhere
function guidv4() {
    if (function_exists('com_create_guid') === true)
        return trim(com_create_guid(), '{}');

    $data = openssl_random_pseudo_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

// Present a limited feature set if the user is not logged in
if(!isset($_SESSION['status']) || $_SESSION['status'] != 'authorized') {
  // TODO: Remove this hack
  $router->map('OPTIONS', '/post', function() {
    jsonResponse([
      '/' => 'Show list of all valid post IDs',
      '/all' => 'Shows all post data',
      '/[:id]' => 'Show post data for a particular post ID',
    ]);
  });

  $router->map('OPTIONS', '/auth/register', function() {});
  $router->map('POST', '/auth/register', function() {
    $requestData = json_decode(file_get_contents("php://input"), true);
    jsonResponse(registerUser($requestData['username'], $requestData['password']));
  });

  // TODO: Better
  $router->map('OPTIONS', '/auth/registerlink', function() {});
  $router->map('POST', '/auth/registerlink', function() {
    $postData = json_decode(file_get_contents("php://input"), true);
    $email = $postData['email'];

    $payload = [
      'email' => $email,
      'timestamp' => time(),
      'uuid' => guidv4(),
    ];

    // TODO: Actually replace with JWT
    $jwt = base64_encode(json_encode($payload));

    mail($email, 'BananaNet Registration Link', 'https://banananet.xyz/register?token=' . $jwt, 'From: banananet.noreply@gmail.com');

    jsonResponse([
      'success' => 'maybe',
    ]);
  });

  $router->map('GET', '/auth', function() {
    jsonResponse(false);
  });

  $router->map('OPTIONS', '/auth/login', function() {});

  $router->map('POST', '/auth/login', function() {
    error_log('Test');
    $postData = json_decode(file_get_contents("php://input"), true);
    $response = login($postData['username'], $postData['password']);

    if(getType($response) == 'string') {
      jsonResponse($response);
    } else {
      jsonResponse([
        'userID' => $_SESSION['userID'],
        'message' => 'Authentication succeeded',
        'success' => true,
      ]);
    }
  });

  $match = $router->match();

  // Either call the function (if it exists) or throw a 401 (Authorization Required) error
  if($match && is_callable($match['target'])) {
    call_user_func_array($match['target'], $match['params']);
  } else {
    header($_SERVER['SERVER_PROTOCOL'] . ' 401');
  }

  // Don't do anything after this
  die();
}

$router->map('GET', '/auth', function() {
  jsonResponse(true);
});

$router->map('POST', '/auth/login', function() {
  jsonResponse([
    'userID' => $_SESSION['userID'],
    'message' => 'Already logged in!',
    'success' => false,
  ]);
});

$router->map('POST', '/auth/logout', function() {
  jsonResponse('Logged out!');
  session_unset();
});

?>
