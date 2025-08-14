"use client"
import React from 'react'
import { useState} from 'react'
import { User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'
const Loginpage = () => {
  const { user, login, signup, message  } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


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
  return (
    <>
    {!user &&
    <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
      <div className="rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-slideUp">
        <div className={`relative ${!isLogin ? "lg:h-[86vh] mt-12" : ""}`}>
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {isLogin ? 'Welcome Back' : 'Join Stordial'}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {isLogin ? 'Sign in to your account' : 'Create your account'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your phone number"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Phone className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {message && <p className={`text-center mt-3 font-bold ${message == '✅ Login successful!' ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>}

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
                
                {/* {isLogin && (
                  <button className="text-blue-600 hover:text-blue-700 text-sm transition-colors">
                    Forgot your password?
                  </button>
                )} */}
              </div>
              
              {/* Social Login Options */}
              {/* <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 mr-2">🔍</div>
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 mr-2">📘</div>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default Loginpage
