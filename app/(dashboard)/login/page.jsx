"use client";
// react imports
import React, { useState, useEffect } from "react";
import { Suspense } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';

// components imports
import LoginWithGoogle from "@/components/common/LoginWithGoogle";
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import { TypographyH1, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/Typographies";
import { useAuth } from "@/context/AuthContext";
// utils import
import api from '@/utils/api';
import { isAuthenticated } from '@/utils/auth';
// icons imports
import googleIcon from "@/public/images/icons/google.svg";
import facebookIcon from "@/public/images/icons/facebook.svg";
export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Capture the redirect URL from the query parameter
  const redirect = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, []);

  useEffect(() => {
    return () => {
      setLoginPassword('');
      setLoginEmail('');
    };
  }, []);

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await api.post('/accounts/token/', {
        email: loginEmail,
        password: loginPassword,
      });

      login(response.data);

      // Redirect to the page the user came from, or default to dashboard
      router.refresh();
      router.push(redirect);
    } catch (error) {
      console.log(error);
      setErrorMessage('Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Head>
        <meta name="description" content="Login to your account to access the dashboard" />
        <meta name="keywords" content="login, user authentication, dashboard, React" />
        <title>Login - eGamio</title>
      </Head>
      <ResponsiveContainer className="relative !max-w-[800px] flex my-24 border-[1px] border-white rounded-lg backdrop-blur-sm">
        {/* Left Section */}
        <div className="hidden md:block w-2/5 bg-cover bg-center relative p-6">
          <TypographyH1 className="text-6xl text-white">
            HELLO<br />AGAIN!
          </TypographyH1>
          <TypographyH3 className="uppercase pt-4 text-white">
            We are so happy to see you back here!
          </TypographyH3>
          <TypographyP className="absolute bottom-6">
            Don’t you have an account? <Link href="/signup" className="text-highlight underline">Register Now!</Link>
          </TypographyP>
        </div>

        {/* Right Section */}
        <div className="p-6 w-full md:w-3/5 rounded-lg shadow-md">
          <div className="w-full space-y-6">
            {/* Title */}
            <TypographyH4 className="relative pb-3 text-center">
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
                <label className="font-medium">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="/forgot-password" className="text-accent hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 text-white bg-darkhighlight rounded-md hover:bg-highlight focus:outline-none"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Or Divider */}
              <div className="flex items-center">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Social Login Buttons */}
              <div className="flex flex-col space-y-3">
              <LoginWithGoogle setErrorMessage={setErrorMessage} />
                {/* <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border rounded-md text-background text-white hover:bg-background"
                >
                  <Image src={googleIcon} alt="Google" className="w-5 h-5"></Image>
                  <span>Login with Google</span>
                </button> */}
                {/* <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 border rounded-md text-background text-white hover:bg-background"
                >
                  <Image src={facebookIcon} alt="Facebook" className="w-5 h-5"></Image>
                  <span>Login with Facebook</span>
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </ResponsiveContainer>
    </GoogleOAuthProvider>
  );
}
