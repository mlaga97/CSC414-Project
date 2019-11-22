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

function registrationLink($email) {
  global $log, $mysqli;

  $email = $mysqli->real_escape_string($email);

  /*
  // Test if email already in use
  $query = "SELECT email FROM users WHERE email='$email'";
  if ($result = $mysqli->query($query))
    while ($row = $result->fetch_assoc())
      if ($row['email'] == $email)
        return 'Email already in use!';
  */

  $payload = [
    'email' => $email,
    'timestamp' => time(),
    'uuid' => guidv4(),
  ];

  // TODO: Actually replace with JWT
  $jwt = base64_encode(json_encode($payload));

  // Log registration token
  // TODO: Better
  $query = "INSERT INTO registration ( token ) VALUES ( '$jwt' )";
  $result = $mysqli->query($query);

  if (!$result) return 'Could not send registration link!';

  mail($email, 'BananaNet Registration Link', 'https://banananet.xyz/register?token=' . $jwt, 'From: banananet.noreply@gmail.com');

  return $mysqli->insert_id;
}

// TODO: Get registration token
// TODO: Document
function registerUser($token, $username, $password) {
  global $log, $mysqli;

  // TODO: Actually replace with JWT
  $payload = json_decode(base64_decode($token));
  $email = $payload->email;

  $token = $mysqli->real_escape_string($token);
  $email = $mysqli->real_escape_string($email);
  $username = $mysqli->real_escape_string($username);
  $password = $mysqli->real_escape_string($password);

  $hash = password_hash($password, PASSWORD_BCRYPT);

  // TODO: Test if token is valid
  $query = "SELECT token FROM registration WHERE token='$token'";
  error_log($query);
  $result = $mysqli->query($query);
  if (!$result)
    return 'Unrecognized token!';

  // Test if username or email is already taken
  $query = "SELECT username, email FROM users WHERE username='$username' OR email='$email'";
  if ($result = $mysqli->query($query)) {
    $emailInUse = false;
    $usernameInUse = false;

    while ($row = $result->fetch_assoc()) {
      if ($row['email'] == $email) $emailInUse = true;
      if ($row['username'] == $username) $usernameInUse = true;
    }

    if ($emailInUse) return [
      'success' => false,
      'message' => 'Email already in use!',
    ];
    if ($usernameInUse) return [
      'success' => false,
      'message' => 'Username already in use!',
    ];
  }

  // Actually add the user
  $query = "
    INSERT INTO users (
      email,
      username,
      password
    ) VALUES (
      '$email',
      '$username',
      '$hash'
    )
  ";

  $result = $mysqli->query($query);

  if (!$result) return [
    'success' => false,
    'message' => 'Could not add user!',
  ];

  return [
    'success' => true,
    'message' => $mysqli->insert_id,
  ];
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
