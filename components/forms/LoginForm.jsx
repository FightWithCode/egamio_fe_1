"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import { useAuth } from '@/context/AuthContext';
import { TypographyH1, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/Typographies"
import LoginWithGoogle from "@/components/common/LoginWithGoogle"

export default function LoginForm() {
    useEffect(() => {
        console.log("LoginForm mounted");
    }, []);
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login, isAuthenticated } = useAuth();

    const [formState, setFormState] = useState({
        email: "",
        password: "",
        loading: false,
        errorMessage: ""
    })

    const redirect = searchParams.get('redirect') || '/dashboard'

    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            router.push('/dashboard')
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        return () => {
            setFormState(prev => ({
                ...prev,
                email: '',
                password: ''
            }))
        }
    }, [])

    const validateInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formState.email)) {
            setFormState(prev => ({
                ...prev,
                errorMessage: 'Please enter a valid email address'
            }))
            return false
        }
        return true
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateInput()) return;
    
        setFormState(prev => ({ ...prev, loading: true, errorMessage: "" }));
    
        try {
            const result = await login(formState.email, formState.password); // Use login from AuthContext
            if (result.success) {
                router.push(redirect); // Redirect on successful login
            } else {
                setFormState(prev => ({
                    ...prev,
                    errorMessage: result.message, // Show error message from login
                    loading: false,
                }));
            }
        } catch (error) {
            setFormState(prev => ({
                ...prev,
                errorMessage: error,
                loading: false,
            }));
        }
    };
    

    const handleInputChange = (field, value) => {
        setFormState(prev => ({
            ...prev,
            [field]: value
        }))
    }

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <ResponsiveContainer className="relative !max-w-[800px] flex my-24 border-[1px] border-white rounded-lg backdrop-blur-sm">
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

                {/* Right Section (Former LoginRight) */}
                <div className="p-6 w-full md:w-3/5 rounded-lg shadow-md">
                    <div className="w-full space-y-6">
                        <TypographyH4 className="relative pb-3 text-center">
                            LOGIN TO YOUR ACCOUNT
                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-20 h-1 bg-highlight"></span>
                        </TypographyH4>

                        {formState.errorMessage && (
                            <div className="p-2 text-center text-red-600 bg-red-100 border border-red-400 rounded-md">
                                {formState.errorMessage}
                            </div>
                        )}

                        <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
                            {/* Email Input */}
                            <div className="flex flex-col">
                                <label className="font-medium">Email Address</label>
                                <input
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                                    value={formState.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
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
                                className={`w-full py-3 text-white rounded-md ${formState.loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-darkhighlight hover:bg-highlight'
                                    } focus:outline-none`}
                                disabled={formState.loading}
                            >
                                {formState.loading ? "Logging in..." : "Login"}
                            </button>

                            {/* Or Divider */}
                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="px-3 text-sm">OR</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>

                            {/* Social Login */}
                            <div className="flex flex-col space-y-3">
                                <LoginWithGoogle
                                    setErrorMessage={(msg) => handleInputChange('errorMessage', msg)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </ResponsiveContainer>
        </GoogleOAuthProvider>
    )
}
