"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import PlayerTeamSearch from '@/components/dashboard/PlayerTeamSearch';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api/axiosSetup';

const CompleteProfileForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '', // "team" or "individual"
    roles: [],
    game: '',
    ign: '',
    game_data: {},
    preference_data: {},
    team_name: '',
    logo: null,
    looking_for_players: 0,
    looking_for_roles: [],
    location: '',
  });
  const [error, setError] = useState(null);

  const gameOptions = [
    { id: 1, name: 'BGMI' },
    { id: 2, name: 'CODM' },
    { id: 3, name: 'Apex Legend' }
  ];
  const roleOptions = [
    { id: 1, name: 'Role 1' },
    { id: 2, name: 'Role 2' },
    { id: 3, name: 'Role 3' }
  ];

  const handleRoleSelect = (roleId) => {
    setFormData(prev => {
      const roleIdInt = parseInt(roleId, 10);
      if (prev.roles.includes(roleIdInt)) {
        return {
          ...prev,
          roles: prev.roles.filter(id => id !== roleIdInt)
        };
      } else {
        return {
          ...prev,
          roles: [...prev.roles, roleIdInt]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        type: formData.type,
        roles: formData.roles,
        game: formData.game,
        ign: formData.ign,
        game_data: formData.game_data,
        preference_data: formData.preference_data,
      };

      if (formData.type === 'team') {
        payload.team_name = formData.team_name;
        payload.logo = formData.logo;
        payload.looking_for_players = formData.looking_for_players;
        payload.looking_for_roles = formData.looking_for_roles;
        payload.location = formData.location;
      }

      const response = await api.post('/accounts/complete-profile/', payload);
      console.log(response)
      if (response.status === 200) {
        onComplete();
      }
    } catch (err) {
      console.error('Error completing profile:', err);
      setError('An error occurred while completing your profile. Please try again.');
    }
  };

  return (
    <div className="p-6 backdrop-blur-sm border rounded-lg max-w-[750px] mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>

          <div>
            <label className="block mb-2">Select Profile Type</label>
            <select
              className="w-full p-2 rounded bg-background"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="individual">Individual</option>
              <option value="team">Team</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Select Game</label>
            <select
              className="w-full p-2 rounded bg-background"
              value={formData.game}
              onChange={(e) => setFormData({ ...formData, game: e.target.value })}
            >
              <option value="">Select Game</option>
              {gameOptions.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name} {/* Replace with actual game names */}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Enter In-Game Name (IGN)</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-background"
              placeholder="In-Game Name"
              value={formData.ign}
              onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">Select Roles</label>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id)}
                  className={`px-3 py-1 rounded-full text-sm ${formData.roles.includes(role.id)
                    ? 'bg-highlight text-white'
                    : 'bg-background border border-highlight text-highlight'
                    }`}
                >
                  {role.name}
                </button>
              ))}
            </div>
            {formData.roles.length === 0 && (
              <p className="text-sm text-red-500 mt-1">Please select at least one role</p>
            )}
          </div>

          <button
            className="w-full bg-highlight text-white py-2 rounded"
            onClick={formData.type === 'individual' ? handleSubmit : () => setStep(2)}
            disabled={!formData.type || !formData.game || !formData.ign || !formData.roles.length}
          >
            {formData.type === 'individual' ? 'Complete Profile' : 'Next'}
          </button>

        </div>
      )}

      {step === 2 && formData.type === 'team' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Create Your Team</h2>

          <div>
            <label className="block mb-2">Team Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-background"
              placeholder="Team Name"
              value={formData.team_name}
              onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">Looking for Players (Number)</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-background"
              min="0"
              max="10"
              value={formData.looking_for_players}
              onChange={(e) =>
                setFormData({ ...formData, looking_for_players: parseInt(e.target.value, 10) })
              }
            />
          </div>

          <div>
            <label className="block mb-2">Looking for Roles</label>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    const roleId = parseInt(role.id, 10);
                    setFormData(prev => ({
                      ...prev,
                      looking_for_roles: prev.looking_for_roles.includes(roleId)
                        ? prev.looking_for_roles.filter(id => id !== roleId)
                        : [...prev.looking_for_roles, roleId]
                    }));
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${formData.looking_for_roles.includes(role.id)
                    ? 'bg-highlight text-white'
                    : 'bg-background border border-highlight text-highlight'
                    }`}
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>


          <div>
            <label className="block mb-2">Team Logo</label>
            <input
              type="file"
              className="w-full p-2 rounded bg-background"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, logo: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <button
            className="w-full bg-highlight text-white py-2 rounded"
            onClick={handleSubmit}
            disabled={!formData.team_name}
          >
            Complete Profile
          </button>
        </div>
      )}

      {step === 2 && formData.type !== 'team' && (
        <button className="w-full bg-highlight text-white py-2 rounded" onClick={handleSubmit}>
          Complete Profile
        </button>
      )}
    </div>
  );
};


const DashboardPage = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading, updateProfileCompleteness } = useAuth();
  const isProfileComplete = user.isProfileComplete
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleProfileComplete = () => {
    // Update the is_profile_complete in localStorage and context
    updateProfileCompleteness(true);
    // window.location.reload(); // This will trigger a refresh to update the context
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isProfileComplete) {
    return (
      <ResponsiveContainer className="my-8">
        <CompleteProfileForm onComplete={handleProfileComplete} />
      </ResponsiveContainer>
    );
  }

  return (
    <>
      <ResponsiveContainer className="my-8 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
        <div className="border-b-[1px]">
          <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px]">
            <p className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer bg-highlight text-white`}>
              Dashboard
            </p>
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
          <PlayerTeamSearch />
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default DashboardPage;
