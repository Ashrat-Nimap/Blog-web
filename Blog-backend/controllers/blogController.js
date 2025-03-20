const { createBlog, getAllBlogs, updateBlog, deleteBlog, getBlogById, updateBlogLikes } = require('../models/blogModel');

const create = (req, res) => {
    const { title, content } = req.body;
    const authorId = req.user.id;
    createBlog(title, content, authorId, (err) => {
        if (err) return res.status(500).json({ message: 'Error creating blog' });
        res.status(201).json({ message: 'Blog created' });
    });
};

const getAll = (req, res) => {
    const userId = req.user ? req.user.id : null; 
    getAllBlogs(userId, (err, blogs) => {
        if (err) {
            console.error('Error fetching blogs:', err.message); 
            return res.status(500).json({ message: 'Error fetching blogs' });
        }
        res.json({ blogs: blogs });
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    updateBlog(id, title, content, (err) => {
        if (err) return res.status(500).json({ message: 'Error updating blog' });
        res.json({ message: 'Blog updated' });
    });
};

const remove = (req, res) => {
    const { id } = req.params;
    deleteBlog(id, (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting blog' });
        res.json({ message: 'Blog deleted' });
    });
};

// Endpoint for updating likes on a blog
const like = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    updateBlogLikes(id, userId, (err, newLikes) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ message: 'Blog liked', likes: newLikes });
    });
};


module.exports = { create, getAll, update, remove, like};