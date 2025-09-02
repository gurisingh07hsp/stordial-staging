const express = require('express');
const Review = require('../models/review');
const Business = require('../models/business');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const review = require('../models/review');

// Placeholder for review routes
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Reviews API - Coming soon'
  });
});


router.post('/new', isAuthenticated, async(req,res,next) => {
  try{
    req.body.user = req.user._id;
    console.log(typeof(req.body.rating));

    const business = await Business.findById(req.body.business._id);
    if(!business){
      res.status(400).json({
        success: false,
        message: 'Business not Found'
      })
    }

    const isreview = await Review.findOne({ user: req.body.user, business: req.body.business._id });

    if(isreview){
      const re = business.rating - isreview.rating;
      business.rating = (re + req.body.rating)/business.reviews;
    }
    else{
      const r = business.rating + req.body.rating;
      const rev = r/(business.reviews + 1);

      business.rating = rev;
      business.reviews = business.reviews + 1;
    } 

    await business.save();


    const {rating} = req.body;
   const review = await Review.findOneAndUpdate(
    { user: req.body.user, business: req.body.business._id },
    { rating },  // the fields you want to update
    {
      new: true,          // return the updated document
      upsert: true,       // create if not exists
      setDefaultsOnInsert: true
    }
  );

res.status(200).json({
  success: true,
  review,
  business
});
  }catch(error){
    next(error);
  }
})

module.exports = router; 