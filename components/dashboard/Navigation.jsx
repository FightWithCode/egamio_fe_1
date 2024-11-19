"use client";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';  // Assuming this is a utility that checks if user is authenticated
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
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
                        <Image src={logo} width={70} alt="logo"></Image>
                        <div>
                            <p className="text-2xl">eGamio</p>
                            <p className="text-xs">Where dreams meet!</p>
                        </div>
                    </div>

                    {/* Display authenticated user info or navigation links */}
                    {authenticated ? (
                        <div className="flex gap-2 sm:gap-6">
                            <div className="hidden sm:flex justify-center items-center gap-2">
                                <Image className="border-[1px] rounded-full p-1" src={user2} width={35} height={35} alt="logo" />
                                <p className="text-xs">Jonathan James</p>
                            </div>
                            {/* Logout Button */}
                            <button
                                className="bg-danger rounded-xl px-4 hidden sm:flex justify-center items-center gap-2"
                                onClick={handleLogout}
                            >
                                <a href="#" className="text-sm">Logout</a>
                                <IoIosArrowForward className="bg-black/30 rounded-full p-1"></IoIosArrowForward>
                            </button>
                            <IoMenu className="cursor-pointer text-4xl block sm:hidden" onClick={toggleSideMenu} />
                        </div>
                    ) : (
                        <div className="h-full flex justify-between items-center">
                            <ul className="h-full hidden sm:flex items-center">
                                <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Home</li>
                                <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Find Team</li>
                                <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Find Player</li>
                            </ul>
                            <IoMenu className="cursor-pointer text-4xl text-white block sm:hidden" onClick={toggleSideMenu} />
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
                    <div className="flex gap-4 sm:gap-6 flex-col justify-start pt-4 pl-4">
                        {authenticated ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <Image className="border-[1px] rounded-full p-1" src={user2} width={35} height={35} alt="logo" />
                                    <p className="text-xs">Jonathan James</p>
                                </div>
                                <button
                                    className="w-[102px] h-[35px] bg-danger rounded-xl px-4 flex justify-center items-center gap-2"
                                    onClick={handleLogout}
                                >
                                    <a href="#" className="text-sm">Logout</a>
                                    <IoIosArrowForward className="bg-black/30 rounded-full p-1"></IoIosArrowForward>
                                </button>
                            </>
                        ) : (
                            <ul className="h-full">
                                <li className="h-full cursor-pointer border-t border-b hover:border-l-4 hover:border-l-highlight p-3 text-white">Home</li>
                                <li className="h-full cursor-pointer border-b hover:border-l-4 hover:border-l-highlight p-3 text-white">Find Team</li>
                                <li className="h-full cursor-pointer border-b hover:border-l-4 hover:border-l-highlight p-3 text-white">Find Player</li>
                            </ul>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Navigation;
