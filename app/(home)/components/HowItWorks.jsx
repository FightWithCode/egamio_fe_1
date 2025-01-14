// app/(home)/components/HowItWorks.jsx
import Image from "next/image"
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/Typographies"
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import step1 from "@/public/images/steps/step1.jpg"
import step2 from "@/public/images/steps/step2.jpg"
import step3 from "@/public/images/steps/step3.jpg"

const steps = [
  {
    title: "Create an Account",
    description: "Signup to join our gaming community! It only takes a few minutes to create your account.",
    image: step1
  },
  {
    title: "Build your Profile",
    description: "Add details like the game you play, your skill level, and the type of team or players you want to connect with.",
    image: step2
  },
  {
    title: "Start Connecting",
    description: "Begin your search! Find t",
    image: step3
  }
]

export default function HowItWorks() {
  return (
    <section className="relative py-12 bg-black">
      <TypographyH1 className="text-center text-white relative z-10 py-8">
        How it Works?
      </TypographyH1>
      <ResponsiveContainer className="relative z-10 flex flex-col md:flex-row px-4 justify-center gap-6">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
            image={step.image}
          />
        ))}
      </ResponsiveContainer>
    </section>
  )
}

function StepCard({ number, title, description, image }) {
  return (
    <div className="flex-1 flex flex-col items-center max-w-full md:max-w-none w-full md:w-auto">
      <div className="w-full max-w-[360px] md:max-w-full rounded-lg hover:border-highlight bg-zinc-800 flex justify-center items-center">
        <Image src={image} alt={`step${number}`} className="object-cover rounded-lg" />
      </div>
      <TypographyH2 className="text-center mt-6">
        {number}. {title.split(" ").map((word, i, arr) => 
          i === arr.length - 1 ? 
            <span key={i} className="text-highlight">{word}</span> : 
            word + " "
        )}
      </TypographyH2>
      <TypographyP className="font-black text-center max-w-[360px]">
        {description}
      </TypographyP>
    </div>
  )
}
