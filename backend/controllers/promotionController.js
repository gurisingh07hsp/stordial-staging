const Payment = require('../models/payment');
const Business = require('../models/business')
const Razorpay = require("razorpay");
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


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const crypto = require("crypto");

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      businessId,
      amount,
      updatedFormData
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Save payment
    const payment = await Payment.create({
      userId: updatedFormData.userId,
      businessId,
      amount,
      name: updatedFormData.name,
      paymentId: razorpay_payment_id,
      priority: updatedFormData.priority,
      duration_days: updatedFormData.duration_days,
      startDate: new Date(),
      endDate: updatedFormData.endDate,
      status: "active"
    });

    // ✅ Update business
    await Business.findByIdAndUpdate(businessId, {
      featured: true,
      verified: true,
      subscriptionId: payment._id
    });

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};