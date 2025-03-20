const { addComment, getCommentsByBlogId } = require('../models/commentModel');

// Add a comment to a blog
const comment = (req, res) => {
  const { blogId, content } = req.body;
  const authorId = req.user.id;
  addComment(blogId, authorId, content, (err) => {
    if (err) return res.status(500).json({ message: 'Error adding comment' });
    res.json({ message: 'Comment added' });
  });
};

// Get comments for a specific blog
const getComments = (req, res) => {
  const { blogId } = req.params;
  getCommentsByBlogId(blogId, (err, comments) => {
    if (err) return res.status(500).json({ message: 'Error fetching comments' });
    res.json(comments);
  });
};

module.exports = { comment, getComments };
