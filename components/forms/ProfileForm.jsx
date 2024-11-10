import React, { useState } from 'react';
import Image from "next/image";
import userPhoto from "@/public/images/users/user2.png"; // Replace with actual user photo path

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("James");
  const [lastName, setLastName] = useState("Spiegel");
  const [username, setUsername] = useState("James_Spiegel");
  const [email, setEmail] = useState("jspiegel@yourmail.com");

  return (
    <div className="p-6 mx-auto">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">First Name</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">Last Name</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
          />
        </div>

        {/* Username (Full Width) */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-gray-600">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
          />
          <span className="text-xs text-gray-500 mt-1">People can mention you as @{username.toLowerCase().replace(/ /g, '_')}</span>
        </div>

        {/* Email (Full Width) */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-gray-600">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
          />
          <span className="text-xs text-gray-500 mt-1">This is never shown to the public</span>
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col md:col-span-2 items-start mt-4">
          <label className="font-semibold text-gray-600 mb-2">Profile Photo</label>
          <div className="relative w-24 h-24">
            <Image src={userPhoto} alt="Profile Photo" width={96} height={96} className="rounded-full border object-cover" />
            <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 text-white">
              <span className="text-lg font-semibold">+</span>
            </button>
          </div>
          <span className="text-xs text-gray-500 mt-1">100x100px minimum resolution</span>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
