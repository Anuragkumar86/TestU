"use client"

import axiosInstance from "@/lib/axiosInstance";
import { QuizAttempt, User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface user extends User {
    // quizAttempts: QuizAttempt[],
    accounts:{
        provider: string
    }[]
}

export default function MyProfilePage() {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const { data: session, status } = useSession();
    const [user, setUser] = useState<user>();
    const [error, setError] = useState("");
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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
        if (status === "authenticated") {
            getuser();
        }
    }, [session]);

    if (status === "loading") {
        return <div className="text-gray-500 text-center mt-10">Checking session...</div>;
    }

    if (status === "unauthenticated") {
        return (
            <div className="text-center mt-10">
                <p className="text-red-500 font-semibold">You must be logged in to view this page.</p>
                <Link
                    href="/api/auth/signin"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Login
                </Link>
            </div>
        );
    }

    // ---------------------------------------------------------------------------------

    const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match!")
            // alert("New password and confirm password do not match!");
            return;
        }

        try {
            await axiosInstance.post("/api/user/change-password", {
                oldPassword,
                newPassword,
                confirmPassword
            });
            toast.success("Password updated successfully!")

            setShowPasswordForm(false);
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
    }
    //  ------------------------------------------------------------------------------------
    if (error) {
        return <div className="text-red-500 text-center mt-10 text-4xl">{error}</div>;
    }

    //  -------------------------------------------------------------------------------------
    if (!user) {
        return <div className="text-gray-500 text-center mt-10">Loading profile...</div>;
    }

    {
        showPasswordForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                    <button
                        onClick={() => setShowPasswordForm(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        ✖
                    </button>
                    <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const oldPassword = formData.get("oldPassword");
                            const newPassword = formData.get("newPassword");

                            try {
                                await axios.post("/api/user/change-password", {
                                    oldPassword,
                                    newPassword,
                                });
                                alert("Password updated successfully!");
                                setShowPasswordForm(false);
                            } catch (err) {
                                alert("Failed to update password. Please try again.");
                            }
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                required
                                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                required
                                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-gray-300 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">My Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left: Profile Card */}
                    <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-white">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-fuchsia-400 text-white text-3xl font-bold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>

                        <div className="flex gap-3 mt-4">
                            {user && user.accounts && user.accounts[0] &&  user.accounts[0].provider === "google" ? (
                                <Link
                                target="_blank"
                                href={"https://myaccount.google.com/security"}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow cursor-pointer"
                            >
                            Manage Password on Google

                            </Link>
                            ): (
                                <button
                                onClick={() => setShowPasswordForm(true)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow cursor-pointer"
                            >
                                Change Password
                            </button>
                            )
                            
                            }
                            

                        </div>
                    </div>

                    {/* Right: Info Cards */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-lg font-medium">{user.email}</p>
                        </div>

                        {/* Role */}
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="text-lg font-medium">{user.role}</p>
                        </div>

                        {/* Joined Date */}
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <p className="text-sm text-gray-500">Joined Date</p>
                            <p className="text-lg font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>

                        {/* Coins */}
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <p className="text-sm text-gray-500 font-bold">Total Coins</p>
                            <p className="text-lg font-medium text-yellow-600">🪙 {user.coins}</p>
                        </div>

                        {/* Total Score */}
                        <div className="bg-white rounded-xl shadow-md p-4 ">
                            <p className="text-sm text-gray-500">Total Score</p>
                            <p className="text-lg font-medium">{user.totalScore}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {showPasswordForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                            <button
                                onClick={() => setShowPasswordForm(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✖
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
                            <form
                                onSubmit={handlePasswordChangeSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Old Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        required
                                        onChange={(e) => {
                                            setOldPassword(e.target.value)
                                        }}
                                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        required
                                        onChange={(e) => {
                                            setNewPassword(e.target.value)
                                        }}
                                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                        className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>


    );
}
