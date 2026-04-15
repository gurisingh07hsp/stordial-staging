const Payment = require('../models/payment');
const Business = require('../models/business')
const Razorpay = require("razorpay");
const { Cashfree, CFEnvironment } = require("cashfree-pg");

// ✅ Instantiate with credentials in constructor
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,           // XEnvironment
  process.env.CASHFREE_APP_ID,     // XClientId
  process.env.CASHFREE_SECRET_KEY  // XClientSecret
);

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

exports.createOrder = async (req, res) => {
  try {

    const { amount, businessId } = req.body;

    const request = {
      order_id: "order_" + Date.now(),
      order_amount: Number(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: "user_" + Date.now(),
        customer_email: req.user?.email || "",
        customer_phone: req.user?.phone || "9999999999"
      },
      order_meta: {
        return_url: `https://www.stordial.com/payment-success?order_id=${`order_` + Date.now()}&businessId=${businessId}`
      }
    };

    // ✅ Call on the instance, no API version argument needed
    const response = await cashfree.PGCreateOrder(request);


    res.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: request.order_id
    });

  } catch (err) {
    console.error("CASHFREE ERROR:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: err.response?.data?.message || err.message
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      order_id,
      businessId
    } = req.body;

    // ✅ Fetch payments for this order from Cashfree
    const paymentsRes = await cashfree.PGOrderFetchPayments(order_id);
    const payments = paymentsRes.data;

    // ✅ Find the successful payment
    const successfulPayment = payments.find(p => p.payment_status === "SUCCESS");

    if (!successfulPayment) {
      return res.status(400).json({ success: false, message: "Payment not successful" });
    }


    const plans = [{
      name: 'STANDARD PLAN',
      price: 49,
      priority: 1,
      duration_days: 1
    },
    {
      name: 'STANDARD PLAN',
      price: 1499,
      priority: 1,
      duration_days: 30
    },
    {
      name: 'PREMIUM PLAN',
      price: 99,
      priority: 2,
      duration_days: 1
    },
    {
      name: 'PREMIUM PLAN',
      price: 2499,
      priority: 2,
      duration_days: 30,
    },
    {
      name: 'ELITE PLAN',
      price: 199,
      priority: 3,
      duration_days: 1
    },
    {
      name: 'ELITE PLAN',
      price: 5499,
      priority: 3,
      duration_days: 30
    }]

    const plan = plans.find(p => p.price === successfulPayment.payment_amount);

    if (!plan) {
      return res.status(400).json({ success: false, message: "No matching plan for this amount" });
    }

    const business = await Business.findById(businessId);

    // ✅ Save payment (same fields as your Razorpay version)
    const payment = await Payment.create({
      userId: business.owner,
      businessId,
      amount: successfulPayment.order_amount,
      name: plan.name,
      paymentId: successfulPayment.cf_payment_id,   // cf_payment_id = razorpay_payment_id
      priority: plan.priority,
      duration_days: plan.duration_days,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setDate(new Date().getDate() + plan.duration_days)).toISOString().split('T')[0],
      status: "active"
    });

    // ✅ Update business (identical to your Razorpay version)
    business.featured = true;
    business.verified = true;
    business.subscriptionId = payment._id;
    await business.save();

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.unpromoteBusiness = async (req, res)=> {
try {
  const { id } = req.params;

  console.log("Unpromoting business with ID:", id);

  // 1️⃣ Find business first
  const business = await Business.findById(id);

  if (!business) {
    return res.status(404).json({
      success: false,
      message: "Business not found"
    });
  }

  // 2️⃣ Expire subscription (Payment)
  if (business.subscriptionId) {
    await Payment.findByIdAndUpdate(
      business.subscriptionId,
      { status: "expired" }
    );
  }

  // 3️⃣ Update business
  business.featured = false;
  business.verified = false;

  // ⚠️ DO NOT blindly set verified false (depends on your logic)
  // business.verified = false;

  await business.save();

  res.status(200).json({
    success: true,
    message: "Business unpromoted successfully"
  });

} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}
}