"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules' // Added Navigation
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import { TypographyH1, TypographyP } from "@/components/ui/Typographies"
import Link from "next/link"
import slider1 from "@/public/images/slider1.jpg"
import slider2 from "@/public/images/slider2.jpg"
import slider3 from "@/public/images/slider3.jpg"
import Image from 'next/image' // Added Image component
import 'swiper/css'
import 'swiper/css/pagination'

const sliderData = [
    {
        image: slider1,
        title: "Connect with the Perfect Team or Player for Your Next Game!",
        description: "Join thousands of gamers and find your perfect match.",
        buttons: [
            { text: "Find Players", href: "/find" },
            { text: "Find a Team", href: "/find" }
        ]
    },
    {
        image: slider2,
        title: "Join the Ultimate Esports Community!",
        description: "Connect with players and discuss everything about your favorite games.",
        buttons: [
            { text: "Visit Community", href: "/eg-threads" },
            { text: "Post a Questions", href: "/eg-threads/create" }
        ]
    },
    {
        image: slider3,
        title: "Stay Informed with Expert Esports Insights and Blogs!",
        description: "Read the latest blogs, strategies, and tips from top players.",
        buttons: [
            { text: "Find Players", href: "/find" },
            { text: "Find a Team", href: "/find" }
        ]
    }
]

export default function HeroSlider() {
    return (
        <section className="relative">
            <Swiper
                className="h-[801px]"
                style={{
                    "--swiper-pagination-color": "#f41d91",
                    "--swiper-pagination-bullet-inactive-color": "#fff",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "16px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                    "--swiper-pagination-bottom": "3rem"
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                modules={[Pagination]}
                spaceBetween={0}
                navigation
            >
                {sliderData.map((slide, index) => (
                    <SwiperSlide
                        className="h-[720px] w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image.src})` }}
                        key={index}
                    >
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))" }}></div>
                        <SliderItem {...slide} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

function SliderItem({ image, title, description, buttons }) {
    return (
        <ResponsiveContainer className="relative h-full z-10 flex flex-col px-4 sm:px-8 justify-center items-center">
            <div className="max-w-[570px] text-center">
                <TypographyH1 className="text-center text-white">{title}</TypographyH1>
                <TypographyP className="text-white">{description}</TypographyP>
                <ul className="flex gap-4 md:gap-8 mt-6 justify-center">
                    {buttons.map((button, idx) => (
                        <li key={idx} className="flex">
                            <Link
                                href={button.href}
                                className={`flex items-center justify-center cursor-pointer h-[50px] w-[150px] md:w-[180px] ${idx === 0 ? 'bg-accent' : 'border hover:bg-accent hover:border-0 bg-transparent'
                                    } mt-3 py-2 px-6 rounded-3xl text-white`}
                            >
                                {button.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </ResponsiveContainer>

    )
}

