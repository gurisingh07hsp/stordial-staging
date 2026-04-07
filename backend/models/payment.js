const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    name: {
        type: String
    },
    priority: {
        type: Number,
        default: 0
     },
    paymentId: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    duration_days: {
        type: Number,
        // required: true
    },
     startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    paymentGateway: {
        type: String,
        default: "razorpay"
    },
    status: {
        type: String,
        enum: ["active", "expired"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Payment', paymentSchema);