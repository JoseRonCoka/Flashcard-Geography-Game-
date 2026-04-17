DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT NOT NULL UNIQUE,
  username    TEXT NOT NULL,
  password    TEXT NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, username, password) VALUES ('john.doe@example.com', 'johndoe', 'password123');