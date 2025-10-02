"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import axiosInstance from "@/lib/axiosInstance";
import {
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import NavbarSkeleton from "./skeleton/NavarSkeleton";
import SearchBar from "./SearchBar";

interface UserDetail {
  id: string;
  name: string;
  email: string;
  coins: number;
  totalScore: number;
  image: string;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [error, setError] = useState("");

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const response = await axiosInstance.get("/api/user/me");
        setUserDetail(response.data.user);
      } catch (err) {
        console.error(err);
        setError("Unable to get user detail");
      }
    };
    if (status === "authenticated") {
      getUserDetail();
    }
  }, [status]);

  if (status === "loading") return <NavbarSkeleton />;
  if (error) return <div>ERROR: {error}</div>;

  return (
    <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* top row */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-3xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-yellow-400 bg-clip-text hover:scale-110 transition-transform"
          >
            <span className="text-indigo-600 drop-shadow">T</span>est
            <span className="text-yellow-500 drop-shadow">U</span>
          </Link>

          {/* Desktop center search */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="w-full max-w-lg">
              <SearchBar />
            </div>
          </div>

          {/* Desktop links & profile */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/fields"
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Fields
            </Link>
            <Link
              href="/quizzes"
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Quizzes
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Leaderboard
            </Link>

            {/* Coins */}
            {userDetail && (
              <div
                className="text-yellow-600 font-bold cursor-default"
                title="Your total coins"
              >
                🪙{userDetail.coins}
              </div>
            )}

            {/* Profile */}
            {status === "authenticated" && session?.user ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-400 flex items-center justify-center ring-2 ring-indigo-300 shadow-lg overflow-hidden group-hover:scale-105 transition-transform border-2 border-white">
                    {userDetail?.image ? (
                      <img
                        src={userDetail.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-white">
                        {userDetail?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    size={18}
                    className="text-gray-400 group-hover:text-indigo-600"
                  />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 z-40">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                      Signed in as
                      <br />
                      <span className="font-semibold text-gray-700">
                        {session.user.email}
                      </span>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors rounded-lg"
                    >
                      <User size={16} /> View Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors rounded-b-lg border-t mt-2 pt-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => signIn()}
                  className="px-4 py-2 text-indigo-600 border-2 border-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </button>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile button */}
          <div className="flex md:hidden items-center gap-3">
            {userDetail && (
              <span className="text-yellow-600 font-bold">🪙{userDetail.coins}</span>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-indigo-800"
            >
              {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="p-4 space-y-4">
              <div className="w-full">
                <SearchBar />
              </div>
              <Link
                href="/fields"
                className="block text-gray-700 font-medium hover:text-indigo-700"
              >
                Fields
              </Link>
              <Link
                href="/quizzes"
                className="block text-gray-700 font-medium hover:text-indigo-700"
              >
                Quizzes
              </Link>
              <Link
                href="/dashboard"
                className="block text-gray-700 font-medium hover:text-indigo-700"
              >
                Dashboard
              </Link>
              <Link
                href="/leaderboard"
                className="block text-gray-700 font-medium hover:text-indigo-700"
              >
                Leaderboard
              </Link>
              <Link
                href="/profile"
                className="block text-gray-700 font-medium hover:text-indigo-700"
              >
                Pofile
              </Link>
              {status === "authenticated" ? (
                <button
                  onClick={() => signOut()}
                  className="w-full px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 transition"
                >
                  <LogOut size={16} className="inline-block mr-1" /> Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => signIn()}
                    className="w-full px-5 py-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white font-semibold rounded-lg shadow-lg hover:bg-fuchsia-600"
                  >
                    Login
                  </button>
                  <Link
                    href="/auth/register"
                    className="block text-center w-full px-5 py-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white font-semibold rounded-lg shadow-lg hover:bg-fuchsia-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
