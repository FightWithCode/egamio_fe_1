"use client";

// React imports
import { useState } from "react";
// Components imports
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
import UploadClip from "./UploadClip";
import ClipCard from "./ClipCard";
// Icons imports
import { FaPlus } from "react-icons/fa";

const EGCLips = ({ showUploadButton = true }) => {
    const [clips, setClips] = useState([
        {
            id: 1,
            title: "Sample Clip 1",
            videoUrl: "/videos/sample_clip1.mp4",
            views: 120,
            likes: 45,
            thumbnail: "/images/clips/clip1_thumbnail.jpeg",
        },
        {
            id: 2,
            title: "Sample Clip 2",
            videoUrl: "/videos/sample_clip2.mp4",
            views: 98,
            likes: 34,
            thumbnail: "/images/clips/clip2_thumbnail.jpeg",
        },
        {
            id: 3,
            title: "Sample Clip 3",
            videoUrl: "/videos/sample_clip3.mp4",
            views: 212,
            likes: 78,
            thumbnail: "/images/clips/clip3_thumbnail.jpeg",
        },
        {
            id: 4,
            title: "Sample Clip 4",
            videoUrl: "/videos/sample_clip4.mp4",
            views: 150,
            likes: 56,
            thumbnail: "/images/clips/clip4_thumbnail.jpeg",
        },
    ]);

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Function to handle opening the upload modal
    const handleUploadClip = () => {
        setIsUploadModalOpen(true);
    };

    // Function to handle closing the upload modal
    const handleCloseModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleUpload = (clipData) => {
        // Logic to handle uploaded clip data
        setClips([...clips, { id: clips.length + 1, ...clipData }]);
        setIsUploadModalOpen(false); // Close modal after uploading
    };

    return (
        <ResponsiveContainer className="py-8">
            {/* Header with Upload Button */}
            <div className="mb-8 flex justify-between items-center">
                <span className="text-foreground font-semibold text-xl">
                    {clips.length} Shorts Uploaded
                </span>
                {showUploadButton && (
                    <button
                        onClick={handleUploadClip}
                        className="flex items-center bg-accent text-white px-4 py-2 rounded-lg hover:bg-darkaccent transition duration-300 ease-in-out shadow-md"
                    >
                        <FaPlus className="mr-2" /> Upload Clip
                    </button>
                )}
            </div>
            {/* Clips List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clips.map((clip) => (
                    <ClipCard key={clip.id} clip={clip} />
                ))}
            </div>

            {/* Upload Clip Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-background p-6 rounded-lg max-w-lg w-full relative">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>

                        {/* UploadClip Component */}
                        <UploadClip onUpload={handleUpload} />
                    </div>
                </div>
            )}
        </ResponsiveContainer>
    );
};

export default EGCLips;
