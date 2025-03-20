const db = require('../config/db');

// Create the blogs table if it doesn't exist
const createBlogTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    authorId INTEGER,
    likes INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`;
    db.run(query);
};

createBlogTable();

const createBlog = (title, content, authorId, callback) => {
    const query = 'INSERT INTO blogs (title, content, authorId) VALUES (?, ?, ?)';
    db.run(query, [title, content, authorId], callback);
};

const getAllBlogs = (userId, callback) => {
    const query = `
        SELECT blogs.*, users.username,
        CASE 
            WHEN blogs.likedBy LIKE '%"${userId}"%' THEN 1
            ELSE 0
        END AS isLiked
        FROM blogs
        LEFT JOIN users ON blogs.authorId = users.id;
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message); // Log the database error
            return callback(err);
        }
        callback(null, rows);
    });
};



const getBlogById = (id, callback) => {
    const query = 'SELECT * FROM blogs WHERE id = ?';
    db.get(query, [id], callback);
};

const updateBlog = (id, title, content, callback) => {
    const query = 'UPDATE blogs SET title = ?, content = ? WHERE id = ?';
    db.run(query, [title, content, id], callback);
};

const deleteBlog = (id, callback) => {
    const query = 'DELETE FROM blogs WHERE id = ?';
    db.run(query, [id], callback);
};

const updateBlogLikes = (blogId, userId, callback) => {
    const query = `SELECT likedBy, likes FROM blogs WHERE id = ?`;
    db.get(query, [blogId], (err, row) => {
        if (err) return callback(err);

        let likedBy = JSON.parse(row.likedBy);
        const isLiked = likedBy.includes(String(userId));

        // Toggle like/unlike
        if (isLiked) {
            likedBy = likedBy.filter(id => id !== String(userId));
        } else {
            likedBy.push(String(userId));
        }

        const newLikes = likedBy.length;
        const updateQuery = `UPDATE blogs SET likedBy = ?, likes = ? WHERE id = ?`;
        db.run(updateQuery, [JSON.stringify(likedBy), newLikes, blogId], (err) => {
            if (err) return callback(err);
            callback(null, newLikes);
        });
    });
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, updateBlogLikes};
