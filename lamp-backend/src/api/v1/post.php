<?php
// TODO: Pagination!
// TODO: All of the access control!

require_once $_SERVER['DOCUMENT_ROOT'] . '/include/post.php';

$router->map('OPTIONS', '/post', function() {
  jsonResponse([
    '/' => 'Show list of all valid post IDs',
    '/all' => 'Shows all post data',
    '/[:id]' => 'Show post data for a particular post ID',
  ]);
});

/* Get a list of posts */
$router->map('GET', '/post', function() {
  jsonResponse(listPostIDs());
});

/* Get a list of posts */
// TODO: Can this be combined with the above?
$router->map('GET', '/post/', function() {
  jsonResponse(listPostIDs());
});

/* Add a post */
$router->map('POST', '/post', function() {
  $requestData = json_decode(file_get_contents('php://input'), true);
  jsonResponse(postPost($_SESSION['userID'], $requestData));
});

/* Show all posts */
$router->map('GET', '/post/all', function() {
  jsonResponse(listPostsByID());
});

/* Show a particular post */
$router->map('GET', '/post/[:id]', function($id) {
  jsonResponse(getPost($id));
});

?>
