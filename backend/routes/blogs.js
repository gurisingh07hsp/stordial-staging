const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const {createBlog,getBlogs,editBlog,deleteBlog} = require('../controllers/blogController');

router.route('/').get(getBlogs);
router.route('/new').post(isAuthenticated,createBlog);

router.route('/:id')
    .put(isAuthenticated,editBlog)
    .delete(isAuthenticated, deleteBlog);

module.exports = router;