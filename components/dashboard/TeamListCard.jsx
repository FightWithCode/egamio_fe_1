import { useState } from "react";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { teamAPI } from "@/services/api";

const TeamListCard = ({ team }) => {
    const user = useSelector((state) => state.auth.user);
    const [isApplying, setIsApplying] = useState(false);

    const handleApply = async () => {
        if (!user) {
            toast.error('Please log in to apply.');
            return;
        }
        setIsApplying(true);
        try {
            const payload = {
                recruitment_post: team.id,
                message: `I am interested in joining the ${team.team_name} team.`,
            };
            await teamAPI.applyToTeam(payload);
            toast.success('Application submitted successfully!');
        } catch (error) {
            toast.error('Failed to submit the application. Please try again.');
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <div className="w-full bg-background/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 overflow-hidden group">
            <div className="flex flex-col sm:flex-row w-full">
                {/* Left Section - Team Identity */}
                <div className="relative flex">

                    {/* Logo Container */}
                    <div className="relative w-full flex flex-col justify-center items-center p-4">
                        <Image
                            src={team.team_logo ? team.team_logo : "/images/users/default-team.png"}
                            alt={team.team_name}
                            width={150}
                            height={150}
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Team Name Overlay */}
                        <div className="bg-gradient-to-t from-background/95 to-transparent">
                            <h4 className="text-lg font-semibold text-foreground text-center">
                                {team.team_name}
                            </h4>

                        </div>
                    </div>
                </div>

                {/* Right Section - Content */}
                <div className="flex-1 p-4">
                    <div className="flex flex-col h-full gap-4">
                        <div className="">
                            <h3 className="text-xl font-bold text-primary">
                                {team.team_game} - {team.title}
                            </h3>
                        </div>

                        {/* Roles Section */}

                        <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">

                            <div className="space-y-3">

                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <h4 className="text-sm font-semibold text-foreground">Positions Available: &nbsp;
                                        {team.roles.map((role, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-sm font-medium bg-background/50 text-foreground rounded-full border border-border/50 hover:bg-accent/10 hover:border-accent/20 transition-all duration-200"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex-1">
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                {team.description}
                            </p>
                        </div>

                        {/* Apply Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleApply}
                                disabled={team.applied || isApplying} // Disable if already applied or applying
                                className={`px-3 py-2 ${team.applied || isApplying ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-primary/90'
                                    } text-primary-foreground rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 group hover:shadow-lg`}
                            >
                                {team.applied
                                    ? 'Applied' // User already applied
                                    : isApplying
                                        ? 'Applying...' // Application in progress
                                        : 'Apply Now' // Default state
                                }

                                {/* Show SVG only when the button is in the default state */}
                                {!team.applied && !isApplying && (
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamListCard;
