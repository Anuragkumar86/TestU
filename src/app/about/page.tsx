"use client";

import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-indigo-900 text-white font-sans">
      
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-400 to-green-400 drop-shadow-lg">
          About Thinklix
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
          Thinklix is your ultimate platform to master every quiz. Whether you are into science, technology, or humanities, we empower learners with thousands of MCQs, interactive quizzes, and real-time leaderboards.
        </p>
        <button className="mt-8 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-black shadow-lg hover:scale-105 transition transform">
          Start Your First Quiz
        </button>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12 bg-gray-900 bg-opacity-60">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg">
            At Thinklix, our mission is to make learning fun, competitive, and rewarding. We aim to provide learners with structured quizzes, instant feedback, and a platform to track progress and compete globally.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-pink-400 mb-4">Our Vision</h2>
          <p className="text-gray-300 text-lg">
            We envision a world where students can challenge themselves daily, improve continuously, and reach the top of leaderboards while enjoying the process of learning.
          </p>
        </div>
      </section>

      {/* Features / Highlights */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-white">Why Choose Thinklix?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition transform">
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">1000+ MCQs</h3>
            <p className="text-gray-300">
              Explore thousands of multiple-choice questions across various subjects and levels.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition transform">
            <h3 className="text-2xl font-bold text-green-400 mb-4">10+ Subjects</h3>
            <p className="text-gray-300">
              Dive deep into subjects from Science, Technology, Humanities, and more.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:scale-105 transition transform">
            <h3 className="text-2xl font-bold text-pink-400 mb-4">Leaderboards</h3>
            <p className="text-gray-300">
              Compete with learners globally and track your progress on our real-time leaderboard.
            </p>
          </div>
        </div>
      </section>

      {/* Team / About Me */}
      <section className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12 bg-gray-900 bg-opacity-60">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">Meet the Creator</h2>
          <p className="text-gray-300 text-lg mb-4">
            Thinklix was created to inspire learners to challenge themselves and grow through interactive quizzes. Our goal is to make knowledge acquisition engaging and fun for everyone.
          </p>
          <p className="text-gray-400 text-md">
            With a passion for education and technology, we focus on building tools that are accessible, intuitive, and rewarding.
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-64 h-64 relative rounded-full overflow-hidden shadow-2xl border-4 border-cyan-400">
            <Image
              src="/profile.jpg" // Replace with your actual image
              alt="Creator"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-20 text-center bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-500 rounded-3xl mx-6 md:mx-20 mt-12 shadow-2xl">
        <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Challenge Yourself?</h2>
        <p className="text-gray-200 mb-8 text-lg">
          Join thousands of learners mastering quizzes and climbing the leaderboard.
        </p>
        <button className="px-10 py-4 bg-white text-black font-bold rounded-full shadow-lg hover:scale-105 transition transform">
          Start Your First Quiz
        </button>
      </section>

        <Footer/>
    </div>
  );
}
