"use client";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import logo from "@/public/images/trans-logo2.png";
import user2 from "@/public/images/users/user2.png";

const Navigation = () => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const toggleSideMenu = () => {
        setShowSideMenu((prev) => !prev);
    };

    return (
        <>
            <nav className="w-full z-[123] bg-background">
                <ResponsiveContainer className="h-[75px] overflow-hidden flex justify-between items-center">
                    <div className="flex justify-center items-center">
                        <Image src={logo} width={70} alt="logo"></Image>
                        <div>
                            <p className="text-2xl">eGamio</p>
                            <p className="text-xs">Where dream meet!</p>
                        </div>
                    </div>
                    <div className="flex gap-2 sm:gap-6">
                        <div className="hidden sm:flex justify-center items-center gap-2">
                            <Image className="border-[1px] rounded-full p-1" src={user2} width={35} height={35} alt="logo"></Image>
                            <p className="text-xs">Jonathan James</p>
                        </div>
                        <button className="bg-danger rounded-xl px-4 hidden sm:flex justify-center items-center gap-2"><a href="#" className="text-sm">Logout</a> <IoIosArrowForward className="bg-black/30 rounded-full p-1"></IoIosArrowForward></button>
                        <IoMenu className="cursor-pointer text-4xl block sm:hidden" onClick={toggleSideMenu}></IoMenu>
                    </div>
                </ResponsiveContainer>
            </nav>
            <section className={`z-[124] fixed top-0 left-0 bg-black/50 h-full w-full z-50 transition-transform duration-500 transform ${showSideMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full w-[300px] bg-background">
                    <div className="flex justify-between items-center p-4 bg-black h-[75px]">
                        <Image src={logo} width={50} alt="logo"></Image>
                        <IoCloseCircleOutline className="cursor-pointer text-4xl" onClick={toggleSideMenu}></IoCloseCircleOutline>
                    </div>
                    <div className="flex gap-4 sm:gap-6 flex-col justify-start pt-4 pl-4">
                        <div className="flex items-center gap-2">
                            <Image className="border-[1px] rounded-full p-1" src={user2} width={35} height={35} alt="logo"></Image>
                            <p className="text-xs">Jonathan James</p>
                        </div>
                        <button className="w-[102px] h-[35px] bg-danger rounded-xl px-4 flex justify-center items-center gap-2"><a href="#" className="text-sm">Logout</a> <IoIosArrowForward className="bg-black/30 rounded-full p-1"></IoIosArrowForward></button>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Navigation;
