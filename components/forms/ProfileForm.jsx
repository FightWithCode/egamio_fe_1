"use client";

import React, { useState } from 'react';
import Image from "next/image";
import userPhoto from "@/public/images/users/user2.png"; // Replace with actual user photo path
import ResponsiveContainer from '../common/ResponsiveContainer';

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("James");
  const [lastName, setLastName] = useState("Spiegel");
  const [username, setUsername] = useState("James_Spiegel");
  const [email, setEmail] = useState("jspiegel@yourmail.com");
  const [bio, setBio] = useState("Professional gamer, streamer, and content creator.");

  return (
    <ResponsiveContainer className="py-6 px-4 backdrop-blur-sm !text-foreground">
      <div className="flex flex-col md:flex-row gap-0">
        {/* Sidebar Section with Profile and Bio */}
        <div className="w-full md:w-1/4 flex flex-col items-center p-4 space-y-6">
          {/* Profile Picture */}
          <div className="relative w-40 h-40">
            <Image 
              src={userPhoto} 
              alt="Profile Photo" 
              width={160} 
              height={160} 
              className="rounded-full object-cover border-4 border-highlight"
            />
          </div>

          {/* Bio */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-300">{`${firstName} ${lastName}`}</h3>
            <p className="text-sm text-gray-400 mt-2">{bio}</p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="w-full md:w-3/4 p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="font-semibold">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="font-semibold">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
              />
            </div>

            {/* Username (Full Width) */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
              />
              <span className="text-xs text-gray-400 mt-1">People can mention you as @{username.toLowerCase().replace(/ /g, '_')}</span>
            </div>

            {/* Email (Full Width) */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
              />
              <span className="text-xs text-gray-400 mt-1">This is never shown to the public</span>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col md:col-span-2 items-start mt-4">
              <label className="font-semibold mb-2">Profile Photo</label>
              <div className="relative w-24 h-24">
                <Image 
                  src={userPhoto} 
                  alt="Profile Photo" 
                  width={96} 
                  height={96} 
                  className="rounded-full border object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 text-white">
                  <span className="text-lg font-semibold">+</span>
                </button>
              </div>
              <span className="text-xs text-gray-400 mt-1">100x100px minimum resolution</span>
            </div>

            {/* Bio */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none"
                rows="4"
              />
              <span className="text-xs text-gray-400 mt-1">Tell us a bit about yourself</span>
            </div>
          </form>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default ProfileForm;
