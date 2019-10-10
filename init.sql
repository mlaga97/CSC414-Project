/* Add users table */
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=latin1;

/* Add default users */
INSERT INTO `users` (`id`, `username`, `password`, `data`) VALUES
  ('1', 'test', 'test', '{}');

/* Add posts table */
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userID` TEXT NOT NULL, /* TODO: This should probably be linked to the `users` table somehow... */
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=latin1;
