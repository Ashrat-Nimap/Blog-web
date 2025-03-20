const db = require('../config/db');

// Create the users table if it doesn't exist
const createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`;
  db.run(query);
};

createUserTable();

const createUser = (username, password, callback) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(query, [username, password], callback);
};

const getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], callback);
};

module.exports = { createUser, getUserByUsername };
