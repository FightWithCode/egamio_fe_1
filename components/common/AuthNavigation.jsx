// components/navigation/AuthenticatedNav.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from "next/navigation";

import { AiFillMessage } from "react-icons/ai";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

import ResponsiveContainer from "../ui/ResponsiveContainer";
import user2 from "@/public/images/users/user2.png";
import logo from "@/public/images/trans-logo2.png";

const AuthenticatedNav = () => {
    const [activePanel, setActivePanel] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const togglePanel = (panel) => {
        setActivePanel((prev) => (prev === panel ? null : panel));
    };

    const handleLogout = async () => {
        await dispatch(logout()).unwrap();
        router.push('/login');
    };

    return (
        <>
            <nav className="relative w-full z-[123]">
                <ResponsiveContainer className="h-[75px] flex justify-between items-center backdrop-blur-sm">
                    <Link href="/">
                        <div className="flex items-center">
                            <Image src={logo} width={70} alt="logo" className="w-[50px] lg:w-[70px]" />
                            <div className="hidden sm:block">
                                <p className="text-2xl">eGamio</p>
                                <p className="text-xs">Where dreams meet!</p>
                            </div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Link href="/dashboard/chat">
                                <AiFillMessage className="w-[35px] h-[35px] rounded-full border-[1px] p-2 cursor-pointer" />
                                <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
                            </Link>
                        </div>
                        <div className="relative">
                            <FaBell className="w-[35px] h-[35px] rounded-full border-[1px] p-2 cursor-pointer" onClick={() => togglePanel("notifications")} />
                            <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
                        </div>
                        <div className="relative flex flex-col items-center gap-2">
                            <Image src={user2} width={35} height={35} alt="User" className="border-[1px] rounded-full p-1 cursor-pointer" onClick={() => togglePanel("dashboard")} />
                            <span className="absolute bottom-0 right-0 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                <FaChevronDown />
                            </span>
                        </div>
                    </div>
                </ResponsiveContainer>
            </nav>

            {activePanel && <div className="fixed inset-0 bg-black bg-opacity-50 z-[49] backdrop-blur-sm" />}

            <div className={`container justify-end w-full fixed flex inset-x-0 bottom-0 bg-transparent z-50 w-full max-h-[650px] shadow-lg transform transition-all duration-500 ease-in-out ${activePanel ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
                <div className="w-[500px] bg-background">
                    <div className="flex justify-between items-center p-2 bg-highlight text-white">
                        <h3 className="text-lg font-bold">
                            {activePanel === "notifications" ? "Notifications" : "My Profile"}
                        </h3>
                        <IoCloseCircleOutline className="text-3xl cursor-pointer" onClick={() => setActivePanel(null)} />
                    </div>

                    <div className="p-4 overflow-y-auto h-full">
                        {activePanel === "dashboard" && (
                            <ul className="space-y-2 bg-background shadow-lg rounded-lg p-4 w-64 text-sm">
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors"><Link href="/dashboard" onClick={() => setActivePanel(null)}>Dashboard</Link></li>
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors"><Link href="/eg-threads" onClick={() => setActivePanel(null)}>eGThreads</Link></li>
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors"><Link href="/eg-clips" onClick={() => setActivePanel(null)}>eGClips</Link></li>
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors"><Link href="/dashboard/my-teams" onClick={() => setActivePanel(null)}>My Teams</Link></li>
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors"><Link href="/dashboard/settings" onClick={() => setActivePanel(null)}>Settings</Link></li>
                                <li className="cursor-pointer py-2 px-4 rounded text-danger transition-colors" onClick={handleLogout}>Logout</li>
                                <hr className="my-2 border-gray-200" />
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors text-foreground"><Link href="/privacy-policy" onClick={() => setActivePanel(null)}>Privacy Policy</Link></li>
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors text-foreground"><Link href="/terms-and-conditions" onClick={() => setActivePanel(null)}>Terms & Conditions</Link></li>
                                <li className="cursor-pointer py-2 px-4 rounded hover:bg-highlight transition-colors text-foreground"><Link href="/about-us" onClick={() => setActivePanel(null)}>About Us</Link></li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthenticatedNav;
