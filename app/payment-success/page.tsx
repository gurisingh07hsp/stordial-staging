// "use client";

// import { useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";

// export default function PaymentSuccess() {
//   const params = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const verify = async () => {
//       const order_id = params.get("order_id");
//       const businessId = params.get("businessId");

//       console.log("Order:", order_id);
//       console.log("Business:", businessId);

//       if (!order_id || !businessId) return;

//       try {
//         const res = await axios.post(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promotions/payment/verify`,
          
//           { order_id, 
//             businessId},
//           { withCredentials: true }
//         );

//         if (res.data.success) {
//           alert("Payment successful 🎉");
//           router.push("/advertise");
//         }
//       } catch (err) {
//         alert("Verification failed ❌");
//       }
//     };

//     verify();
//   }, []);

//   return (
//     <h1 className="text-center mt-10 text-xl">
//       Verifying your payment...
//     </h1>
//   );
// }


"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

function PaymentContent(){
   const params = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verify = async () => {
      const order_id = params.get("order_id");
      const businessId = params.get("businessId");

      if (!order_id || !businessId) {
        setStatus("error");
        return;
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promotions/payment/verify`,
          { order_id, businessId },
          { withCredentials: true }
        );

        if (res.data.success) {
          setStatus("success");

          setTimeout(() => {
            router.push("/advertise");
          }, 2000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };

    verify();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200">

        {/* 🔄 LOADING */}
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Verifying Payment...
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Please wait while we confirm your transaction.
            </p>
          </>
        )}

        {/* ✅ SUCCESS */}
        {status === "success" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-green-600">
              Payment Successful 🎉
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Your business has been promoted successfully.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Redirecting...
            </p>
          </>
        )}

        {/* ❌ ERROR */}
        {status === "error" && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-2xl">✕</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed ❌
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Something went wrong. Please contact support or try again.
            </p>

            <button
              onClick={() => router.push("/advertise")}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent/>
    </Suspense>

  );
}