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
    // required: [true, 'Please enter business description']
  },
  category: {
    type: String,
    required: [true, 'Please enter business category'],
    // enum: [
    //   'restaurants','hotels','hospitals','schools','shopping','automotive','beauty','spa',
    //   'fitness','dentists','lawyers','real estate','banks','pharmacies','petrol pumps','pet services','home services',
    //   'coaching centres','tuition classes','colleges','universities','government offices','travel agencies',
    //   'tour operators','courier services','logistics services','event management','party services','wedding services',
    //   'banquet halls','caterers','photographers','doctors','clinics','diagnostic centres','labs','repair services',
    //   'maintenance services','grocery stores','supermarkets','sweet shops','bakeries','clothing stores',
    //   'apparel stores','mobile stores','electronics stores','cyber cafes','printing services','temples','gurudwaras',
    //   'churches','mosques','ngos','charitable organizations','public transport services','bus services','taxi services',
    //   'auto services','metro services','driving schools','car rentals','bike rentals','agricultural services',
    //   'equipment dealers','hardware stores','building material suppliers','cement dealers','ac dealers',
    //   'ac repair services','ac installation services','general physician','pediatrician','cardiologist',
    //   'dermatologist','gynecologist obstetrician','orthopedic doctor','ent specialist ear nose throat',
    //   'ophthalmologist eye specialist','dentist','neurologist','psychiatrist','urologist','nephrologist',
    //   'gastroenterologist','pulmonologist chest specialist','oncologist cancer specialist','endocrinologist',
    //   'rheumatologist','surgeon general','plastic surgeon','physiotherapist','homeopathy doctor','ayurvedic doctor',
    //   'unani doctor','sexologist','immunologist','geriatric specialist elderly care','occupational therapist',
    //   'speech therapist','dietitian nutritionist','atm','it company','institute','assistent','other'
    // ]
  },
  // subcategory: {
  //   type: String,
  //   required: [true, 'Please enter business subcategory']
  // },
  services: [{
    type: String,
    // required: true
  }],
  phone: {
    type: String,
    // required: [true, 'Please enter business phone number']
  },
  email: {
    type: String,
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
    default: false,
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
    },
    "24x7": {
      open: String,
      close: String,
      closed: {
        type: Boolean,
        default: false
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
  analytics: {
  totalCalls: { type: Number, default: 0 },
  totalWhatsApp: { type: Number, default: 0 },
  totalDirectionClicks: { type: Number, default: 0 },

    // store daily logs (for weekly/monthly stats)
    dailyStats: [
      {
        date: { type: Date, default: Date.now },
        calls: { type: Number, default: 0 },
        whatsapp: { type: Number, default: 0 },
        directions: { type: Number, default: 0 }
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Business', businessSchema); 