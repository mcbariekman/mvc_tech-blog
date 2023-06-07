-- Create the users table to store user information
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  -- Add additional fields as needed, e.g., first_name, last_name, email, etc.
  -- Modify constraints and validation rules accordingly
);

-- Create the posts table to store blog posts
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  -- Add additional fields as needed, e.g., image_url, category, etc.
  -- Modify constraints and validation rules accordingly
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Create the comments table to store comments on blog posts
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  -- Add additional fields as needed, e.g., name, email, etc.
  -- Modify constraints and validation rules accordingly
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
);

-- Add any additional tables or modifications as required for your project
-- e.g., roles table for user roles, likes table for post likes, etc.

