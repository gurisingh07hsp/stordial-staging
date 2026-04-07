const Payment = require('../models/payment');
const Business = require('../models/business')
exports.createPayment = async (req, res, next) => {
    try {
        const payment = await Payment.create(req.body);
        
        if(payment){
            const business = await Business.findByIdAndUpdate(payment.businessId, { subscriptionId: payment._id, featured: true, verified: true }, { new: true });
            if(business){
                res.status(201).json({
                    success: true,
                    payment
                });
            }
        }

    } catch(error){
        next(error);
    }
};