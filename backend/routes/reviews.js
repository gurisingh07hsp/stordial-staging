const express = require('express');
const Review = require('../models/review');
const Business = require('../models/business');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const review = require('../models/review');

// Placeholder for review routes
router.get('/:id', async(req, res, next) => {
  const reviews = await Review.find({business: req.params.id})
    .populate('user', 'name avatar')

  if(!reviews){
    res.status(400).json({
      success: false,
      message: 'Reviews not Found'
    })
  }
  res.status(200).json({
    success: true,
    reviews
  });
});

router.post('/new', isAuthenticated, async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const rating = req.body.selected;
    const { comment } = req.body;

    const business = await Business.findById(req.body.business._id);
    if (!business) {
      return res.status(400).json({
        success: false,
        message: 'Business not Found',
      });
    }

    // Find existing review
    const isreview = await Review.findOne({
      user: req.body.user,
      business: req.body.business._id,
    });

    // Current total rating sum
    let totalRating = business.rating * business.reviews;

    if (isreview) {
      // Update old review → adjust sum
      totalRating = totalRating - isreview.rating + rating;
    } else {
      // New review
      totalRating = totalRating + rating;
      business.reviews = business.reviews + 1;
    }

    // Average with 1 decimal precision
    business.rating = Math.round((totalRating / business.reviews) * 10) / 10;

    await business.save();

    // Create or update review
    const review = await Review.findOneAndUpdate(
      { user: req.body.user, business: req.body.business._id },
      { rating, comment },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      review,
      business,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router; 