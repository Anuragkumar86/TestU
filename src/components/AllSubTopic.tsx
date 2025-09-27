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
  const [searchSubTopic, setSerachSubTopic] = useState("");
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const topicNameSlug = topic.name.replaceAll(" ", "-");

  const filteredTopic = useMemo(() => {
    if (!searchSubTopic) return topic;

    const lower = searchSubTopic.toLowerCase();

    // Return a new object, keeping topic details but only filtered quizzes
    return {
      ...topic,
      quizzes: topic.quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(lower)
      ),
    };
  }, [searchSubTopic, topic]);

  if (status === "loading") {
    return <div>
      <AllSubTopicsSkeleton />
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-fuchsia-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 py-16 px-0">
      <div className="w-full px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight drop-shadow-lg">
            {topic.name} Quizzes
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg max-w-xl mx-auto">
            Choose a quiz to test your knowledge.
          </p>
        </header>

        {/* Search Box centered */}
        <section className="mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchSubTopic}
            onChange={(e) => setSerachSubTopic(e.target.value)}
            className="w-full max-w-md p-3 rounded-xl border border-blue-300 dark:border-blue-700 shadow-lg placeholder-blue-400 dark:placeholder-blue-300 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 focus:outline-none transition duration-300 text-gray-900 dark:text-white"
          />
        </section>

        {/* Content */}
        {filteredTopic.quizzes.length === 0 ? (
          <div className="text-center p-16 bg-white dark:bg-blue-800 rounded-2xl shadow-lg max-w-lg mx-auto border border-blue-300 dark:border-blue-700">
            <h2 className="text-3xl font-semibold text-gray-700 dark:text-blue-300 mb-3">
              No Quizzes Found
            </h2>
            <p className="text-gray-500 dark:text-blue-400 text-lg">
              There are no quizzes available for this topic yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full rounded-2xl shadow-2xl border border-blue-300 dark:border-blue-700 bg-blue-900 dark:bg-gray-800">
            <table className="w-full min-w-full divide-y divide-blue-700 dark:divide-blue-600">
              <thead className="bg-blue-900 dark:bg-blue-900 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider shadow-sm">
                    Test Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-blue-100 uppercase tracking-wider shadow-sm">
                    Last Score
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-blue-100 uppercase tracking-wider shadow-sm">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-blue-100 uppercase tracking-wider shadow-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-800 dark:divide-blue-700">
                {filteredTopic.quizzes.map((quiz) => {
                  const lastAttempt =
                    userId && quiz.quizAttempts.length > 0
                      ? quiz.quizAttempts[0]
                      : null;
                  const hasTakenQuiz = !!lastAttempt;
                  const totalQuestions = quiz.questions.length;
                  const passThreshold = totalQuestions * 0.6;
                  const hasPassed = lastAttempt
                    ? lastAttempt.score >= passThreshold
                    : false;

                  return (
                    <tr
                      key={quiz.id}
                      className="hover:bg-gray-800 transition cursor-default bg-gray-900"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-100">
                        {quiz.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-blue-300 text-sm">
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
                            <p className="text-yellow-400 text-xs mt-1">
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
                              }`}
                          >
                            {hasPassed ? "Pass" : "Fail"}
                          </span>
                        ) : (
                          <span className="text-blue-300 italic">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center flex gap-3 justify-center flex-wrap lg:ml-14">
                        {!userId ? (
                          <Link
                            href="/api/auth/signin"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2 px-6 shadow-md transition"
                          >
                            Log in to Start
                          </Link>
                        ) : !hasTakenQuiz ? (
                          <Link
                            href={`/quizzes/${topicNameSlug}/${quiz.title.replaceAll(" ", "-"
                            )}`}
                            className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg py-2 px-6 shadow-md transition"
                          >
                            Start Quiz
                          </Link>
                        ) : (
                          <>
                            <RetakeButton
                              quizId={quiz.id}
                              topicNameSlug={topicNameSlug}
                              quizTitle={quiz.title}
                            />
                            <Link
                              href={`/results/${lastAttempt.id}`}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg py-2 px-4 shadow-md transition"
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
        )}
      </div>
    </div>
  );
}
