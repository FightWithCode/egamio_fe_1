"use client";
import { CiLogin } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from 'react';
import ResponsiveContainer from "./ResponsiveContainer";
import Image from "next/image";
import logo from "@/public/images/trans-logo2.png";
import Link from "next/link";


const Navigation = () => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const toggleSideMenu = () => {
        setShowSideMenu((prev) => !prev);
    };

    return (
        <>
            <nav className="w-full fixed top-0 left-0 z-50 bg-black shadow-md">
                <ResponsiveContainer className="h-[75px] flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <Image src={logo} width={70} alt="logo"></Image>
                        <div>
                            <p className="text-2xl text-white">eGamio</p>
                            <p className="text-xs text-white">Where dreams meet!</p>
                        </div>
                    </div>
                    <div className="h-full flex justify-between items-center">
                        <ul className="h-full hidden sm:flex items-center">
                            <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Home</li>
                            <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Find Team</li>
                            <li className="h-full cursor-pointer hover:border-t-4 hover:border-highlight px-4 flex items-center text-white">Find Player</li>
                            <li className="h-[40px] bg-highlight py-2 px-6 rounded-3xl ml-4"><Link href="/login" className="text-background">Login</Link></li>
                        </ul>
                        <IoMenu className="cursor-pointer text-4xl text-white block sm:hidden" onClick={toggleSideMenu}></IoMenu>
                    </div>
                </ResponsiveContainer>
            </nav>
            <section className={`z-[124] fixed top-0 left-0 bg-black/50 h-full w-full transition-transform duration-500 transform ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full w-[300px] bg-background">
                    <div className="flex justify-between items-center p-4">
                        <Image src={logo} width={50} alt="logo"></Image>
                        <IoCloseCircleOutline className="cursor-pointer text-4xl text-white" onClick={toggleSideMenu}></IoCloseCircleOutline>
                    </div>
                    <div className="mt-3">
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
