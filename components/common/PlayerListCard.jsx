import Image from "next/image";
import defaultUser from "@/public/images/users/default.png"
const PlayerListCard = ({ player }) => {
    return (
        <div className="flex flex-col items-center bg-background p-4 border border-border/50 border-white rounded-lg shadow-lg">
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
                        src={defaultUser} // Replace with your default image path
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
