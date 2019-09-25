<?php

// Set Timezone Data
date_default_timezone_set('America/Chicago');
$today = date('m-d-y h:i:s');

// User session
session_start();

// Ensure that the api can be used externally
// TODO: Figure out what the proper thing to do here is, as opposed to just adding things until it works.
if(array_key_exists('HTTP_ORIGIN', $_SERVER)) {
  $http_origin = $_SERVER['HTTP_ORIGIN'];

  // TODO: Whitelist
  //if($http_origin == "http://www.domain1.com" || $http_origin == "http://www.domain2.com") {  
    header("Access-Control-Allow-Origin: $http_origin");
  //}

  header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// Set up database
require_once($_SERVER['DOCUMENT_ROOT'] . '/include/db.php');

// TODO: Write a config checker
// Ensure that everything is set up properly
//require_once($_SERVER['DOCUMENT_ROOT'] . '/include/setupCheck.php');

// Import the dependencies for user access
require_once($_SERVER['DOCUMENT_ROOT'] . '/include/access.php');

// Load libraries
require_once '../../include/json.php';
require_once '../../include/AltoRouter/AltoRouter.php';

// Configure altorouter
$router = new AltoRouter();
$router->setBasePath('/api/v1');

// Verify user authentication first!
require_once './auth.php';

// Base routes
$router->map('GET', '/', function() {
  jsonResponse('Welcome to the api!');
});

// Add assorted routes
require_once './user.php';

// Documentation route
$router->map('OPTIONS', '/', function() {
  jsonResponse([
    'user' => '',
  ]);
});

// Show version information
$router->map('GET', '/info', function() {
  jsonResponse([
    revisionDate => $_SESSION['revisionDate'],
    versionString => $_SESSION['versionString'],
  ]);
});

// Perform routing
$match = $router->match();

// Either call the function (if it exists) or throw a 404 (Not Found) error
if( $match && is_callable($match['target'])) {
  call_user_func_array($match['target'], $match['params']); 
} else {
  header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
}

?>
