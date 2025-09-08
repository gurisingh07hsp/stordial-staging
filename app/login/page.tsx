"use client"
import React from 'react'
import { useState} from 'react'
import { User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
const Loginpage = () => {
  const { user, login, signup, message  } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [showForgot, setShowForgot] = useState(false);
    const [Message, setMesage] = useState('');
    const [loading, setLoading] = useState(false);


    if(user){
     window.location.href = '/';
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isLogin) {
        login(email, password);
      } else {
        signup({ name, email, phone, password });
      }
      if(message == '✅ Account Created successful!' || message == '✅ Login successful!')
      {
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
      }
    };

    const handleClick = async(e: React.FormEvent) => {
      e.preventDefault();
       setLoading(true);
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/forgotpassword`, {email});
        if(response.status == 200){
          setLoading(false);
          window.location.href = `/forgotpassword?email=${email}`;
          console.log(response.data);
        }
        else{
          setLoading(false);
          setMesage(response.data.message);
        }
      } catch(error) {
        setLoading(false);
        setMesage("Email not found");
        console.log(error);
      }
    }
  return (
    <>
    {!user &&
    <div className="fixed inset-0 bg-[#f5f5f5] flex items-center justify-center p-4">
      <div className={`rounded-2xl ${!showForgot ? 'max-w-md' : ''} w-full transform transition-all duration-300 animate-slideUp`}>
        <div className={`relative ${showForgot ? 'hidden' : 'block'}`}>
          {/* Header with gradient background */}
          <div className="rounded-t-lg border border-b-0 bg-white px-6 py-4 text-black">
            <div className="flex justify-center mt-2 items-center">
              <img src="/Stordial crop.png" alt="" className='h-8' />
            </div>
          </div>

          <div className="px-6 py-4 bg-white border border-t-0 rounded-b-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  {/* <label className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label> */}
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:bg-white"
                      placeholder="Name"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {/* <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label> */}
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:bg-white"
                    placeholder="Email"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  {/* <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label> */}
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:bg-white"
                      placeholder="Phone"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Phone className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {/* <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label> */}
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:bg-white"
                    placeholder="Password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0765F2] text-white py-3 px-6 rounded-xl font-semibold"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {message && <p className={`text-center mt-3 font-bold ${message == '✅ Login successful!' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>}

              {/* Social Login Options */}
               <div className="mt-2">
                <div className="mt-2 gap-3">
                  {/* <button onClick={() => signIn("google", { callbackUrl: "/" })} className="flex items-center mx-auto justify-center px-10 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 mr-2">🔍</div>
                    <span className="text-sm font-medium">Google</span>
                  </button> */}
                  <button onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full flex items-center justify-center py-2 font-semibold mx-auto border rounded-lg">
                  <FcGoogle className="mr-2 size-5" />
                  {isLogin ? 'Continue with Google' : 'Sign up with Google'}
                </button>
                </div>
              </div>

            <div className="mt-4 pt-2 border-gray-100">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
                
                {isLogin && (
                  <button onClick={()=> setShowForgot(true)} className="text-blue-600 hover:text-blue-700 text-sm transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className={`${showForgot ? 'flex' : 'hidden'} min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent`}>
            <form onSubmit={handleClick}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
                        <p className="text-sm">Enter your email to receive a OTP</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                placeholder="name@example.com"
                            />
                        </div>

                        <input type='submit' className="w-full bg-[#0765F2] py-2 text-white rounded-md cursor-pointer" value={`${loading ? 'Sending...' : 'Send OTP'}`}/>
                    </div>
                    <p className='text-center mt-3 text-red-600'>{Message}</p>
                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground text-sm">We&apos;ll send you a OTP to reset your password.</p>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Remembered your password?
                        <button
                            onClick={()=> setShowForgot(false)}
                            className="px-2 font-semibold hover:underline">
                            Log in
                        </button>
                    </p>
                </div>
            </form>
        </section>


      </div>
    </div>
    }
    </>
  )
}

export default Loginpage
