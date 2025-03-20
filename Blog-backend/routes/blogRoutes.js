const express = require('express');
const { create, getAll, update, remove, like } = require('../controllers/blogController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, create);            // Create blog
router.get('/', getAll);                             // Fetch all blogs
router.put('/:id', authenticate, update);            // Update blog
router.delete('/:id', authenticate, remove);         // Delete blog
router.post('/:id/like', authenticate, like);  // Like blog 

module.exports = router;
