"use client";  // This will mark the component as a client-side component

import React, { useState } from "react";
import Head from 'next/head';  // Import Head from next/head
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useEffect } from 'react';
import api from '@/utils/api';

import PlayerBreadcum from "@/components/dashboard/Breadcum";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import LoginBG from "@/public/images/bg/bg-1.jpg";
import googleIcon from "@/public/images/icons/google.svg";
import facebookIcon from "@/public/images/icons/facebook.svg";
import { TypographyH1, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/Typographies";
import { isAuthenticated } from '@/utils/auth';

export default function Login() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post('/accounts/token/', {
        email: loginEmail,
        password: loginPassword,
      });
      console.log(response.data);

      const { refresh, access, id, full_name } = response.data;
      console.log(refresh, access, id, full_name);

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('uid', id);
      localStorage.setItem('username', full_name);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      setErrorMessage('Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="description" content="Login to your account to access the dashboard" />
        <meta name="keywords" content="login, user authentication, dashboard, React" />
        <title>Login - eGamio</title>
      </Head>
      <PlayerBreadcum page="Login"></PlayerBreadcum>
      <ResponsiveContainer className="relative !max-w-[800px] flex my-24">
        {/* Left Section */}
        <div
          className="hidden md:block w-2/5 bg-cover bg-center relative p-6"
          style={{ backgroundImage: `url(${LoginBG.src})` }}
        >
          <TypographyH1 className="text-6xl text-white">
            HELLO<br />AGAIN!
          </TypographyH1>
          <TypographyH3 className="uppercase pt-4 text-white">
            We are so happy to see you back here!
          </TypographyH3>
          <TypographyP className="absolute bottom-6 text-gray-300">
            Don’t you have an account? <a href="/register" className="text-highlight underline">Register Now!</a>
          </TypographyP>
        </div>

        {/* Right Section */}
        <div className="p-6 w-full md:w-3/5 bg-white rounded-lg shadow-md">
          <div className="w-full space-y-6">
            {/* Title */}
            <TypographyH4 className="relative pb-3 text-gray-800 text-center">
              LOGIN TO YOUR ACCOUNT
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-20 h-1 bg-highlight"></span>
            </TypographyH4>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-2 text-center text-red-600 bg-red-100 border border-red-400 rounded-md">
                {errorMessage}
              </div>
            )}

            {/* Login Form */}
            <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <label className="font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Or Divider */}
              <div className="flex items-center">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-sm text-gray-500">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Social Login Buttons */}
              <div className="flex flex-col space-y-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border rounded-md hover:bg-gray-100 text-background"
                >
                  <Image src={googleIcon} alt="Google" className="w-5 h-5"></Image>
                  <span>Login with Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border rounded-md hover:bg-gray-100 text-background"
                >
                  <Image src={facebookIcon} alt="Facebook" className="w-5 h-5"></Image>
                  <span>Login with Facebook</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </ResponsiveContainer>
    </>
  );
}
