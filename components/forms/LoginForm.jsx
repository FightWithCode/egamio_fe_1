"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import { TypographyH1, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/Typographies"
import LoginWithGoogle from "@/components/common/LoginWithGoogle"
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { login } from '@/store/slices/authSlice'
import { toast } from 'react-toastify'

export default function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useDispatch()
    const { isAuthenticated, loading: authLoading, error: authError } = useSelector((state) => state.auth)

    const [formState, setFormState] = useState({
        email: "",
        password: "",
        errorMessage: ""
    })

    const redirect = searchParams.get('redirect') || '/dashboard'

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push(redirect)
        }
    }, [isAuthenticated, router, redirect])

    // Clear form on unmount
    useEffect(() => {
        return () => {
            setFormState(prev => ({
                ...prev,
                email: '',
                password: '',
                errorMessage: ''
            }))
        }
    }, [])

    // Handle auth errors
    useEffect(() => {
        if (authError) {
            setFormState(prev => ({
                ...prev,
                errorMessage: authError,
                loading: false
            }))
        }
    }, [authError])

    const validateInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formState.email.trim()) {
            setFormState(prev => ({
                ...prev,
                errorMessage: 'Email is required'
            }))
            return false
        }
        if (!emailRegex.test(formState.email)) {
            setFormState(prev => ({
                ...prev,
                errorMessage: 'Please enter a valid email address'
            }))
            return false
        }
        if (!formState.password) {
            setFormState(prev => ({
                ...prev,
                errorMessage: 'Password is required'
            }))
            return false
        }
        return true
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!validateInput()) return

        try {
            const resultAction = await dispatch(login({
                email: formState.email,
                password: formState.password
            }))

            const result = unwrapResult(resultAction)

            toast.success('Login successful')
            router.push(redirect)
        } catch (error) {
            console.log('Login error:', error)
            setFormState(prev => ({
                ...prev,
                errorMessage: error.message || 'An error occurred. Please try again.'
            }))
        }
    }

    const handleInputChange = (field, value) => {
        setFormState(prev => ({
            ...prev,
            [field]: value,
            errorMessage: '' // Clear error when typing
        }))
    }

    const isLoading = authLoading || formState.loading

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
                        Don't have an account? <Link href="/signup" className="text-highlight underline">Register Now!</Link>
                    </TypographyP>
                </div>

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
                            <div className="flex flex-col">
                                <label className="font-medium">Email Address</label>
                                <input
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter your email"
                                    className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-medium">Password</label>
                                <input
                                    type="password"
                                    value={formState.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="Enter your password"
                                    className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="text-right">
                                <Link href="/forgot-password" className="text-accent hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className={`w-full py-3 text-white rounded-md ${
                                    isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-darkhighlight hover:bg-highlight'
                                } focus:outline-none`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>

                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="px-3 text-sm">OR</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>

                            <div className="flex flex-col space-y-3">
                                <LoginWithGoogle
                                    setErrorMessage={(msg) => handleInputChange('errorMessage', msg)}
                                    disabled={isLoading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </ResponsiveContainer>
        </GoogleOAuthProvider>
    )
}