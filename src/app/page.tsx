"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function LandingPage() {

  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ECF0FF] via-[#F3FADF] to-[#F0FFF0] flex flex-col">
      {/* Hero Section with Animation */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center py-20 px-4 md:px-8 bg-gradient-to-r from-[#72E1D1] via-[#A9A1FF] to-[#B8FFD8] "
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#2590FF] via-[#7B51FF] to-[#22C37B] text-transparent bg-clip-text animate-fade-in mb-5"
        >
          T estU – Unleash Your Curiosity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-gray-700 text-lg md:text-2xl font-medium mb-8"
        >
          Thousands of expertly designed quizzes. Every subject, every field.<br />
          Compete, learn, and master MCQs in science, tech, humanities, and more.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.07, boxShadow: "0px 4px 24px #22c37b44" }}
          whileTap={{ scale: 0.98 }}
          href="/fields"
          className="inline-block mt-1 md:mt-4 px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#22C37B] via-[#2590FF] to-[#7B51FF] text-white shadow-xl transition-all"
        >
          Start Your First Quiz
        </motion.a>
        <div className="mt-8 flex flex-wrap gap-6 justify-center">
          {[{
            count: "1000+",
            text: "MCQ Questions",
            color: "#7B51FF"
          }, {
            count: "10+",
            text: "Topics & Subjects",
            color: "#2590FF"
          }, {
            count: "Leaderboard",
            text: "Solve - Gain Score & Rank Up",
            color: "#22C37B"
          }].map((s, i) => (
            <motion.div
              key={s.text}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.13, duration: 0.6 }}
              className="py-3 px-7 rounded-xl bg-white/80 shadow flex flex-col items-center min-w-[124px]"
            >
              <span className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</span>
              <span className="text-xs md:text-sm text-gray-600">{s.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Animated Features Section */}
      <section className="max-w-6xl mx-auto py-14 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-3 md:px-6">
        {[
          {
            title: "Endless Variety",
            desc: "Find quizzes on every possible field. From core academics to cutting-edge technology and fun trivia, new questions are added daily.",
            ring: "from-[#7B51FF] to-[#22C37B]"
          },
          {
            title: "Instant Feedback & Solutions",
            desc: "See your score, view detailed answers, and learn immediately—grow your knowledge with every quiz you take.",
            ring: "from-[#22C37B] to-[#2590FF]"
          },
          {
            title: "Gamified Progression",
            desc: "Earn coins for every quiz, climb the leaderboard, unlock badges, and track your total score as you progress.",
            ring: "from-[#2590FF] to-[#7B51FF]"
          }
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.7 }}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl transition-all"
          >
            <div className={`h-16 w-16 mb-3 rounded-full bg-gradient-to-br ${f.ring} flex items-center justify-center text-white font-extrabold text-lg shadow-md`}>
              {i + 1}
            </div>
            <h3 className={`text-lg font-semibold mb-2`}>{f.title}</h3>
            <p className="text-gray-600 text-center text-base">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Stepper Animation Section */}
      <section className="bg-white py-14 md:py-18 px-6 border-t border-gray-200">
        <motion.h2
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#2590FF] via-[#7B51FF] to-[#22C37B] text-transparent bg-clip-text text-center mb-10"
        >
          How TestU Works
        </motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {[
            "Sign up instantly",
            "Search any topic",
            "Answer timed MCQs",
            "Earn coins & rise"
          ].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.6 + i * 0.06 }}
            >
              <div className="mb-3 h-10 w-10 mx-auto rounded-full bg-gradient-to-r from-[#7B51FF] to-[#22C37B] flex items-center justify-center text-white font-extrabold">
                {i + 1}
              </div>
              <p className="text-gray-700 font-semibold text-sm md:text-base">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center py-14 md:py-20 bg-gradient-to-r from-[#A9A1FF] via-[#72E1D1] to-[#22C37B] px-3"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">Ready to Challenge Yourself?</h2>

        {session && session.user && session.user.email ? (
          <motion.a
            whileHover={{ scale: 1.09, backgroundColor: "#7B51FF", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            href="/fields"
            className="mt-4 px-8 py-3 rounded-full font-bold text-lg bg-white text-[#22C37B] shadow-xl transition-all"
          >
            Explore All Quiz
          </motion.a>
        ) : (
          <motion.a
            whileHover={{ scale: 1.09, backgroundColor: "#7B51FF", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            href="/auth/register"
            className="mt-4 px-8 py-3 rounded-full font-bold text-lg bg-white text-[#22C37B] shadow-xl transition-all"
          >
            Join TestU Now
          </motion.a>
        )}

        <p className="mt-2 text-white/90 text-base md:text-lg font-medium">
          Compete with others, unlock achievements, and become a quiz master!
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center text-gray-200 text-sm border-t border-gray-200 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-2">
          <span>© {new Date().getFullYear()} TestU.</span>
          <span className="hidden sm:inline">All quizzes. All topics. All for you.</span>
        </div>
      </footer>

    </main>
  );
}
