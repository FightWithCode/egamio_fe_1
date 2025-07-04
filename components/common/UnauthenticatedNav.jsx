"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import ResponsiveContainer from "../ui/ResponsiveContainer";
import { IoIosLogIn } from "react-icons/io";
import { RiChatThreadLine } from "react-icons/ri";
import { RxVideo } from "react-icons/rx";

import logo from "@/public/images/trans-logo2.png";

const UnauthenticatedNav = () => {
    const pathname = usePathname();

    return (
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
                    <ul className="hidden md:flex items-center gap-4">
                        <li className="cursor-pointer text-white py-[6px] hover:border-t-[3px] hover:border-highlight"><Link href="/">Home</Link></li>
                        <li className="cursor-pointer text-white py-[6px] hover:border-t-[3px] hover:border-highlight"><Link href="/find">Find Player</Link></li>
                        <li className="cursor-pointer text-white py-[6px] hover:border-t-[3px] hover:border-highlight"><Link href="/eg-threads">eGThreads</Link></li>
                        <li className="bg-accent px-6 py-2 rounded-3xl">
                            <Link href={`/login?redirect=${encodeURIComponent(pathname)}`} className="text-white">
                                Login
                            </Link>
                        </li>
                    </ul>
                    {/* <Link href={`/login?redirect=${encodeURIComponent(getRedirectUrl())}`}>
                                <IoIosLogIn className="text-3xl text-white block md:hidden" />
                            </Link> */}
                    <div className="relative block md:hidden">
                        <Link href="/eg-threads">
                            <RiChatThreadLine
                                className="w-[35px] h-[35px] rounded-full border-[1px] p-1 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div className="relative block md:hidden">
                        <Link href="/eg-clips">
                            <RxVideo
                                className="w-[35px] h-[35px] rounded-full border-[1px] p-1 cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div className="relative block md:hidden">
                        <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
                            <IoIosLogIn
                                className="w-[35px] h-[35px] rounded-full border-[1px] p-1 cursor-pointer"
                            />
                        </Link>
                    </div>
                </div>
            </ResponsiveContainer>
        </nav>
    );
};

export default UnauthenticatedNav;