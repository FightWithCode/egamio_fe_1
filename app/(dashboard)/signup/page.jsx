"use client";

import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Modal from "@/components/common/Modal"; // Assuming a Modal component exists
import ResponsiveContainer from "@/components/common/ResponsiveContainer";
import googleIcon from "@/public/images/icons/google.svg";
import facebookIcon from "@/public/images/icons/facebook.svg";
import {
  TypographyH1,
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/Typographies";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  // State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    game: 1,
    ign: "",
    roles: [],
    team_name: "",
    looking_for_players: 0,
    looking_for_roles: [],
  });
  const [step, setStep] = useState(1); // Tracks the current step
  const [signupType, setSignupType] = useState(""); // Player or Team
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handles input changes for form fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Moves to the next step by opening the modal
  const handleContinueSignup = () => {
    setIsModalOpen(true);
  };

  // Final signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const endpoint =
        signupType === "player"
          ? "https://egamio.pythonanywhere.com/accounts/signup/player/"
          : "https://egamio.pythonanywhere.com/accounts/signup/team/";

      const payload =
        signupType === "player"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              location: formData.location,
              game: formData.game,
              ign: formData.ign,
              roles: formData.roles,
            }
          : {
              name: formData.name,
              game: formData.game,
              team_name: formData.team_name,
              email: formData.email,
              looking_for_players: formData.looking_for_players,
              looking_for_roles: formData.looking_for_roles,
              password: formData.password,
              location: formData.location,
            };

      const response = await api.post(endpoint, payload);
      console.log("Signup successful:", response.data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Signup - eGamio</title>
        <meta name="description" content="Signup to access the dashboard" />
      </Head>
      <ResponsiveContainer className="relative !max-w-[800px] flex my-24 border-[1px] border-white rounded-lg backdrop-blur-sm">
        {/* Left Section */}
        <div className="hidden md:block w-2/5 bg-cover bg-center relative p-6">
          <TypographyH1 className="text-6xl text-white">WELCOME!</TypographyH1>
          <TypographyH3 className="uppercase pt-4 text-white">
            Join the best gaming and esports experience today!
          </TypographyH3>
          <TypographyP className="absolute bottom-6">
            Already have an account? <br />
            <Link href="/login" className="text-highlight underline">
              Login Here!
            </Link>
          </TypographyP>
        </div>

        {/* Right Section */}
        <div className="p-6 w-full md:w-3/5 rounded-lg shadow-md">
          {step === 1 && (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <TypographyH4 className="relative pb-3 text-center">
                SIGNUP
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-20 h-1 bg-highlight"></span>
              </TypographyH4>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-2 text-center text-red-600 bg-red-100 border border-red-400 rounded-md">
                  {errorMessage}
                </div>
              )}

              {/* Name */}
              <div className="flex flex-col">
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your name"
                  className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                  required
                />
              </div>

              {/* Game */}
              <div className="flex flex-col">
                <label className="font-medium">Game</label>
                <input
                  type="number"
                  value={formData.game}
                  onChange={(e) => handleInputChange("game", e.target.value)}
                  placeholder="Enter game ID"
                  className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                  required
                />
              </div>

              {/* Continue Button */}
              <button
                type="button"
                onClick={handleContinueSignup}
                className="w-full py-3 text-white bg-darkhighlight rounded-md hover:bg-highlight focus:outline-none"
              >
                Continue Signup
              </button>
            </form>
          )}

          {/* Modal */}
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <div className="space-y-6">
                {!signupType ? (
                  <>
                    <TypographyH4 className="text-center">
                      Are you signing up as a:
                    </TypographyH4>
                    <button
                      onClick={() => setSignupType("player")}
                      className="w-full py-3 text-white bg-darkhighlight rounded-md hover:bg-highlight focus:outline-none"
                    >
                      Player
                    </button>
                    <button
                      onClick={() => setSignupType("team")}
                      className="w-full py-3 text-white bg-darkhighlight rounded-md hover:bg-highlight focus:outline-none"
                    >
                      Team Owner
                    </button>
                  </>
                ) : (
                  <form className="space-y-6" onSubmit={handleSignup}>
                    {/* Player Fields */}
                    {signupType === "player" && (
                      <>
                        <div className="flex flex-col">
                          <label className="font-medium">IGN</label>
                          <input
                            type="text"
                            value={formData.ign}
                            onChange={(e) =>
                              handleInputChange("ign", e.target.value)
                            }
                            placeholder="Enter your IGN"
                            className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Roles</label>
                          <input
                            type="text"
                            value={formData.roles}
                            onChange={(e) =>
                              handleInputChange(
                                "roles",
                                e.target.value.split(",")
                              )
                            }
                            placeholder="Enter roles (comma-separated)"
                            className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Team Owner Fields */}
                    {signupType === "team" && (
                      <>
                        <div className="flex flex-col">
                          <label className="font-medium">Team Name</label>
                          <input
                            type="text"
                            value={formData.team_name}
                            onChange={(e) =>
                              handleInputChange("team_name", e.target.value)
                            }
                            placeholder="Enter your team name"
                            className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">
                            Looking for Players
                          </label>
                          <input
                            type="number"
                            value={formData.looking_for_players}
                            onChange={(e) =>
                              handleInputChange(
                                "looking_for_players",
                                +e.target.value
                              )
                            }
                            placeholder="Enter number of players"
                            className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Roles Needed</label>
                          <input
                            type="text"
                            value={formData.looking_for_roles}
                            onChange={(e) =>
                              handleInputChange(
                                "looking_for_roles",
                                e.target.value.split(",")
                              )
                            }
                            placeholder="Enter roles (comma-separated)"
                            className="p-3 border-b-2 border-gray-300 focus:border-highlight rounded-none bg-transparent focus:outline-none text-white"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Final Signup Button */}
                    <button
                      type="submit"
                      className="w-full py-3 text-white bg-darkhighlight rounded-md hover:bg-highlight focus:outline-none"
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Complete Signup"}
                    </button>
                  </form>
                )}
              </div>
            </Modal>
          )}
        </div>
      </ResponsiveContainer>
    </>
  );
}
