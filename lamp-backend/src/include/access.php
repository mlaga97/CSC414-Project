<?php

/**
 * Updates the password for the given userID.
 * 
 * @param string $userID
 * @param string $password
 */
function updatePassword($userID, $password) {
  global $log, $mysqli;

  $hash = password_hash($password, PASSWORD_BCRYPT);

  // We use $userID because MySQL doesn't like updates on non-key fields (i.e. uname)
  $query = "UPDATE users SET password='$hash' WHERE id='$userID'";
  $results = $mysqli->query($query);
}

/**
 * Change the password for the given userid.
 * 
 * @param string $userID
 * @param string $password Password of the user performing the modification.
 * @param string $newPassword Password to assign to the user specified.
 */
function changePassword($userID, $password, $newPassword) {
  global $log, $mysqli;

  $currentUserID = $_SESSION['userID'];
  $query = "SELECT password FROM users WHERE id='$currentUserID'";
  $results = $mysqli->query($query);

  // Check that there is exactly one matching user
  if ($results && $results->num_rows === 1) {
    $currentUser = $results->fetch_assoc();

    if (!password_verify($password, $currentUser['password'])) {
      return 'Incorrect user password.';
    }

    return 'Unauthorized.';
  }

  return 'Incorrect username.';
}

/**
 * Attempts to login with username and password.
 * 
 * If the login attempt fails, an error message will be returned, otherwise
 * the user's configuration will be loaded and the user will be redirected
 * to the main page.
 * 
 * @param string $username
 * @param string $password
 * 
 * @return string|boolean Returns error string if login failed.
 */
function login($username, $password) {
  global $log, $mysqli;

  $username = $mysqli->real_escape_string($username);
  $query = "SELECT *, id as userID FROM users WHERE username='$username'";
  $results = $mysqli->query($query);

  // Check that there is exactly one matching user
  if ($results && $results->num_rows === 1) {
    $user = $results->fetch_assoc();

    // Check for unhashed password
    // TODO: Remove, eventually.
    if (substr($user['password'], 0, 2) !== '$2') {
      if ($user['password'] === $password) {
        updatePassword($user['id'], $user['password']);
        return login($username, $password);
      }
    }

    // Verify that the password matches the hash 
    if (password_verify($password, $user['password'])) {
      $_SESSION['status'] = 'authorized';

      // Don't store the hash in $_SESSION
      unset($user['password']);
      foreach($user as $key => $value) {
        $_SESSION[$key] = $value;
      }

      return true;
    }
  }

  return 'Incorrect username or password.';
}

?>
