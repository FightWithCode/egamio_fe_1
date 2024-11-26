"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { isAuthenticated } from "@/utils/auth";
import { IoIosLogIn } from "react-icons/io";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoMenu, IoCloseCircleOutline } from "react-icons/io5";
// Assets
import logo from "@/public/images/trans-logo2.png";
import user2 from "@/public/images/users/user2.png";

const Navigation = () => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [activePanel, setActivePanel] = useState(null); // "notifications" | "dashboard" | null

    useEffect(() => {
        setAuthenticated(isAuthenticated());
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setAuthenticated(false);
        window.location.href = "/login";
    };

    const togglePanel = (panel) => {
        setActivePanel((prev) => (prev === panel ? null : panel));
    };

    return (
        <>
            <nav className="w-full z-[123] bg-background">
                <ResponsiveContainer className="h-[75px] flex justify-between items-center">
                    <div className="flex items-center">
                        <Image src={logo} width={70} alt="logo" className="w-[50px] lg:w-[70px]" />
                        <div className="hidden sm:block">
                            <p className="text-2xl">eGamio</p>
                            <p className="text-xs">Where dreams meet!</p>
                        </div>
                    </div>

                    {authenticated ? (
                        <div className="flex items-center gap-2">
                            {/* Chat */}
                            <div className="relative">
                                <Link href="/chat">
                                    <AiFillMessage
                                        className="w-[35px] h-[35px] rounded-full border-[1px] p-2 cursor-pointer"
                                    />
                                    <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        1
                                    </span>
                                </Link>
                            </div>
                            {/* Notifications */}
                            <div className="relative">
                                <FaBell
                                    className="w-[35px] h-[35px] rounded-full border-[1px] p-2 cursor-pointer"
                                    onClick={() => togglePanel("notifications")}
                                />
                                <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    5
                                </span>
                            </div>

                            {/* Dashboard */}
                            <div className="relative flex flex-col items-center gap-2">
                                <Image
                                    src={user2}
                                    width={35}
                                    height={35}
                                    alt="User"
                                    className="border-[1px] rounded-full p-1 cursor-pointer"
                                    onClick={() => togglePanel("dashboard")}
                                />
                                <span className="absolute bottom-0 right-0 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    <FaChevronDown />
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <ul className="hidden md:flex items-center gap-4">
                                <li className="cursor-pointer text-white">Home</li>
                                <li className="cursor-pointer text-white">Find Team</li>
                                <li className="cursor-pointer text-white">Find Player</li>
                                <li className="bg-highlight px-6 py-2 rounded-3xl">
                                    <Link href="/login" className="text-background">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                            <Link href="/login">
                                <IoIosLogIn className="text-3xl text-white block md:hidden" />
                            </Link>
                            <IoMenu
                                className="text-4xl text-white block md:hidden"
                                onClick={() => setShowSideMenu(!showSideMenu)}
                            />
                        </div>
                    )}
                </ResponsiveContainer>
            </nav>

            {/* Dark background overlay */}
            {activePanel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[49] backdrop-blur-sm" />
            )}

            {/* Unified Sliding Panel */}
            <div
                className={`container justify-end w-full fixed flex inset-x-0 bottom-0 bg-transparent z-50 w-full max-h-[650px] shadow-lg 
                transform transition-all duration-500 ease-in-out 
                ${activePanel ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
            >
                <div className="w-[500px] bg-background">
                    {/* Panel Header */}
                    <div className="flex justify-between items-center p-2 bg-highlight text-white">
                        <h3 className="text-lg font-bold">
                            {activePanel === "notifications" ? "Notifications" : "My Profile"}
                        </h3>
                        <IoCloseCircleOutline
                            className="text-3xl cursor-pointer"
                            onClick={() => setActivePanel(null)}
                        />
                    </div>

                    {/* Panel Content */}
                    <div className="p-4 overflow-y-auto h-full">
                        {activePanel === "notifications" && (
                            <ul className="space-y-4">
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe</p>
                                            <p className="text-xs text-gray-500">Hey, are we still on for the meeting later?</p>
                                        </div>
                                    </div>
                                </li>

                                {/* Additional notifications */}
                            </ul>
                        )}

                        <div className="relative">
                            {activePanel === "dashboard" && (
                                <ul className="space-y-2 bg-background shadow-lg rounded-lg p-4 w-64 text-sm">
                                    {/* Dashboard Items */}
                                    <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors">
                                        <Link href="/dashboard" className="block w-full h-full" onClick={() => setActivePanel(null)}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors">
                                        <Link href="/dashboard/my-teams" className="block w-full h-full" onClick={() => setActivePanel(null)}>
                                            My Teams
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors">
                                        <Link href="/dashboard/eg-clips" className="block w-full h-full" onClick={() => setActivePanel(null)}>
                                            EGClips
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors">
                                        <Link href="/dashboard/settings" className="block w-full h-full" onClick={() => setActivePanel(null)}>
                                            Settings
                                        </Link>
                                    </li>
                                    <li
                                        className="cursor-pointer py-2 px-4 rounded text-danger transition-colors"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>

                                    {/* Separator */}
                                    <hr className="my-2 border-gray-200" />

                                    {/* Additional Links */}
                                    <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors text-foreground">
                                        <Link href="/privacy-policy" className="block w-full h-full" onClick={() => setActivePanel(null)}>
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors text-foreground">
                                        <Link href="/terms-and-conditions" className="block w-full h-full" onClick={() => setActivePanel(null)}>
                                            Terms & Conditions
                                        </Link>
                                    </li>
                                    <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors text-foreground">
                                        <Link href="/about-us" className="block w-full h-full" onClick={() => setActivePanel(null)}>
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>

                    </div>
                </div>
            </div>



        </>
    );
};

export default Navigation;
