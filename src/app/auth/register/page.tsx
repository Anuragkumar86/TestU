"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/api/auth/register", form);
      const data = res.data;

      if (res.status !== 200) {
        setError(data.error || "Something went wrong");
        toast.error(data.error || "Something went wrong", { duration: 5000 });
        setLoading(false);
        return;
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError(data?.error || "Some error occurred");
      } else {
        toast.success("Register Success", { duration: 6000 });
        router.push("/");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Unexpected error");
        toast.error(err.response?.data?.message || "Unexpected error");
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50">
      <div className="flex w-full max-w-4xl h-[90%] shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left: Register Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-700">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Fill in the details to sign up
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-green-400 transition"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg transition focus:ring-2 focus:ring-green-300"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>

          <div className="mt-6 flex flex-col gap-3 items-center">
            <span className="text-gray-500 text-sm">OR</span>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl shadow border bg-white hover:bg-gray-100 transition w-full cursor-pointer"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </div>

          <p className="text-sm text-gray-700 text-center mt-6">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-semibold text-blue-500 underline"
            >
              Login
            </a>
          </p>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block w-1/2 bg-gray-50">
          <img
            src="/register_image.png"
            alt="Decorative"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
