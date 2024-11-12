"use client"; // React import
import Image from "next/image"; // Components import
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
import { useState } from "react";

// Assets import
import user3 from "@/public/images/users/user3.jpeg"; // Example user image
import { FaPlus } from "react-icons/fa"; // Upload Icon

const UserGames = () => {
    // Sample state for clips
    const [clips, setClips] = useState([
        {
            id: 1,
            videoUrl: "/videos/sample_clip1.mp4",
            views: 120,
            likes: 45,
            thumbnail: "/images/clips/clip1_thumbnail.jpeg",
        },
        {
            id: 2,
            videoUrl: "/videos/sample_clip2.mp4",
            views: 98,
            likes: 34,
            thumbnail: "/images/clips/clip2_thumbnail.jpeg",
        },
        {
            id: 3,
            videoUrl: "/videos/sample_clip3.mp4",
            views: 212,
            likes: 78,
            thumbnail: "/images/clips/clip3_thumbnail.jpeg",
        },
        {
            id: 4,
            videoUrl: "/videos/sample_clip4.mp4",
            views: 150,
            likes: 56,
            thumbnail: "/images/clips/clip4_thumbnail.jpeg",
        },
        // More clips can be added here
    ]);

    // Handle upload (dummy function, you can expand it with your actual upload logic)
    const handleUploadClip = () => {
        alert("Upload Clip functionality goes here");
    };

    return (
        <ResponsiveContainer className="py-6">
            {/* Upload Button */}
            <div className="mb-6 flex justify-between items-center">
                <span className="text-gray-700 font-semibold text-lg">
                    {clips.length} Shorts Uploaded
                </span>
                <button
                    onClick={handleUploadClip}
                    className="flex items-center bg-accent text-white px-4 py-2 rounded-lg"
                >
                    <FaPlus className="mr-2" /> Upload Clip
                </button>
            </div>

            {/* Clips List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clips.map((clip) => (
                    <div key={clip.id} className="bg-background rounded-lg overflow-hidden shadow-lg">
                        {/* Clip Video Thumbnail */}
                        <div className="relative">
                            <Image
                                src={clip.thumbnail}
                                alt={`Clip Thumbnail ${clip.id}`}
                                width={180}
                                height={320}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-50 flex justify-center items-center">
                                <TypographyP className="text-white">Play</TypographyP>
                            </div>
                        </div>

                        {/* Clip Stats */}
                        <div className="px-4 py-3">
                            <div className="flex justify-between items-center text-gray-300">
                                <TypographyP className="text-sm !mt-0">{clip.views} views</TypographyP>
                                <TypographyP className="text-sm !mt-0">{clip.likes} likes</TypographyP>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ResponsiveContainer>
    );
};

export default UserGames;
