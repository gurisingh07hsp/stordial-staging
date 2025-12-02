const Business = require('../models/business');
const User = require('../models/user');

// Create new business
exports.createBusiness = async (req, res, next) => {
  try {
    req.body.owner = req.user.id;
    req.body.category = req.body.category.toLowerCase()
      .replace(/[^a-z\s-]/g, '') // Remove special characters
      .replace('-', ' ') // Replace spaces with hyphens
      .trim();
  const business = await Business.create(req.body);


  // Update user to business owner
const user = await User.findById(req.user.id);

if (user.role !== 'admin') {
  await User.findByIdAndUpdate(req.user.id, {
    businessOwner: true,
    role: 'business_owner'
  });
}

  res.status(201).json({
    success: true,
    business
  });
  } catch (error) {
    next(error);
  }
};

// Get all businesses
exports.getBusinesses = async (req, res, next) => {
  try {
    let { location, category, search, featured, verified, page = 1, limit = 5 } = req.query;

    category = category.toLowerCase();
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    
    let query = {};

    // Filter by location
    if (location) {
      query.city = { $regex: location, $options: 'i' };
    }

    // Filter by category
    if (category && category !== 'all categories') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { services: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Filter by featured
    if (featured) {
      query.featured = featured === 'true';
    }

    // Filter by verified
    if (verified) {
      query.verified = verified === 'true';
    }

    const total = await Business.find(query).countDocuments();

    const businesses = await Business.find(query)
      .populate('owner', 'name email')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);


    res.status(200).json({
      success: true,
      count: businesses.length,
      businesses,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum
    });
  } catch (error) {
    next(error);
  }
};

// Get single business
exports.getBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('owner', 'name email phone')
      .populate({
        path: 'reviews',
        // populate: {
        //   path: 'user',
        //   // select: 'name'
        // }
      });


    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    res.status(200).json({
      success: true,
      business
    });
  } catch (error) {
    next(error);
  }
};


exports.getBusinessById = async (req, res, next) => {
  try {
    let { location, id } = req.params;

    location = location.toLowerCase();

    const business = await Business.findById(id)
      .populate('owner', 'name email phone')
      .populate({
        path: 'reviews',
        // populate: {
        //   path: 'user',
        //   // select: 'name avatar'
        // }
      });


    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    res.status(200).json({
      success: true,
      business
    });
  } catch (error) {
    next(error);
  }
};

exports.getBusinessByUser = async (req,res,next) => {
  try {
    const businesses = await Business.find({owner: req.params.id});
    if(!businesses){
      return res.status(404).json({
        success: false,
        message: 'Businesses not found'
      });
    }
    res.status(200).json({
    success: true,
    businesses
    });
    
  } catch (error) {
    next(error);
  }
};

// Update business
exports.updateBusiness = async (req, res, next) => {
  try {
    let business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user is owner or admin
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this business'
      });
    }

    business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      business
    });
  } catch (error) {
    next(error);
  }
};

// Delete business
exports.deleteBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if user is owner or admin
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this business'
      });
    }

    await business.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Business deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get featured businesses
exports.getFeaturedBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find({ featured: true })
      .populate('owner', 'name email')
      .sort({ rating: -1, reviews: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      count: businesses.length,
      businesses
    });
  } catch (error) {
    next(error);
  }
};

// Get businesses by category and location
exports.getBusinessesByCategoryAndLocation = async (req, res, next) => {
  try {
    
    let query = {};
    let { location, category } = req.params;
    location = location.toLowerCase();

    if (location && location !== 'all') {
      query.city = { $regex: location, $options: 'i' };
    }

    if(category && category !== undefined){
      query.subcategory = { $regex: category, $options: 'i'};
    }

      let businesses = await Business.find(query)
      .populate('owner', 'name email')
      .sort({ rating: -1, reviews: -1 });

      if(businesses.length <= 0 ){
        category = category.toLowerCase();
        delete query.subcategory;
        if (category && category !== 'All Categories') {
          query.category = { $regex: category, $options: 'i' };
        }
      
        businesses = await Business.find(query)
        .populate('owner', 'name email')
        .sort({ rating: -1, reviews: -1 });
      }

    res.status(200).json({
      success: true,
      count: businesses.length,
      businesses
    });
    
  } catch (error) {
    next(error);
  }
};

exports.analytics = async (req, res) => {
  try {
    const { businessId, type } = req.params;
    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ message: "Business not found" });

    // Increment total count
    if (type === "call") business.analytics.totalCalls += 1;
    if (type === "whatsapp") business.analytics.totalWhatsApp += 1;
    if (type === "direction") business.analytics.totalDirectionClicks += 1;

    // Track daily stats
    const today = new Date().toDateString();
    const todayStat = business.analytics.dailyStats.find(
      (s) => new Date(s.date).toDateString() === today
    );

    if (todayStat) {
      if (type === "call") todayStat.calls += 1;
      if (type === "whatsapp") todayStat.whatsapp += 1;
      if (type === "direction") todayStat.directions += 1;
    } else {
      business.analytics.dailyStats.push({
        date: new Date(),
        calls: type === "call" ? 1 : 0,
        whatsapp: type === "whatsapp" ? 1 : 0,
        directions: type === "direction" ? 1 : 0,
      });
    }

    await business.save();
    res.json({ success: true, message: "Analytics updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Toggle featured status (admin only)
exports.toggleFeatured = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    business.featured = !business.featured;
    await business.save();

    res.status(200).json({
      success: true,
      business
    });
  } catch (error) {
    next(error);
  }
};

// Toggle verified status (admin only)
exports.toggleVerified = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    business.verified = !business.verified;
    await business.save();

    res.status(200).json({
      success: true,
      business
    });
  } catch (error) {
    next(error);
  }
}; 