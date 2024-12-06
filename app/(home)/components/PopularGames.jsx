// app/(home)/components/PopularGames.jsx
import Image from "next/image"
import { TypographyH1 } from "@/components/ui/Typographies"
import ResponsiveContainer from "@/components/common/ResponsiveContainer"
import game1 from "@/public/images/games/game1.png"
import game2 from "@/public/images/games/game2.png"
import game3 from "@/public/images/games/game3.png"
import game4 from "@/public/images/games/game4.png"

const games = [game1, game2, game3, game4, game1, game2, game3, game4]

export default function PopularGames() {
  return (
    <section className="relative py-12">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 1))",
          zIndex: 0,
        }}
      ></div>
      <TypographyH1 className="relative text-center text-white z-10 py-8">
        Explore Popular Games
      </TypographyH1>
      <ResponsiveContainer className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
        {games.map((game, index) => (
          <div
            key={index}
            className="h-[100px] sm:h-[150px] border-2 rounded-lg p-2 hover:border-highlight bg-zinc-800 flex justify-center items-center h-full w-full"
          >
            <Image src={game} alt={`game ${index + 1}`} className="object-cover" />
          </div>
        ))}
      </ResponsiveContainer>
    </section>
  )
}
