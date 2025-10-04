"use client";

import axiosInstance from "@/lib/axiosInstance";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface user extends User {
  accounts: {
    provider: string;
  }[];
}

export default function MyProfilePage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { data: session, status } = useSession();
  const [user, setUser] = useState<user>();
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.get("/api/user/me");
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
        setError("Unable to get the user data");
      }
    };
    if (status === "authenticated") getuser();
  }, [session]);

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }
    try {
      await axiosInstance.post("/api/user/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      toast.success("Password updated successfully!");
      setShowPasswordForm(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Failed to update password. Please try again.";
        toast.error(message);
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    }
  };

  if (status === "loading")
    return (
      <div className="text-gray-400 text-center mt-16 text-xl font-medium">
        Checking session...
      </div>
    );

  if (status === "unauthenticated")
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 font-semibold text-lg mb-4">
          You must be logged in to view this page.
        </p>
        <Link
          href="/api/auth/signin"
          className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-purple-600 hover:to-indigo-600 transition"
        >
          Login
        </Link>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-semibold text-2xl">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="text-gray-400 text-center mt-20 text-xl">Loading profile...</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-14 pt-32">
      <div className="max-w-5xl mx-auto bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400 mb-10 drop-shadow-lg">
          My Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col items-center border border-indigo-600">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-inner ring-4 ring-indigo-500">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-5xl font-extrabold select-none">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
              )}
            </div>
            <h2 className="mt-6 text-2xl font-bold text-indigo-300">{user.name}</h2>

            <div className="mt-6 flex gap-4">
              {user.accounts && user.accounts[0]?.provider === "google" ? (
                <Link
                  href="https://myaccount.google.com/security"
                  target="_blank"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-semibold transition"
                  rel="noopener noreferrer"
                >
                  Manage Password
                </Link>
              ) : (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md font-semibold transition"
                  aria-label="Change password"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { label: "Email", value: user.email },
              { label: "Role", value: user.role },
              { label: "Joined Date", value: new Date(user.createdAt).toLocaleDateString() },
              {
                label: "Total Coins",
                value: (
                  <span className="text-yellow-400 font-bold text-xl">🪙 {user.coins}</span>
                ),
              },
              { label: "Total Score", value: user.totalScore },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-gray-700 rounded-2xl p-6 shadow-md border border-indigo-600"
              >
                <p className="text-sm text-indigo-400 font-semibold mb-1">{label}</p>
                <p className="text-lg font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative border border-indigo-600">
            <button
              onClick={() => setShowPasswordForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold"
              aria-label="Close password form"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChangeSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="oldPassword"
                  className="block text-indigo-300 font-semibold mb-2"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full rounded-xl bg-gray-700 border border-indigo-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-indigo-300 font-semibold mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full rounded-xl bg-gray-700 border border-indigo-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-indigo-300 font-semibold mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-xl bg-gray-700 border border-indigo-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                aria-label="Update password"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
