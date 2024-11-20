"use client";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { TypographyP } from "../ui/Typographies";

const ClipCard = ({ clip }) => {
    return (
        <div className="group bg-background rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            {/* Clip Thumbnail */}
            <div className="relative w-full h-0 pb-[150%]">
                <Image
                    src={clip.thumbnail}
                    alt={`Clip Thumbnail ${clip.id}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="text-white text-4xl" />
                </div>
            </div>

            {/* Title and Clip Stats */}
            <div className="px-4 py-3 bg-gray-800 rounded-b-lg">
                <TypographyP className="text-white text-lg font-semibold mb-2">{clip.title}</TypographyP>
                <div className="flex justify-between items-center text-gray-400">
                    <TypographyP className="text-sm !mt-0">{clip.views} views</TypographyP>
                    <TypographyP className="text-sm !mt-0">{clip.likes} likes</TypographyP>
                </div>
            </div>
        </div>
    );
};

export default ClipCard;
