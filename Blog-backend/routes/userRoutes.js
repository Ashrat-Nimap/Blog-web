const express = require('express');
const { comment, getComments } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/comment', authenticate, comment);         // Add comment to a blog
router.get('/comments/:blogId', getComments);             // Get comments for a blog

module.exports = router;
