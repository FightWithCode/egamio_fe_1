import Image from "next/image";

const TeamListCard = ({ team }) => {
    return (
        <div className="flex flex-col items-center bg-background p-4 rounded-lg">
            <div className="relative w-full pb-[116%] overflow-hidden rounded-lg">
                <Image
                    src={team.image}
                    alt={team.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <p className="mt-2 text-lg font-semibold">{team.name}</p>
            <p className="text-sm text-foreground">{team.game}</p>
            <p className="text-sm text-foreground">Location: {team.location}</p>
            <p className="text-sm text-foreground">{team.rolesLookingFor.join(", ")}</p>
        </div>
    );
};

export default TeamListCard;
