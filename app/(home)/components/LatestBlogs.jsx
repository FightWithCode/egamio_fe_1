"use clients"
import Image from "next/image";
import ResponsiveContainer from "../../../components/common/ResponsiveContainer";
import { TypographyH1, TypographyH4 } from "@/components/ui/Typographies";
import blog1 from "@/public/images/blogs/blog1.jpg";
import blog2 from "@/public/images/blogs/blog2.jpg";
import blog3 from "@/public/images/blogs/blog3.jpg";
export default function LatestBlogs() {
    return (
        < section className="relative py-12 bg-black" >
            <TypographyH1 className="text-center text-white pb-8">Blog/Lates News</TypographyH1>
            <ResponsiveContainer className="relative z-10 flex flex-wrap md:flex-nowrap px-4 justify-center gap-6">
                <div className="w-full md:flex-1 flex flex-col items-center h-full max-w-[360px] md:max-w-full">
                    <div className="h-[240px] rounded-lg hover:border-highlight bg-zinc-800 flex flex-col justify-center items-center h-full w-full">
                        <div className="relative h-[180px] md:h-[240px] w-full">
                            <Image src={blog1} alt="step1" className="object-cover rounded-lg" layout="fill" />
                        </div>
                    </div>
                    <TypographyH4 className="text-center mt-6 leading-1">How to build an impressive Gamer Profile That Stands Out</TypographyH4>
                </div>
                <div className="w-full md:flex-1 flex flex-col items-center h-full max-w-[360px] md:max-w-full">
                    <div className="h-[240px] rounded-lg hover:border-highlight bg-zinc-800 flex flex-col justify-center items-center h-full w-full">
                        <div className="relative h-[180px] md:h-[240px] w-full">
                            <Image src={blog2} alt="step1" className="object-cover rounded-lg" layout="fill" />
                        </div>
                    </div>
                    <TypographyH4 className="text-center mt-6 leading-1">Player Spotlight: How Jonathan Went from Solo to Pro</TypographyH4>
                </div>
                <div className="w-full md:flex-1 flex flex-col items-center h-full max-w-[360px] md:max-w-full">
                    <div className="h-[240px] rounded-lg hover:border-highlight bg-zinc-800 flex flex-col justify-center items-center h-full w-full">
                        <div className="relative h-[180px] md:h-[240px] w-full">
                            <Image src={blog3} alt="step1" className="object-cover rounded-lg" layout="fill" />
                        </div>
                    </div>
                    <TypographyH4 className="text-center mt-6 leading-1">The Psychology Behind Successful Gaming Team</TypographyH4>
                </div>
            </ResponsiveContainer>
        </section >

    )
}