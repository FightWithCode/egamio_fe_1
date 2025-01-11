"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI, handleApiError } from '@/services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

   const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { id, full_name, is_profile_complete, msg } = response.data;
            setIsAuthenticated(true);
            const u_data = { 
                id, 
                fullName: full_name, 
                isProfileComplete: is_profile_complete
            };
            setUser(u_data);
            localStorage.setItem('eu_data', JSON.stringify(u_data));

            return { 
                success: true, 
                message: msg 
            };
        } catch (error) {
            return { 
                success: false, 
                message: errorInfo.message 
            };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('eu_data');
            router.push('/');
        } catch (error) {
            toast.error('An error occurred during logout. Please try again.');
        }
    };

    const checkAuthStatus = async () => {
        try {
            await authAPI.verifyToken();
            setIsAuthenticated(true);
            setUser(prevUser => ({
                ...prevUser,
                ...JSON.parse(localStorage.getItem('eu_data'))
            }));
            return true;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('eu_data');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            await authAPI.refreshToken();
            return true;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('eu_data');
            return false;
        }
    };

    const updateProfileCompleteness = (isComplete) => {
        setUser(prevUser => ({
            ...prevUser,
            isProfileComplete: isComplete
        }));
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const contextValue = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuthStatus,
        refreshToken,
        updateProfileCompleteness
    };

    if (loading) {
        // You can return a loading component here
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
