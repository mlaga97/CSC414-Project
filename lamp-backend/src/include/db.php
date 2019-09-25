<?php

global $mysqli;

// Import the libraries needed for MySQL to be loaded
require_once($_SERVER['DOCUMENT_ROOT'] . '/include/config.php');

// Connect to database server
$mysqli = new mysqli(
  getConfigKey('db.server'),
  getConfigKey('db.user'),
  getConfigKey('db.password')
);

// Select main DB
$mysqli->select_db(getConfigKey('db.database'));

?>
