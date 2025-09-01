const express = require('express');
const router = express.Router();
const { isAuthenticated} = require('../middleware/auth');
const {createBlog,getBlogs,editBlog,deleteBlog,getBlogById} = require('../controllers/blogController');

router.route('/').get(getBlogs);
router.route('/new').post(isAuthenticated,createBlog);

router.route('/:id')
    .get(getBlogById)
    .put(isAuthenticated,editBlog)
    .delete(isAuthenticated, deleteBlog);

module.exports = router;