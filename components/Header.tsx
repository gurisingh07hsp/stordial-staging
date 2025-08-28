'use client';
import React from 'react';
import Link from 'next/link';
import { Megaphone, FileText, User, Menu, Home, LogOut, ShieldCheck, Info} from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  onMenuToggle: () => void;
  showMobileMenu: boolean;
  onAuthClick: () => void;
  user: UserType | null;
  onLogout: () => void;
}

export default function Header({ 
  onMenuToggle,
  showMobileMenu, 
  user, 
  onLogout
}: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
                <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  Stordial
                </span>
                <p className="text-xs text-gray-500 -mt-1">Find Local Businesses</p>
            </div> */}
            <img src="/Stordial crop.png" alt="Logo" className='w-[150px] h-[40px]' />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center space-x-2`}>
            <Link 
              href="/about"
              className="hidden lg:flex items-center text-black hover:text-blue-600 transition-colors group px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <span className="font-medium">About Us</span>
            </Link>
            
            <Link 
              href="/advertise"
              className="hidden lg:flex items-center text-black hover:text-blue-600 transition-colors group px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <span className="font-medium">Advertise</span>
            </Link>
            
            <Link 
              href="/list-business"
              className="hidden lg:flex items-center bg-[#60CE80] text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold group"
            >
              <span>List Business</span>
            </Link>

            {user && user.email === 'admin@stordial.com' && (
                    <Link 
                      href="/admin"
                      className="text-blue-600 hover:text-blue-700 transition-colors font-medium bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100"
                    >
                      Admin Panel
                    </Link>
                  )}

                              {user ? (
              <div className="hidden lg:flex items-center space-x-4">              
                <div className="flex items-center space-x-3">
                  <Link href="/dashboard" className="flex items-center space-x-3 cursor-pointer border py-1 px-1 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </Link>
                  
                  <button 
                    onClick={onLogout}
                    className="text-sm bg-red-600 text-white p-2 rounded-lg transition-colors font-medium flex items-center"
                  >
                    Logout
                    <LogOut className="w-[15px] h-[15px] ms-1" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={()=>window.location.href = "/login"}
                className="hidden lg:flex items-center bg-[#0765F2] text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold group"
              >
                <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                <span>Sign In</span>
              </button>
            )}

          </div>
      
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
        </div>
      </div>

      {showMobileMenu && 
        <div className={`lg:hidden h-[1000px] w-[100%] absolute top-0 right-0 bg-[rgba(0,0,0,0.59)] transform transition-transform duration-300 ease-in-out ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className={`lg:hidden h-[1000px] w-[83%] absolute top-0 right-0 bg-white`}>
            <button onClick={onMenuToggle} className='text-gray-600 py-4 mt-1 ms-4 text-left w-full text-xl'>x</button>
            <hr></hr>

            {user &&
              <div onClick={()=> window.location.href = '/dashboard'} className='flex items-center space-x-3 p-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md'>
                  <User className='w-6 h-6 text-white' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-800'>{user.name}</p>
                  <p className='text-xs text-gray-500'>{user.email}</p>
                </div>
              </div> 
            } 

            <ul className='mt-4 ms-2'>

              <li className='mb-2' onClick={onMenuToggle}>
                <Link href="/"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Home</span>
                </Link>
              </li>

              <li className='mb-2' onClick={onMenuToggle}>
                {!user &&
                  <button onClick={()=> window.location.href = '/login'}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <User className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    <span>Sign In</span>
                  </button>
                }
              </li>

              <li className='mb-2' onClick={onMenuToggle}>
                {user && user.email === 'admin@stordial.com' && (
                    <Link 
                      href="/admin"
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                      Admin Panel
                    </Link>
                  )}
              </li>

              <li className='mb-2' onClick={onMenuToggle}>
                <Link href="/about"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <Info className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">About Us</span>
                </Link>
              </li>

              <li className='mb-2' onClick={onMenuToggle}>
                <Link href="/advertise"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <Megaphone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Advertise</span>
                </Link>
              </li>

              <li className='mb-2' onClick={onMenuToggle}>
                <Link href="/list-business"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span>List Business</span>
                </Link>
              </li>

              <li className='mb-2' onClick={onMenuToggle}>
                {user &&
                 <button 
                    onClick={onLogout}
                    className="text-gray-600 px-4 py-2 flex justify-center items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                }

              </li>
            </ul>
      </div> 
    </div>
      }
    </header>
  );
}