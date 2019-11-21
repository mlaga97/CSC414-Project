<?php

// Set up database
require_once($_SERVER['DOCUMENT_ROOT'] . '/include/db.php');

// TODO: More processing?
function DB2Post($postRow) {
  $postRow['data'] = json_decode($postRow['data']);

  return $postRow;
}

function postPost($userID, $postData) {
  global $mysqli;

  $postData = json_encode($postData);

  // Escape each string in place to avoid SQL injection
  $userID = $mysqli->real_escape_string($userID);
  $postData = $mysqli->real_escape_string($postData);

  $result = $mysqli->query("
    INSERT INTO posts (
      userID,
      data
    ) VALUES (
      '$userID',
      '$postData'
    )
  ");

  if(!$result) return 'Could not submit post!';

  return $mysqli->insert_id;
}

function getPost($id) {
  global $mysqli;
  $output = [];

  // Escape each string in place to avoid SQL injection
  $id = $mysqli->real_escape_string($id);

  // Get post
  if($result = $mysqli->query('SELECT posts.id, userID, posts.data, username FROM posts INNER JOIN users ON posts.userID=users.id AND posts.it = "' . $id . '"')) {
    $output = DB2Post($result->fetch_assoc());
    $result->close();
  }

  return $output;
}

function listPostsByID() {
  global $mysqli;
  $output = [];

  if($result = $mysqli->query('SELECT posts.id, userID, posts.data, username FROM posts INNER JOIN users ON posts.userID=users.id')) {
    while($row = $result->fetch_assoc()) {
      $output[$row['id']] = DB2Post($row);
    }
  }

  return $output;
}

function listPostIDs() {
  global $mysqli;
  $output = [];

  if($result = $mysqli->query('SELECT id FROM posts')) {
    while($row = $result->fetch_assoc()) {
      array_push($output, $row['id']);
    }
  }

  return $output;
}

?>
