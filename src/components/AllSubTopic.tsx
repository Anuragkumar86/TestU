"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import RetakeButton from "@/components/RetakeButton";
import { useSession } from "next-auth/react";
import { Question, Quiz, QuizAttempt, Topic } from "@prisma/client";
import AllSubTopicsSkeleton from "./skeleton/AllSubTopicsSkeleton";

interface QuizzesWithAttempts extends Quiz {
  questions: Question[];
  quizAttempts: QuizAttempt[];
}

interface TopicWithQuizzes extends Topic {
  quizzes: QuizzesWithAttempts[];
}

interface TopicQuizzes2 {
  topic: TopicWithQuizzes;
}

export function AllSubTopics({ topic }: TopicQuizzes2) {
  const [searchSubTopic, setSearchSubTopic] = useState("");
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const topicNameSlug = topic.name.replaceAll(" ", "-");
  const [showDirections, setShowDirections] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizzesWithAttempts | null>(null);

  const filteredTopic = useMemo(() => {
    if (!searchSubTopic) return topic;

    const lower = searchSubTopic.toLowerCase();
    return {
      ...topic,
      quizzes: topic.quizzes.filter((quiz) => quiz.title.toLowerCase().includes(lower)),
    };
  }, [searchSubTopic, topic]);

  if (status === "loading") {
    return <div><AllSubTopicsSkeleton /></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-indigo-900 py-16 px-6 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-[0_4px_6px_rgba(0,255,255,0.7)]">
            {topic.name} Quizzes
          </h1>
          <p className="mt-4 text-xl text-cyan-300 max-w-2xl mx-auto">
            Choose a quiz to challenge yourself and test your knowledge.
          </p>
        </header>

        {/* Search Box centered */}
        <section className="mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchSubTopic}
            onChange={(e) => setSearchSubTopic(e.target.value)}
            className="w-full max-w-md p-4 rounded-xl bg-gray-800 bg-opacity-40 border border-cyan-600 placeholder-cyan-400 text-white shadow-lg transition duration-300 ease-in-out focus:ring-4 focus:ring-cyan-500 focus:outline-none focus:scale-105"
          />
        </section>

        {/* Content */}
        {filteredTopic.quizzes.length === 0 ? (
          <div className="text-center p-20 bg-gradient-to-r from-gray-800 via-gray-900 to-indigo-900 rounded-3xl shadow-xl max-w-lg mx-auto border border-cyan-700">
            <h2 className="text-4xl font-semibold text-cyan-400 mb-4">
              No Quizzes Found
            </h2>
            <p className="text-lg text-cyan-300">
              There are no quizzes available for this topic yet.
            </p>
          </div>
        ) : (
          <>
            {/* Table for desktop (hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto w-full rounded-3xl shadow-2xl border border-cyan-700 bg-black bg-opacity-50 backdrop-blur-lg">
              <table className="w-full min-w-full divide-y divide-cyan-800">
                <thead className="bg-black bg-opacity-70 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Test Name
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Last Score
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-700">
                  {filteredTopic.quizzes.map((quiz) => {
                    const lastAttempt = userId && quiz.quizAttempts.length > 0 ? quiz.quizAttempts[0] : null;
                    const hasTakenQuiz = !!lastAttempt;
                    const totalQuestions = quiz.questions.length;
                    const passThreshold = totalQuestions * 0.6;
                    const hasPassed = lastAttempt
                      ? lastAttempt.score >= passThreshold
                      : false;

                    return (
                      <tr key={quiz.id} className="hover:bg-cyan-900 transition cursor-default bg-gray-900 bg-opacity-50">
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-cyan-300">
                          {quiz.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-cyan-300 text-sm">
                          {hasTakenQuiz ? (
                            <>
                              <p
                                className={
                                  lastAttempt.score > totalQuestions / 2
                                    ? "text-green-400 font-bold"
                                    : "text-red-500 font-bold"
                                }
                              >
                                {lastAttempt.score} / {totalQuestions}
                              </p>
                              <p className="text-yellow-300 text-xs mt-1">
                                {new Date(lastAttempt.createdAt).toLocaleString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </p>
                            </>
                          ) : (
                            <em>Not Taken Yet</em>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {hasTakenQuiz ? (
                            <span
                              className={`inline-block px-4 py-1 rounded-lg font-semibold text-md ${hasPassed
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                                } shadow-lg`}
                            >
                              {hasPassed ? "Pass" : "Fail"}
                            </span>
                          ) : (
                            <span className="text-cyan-400 italic">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center flex gap-3 justify-center flex-wrap lg:ml-14">
                          {!userId ? (
                            <Link
                              href="/api/auth/signin"
                              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg py-2 px-6 shadow-md transition hover:scale-105"
                            >
                              Log in to Start
                            </Link>
                          ) : !hasTakenQuiz ? (
                            <button
                              onClick={() => {
                                setCurrentQuiz(quiz);
                                setShowDirections(true);
                              }}
                              className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg py-2 px-6 shadow-md transition hover:scale-105"
                            >
                              Start Quiz
                            </button>
                          ) : (
                            <>
                              <RetakeButton
                                quizId={quiz.id}
                                topicNameSlug={topicNameSlug}
                                quizTitle={quiz.title}
                                onRetake={() => {
                                  setCurrentQuiz(quiz);
                                  setShowDirections(true);
                                }}
                              />

                              <Link
                                href={`/results/${lastAttempt.id}`}
                                className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-4 font-semibold shadow-md transition hover:scale-105"
                              >
                                Result & Explanation
                              </Link>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Card stack for mobile view */}
            <div className="flex flex-col gap-6 md:hidden">
              {filteredTopic.quizzes.map((quiz, idx) => {
                const lastAttempt =
                  userId && quiz.quizAttempts.length > 0 ? quiz.quizAttempts[0] : null;
                const hasTakenQuiz = !!lastAttempt;
                const totalQuestions = quiz.questions.length;
                const passThreshold = totalQuestions * 0.6;
                const hasPassed = lastAttempt
                  ? lastAttempt.score >= passThreshold
                  : false;

                // Alternate backgrounds with glassmorphism style
                const cardBg =
                  idx % 2 === 0
                    ? "bg-black bg-opacity-60 backdrop-blur-lg"
                    : "bg-gray-900 bg-opacity-60 backdrop-blur-lg";

                return (
                  <div
                    key={quiz.id}
                    className={`rounded-3xl shadow-xl border border-cyan-700 p-6 ${cardBg} transition hover:scale-105 duration-300`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="font-bold text-xl text-yellow-400">
                        {quiz.title}
                      </div>
                      <div>
                        <span className="text-cyan-300">
                          Score:{" "}
                          {hasTakenQuiz ? (
                            <span
                              className={
                                lastAttempt.score > totalQuestions / 2
                                  ? "text-green-400 font-bold"
                                  : "text-red-500 font-bold"
                              }
                            >
                              {lastAttempt.score} / {totalQuestions}
                            </span>
                          ) : (
                            <em>Not Taken Yet</em>
                          )}
                        </span>
                        {hasTakenQuiz && (
                          <div className="text-xs text-yellow-400 mt-1">
                            {new Date(lastAttempt.createdAt).toLocaleString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </div>
                        )}
                      </div>
                      <div>
                        {hasTakenQuiz ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-md font-semibold ${hasPassed
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                              } shadow-lg`}
                          >
                            {hasPassed ? "Pass" : "Fail"}
                          </span>
                        ) : (
                          <span className="text-cyan-400 italic">N/A</span>
                        )}
                      </div>
                      <div className="flex gap-3 mt-2">
                        {!userId ? (
                          <Link
                            href="/api/auth/signin"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg py-2 px-4 font-semibold shadow-md transition hover:scale-105"
                          >
                            Log in to Start
                          </Link>
                        ) : !hasTakenQuiz ? (
                          <button
                            onClick={() => {
                              setCurrentQuiz(quiz);
                              setShowDirections(true);
                            }}
                            className="bg-green-600 hover:bg-green-500 text-white rounded-lg py-2 px-4 font-semibold shadow-md transition hover:scale-105"
                          >
                            Start Quiz
                          </button>
                        ) : (
                          <>
                            <RetakeButton
                              quizId={quiz.id}
                              topicNameSlug={topicNameSlug}
                              quizTitle={quiz.title}
                              onRetake={() => {
                                setCurrentQuiz(quiz);
                                setShowDirections(true);
                              }}
                            />

                            <Link
                              href={`/results/${lastAttempt.id}`}
                              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2 px-3 font-semibold shadow-md transition hover:scale-105"
                            >
                              Result & Explanation
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {showDirections && currentQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="bg-gray-900 p-10 rounded-3xl shadow-2xl max-w-lg w-full text-cyan-400">
            <h2 className="text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              {currentQuiz.title} - Directions
            </h2>
            <ul className="list-disc list-inside space-y-3 mb-8 text-lg">
              <li>Total Questions: {currentQuiz.questions.length}</li>
              <li>Time Limit: {Math.floor(currentQuiz.timeLimit / 60)} minutes</li>
              <li>
                <span className="text-green-400 font-semibold">Note: </span> For each correct answer +10 coins and for each wrong answer -5 coins
              </li>
              <li>
                <span className="font-semibold text-red-500">Auto-submit</span> if tab switched more than 3 times
              </li>
              <li>
                <span className="font-semibold text-red-500">Auto-submit</span> if fullscreen exited more than 3 times
              </li>
            </ul>
            <p className="mb-6">Please read carefully. Follow the instructions to avoid automatic submission.</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDirections(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition hover:scale-105"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  window.location.href = `/quizzes/${topicNameSlug}/${currentQuiz.title.replaceAll(" ", "-")}`;
                }}
                className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition hover:scale-105"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
