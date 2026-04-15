const cron = require("node-cron");
const Payment = require("../models/payment");
const Business = require("../models/business");

cron.schedule("0 * * * *", async () => {
  console.log("Running subscription expiry job...");

  try {
    const now = new Date();

    // 1️⃣ Find expired payments
    const expiredPayments = await Payment.find({
      status: "active",
      endDate: { $lt: now }
    }).select("businessId");

    // 2️⃣ Extract business IDs
    const businessIds = expiredPayments.map(p => p.businessId);

    // 3️⃣ Update payments → expired
    const paymentResult = await Payment.updateMany(
      {
        _id: { $in: expiredPayments.map(p => p._id) }
      },
      {
        $set: { status: "expired", }
      }
    );

    // 4️⃣ Update businesses
    const businessResult = await Business.updateMany(
      {
        _id: { $in: businessIds }
      },
      {
        $set: {
          featured: false,
          verified: false // or keep true if you want
        }
      }
    );

    console.log("Expired Payments:", paymentResult.modifiedCount);
    console.log("Updated Businesses:", businessResult.modifiedCount);

  } catch (error) {
    console.error("Cron Error:", error);
  }
});










// const cron = require("node-cron");
// const Payment = require("../models/payment");

// cron.schedule("0 * * * *", async () => {
//   console.log("Running subscription expiry job...");

//   try {
//     const now = new Date();

//     const result = await Payment.updateMany(
//       {
//         status: "active",
//         endDate: { $lt: now } // expired
//       },
//       {
//         $set: { status: "expired" }
//       }
//     );



//     console.log("Expired subscriptions:", result.modifiedCount);

//   } catch (error) {
//     console.error("Cron Error:", error);
//   }
// });