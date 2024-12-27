import Image from "next/image";

const TeamListCard = ({ team }) => {
    return (
        <div className="w-full bg-background/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 overflow-hidden group">
            <div className="flex flex-col sm:flex-row w-full">
                {/* Left Section - Team Identity */}
                <div className="w-full sm:w-64 relative">
                    {/* Game Badge - Top Left */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-4 py-1.5 bg-background/95 backdrop-blur-sm text-primary rounded-full text-sm font-medium border border-border/50 shadow-sm">
                            {team.team_game}
                        </span>
                    </div>

                    {/* Logo Container */}
                    <div className="relative h-64 sm:h-full">
                        {team.team_logo ? (
                            <>
                                <Image
                                    src={team.team_logo}
                                    alt={team.team_name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                            </>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                <span className="text-4xl font-bold text-primary/50">
                                    {team.team_name[0]}
                                </span>
                            </div>
                        )}
                        
                        {/* Team Name Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 to-transparent">
                            <h4 className="text-lg font-semibold text-foreground text-center">
                                {team.team_name}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Right Section - Content */}
                <div className="flex-1 p-6">
                    <div className="flex flex-col h-full gap-6">
                        {/* Header Section */}
                        <div>
                            <div className="flex items-center gap-2 text-xs text-foreground/60 mb-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Posted: {new Date(team.created_at).toLocaleDateString()}
                            </div>
                            <h3 className="text-xl font-bold text-primary">
                                {team.title}
                            </h3>
                        </div>

                        {/* Roles Section */}
                        <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <h4 className="text-sm font-semibold text-foreground">Positions Available</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {team.roles.map((role, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 text-sm font-medium bg-background/50 text-foreground rounded-full border border-border/50 hover:bg-accent/10 hover:border-accent/20 transition-all duration-200"
                                        >
                                            {role}
                                        </span>
                                    ))}
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
                            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 group hover:shadow-lg">
                                Apply Now
                                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamListCard;
