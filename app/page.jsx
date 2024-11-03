"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyP } from "@/components/ui/Typographies";
import 'swiper/css';
import 'swiper/css/pagination';
import slider1 from "@/public/images/slider1.jpg";
import slider2 from "@/public/images/slider2.jpg";
import slider3 from "@/public/images/slider3.jpg";
import blog1 from "@/public/images/blogs/blog1.jpg";
import blog2 from "@/public/images/blogs/blog2.jpg";
import blog3 from "@/public/images/blogs/blog3.jpg";
import game1 from "@/public/images/games/game1.png";
import game2 from "@/public/images/games/game2.png";
import game3 from "@/public/images/games/game3.png";
import game4 from "@/public/images/games/game4.png";
import user1 from "@/public/images/users/user1.png";
import user2 from "@/public/images/users/user2.png";

export default function Home() {
  return (
    <>
      {/* Sliders Container */}
      <section className="h-[720px] overflow-hidden">
        <Swiper
          className="h-[720px]"
          style={{
            "--swiper-pagination-color": "#39c52d",
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
          spaceBetween={0} // Space between slides
          navigation // Enable navigation buttons
        >
          {/* First Slide */}
          <SwiperSlide
            className="h-[720px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slider1.src})` }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8))" }}></div>
            <ResponsiveContainer className="h-full overflow-hidden flex flex-col px-4 sm:px-8 justify-center items-center max-w-[570px] relative z-10">
              <TypographyH1 className="text-center">Connect with the Perfect Team or Player for Your Next Game!</TypographyH1>
              <TypographyP>Join thousands of gamers and find your perfect match.</TypographyP>
              <ul className="flex gap-4 md:gap-8 mt-6">
                <li className="flex"><a href="#" className="flex items-center justify-center cursor-pointer h-[50px] w-[150px] md:w-[180px] bg-accent mt-3 py-2 px-6 rounded-3xl">Find Players</a></li>
                <li className="flex"><a href="#" className="border hover:bg-accent hover:border-0 flex items-center justify-center cursor-pointer h-[50px] w-[150px] md:w-[180px] bg-transparent mt-3 py-2 px-6 rounded-3xl">Find a Team</a></li>
              </ul>
            </ResponsiveContainer>
          </SwiperSlide>
          {/* Second Slide */}
          <SwiperSlide
            className="h-[720px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slider2.src})` }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))" }}></div>
            <ResponsiveContainer className="h-full overflow-hidden flex flex-col px-4 sm:px-8 justify-center items-center max-w-[570px] relative z-10">
              <TypographyH1 className="text-center">Join the Ultimate Esports Community!</TypographyH1>
              <TypographyP>Connect with players and discuss everything about your favorite games.</TypographyP>
              <ul className="flex gap-4 md:gap-8 mt-6">
                <li className="flex"><a href="#" className="flex items-center justify-center cursor-pointer h-[50px] w-[150px] md:w-[180px] bg-accent mt-3 py-2 px-6 rounded-3xl">Visit Community</a></li>
                <li className="flex"><a href="#" className="border hover:bg-accent hover:border-0 flex items-center justify-center cursor-pointer h-[50px] w-[150px] md:w-[180px] bg-transparent mt-3 py-2 px-6 rounded-3xl">Post a Question</a></li>
              </ul>
            </ResponsiveContainer>
          </SwiperSlide>
          {/* Third Slide */}
          <SwiperSlide
            className="h-[720px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slider3.src})` }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))" }}></div>
            <ResponsiveContainer className="h-full overflow-hidden flex flex-col px-4 sm:px-8 justify-center items-center max-w-[570px] relative z-10">
              <TypographyH1 className="text-center">Stay Informed with Expert Esports Insights and Blogs!</TypographyH1>
              <TypographyP>Read the latest blogs, strategies, and tips from top players.</TypographyP>
              <ul className="flex gap-4 md:gap-8 mt-6">
                <li className="flex"><a href="#" className="flex items-center justify-center cursor-pointer h-[50px] w-[150px] md:w-[180px] bg-accent mt-3 py-2 px-6 rounded-3xl">Read Blogs</a></li>
              </ul>
            </ResponsiveContainer>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="relative py-12">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1))",
            zIndex: 0,
          }}
        ></div>
        <TypographyH1 className="relative text-center text-white z-10 py-8">Explore Popular Games</TypographyH1>
        <ResponsiveContainer className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
          {[game1, game2, game3, game4, game1, game2, game3, game4].map((game, index) => (
            <div key={index} className="h-[100px] sm:h-[150px] border-2 rounded-lg p-2 hover:border-highlight bg-zinc-800 flex justify-center items-center h-full w-full">
              <Image src={game} alt={`game ${index + 1}`} className="object-cover" />
            </div>
          ))}
        </ResponsiveContainer>
      </section>

      {/* How it works */}
      <section className="relative py-12 bg-black">
        <TypographyH1 className="text-center text-white relative z-10 py-8">How it Works?</TypographyH1>

        <ResponsiveContainer className="relative z-10 flex flex-col md:flex-row px-4 justify-center gap-6">

          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center max-w-full md:max-w-none w-full md:w-auto">
            <div className="w-full max-w-[360px] md:max-w-full h-[180px] lg:h-[270px] rounded-lg p-2 hover:border-highlight bg-zinc-800 flex justify-center items-center">
              <Image src={game1} alt="step1" className="object-cover rounded-lg" />
            </div>
            <TypographyH2 className="text-center mt-6">
              1. Create an <span className="text-highlight">Account</span>
            </TypographyH2>
            <TypographyP className="font-black text-center max-w-[360px]">
              Signup to join our gaming community! It only takes a few minutes to create your account.
            </TypographyP>
          </div>

          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center max-w-full md:max-w-none w-full md:w-auto">
            <div className="w-full max-w-[360px] md:max-w-full h-[180px] lg:h-[270px] rounded-lg p-2 hover:border-highlight bg-zinc-800 flex justify-center items-center">
              <Image src={game1} alt="step2" className="object-cover rounded-lg" />
            </div>
            <TypographyH2 className="text-center mt-6">
              2. Build your <span className="text-highlight">Profile</span>
            </TypographyH2>
            <TypographyP className="font-black text-center max-w-[360px]">
              Add details like the game you play, your skill level, and the type of team or players you want to connect with.
            </TypographyP>
          </div>

          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center max-w-full md:max-w-none w-full md:w-auto">
            <div className="w-full max-w-[360px] md:max-w-full h-[180px] lg:h-[270px] rounded-lg p-2 hover:border-highlight bg-zinc-800 flex justify-center items-center">
              <Image src={game1} alt="step3" className="object-cover rounded-lg" />
            </div>
            <TypographyH2 className="text-center mt-6">
              3. Start <span className="text-highlight">Connecting</span>
            </TypographyH2>
            <TypographyP className="font-black text-center max-w-[360px]">
              Begin your search! Find teams or players that match your interests and skill level.
            </TypographyP>
          </div>

        </ResponsiveContainer>
      </section>


      {/* What our users say */}
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


      {/* Blogs */}
      <section className="relative py-12 bg-black">
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
      </section>

      {/* call to action */}
      <section className="relative py-24 bg-black">
        <ResponsiveContainer className="relative flex flex-col md:flex-row items-center justify-between bg-highlight rounded-lg h-auto md:h-[300px] px-6 py-8 md:py-0 md:px-8">

          {/* Text and Buttons Section */}
          <div className="text-center md:text-left">
            <TypographyH1 className="leading-tight text-white">
              Ready to join the <br />Community?
            </TypographyH1>

            {/* Button Group */}
            <ul className="flex justify-center md:justify-start gap-4 mt-6">
              <li>
                <a href="#" className="flex items-center justify-center h-[50px] w-[140px] md:w-[180px] bg-accent text-white py-2 px-6 rounded-3xl transition hover:bg-accent-dark">
                  Signup
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center h-[50px] w-[140px] md:w-[180px] border border-white text-white py-2 px-6 rounded-3xl transition hover:bg-white hover:text-black">
                  Learn More
                </a>
              </li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="mt-8 md:mt-0 md:absolute md:right-8 md:bottom-[-24px]">
            <Image src={user2} alt="Community" className="object-cover rounded-lg w-[280px] md:w-[360px]" />
          </div>

        </ResponsiveContainer>
      </section>

    </>
  );
}
