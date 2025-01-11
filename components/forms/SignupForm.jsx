"use client"
import React, { useState } from "react"
import Link from "next/link"
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleAuth from "@/components/common/GoogleAuth";
import api from "@/services/api/axiosSetup";
import { useRouter } from "next/navigation"
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import { TypographyH1, TypographyH3, TypographyH4, TypographyP } from "../ui/Typographies"
import { useAuth } from "@/context/AuthContext"

export default function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { login } = useAuth();

  const handleGoogleSuccess = (userData) => {
    login(userData);
    router.push("/dashboard");
  };

  // Handles input changes for form fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear any error messages when user starts typing
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      // Basic validation
      if (!formData.email || !formData.password || !formData.name) {
        throw new Error("Please fill in all required fields");
      }
  
      const signupData = {
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim()
      };
  
      const response = await api.post('/accounts/signup/', signupData);
  
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
      
      // Clear the form
      setFormData({
        name: "",
        email: "",
        password: "",
      });
  
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage(
        error.message || 
        error.data?.error || 
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };  

  // Handle resend verification email
  const handleResendVerification = async () => {
    try {
      setLoading(true);
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/accounts/resend-verification/`,
        { email: formData.email }
      );
      setSuccessMessage("Verification email has been resent. Please check your inbox.");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 
        "Failed to resend verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ResponsiveContainer className="relative !max-w-[800px] flex my-24 border-[1px] border-white rounded-lg backdrop-blur-sm">
        <div className="hidden md:block w-2/5 bg-cover bg-center relative p-6">
          <TypographyH1 className="text-6xl text-white">WELCOME!</TypographyH1>
          <TypographyH3 className="uppercase pt-4 text-white">
            Join the best gaming and esports experience today!
          </TypographyH3>
          <TypographyP className="absolute bottom-6">
            Already have an account? <br />
            <Link href="/login" className="text-highlight underline">
              Login Here!
            </Link>
          </TypographyP>
        </div>
        <div className="p-6 w-full md:w-3/5 rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={handleSignup}>
            <TypographyH4 className="relative pb-3 text-center">
              SIGNUP
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-20 h-1 bg-highlight"></span>
            </TypographyH4>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-2 text-center text-red-600 bg-red-100 border border-red-400 rounded-md">
                {errorMessage}
                {errorMessage.includes("verify") && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    className="ml-2 underline text-red-600"
                  >
                    Resend verification email
                  </button>
                )}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-2 text-center text-green-600 bg-green-100 border border-green-400 rounded-md">
                {successMessage}
              </div>
            )}

            {/* Name */}
            <div className="flex flex-col">
              <label className="font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your name"
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="font-medium">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white bg-darkhighlight rounded-md hover:bg-highlight focus:outline-none ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            {/* Google Sign In */}
            <div className="mt-6">
              <div className="flex items-center">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-3 text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="mt-6">
                <GoogleAuth
                  onGoogleSuccess={handleGoogleSuccess}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          </form>
        </div>
      </ResponsiveContainer>
    </GoogleOAuthProvider>
  );
}
