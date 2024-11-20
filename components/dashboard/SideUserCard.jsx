"use client";

import Image from "next/image";

const SideUserCard = ({ userPhoto, firstName, lastName, bio }) => {
    return (
        <div className="w-full md:w-1/4 flex flex-col items-center p-4 space-y-6">
            {/* Profile Picture */}
            <div className="relative w-40 h-40">
                <Image
                    src={userPhoto}
                    alt="Profile Photo"
                    width={160}
                    height={160}
                    className="rounded-full object-cover border-4 border-highlight"
                />
            </div>

            {/* Bio */}
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-300">
                    {`${firstName} ${lastName}`}
                </h3>
                <p className="text-sm text-gray-400 mt-2">{bio}</p>
            </div>
        </div>
    );
};

export default SideUserCard;
