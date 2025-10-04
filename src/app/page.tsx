
"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex flex-col text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center py-24 px-6 relative overflow-hidden"
      >
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-cyan-600/30 to-green-500/30 blur-3xl opacity-50" />

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 text-transparent bg-clip-text drop-shadow-lg relative z-10"
        >
          Thinklix – Master Every Quiz
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-gray-300 text-lg md:text-2xl font-medium mt-6 relative z-10"
        >
          Thousands of quizzes across science, tech, humanities, and more. <br />
          Learn, compete, and rise to the top.
        </motion.p>

        <motion.a
          whileHover={{ scale: 1.08, boxShadow: "0px 6px 24px rgba(0,255,180,0.4)" }}
          whileTap={{ scale: 0.96 }}
          href="/fields"
          className="mt-8 px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-green-500 via-cyan-500 to-purple-500 text-white shadow-2xl transition-all relative z-10"
        >
          Start Your First Quiz
        </motion.a>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center relative z-10">
          {[
            { count: "1000+", text: "MCQs", color: "text-purple-400" },
            { count: "10+", text: "Subjects", color: "text-cyan-400" },
            { count: "Leaderboard", text: "Climb & Compete", color: "text-green-400" },
          ].map((s, i) => (
            <motion.div
              key={s.text}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
              className="py-4 px-8 rounded-2xl bg-gray-800/80 border border-gray-700 shadow-lg flex flex-col items-center"
            >
              <span className={`text-2xl font-extrabold ${s.color}`}>{s.count}</span>
              <span className="text-sm text-gray-400">{s.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "Endless Variety",
            desc: "From academics to trivia—quizzes updated daily.",
            ring: "from-purple-500 to-green-400",
          },
          {
            title: "Instant Feedback",
            desc: "See scores, explanations, and learn instantly.",
            ring: "from-green-400 to-cyan-500",
          },
          {
            title: "Gamified Progress",
            desc: "Earn coins, badges, and rise on the leaderboard.",
            ring: "from-cyan-500 to-purple-500",
          },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.7 }}
            className="bg-gradient-to-b from-gray-800/60 to-gray-900/90 border border-gray-700 rounded-2xl p-10 shadow-lg flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all"
          >
            <div
              className={`h-16 w-16 mb-4 rounded-full bg-gradient-to-br ${f.ring} flex items-center justify-center text-white font-extrabold text-lg shadow-md`}
            >
              {i + 1}
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-center">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Stepper Section */}
      <section className="bg-gray-900 py-20 px-6 border-t border-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 text-transparent bg-clip-text mb-14"
        >
          How It Works
        </motion.h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {["Sign up", "Pick topic", "Solve timed MCQs", "Earn & Rise"].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <div className="mb-4 h-12 w-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-green-400 flex items-center justify-center text-white font-bold">
                {i + 1}
              </div>
              <p className="text-gray-300 font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center py-24 bg-gradient-to-r from-purple-600 via-cyan-600 to-green-500 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
          Ready to Take the Challenge?
        </h2>

        {session && session.user && session.user.email ? (
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            href="/fields"
            className="px-10 py-4 rounded-full font-bold text-lg bg-white text-gray-900 shadow-lg transition-all"
          >
            Explore All Quizzes
          </motion.a>
        ) : (
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            href="/auth/register"
            className="px-10 py-4 rounded-full font-bold text-lg bg-white text-gray-900 shadow-lg transition-all"
          >
            Join Thinklix Now
          </motion.a>
        )}

        <p className="mt-4 text-gray-100/90 text-lg max-w-xl">
          Compete globally, unlock rewards, and become a quiz master.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800 text-center text-gray-500 text-sm">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-3">
          <span>© {new Date().getFullYear()} Thinklix</span>
          <span className="hidden sm:inline">All subjects. All quizzes. All for you.</span>
        </div>
      </footer>
    </main>
  );
}

