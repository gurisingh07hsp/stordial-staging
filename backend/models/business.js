const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter business name'],
    trim: true,
    maxLength: [100, 'Business name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter business description']
  },
  category: {
    type: String,
    required: [true, 'Please enter business category'],
    enum: [
      'Restaurants',
      'Retail',
      'Services',
      'Healthcare',
      'Entertainment',
      'Beauty',
      'Fitness',
      'Education',
      'Hotels',
      'Automotive',
      'Real Estate',
      'Technology',
      'Other'
    ]
  },
  subcategory: {
    type: String,
    required: [true, 'Please enter business subcategory']
  },
  services: [{
    type: String,
    // required: true
  }],
  phone: {
    type: String,
    required: [true, 'Please enter business phone number']
  },
  email: {
    type: String,
    required: [true, 'Please enter business email']
  },
  website: {
    type: String
  },
  address: {
    type: String,
    required: [true, 'Please enter business address']
  },
  city: {
    type: String,
    required: [true, 'Please enter business city']
  },
  state: {
    type: String,
    // required: [true, 'Please enter business state']
  },
  zipCode: {
    type: String,
    // required: [true, 'Please enter business zip code']
  },
  coordinates: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: true,
  },
  images: [{
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  }],
  logo: {
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  },
  hours: {
    monday: {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: false
      }
    },
    tuesday: {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: false
      }
    },
    wednesday: {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: false
      }
    },
    thursday: {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: false
      }
    },
    friday: {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: false
      }
    },
    saturday: {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: false
      }
    },
    sunday: {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: true
      }
    }
  },
  specialties: [{
    type: String
  }],
  awards: [{
    type: String
  }],
  yearsInBusiness: {
    type: Number
  },
  teamSize: {
    type: Number
  },
  menu: {
    categories: [{
      name: String,
      items: [{
        name: String,
        description: String,
        price: String,
        vegetarian: Boolean,
        spicy: Boolean,
        popular: Boolean
      }]
    }]
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Business', businessSchema); 