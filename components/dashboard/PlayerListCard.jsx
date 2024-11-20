import Image from "next/image";

const PlayerListCard = ({ player }) => {
    return (
        <div className="flex flex-col items-center bg-background p-4 rounded-lg shadow-lg">
            <div className="relative w-full pb-[116%] overflow-hidden rounded-lg">
                <Image
                    src={player.image}
                    alt={player.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <p className="mt-2 text-lg font-semibold">{player.name}</p>
            <p className="text-sm text-foreground">{player.role} | {player.game}</p>
            <p className="text-sm text-foreground">Experience: {player.experience} years</p>
        </div>
    );
};

export default PlayerListCard;
