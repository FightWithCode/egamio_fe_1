"use client";
import React, { useState } from 'react';

import PlayerBreadcum from "@/components/dashboard/Breadcum";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and register
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordRepeat, setRegisterPasswordRepeat] = useState('');

  const handleTabToggle = (tab) => {
    setIsLogin(tab === 'login');
  };
  return (
    <>
        <PlayerBreadcum page="Login"></PlayerBreadcum>
        <div className="grid grid-cols-1 md:w-1/3 mx-auto">
      {/* Tab Navigation */}
      <div className="flex justify-around border-t border-b py-2">
        <div
          className={`cursor-pointer ${isLogin ? 'text-gray-500' : 'text-blue-500'}`}
          onClick={() => handleTabToggle('login')}
        >
          <p className="font-medium">Login</p>
        </div>
        <div
          className={`cursor-pointer ${!isLogin ? 'text-gray-500' : 'text-red-500'}`}
          onClick={() => handleTabToggle('register')}
        >
          <p className="font-medium">Register</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-4">
        {isLogin ? (
          <div>
            {/* Login Form */}
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">Login to your account</h2>
            <form>
              <div className="mb-4">
                <label className="font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email here..."
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold text-gray-600">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password here..."
                />
              </div>

              {/* Remember me and Forgot Password */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="login_remember"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  <label htmlFor="login_remember" className="text-sm text-gray-600">Remember me</label>
                </div>
                <a href="#" className="text-sm text-blue-500">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login Now!
              </button>

              {/* Social Media Login */}
              <div className="mt-4 flex justify-between">
                <button className="bg-blue-600 text-white p-2 rounded-md flex-1 mr-2">Facebook Login</button>
                <button className="bg-blue-400 text-white p-2 rounded-md flex-1">Twitter Login</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Register Form */}
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Register Now!</h2>
            <form>
              <div className="mb-4">
                <label className="font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter your email here..."
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold text-gray-600">Password</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter your password here..."
                />
              </div>

              <div className="mb-4">
                <label className="font-semibold text-gray-600">Repeat Password</label>
                <input
                  type="password"
                  value={registerPasswordRepeat}
                  onChange={(e) => setRegisterPasswordRepeat(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Rewrite your password here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Create Your Account!
              </button>

              <p className="mt-4 text-sm text-gray-500">
                You’ll receive a confirmation email with a link to activate your account!
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
