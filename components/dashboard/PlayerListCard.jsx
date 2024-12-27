import Image from "next/image";

const PlayerListCard = ({ player }) => {
    return (
        <div className="flex flex-col items-center bg-background p-4 rounded-lg shadow-lg">
            <div className="relative w-full pb-[116%] overflow-hidden rounded-lg">
                {player.featured_image ? (
                    <Image
                        src={player.featured_image}
                        alt={player.ign}
                        layout="fill"
                        objectFit="cover"
                    />
                ) : (
                    // You can either show a default image
                    <Image
                        src="/default-player-image.jpg" // Replace with your default image path
                        alt="Default Profile"
                        layout="fill"
                        objectFit="cover"
                    />
                    // Or you can add a placeholder div with background color
                    // <div className="absolute inset-0 bg-gray-200" />
                )}
            </div>
            <p className="mt-2 text-lg font-semibold">{player.ign}</p>
            <p className="text-sm text-foreground">{player.roles_list} | {player.game_name}</p>
            <p className="text-sm text-foreground">Exp: {player.experience} years</p>
        </div>
    );
};

export default PlayerListCard;
