"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("Check your email for password reset link!");
    } catch (err: unknown) {
      if(err instanceof AxiosError){
        toast.error(err.response?.data?.message || "Something went wrong", {duration: 7000, style:{background: "red", color: "white"}});
        
      }
      else{
        toast.error("Something went wrong");

      }
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
