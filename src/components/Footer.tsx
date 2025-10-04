"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-16">
      <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Branding */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h2 className="text-2xl font-bold text-white">ThinkLix</h2>
          <p className="text-gray-400 text-sm md:text-base">
            Empowering learners with engaging quizzes and insightful analytics.
          </p>
        </div>

        {/* Links in a single row */}
        <div className="flex flex-wrap gap-4 text-sm md:text-base">
          <a href="/" className="hover:text-indigo-400 transition">Home</a>
          <a href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</a>
          <a href="/fields" className="hover:text-indigo-400 transition">Fields</a>
          <a href="/quizzes" className="hover:text-indigo-400 transition">Quizzes</a>
          <a href="/about" className="hover:text-indigo-400 transition">About Us</a>
          <a href="/contact" className="hover:text-indigo-400 transition">Contact</a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} ThinkLix. All rights reserved.
      </div>
    </footer>
  );
}
