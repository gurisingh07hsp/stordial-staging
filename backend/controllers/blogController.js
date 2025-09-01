const Blog = require('../models/blog');

exports.createBlog = async (req, res, next) => {
    try {
        
        const blog = await Blog.create(req.body);
        res.status(200).json({
            success: true,
            blog
        });

    } catch(error){
        next(error);
    }
};

exports.getBlogs = async (req,res,next) => {
    try {
        const blogs = await Blog.find();
        
        if(!blogs)
        {
            res.status(400).json({
                success: false,
                message: "Blogs not found!"
            }); 
        }

        res.status(200).json({
            success: true,
            blogs
        });
    } catch(error){
        next(error);
    }
}

exports.getBlogById = async(req,res,next) => {
    try{
        const blog = await Blog.findById(req.params.id);

        if(!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not Found'
            })
        }

        return res.status(200).json({
            success: true,
            blog
        })
    }catch(error){
        next(error);
    }
}

exports.editBlog = async (req,res,next) => {
    try{
        let blog = await Blog.findById(req.params.id);
    
        if (!blog) {
            return res.status(404).json({
            success: false,
            message: 'Blog not Found'
            });
        }
    
        // Check if user is owner or admin
        if (req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
            success: false,
            message: 'You are not authorized to update this blog'
            });
        }
    
        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        res.status(200).json({
            success: true,
            blog
        });
    } catch(error) {
        next(error);
    }
}

exports.deleteBlog = async(req,res,next) => {
    try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({
        success: false,
        message: 'Blog not found'
        });
    }

    // Check if user is owner or admin
    if (req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this blog'
        });
    }

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully'
    });
    } catch (error) {
    next(error);
    }
}

