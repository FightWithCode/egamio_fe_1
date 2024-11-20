import React, { useEffect, useState } from "react";

const DashboardTab = () => {
  const [recruitmentPosts, setRecruitmentPosts] = useState([]);
  const [playerRecruitmentPosts, setPlayerRecruitmentPosts] = useState([]);
  const [recruitmentApplications, setRecruitmentApplications] = useState([]);
  const [teamInvitations, setTeamInvitations] = useState([]);

  useEffect(() => {
    // Dummy content for recruitment posts
    setRecruitmentPosts([
      {
        uuid: "1",
        title: "Looking for BGMI players",
        description: "We are a top-tier BGMI team looking for skilled players to join our roster.",
        created_by: "Team A",
      },
      {
        uuid: "2",
        title: "Seeking PUBG Mobile pro players",
        description: "Join our PUBG Mobile team and compete in upcoming tournaments!",
        created_by: "Team B",
      }
    ]);

    // Dummy content for player recruitment posts
    setPlayerRecruitmentPosts([
      {
        uuid: "3",
        title: "Player Seeking Team for COD Mobile",
        description: "I'm looking for a competitive team to join for COD Mobile tournaments.",
        user: "Player 1",
      },
      {
        uuid: "4",
        title: "Looking for team for Apex Legends",
        description: "Seeking a team for ranked matches and competitive tournaments.",
        user: "Player 2",
      }
    ]);

    // Dummy content for recruitment applications
    setRecruitmentApplications([
      {
        uuid: "5",
        applicant: "Player 3",
        recruitment_post: { title: "Looking for BGMI players" },
        status: "Pending",
        message: "I have experience in the game and can contribute significantly to the team.",
      },
      {
        uuid: "6",
        applicant: "Player 4",
        recruitment_post: { title: "Seeking PUBG Mobile pro players" },
        status: "Accepted",
        message: "I'm an experienced PUBG Mobile player and would love to join.",
      }
    ]);

    // Dummy content for team invitations
    setTeamInvitations([
      {
        uuid: "7",
        team: { name: "Team A" },
        player: { name: "Player 5" },
        status: "Pending",
        message: "We'd like you to join our team for the next tournament.",
      },
      {
        uuid: "8",
        team: { name: "Team B" },
        player: { name: "Player 6" },
        status: "Accepted",
        message: "You have been selected to join our team. Welcome aboard!",
      }
    ]);
  }, []);

  return (
    <div className="p-4 space-y-8">
      {/* Recruitment Posts */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Recruitment Posts</h3>
        {recruitmentPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruitmentPosts.map((post) => (
              <div key={post.uuid} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="text-xl font-bold text-blue-600">{post.title}</h4>
                <p className="text-gray-600 my-2">{post.description}</p>
                <span className="block text-sm text-gray-500">Created by: {post.created_by}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No recruitment posts available.</p>
        )}
      </div>

      {/* Player Recruitment Posts */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Player Recruitment Posts</h3>
        {playerRecruitmentPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playerRecruitmentPosts.map((post) => (
              <div key={post.uuid} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="text-xl font-bold text-green-600">{post.title}</h4>
                <p className="text-gray-600 my-2">{post.description}</p>
                <span className="block text-sm text-gray-500">Posted by: {post.user}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No player recruitment posts available.</p>
        )}
      </div>

      {/* Recruitment Applications */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Recruitment Applications</h3>
        {recruitmentApplications.length > 0 ? (
          <div className="space-y-4">
            {recruitmentApplications.map((application) => (
              <div key={application.uuid} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="text-lg font-bold">{application.applicant} applied for {application.recruitment_post.title}</h4>
                <p className="text-gray-600 my-2">Status: <span className={`text-${application.status === 'Accepted' ? 'green' : 'yellow'}-600`}>{application.status}</span></p>
                {application.message && <p className="text-gray-600">Message: {application.message}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No applications available.</p>
        )}
      </div>

      {/* Team Invitations */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Team Invitations</h3>
        {teamInvitations.length > 0 ? (
          <div className="space-y-4">
            {teamInvitations.map((invitation) => (
              <div key={invitation.uuid} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="text-lg font-bold">{invitation.team.name} invited {invitation.player.name} to join the team</h4>
                <p className="text-gray-600 my-2">Status: <span className={`text-${invitation.status === 'Accepted' ? 'green' : 'yellow'}-600`}>{invitation.status}</span></p>
                {invitation.message && <p className="text-gray-600">Message: {invitation.message}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No invitations available.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;
