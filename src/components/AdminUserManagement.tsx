"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



// A single, well-named interface for user data
interface User {
    id: string;
    name: string;
    email: string;
    coins: number;
    totalScore: number;
    role: string;
}

export default function AdminUserManagement() {

    // Get the session data and the update function
    const { data: session, status, update } = useSession();
    const [error, setError] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            // Check for authentication and authorization status
            if (status !== 'authenticated' || session?.user?.role !== "ADMIN") {
                // If not authenticated or not an admin, set an error message and exit
                setError("Unauthorized access. This page is for administrators only.");
                return;
            }

            try {
                // Make the API call to fetch users
                const response = await axios.get("/api/admin/maintain-user");
                setUsers(response.data.users);
                setError(""); // Clear any previous errors
            } catch (err) {
                setError("Unable to fetch Users. Please check the API.");
            }
        };

        // Call the function only when the session status is 'authenticated'
        if (status === 'authenticated') {
            getUsers();
        }
    }, [session, status]); // The useEffect hook will re-run when the session or status changes

    const handleRoleChange = async (user: User) => {
        // We can get the new role directly from the current user object
        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

        try {
            // Call the new backend API to update the role in the database
            await axios.post("/api/admin/update-user-role", {
                userId: user.id,
                newRole: newRole,
            });

            // The key step: Tell NextAuth to re-fetch the session data from the server.
            await update();

            // Refetch the user list from the API to update the UI
            const response = await axios.get("/api/admin/maintain-user");
            setUsers(response.data.users);

            // Provide user feedback
            toast.success("User role updated successfully!");

        } catch (err) {
            setError("Unable to update user Role. Please try again.");
            toast.error("Failed to update user role.");
        }
    };

    if (error) {
        return <div className="bg-red-600 text-3xl text-white font-bold p-8 rounded-lg text-center mx-auto max-w-lg mt-12">
            {error}
        </div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">All Users</h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                                <td className="py-4 px-6 whitespace-nowrap">{user.name}</td>
                                <td className="py-4 px-6 whitespace-nowrap">{user.email}</td>
                                <td className="py-4 px-6 whitespace-nowrap">{user.role}</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <button
                                        onClick={() => handleRoleChange(user)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
                                    >
                                        Change Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
