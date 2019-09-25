<?php

// Set up database
require_once($_SERVER['DOCUMENT_ROOT'] . '/include/db.php');

function DB2User($userRow) {

  // Add structure
  $user = [];
  $user['login'] = [];

  // Primary Key
  $user['id'] = $userRow['id'];

  // Login
  $user['login']['username'] = $userRow['username'];

  // Other Data
  // TODO: Do parsing
  $user['data'] = $userRow['data'];

  // Special Flags
  if($_SESSION['userID'] == $user['id'])
    $user['flags']['currentUser'] = true;

  return $user;
}

function getUser($id) {
  global $mysqli;
  $output = [];

  // Get user
  // TODO: USE PREPARED STATEMENTS TO AVOID SQL INJECTION
  if($result = $mysqli->query('SELECT id, username, data FROM users WHERE id = "' . $id . '" OR uname = "' . $id . '"')) {
    $output = DB2User($result->fetch_assoc());
    $result->close();
  }

  return $output;
}

function listUsersByID() {
  global $mysqli;
  $output = [];

  if($result = $mysqli->query('SELECT id, username, data FROM users')) {
    while($row = $result->fetch_assoc()) {
      $output[$row['id']] = DB2User($row);
    }
  }

  return $output;
}

function listUserIDs() {
  global $mysqli;
  $output = [];

  if($result = $mysqli->query('SELECT id FROM users')) {
    while($row = $result->fetch_assoc()) {
      array_push($output, $row['id']);
    }
  }

  return $output;
}

?>
