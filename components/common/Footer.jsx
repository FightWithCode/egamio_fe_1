"use client";
import { CiLogin } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';
import ResponsiveContainer from "./ResponsiveContainer";
import { TypographyH4, TypographyP } from "../ui/Typographies";
import Image from "next/image";
import logo from "@/public/images/trans-logo2.png";
import blog1 from "@/public/images/blogs/blog1.jpg";
import blog2 from "@/public/images/blogs/blog2.jpg";
import blog3 from "@/public/images/blogs/blog3.jpg";


const Footer = () => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const toggleSideMenu = () => {
        setShowSideMenu((prev) => !prev);
    };

    return (
        <>
            <footer className="w-full z-[123] bg-background py-16">
                <ResponsiveContainer className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    <div className="">
                        <TypographyH4 className="relative pb-3">
                            CONTACT INFO
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <TypographyP>Lorem ipsum dolor sit amet, consectetur dasede do eiusmod tempor unt ut labore et dolore mag lere adveniam, quis rud citation laboris.</TypographyP>
                    </div>
                    <div className="">
                        <TypographyH4 className="relative pb-3">
                            NEED HELP?
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <div className="mt-6 flex gap-2">
                            <ul className="flex-1">
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Home</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Blogs</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Forums</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Shorts</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Search Player</li>
                            </ul>
                            <ul className="flex-1">
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>About Us</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Contact Us</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Privacy Policy</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Terms & Conditions</li>
                                <li className="flex items-center gap-1 py-1"><IoIosArrowForward></IoIosArrowForward>Search Team</li>
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <TypographyH4 className="relative pb-3">
                            LATEST BLOGS
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <div className="mt-6 flex justify-center items-center">
                            <div className="w-1/3">
                                <Image src={blog1} alt="blog" className="object-cover"></Image>
                            </div>
                            <div className="w-2/3 pl-2">
                                <TypographyP className="leading-4">The clash of eternity just released new version</TypographyP>
                                <TypographyP className="text-xs !mt-0">By Dexter | December 15th, 2018</TypographyP>
                            </div>
                        </div>
                        <div className="mt-3 flex justify-center items-center">
                            <div className="w-1/3">
                                <Image src={blog2} alt="blog" className="object-cover"></Image>
                            </div>
                            <div className="w-2/3 pl-2">
                                <TypographyP className="leading-4">The clash of eternity just released new version</TypographyP>
                                <TypographyP className="text-xs !mt-0">By Dexter | December 15th, 2018</TypographyP>
                            </div>
                        </div>
                    </div>
                    <div className="sm:block md:block lg:hidden xl:hidden 2xl:block">
                        <TypographyH4 className="relative pb-3">
                            LATEST PRODUCTS
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <div className="mt-6 flex justify-center items-center">
                            <div className="w-1/3">
                                <Image src={blog3} alt="blog" className="object-cover"></Image>
                            </div>
                            <div className="w-2/3 pl-2">
                                <TypographyP className="leading-4">The clash of eternity just released new version</TypographyP>
                                <TypographyP className="text-xs !mt-0">By Dexter | December 15th, 2018</TypographyP>
                            </div>
                        </div>
                        <div className="mt-3 flex justify-center items-center">
                            <div className="w-1/3">
                                <Image src={blog2} alt="blog" className="object-cover"></Image>
                            </div>
                            <div className="w-2/3 pl-2">
                                <TypographyP className="leading-4">The clash of eternity just released new version</TypographyP>
                                <TypographyP className="text-xs !mt-0">By Dexter | December 15th, 2018</TypographyP>
                            </div>
                        </div>
                    </div>
                </ResponsiveContainer>
            </footer>
        </>
    );
};

export default Footer;
