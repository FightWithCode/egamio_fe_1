"use client";
import React, { useState, useEffect } from 'react';
import api from '@/services/api/axiosSetup';


const CompleteProfileForm = ({ onComplete, userName }) => {
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
        <div className="min-h-screen backdrop-blur-sm py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Welcome Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Welcome to eGamio, {userName || 'Gamer'}! 🎮
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Let's set up your gaming profile to help you find the perfect teammates
                    </p>
                </div>

                {/* Main Form Container */}
                <div className="p-8 rounded-xl shadow-2xl border border-white">
                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Profile Setup Progress</span>
                            <span className="text-gray-400 text-sm">
                                Step {step} of {formData.type === 'team' ? '2' : '1'}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                style={{ width: step === 1 ? '50%' : '100%' }}
                            />
                        </div>
                    </div>

                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                Basic Profile Information
                            </h2>

                            {/* Profile Type Selection */}
                            <div className="space-y-2">
                                <label className="text-gray-300 font-medium block">
                                    What type of profile would you like to create?
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['individual', 'team'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setFormData({ ...formData, type })}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200
                        ${formData.type === type
                                                    ? 'border-blue-500 bg-blue-500/20 text-white'
                                                    : 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300'
                                                }`}
                                        >
                                            <span className="capitalize font-medium">{type}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Game Selection */}
                            <div className="space-y-2">
                                <label className="text-gray-300 font-medium block">
                                    Select Your Primary Game
                                </label>
                                <select
                                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.game}
                                    onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                                >
                                    <option value="">Choose a game</option>
                                    {gameOptions.map((game) => (
                                        <option key={game.id} value={game.id}>
                                            {game.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* IGN Input */}
                            <div className="space-y-2">
                                <label className="text-gray-300 font-medium block">
                                    In-Game Name (IGN)
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your in-game name"
                                    value={formData.ign}
                                    onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
                                />
                            </div>

                            {/* Roles Selection */}
                            <div className="space-y-2">
                                <label className="text-gray-300 font-medium block">
                                    Select Your Roles
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {roleOptions.map((role) => (
                                        <button
                                            key={role.id}
                                            onClick={() => handleRoleSelect(role.id)}
                                            className={`px-4 py-2 rounded-full transition-all duration-200
                        ${formData.roles.includes(role.id)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            {role.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="pt-6">
                                <button
                                    className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={formData.type === 'individual' ? handleSubmit : () => setStep(2)}
                                    disabled={!formData.type || !formData.game || !formData.ign || !formData.roles.length}
                                >
                                    {formData.type === 'individual' ? 'Complete Profile' : 'Next Step'}
                                </button>
                            </div>
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
            </div>
        </div>
    );
};

export default CompleteProfileForm;
