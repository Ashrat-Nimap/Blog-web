const db = require('../config/db');

// Create the comments table if it doesn't exist
const createCommentTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    blogId INTEGER,
    authorId INTEGER,
    content TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`;
  db.run(query);
};

createCommentTable();

const addComment = (blogId, authorId, content, callback) => {
  const query = 'INSERT INTO comments (blogId, authorId, content) VALUES (?, ?, ?)';
  db.run(query, [blogId, authorId, content], callback);
};

const getCommentsByBlogId = (blogId, callback) => {
  const query = 'SELECT * FROM comments WHERE blogId = ?';
  db.all(query, [blogId], callback);
};

module.exports = { addComment, getCommentsByBlogId };
