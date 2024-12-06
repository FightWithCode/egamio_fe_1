"use client"
import Image from "next/image";
import ResponsiveContainer from "../../../components/common/ResponsiveContainer";
import { TypographyH1, TypographyH2, TypographyH3 } from "@/components/ui/Typographies";
import user1 from "@/public/images/users/user1.png";
export default function Testimonial() {
    return (
        <section className="relative py-12 bg-black">
            <TypographyH1 className="text-center text-white py-8">What Our Users Are Saying</TypographyH1>

            <ResponsiveContainer className="flex flex-col md:flex-row px-4 items-center justify-center gap-6 md:gap-12">

                {/* User Image */}
                <div className="flex justify-center items-center w-full md:w-1/3 max-w-[360px]">
                    <Image src={user1} alt="User Testimonial" className="w-full h-auto rounded-lg object-cover" />
                </div>

                {/* User Testimonial Text */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 max-w-[360px] md:max-w-none">
                    <TypographyH2 className="text-white mb-4">
                        "Finding my team that matched my skills and passion was challenging until I joined this platform.
                        Within days, I connected with a group of like-minded players, and we've been dominating ever since!"
                    </TypographyH2>
                    <TypographyH3 className="text-highlight mt-2">John "AcePlayer" Smith</TypographyH3>
                </div>

            </ResponsiveContainer>
        </section>
    )
}

