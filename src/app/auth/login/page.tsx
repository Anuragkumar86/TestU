"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      toast.success("Login successful!");
      router.push("/");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-green-100 to-green-50">
      <div className="flex w-full max-w-4xl h-[90%] shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-green-700">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="flex justify-end">
              <a
                href="/auth/forgot-password"
                className="text-green-600 text-sm font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg transition focus:ring-2 focus:ring-green-300"
            >
              {loading ? "Logging in..." : "Log in"}
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
              Log in with Google
            </button>
          </div>

          <p className="text-sm text-gray-700 text-center mt-6">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-blue-500 underline"
            >
              Register Now
            </a>
          </p>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block w-1/2 bg-gray-50">
          <img
            src="/login_page.png"
            alt="Decorative"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
