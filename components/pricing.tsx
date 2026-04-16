"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, MapPin, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NumberFlow from "@number-flow/react";
import { X } from "lucide-react";
import { Business } from "@/types";
import axios from "axios";

interface CashfreeOptions {
  mode: "sandbox" | "production";
}

interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  redirectTarget?: "_self" | "_blank" | "_modal";
}

interface CashfreeInstance {
  checkout(options: CashfreeCheckoutOptions): void;
}

interface CashfreeConstructor {
  new (options: CashfreeOptions): CashfreeInstance;
}

declare global {
  interface Window {
    Cashfree: CashfreeConstructor;
  }
}

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const {user} = useAuth();
  const router = useRouter();
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [businesses,setBusinesses] = useState<Business[]>([]);
  const [formData, setFormData] = useState({
        userId: '',
        businessId: '',
        name: '',
        priority: 0,
        paymentId: '',
        amount: 0,
        duration_days: 0,
        startDate: '',
        endDate: '',
        paymentGateway: "cashfree",
        status: "active",
  });


  useEffect(()=> {
    const getBusinesses = async() => {
      try{
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/businesses/user/${user?._id}`,  { withCredentials: true });
          if(response.status == 200){
            console.log("Businesses : ", response.data.businesses);
              setBusinesses(response.data.businesses);
          }
        } catch {
            console.log("Server Error")
        }
      }
      if(user){
        getBusinesses();
      }
  },[user])



  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
  };

  const handleClick = (index: number) => {
    if(!user){
      router.push('/login');
    }
    if(index == 0){
      router.push('/')
    }
    else{
      setFormData({
        ...formData,
        userId: user?._id || '',
        name: plans[index].name,
        amount: isMonthly ? Number(plans[index].price) : Number(plans[index].yearlyPrice),
        priority: index,
        duration_days: isMonthly ? 1 : 30,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setDate(new Date().getDate() + (isMonthly ? 1 : 30))).toISOString().split('T')[0],
      })
      setOpen(true);
    }
  }

const loadCashfree = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

  const handleSumbit = async(businessId: string) => {

    const res = await loadCashfree();
    console.log("Cashfree SDK Loaded: ", res);
    if (!res) {
      alert("Cashfree SDK failed to load");
      return;
    }

      // 2️⃣ Create order from backend
  const orderRes = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/promotions/payment/create-order`,
      { amount: formData.amount, businessId: businessId },
    {withCredentials: true}
  );

  const { payment_session_id} = orderRes.data;

  const cashfree = new window.Cashfree({
    mode: "production" // change to production
  });

  // 4️⃣ Open checkout
  cashfree.checkout({
    paymentSessionId: payment_session_id,
    redirectTarget: "_self"
  });
  }

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-[30px] text-[#0765F2] font-bold tracking-tight sm:text-[35px]">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <label className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span className="ml-2 font-semibold">
          Monthly billing <span className="text-primary">(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 sm:2">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? 0 : 0,
                    opacity: 1,
                    x: index === 3 ? -15 : index === 0 ? 15 : 0,
                    scale: index === 0 || index === 3 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-[#0765F2] border-2" : "border-border",
              "flex flex-col",
              "mt-5",
              index === 0 || index === 3
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 3 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[#0765F2] py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 font-sans font-semibold">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    // formatter={(value) => `$${value}`}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period === "per month" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                    / {isMonthly ? "Per Day" : 'Per Month'}
                  </span>
                )}
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {!isMonthly ? "billed monthly" : "billed daily"}
              </p>

              <ul className="mt-5 gap-2 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4" />

              <button
                onClick={()=>handleClick(index)}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-[#0765F2] hover:ring-offset-1 hover:bg-[#0765F2] hover:text-primary-foreground",
                  plan.isPopular
                    ? "bg-[#0765F2] text-primary-foreground"
                    : "bg-[#0765F2] text-primary-foreground"
                )}
              >
                {plan.buttonText}
              </button>
              
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>


      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[95%] max-w-6xl rounded-2xl shadow-lg relative">

            {/* Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">Your Businesses</h2>
              <button onClick={()=> setOpen(false)}>
                <X className="w-5 h-5 text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[80vh] overflow-y-auto">
              <div className="bg-white rounded-xl mt-3 w-full mx-auto shadow-sm border border-gray-200">
                <div className="overflow-x-auto overflow-y-auto max-h-[400px] hide-scrollbar">
                  
                  {/* 🔽 YOUR TABLE (UNCHANGED) */}
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* keep your thead + tbody exactly same */}
                  </table>
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr className='h-16'>
                                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Business
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    Category
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Location
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Status
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:table-cell">
                                    Promote Business
                                  </th>
                                </tr>
                              </thead>
                              {businesses.length > 0 && <tbody className="bg-white divide-y divide-gray-200">
                                {businesses.map((business) => (
                                  <tr key={business._id} className="hover:bg-gray-50 h-28">
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                          <img
                                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                                            src={business.images && business.images[0]?.url}
                                            alt={business.name}
                                          />
                                        </div>
                                        <div className="ml-3 sm:ml-4 min-w-0">
                                          <p className="text-sm font-medium text-gray-900 truncate max-w-80 break-words whitespace-normal">{business.name}</p>
                                          <div className="text-xs sm:text-sm text-gray-500 truncate">{`${business?.description?.slice(0,25)}...`}</div>
                                          <div className="sm:hidden text-xs text-gray-500">
                                            {business.category} • {business.city}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {business.category.charAt(0).toUpperCase() + business.category.slice(1)}
                                      </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                      <div className="flex items-center text-sm text-gray-900">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                                        <span className="truncate">{business.city.charAt(0).toUpperCase() + business.city.slice(1)}</span>
                                      </div>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                      </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap md:table-cell">
                                      <button onClick={()=>handleSumbit(business._id)}
                                        className={`md:ms-6 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                          business.subscriptionId && typeof business.subscriptionId === 'object' && business.subscriptionId.status === 'active'
                                            ? 'bg-green-600 text-white'
                                            : 'bg-blue-600 text-white'
                                        }`}
                                      >
                                      {business.subscriptionId ? 'Promoted' : 'Promote'}
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>}
                            </table>
                          <div className={`my-8 ${businesses.length > 0 ? 'hidden' : 'block'}`}>
                              <p className='text-center text-2xl text-gray-600'>You have not listed any business.</p>
                          </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}



    </div>
  );
}
