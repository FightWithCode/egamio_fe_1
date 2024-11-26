"use client";
// rect imports
import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from "next/link";
// components import
import ResponsiveContainer from "../common/ResponsiveContainer";
// icons imports
import { IoIosArrowForward } from "react-icons/io";
import { isAuthenticated } from '@/utils/auth';  // Assuming this is a utility that checks if user is authenticated
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
// assets import
import logo from "@/public/images/trans-logo2.png";
import user2 from "@/public/images/users/user2.png";

const Navigation = () => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const toggleSideMenu = () => {
        setShowSideMenu((prev) => !prev);
    };

    // Check authentication status on component mount
    useEffect(() => {
        if (!isAuthenticated()) {
            setAuthenticated(false);
        } else {
            setAuthenticated(true);
        }
    }, []);

    // Handle logout
    const handleLogout = () => {
        // Clear authentication data (localStorage, cookies, etc.)
        localStorage.removeItem('accessToken'); // Assuming you store the token in localStorage
        localStorage.removeItem('refreshToken'); // Clear user information if stored in localStorage
        localStorage.removeItem('uid'); // Clear user information if stored in localStorage
        localStorage.removeItem('username'); // Clear user information if stored in localStorage
        setAuthenticated(false); // Update local state to reflect logout
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <>
            <nav className="w-full z-[123] bg-background">
                <ResponsiveContainer className="h-[75px] overflow-hidden flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <Image src={logo} width={70} alt="logo" className="w-[50px] lg:w-[70px]"></Image>
                        <div className="hidden sm:block">
                            <p className="text-2xl">eGamio</p>
                            <p className="text-xs">Where dreams meet!</p>
                        </div>
                    </div>

                    {/* Display authenticated user info or navigation links */}
                    {authenticated ? (
                        <div className="flex gap-2 sm:gap-6">
                            <Link href="/dashboard">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <Image className="border-[1px] rounded-full p-1" src={user2} width={35} height={35} alt="logo" />
                                    <p className="text-xs hidden sm:block">Jonathan James</p>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="h-full flex justify-between items-center">
                            <ul className="h-full hidden md:flex items-center">
                                <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Home</li>
                                <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Find Team</li>
                                <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Find Player</li>
                                <li className="h-[40px] bg-highlight py-2 px-6 rounded-3xl ml-4"><Link href="/login" className="text-background">Login</Link></li>
                            </ul>
                            <IoMenu className="cursor-pointer text-4xl text-white block md:hidden" onClick={toggleSideMenu} />
                        </div>
                    )}
                </ResponsiveContainer>
            </nav>

            {/* Side Menu */}
            <section
                className={`z-[124] fixed top-0 left-0 bg-black/50 h-full w-full z-50 transition-transform duration-500 transform ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-full w-[300px] bg-background">
                    <div className="flex justify-between items-center p-4 bg-black h-[75px]">
                        <Image src={logo} width={50} alt="logo"></Image>
                        <IoCloseCircleOutline className="cursor-pointer text-4xl" onClick={toggleSideMenu}></IoCloseCircleOutline>
                    </div>
                    <div className="flex gap-4 sm:gap-6 flex-col justify-start">
                        <ul className="h-full">
                            <li className="h-full cursor-pointer border-t border-b hover:border-l-4 hover:border-l-highlight p-3 text-white">Home</li>
                            <li className="h-full cursor-pointer border-b hover:border-l-4 hover:border-l-highlight p-3 text-white">Find Team</li>
                            <li className="h-full cursor-pointer border-b hover:border-l-4 hover:border-l-highlight p-3 text-white">Find Player</li>
                            <li className="cursor-pointer h-[40px] w-[100px] bg-highlight mt-3 py-2 px-6 rounded-3xl text-white"><Link href="/login" className="text-background">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Navigation;
