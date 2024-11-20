import React from "react";
import { TypographyP } from "../ui/Typographies";

const RecruitmentPostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <TypographyP className="text-2xl font-semibold">{post.title}</TypographyP>
                <TypographyP className="text-lg text-gray-600 mt-2">{post.teamName}</TypographyP>
                <div className="mt-4">
                    <p className="text-lg font-semibold">Game Type: {post.game}</p>
                    <p className="text-lg font-semibold">Roles: {post.roles.join(", ")}</p>
                    <p className="text-lg font-semibold">Location: {post.location}</p>
                </div>
                <p className="mt-4 text-gray-600">{post.description}</p>
            </div>
        </div>
    );
};

export default RecruitmentPostCard;
