"use client";
import { useState } from "react";

const UploadClip = ({ onUpload }) => {
    const [title, setTitle] = useState("");
    const [game, setGame] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [error, setError] = useState("");

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 15 * 1024 * 1024) { // 15MB in bytes
                setError("File size should be less than 15MB.");
                setVideoFile(null);
            } else {
                setError("");
                setVideoFile(file);
            }
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !game || !videoFile) {
            setError("Please fill out all fields and upload a valid video file.");
            return;
        }

        // Clear error
        setError("");

        // Execute the upload function passed in props
        onUpload({ title, game, videoFile });

        // Reset form fields
        setTitle("");
        setGame("");
        setVideoFile(null);
    };

    return (
        <div className="p-6 bg-background max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Upload New Short</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                        placeholder="Enter the video title"
                        required
                    />
                </div>

                {/* Game Input */}
                <div>
                    <label className="block font-medium">Game</label>
                    <input
                        type="text"
                        value={game}
                        onChange={(e) => setGame(e.target.value)}
                        className="w-full p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                        placeholder="Enter the game played"
                        required
                    />
                </div>

                {/* Video File Input */}
                <div>
                    <label className="block font-medium">Video File (Max: 15MB)</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="w-full p-3 rounded-none bg-transparent focus:outline-none"
                        required
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-danger text-sm mt-1">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-accent text-white py-2 rounded-lg hover:bg-darkaccent transition duration-300"
                >
                    Upload Clip
                </button>
            </form>
        </div>
    );
};

export default UploadClip;
