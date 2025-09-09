const express = require('express');
const Job = require('../models/jobs');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.post('/new', isAuthenticated, authorizeRoles('admin'), async (req,res, next) => {
    try{
        const job = await Job.create(req.body);

        if(!job){
            return res.status(400).json({
                success: false,
                message: 'Job creation failed'
            })
        }
        res.status(200).json({
            success: true,
            job
        })
    }catch(error){
        next(error);
    }
})

router.get('/', async(req,res,next) => {
    try{
        const jobs = await Job.find({});

        if(!jobs || jobs.lenght === 0){
            return res.status(400).json({
                success: false,
                message: 'No jobs found'
            })
        }

        return res.status(200).json({
            success: true,
            jobs
        });
    }catch(error){
        next(error);
    }
})

router.put('/apply/:id', async(req, res, next) => {
    try{
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { $push: { enteries: req.body } },
            { new: true, runValidators: true }
        );
        if(!job){
            return res.status(400).json({
                success: false,
                message: 'Job not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Application submitted successfully'
        })
    }catch(error){
        next(error);
    }
})

router.put('/:id', isAuthenticated, authorizeRoles('admin'), async(req, res, next) => {
    try{
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true}
        )

        if(!job){
            return res.status(400).json({
                success: false,
                message: 'Job not found'
            })
        }
        return res.status(200).json({
            success: true,
            job
        })
    }catch(error){
        next(error);
    }
})

router.delete('/:id', isAuthenticated, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 