"use client";
import Link from 'next/link';
import { CiLogin } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
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
    
    return (
        <>
            <footer className="w-full z-[123] bg-transparent backdrop-blur-md pt-16 pb-8">
                <ResponsiveContainer className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    <div className="space-y-4">
                        <TypographyH4 className="relative pb-3">
                            CONTACT INFO
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <TypographyP>Connect with gamers, share experiences, and level up your gaming journey with eGamio.</TypographyP>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <FaPhone className="text-highlight" />
                                <TypographyP className="!mt-0">+1 234 567 890</TypographyP>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="text-highlight" />
                                <TypographyP className="!mt-0">contact@egamio.com</TypographyP>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <TypographyH4 className="relative pb-3">
                            QUICK LINKS
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <div className="mt-6 flex gap-2">
                            <ul className="flex-1">
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/">Home</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/blogs">Blogs</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/eg-threads">eGThreads</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/eg-clips">eGClips</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/find">Find Player</Link>
                                </li>
                            </ul>
                            <ul className="flex-1">
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/about">About Us</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/contact">Contact Us</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/privacy">Privacy Policy</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/terms">Terms & Conditions</Link>
                                </li>
                                <li className="flex items-center gap-1 py-1 hover:text-highlight transition-colors">
                                    <IoIosArrowForward /><Link href="/search-team">Search Team</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="">
                        <TypographyH4 className="relative pb-3">
                            LATEST BLOGS
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <div className="space-y-4 mt-6">
                            <Link href="/blogs/1" className="flex items-start gap-4 group">
                                <div className="w-24 h-16 relative overflow-hidden rounded">
                                    <Image 
                                        src={blog1} 
                                        alt="blog" 
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        fill
                                    />
                                </div>
                                <div className="flex-1">
                                    <TypographyP className="leading-tight group-hover:text-highlight transition-colors">
                                        The Evolution of Competitive Gaming
                                    </TypographyP>
                                    <TypographyP className="text-xs !mt-1 text-gray-400">
                                        December 15th, 2023
                                    </TypographyP>
                                </div>
                            </Link>

                            <Link href="/blogs/2" className="flex items-start gap-4 group">
                                <div className="w-24 h-16 relative overflow-hidden rounded">
                                    <Image 
                                        src={blog2} 
                                        alt="blog" 
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        fill
                                    />
                                </div>
                                <div className="flex-1">
                                    <TypographyP className="leading-tight group-hover:text-highlight transition-colors">
                                        Top Gaming Strategies for 2024
                                    </TypographyP>
                                    <TypographyP className="text-xs !mt-1 text-gray-400">
                                        December 20th, 2023
                                    </TypographyP>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="sm:block md:block lg:hidden xl:hidden 2xl:block">
                        <TypographyH4 className="relative pb-3">
                            NEWSLETTER
                            <span className="absolute left-0 bottom-0 w-20 h-0.5 bg-highlight" style={{ height: '4px' }}></span>
                            <span className="absolute left-20 bottom-0 right-0 h-px bg-stone-600"></span>
                        </TypographyH4>
                        <div className="mt-6 space-y-4">
                            <TypographyP>
                                Subscribe to our newsletter for the latest gaming updates and exclusive content.
                            </TypographyP>
                            <form className="space-y-3">
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-highlight focus:border-transparent"
                                />
                                <button 
                                    type="submit" 
                                    className="w-full px-4 py-2 bg-highlight text-white rounded-lg hover:bg-darkhighlight transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </ResponsiveContainer>
            </footer>
        </>
    );
};

export default Footer;
