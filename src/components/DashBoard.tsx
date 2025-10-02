"use client"

import RetakeButton from "@/components/RetakeButton";
import DashboardSkeleton from "@/components/skeleton/DashBoardSkeleton";
import axiosInstance from "@/lib/axiosInstance";
import { Question, Quiz, QuizAttempt, Topic } from "@prisma/client";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Interfaces remain the same
interface quizProps extends Quiz {
    questions: Question[],
    topic: Topic
}
interface quizAttemptsProps extends QuizAttempt {
    quiz: quizProps
}

export default function DashBoardPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1");

    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [overallPassedCount, setOverallPassedCount] = useState<number | null>(null);
    const [overallAvgPercentage, setOverallAvgPercentage] = useState<number | null>(null);
    const [attempts, setUserAttempts] = useState<quizAttemptsProps[] | null>(null);
    const [allAttemptsForRetake, setAllAttemptsForRetake] = useState<quizAttemptsProps[] | null>(null);


    const [error, setError] = useState("");
    const { data: session, status } = useSession();

    useEffect(() => {
        const getAllQuizAttempts = async () => {
            try {
                const response = await axiosInstance.get(`/api/dashboard?page=${currentPage}`);

                // Set state variables with data from the API
                setUserAttempts(response.data.quizAttempts);
                setTotalCount(response.data.totalCount);
                setOverallPassedCount(response.data.quizzesPassedCount);
                setOverallAvgPercentage(response.data.averagePercentage);
                setAllAttemptsForRetake(response.data.allAttemptsForRetake);

            } catch (err: unknown) {
                if (isAxiosError(err)) {
                    setError(err.response?.data?.message || "Unable to get user all quiz Attempts");
                } else {
                    setError("Unable to get user all quiz Attempts");
                }
            }
        };
        if (status === "authenticated") {
            getAllQuizAttempts();
        }
    }, [session, currentPage]);

    if (!attempts || !totalCount || !overallPassedCount || !overallAvgPercentage) {
        return <DashboardSkeleton />; // import your skeleton manually
    }

    // Calculate total pages for pagination buttons
    const pageSize = 30;
    const totalPages = Math.ceil((totalCount) / pageSize);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`?page=${page}`);
        }
    };



    if (status === "unauthenticated") {
        return (
            <div className="text-center mt-10">
                <p className="text-red-500 font-semibold">You must be logged in to view this page.</p>
                <Link
                    href="/api/auth/signin"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Login
                </Link>
            </div>
        );
    }

    // The calculations below are no longer needed as the values are coming from the API
    // and were causing the incorrect display of data.
    // We are now using the state variables that are populated from the API call.

    // Calculate quizzes to retake (failed quizzes) from the full list
    const latestAttempts = new Map();
    if (allAttemptsForRetake) {

        allAttemptsForRetake.forEach(attempt => {
            if (!latestAttempts.has(attempt.quiz.id)) {
                latestAttempts.set(attempt.quiz.id, attempt);
            }
        });
    }

    const quizzesToRetake = Array.from(latestAttempts.values()).filter(latestAttempt => {
        const totalQuestions = latestAttempt.quiz.questions.length;
        return (latestAttempt.score / totalQuestions) * 100 < 60;
    });

    // console.log("RETAKE:", quizzesToRetake);
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Your Progress Dashboard 📈</h1>

            {/* Summary Stats - NOW USE OVERALL DATA FROM API */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Quizzes Attempted</h2>
                    <p className="text-4xl font-bold text-indigo-600 mt-2">{totalCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Quizzes Passed</h2>
                    <p className="text-4xl font-bold text-green-600 mt-2">{overallPassedCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-600">Average Score %</h2>
                    <p className="text-4xl font-bold text-orange-600 mt-2">{overallAvgPercentage && overallAvgPercentage.toFixed(2)}%</p>
                </div>
            </div>

            {/* Recent Attempts Table */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Recent Attempts</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attempts && attempts.map((attempt) => {
                                const totalQuestions = attempt.quiz.questions.length;
                                const isPassed = (attempt.score / totalQuestions) * 100 >= 60;
                                return (
                                    <tr key={attempt.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{attempt.quiz.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{attempt.quiz.topic.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{attempt.score}/{totalQuestions}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {isPassed ? 'Passed' : 'Failed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{(
                                            new Date(attempt.createdAt).toLocaleString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })
                                        )}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {totalCount === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p>You have not attempted any quizzes yet. Start a quiz to see your progress!</p>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-4 space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-lg font-semibold ${currentPage === index + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Quizzes to Retake Section */}
            {quizzesToRetake.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quizzes to Retake 🎯</h2>
                    <p className="text-gray-600 mb-4">Here are some quizzes you might want to try again to improve your score.</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quizzesToRetake.map((attempt) => (
                            <div key={attempt.id} className="bg-gray-200 p-4 rounded-lg border border-gray-400 hover:shadow-lg transition-shadow hover:scale-102">
                                {/* <a href={`/quizzes/${attempt.quiz.topic.name.replaceAll(" ", "-")}/${attempt.quiz.title.replaceAll(" ", "-")}`} className="block"> */}
                                <h3 className="font-bold text-lg text-indigo-700">{attempt.quiz.title}</h3>
                                <p className="text-sm text-gray-500">Topic: {attempt.quiz.topic.name}</p>
                                <p className="text-sm text-red-500">Last Score: {attempt.score}/{attempt.quiz.questions.length}</p>

                                <p className="text-sm text-yellow-800">Last Taken: {(new Date(attempt.createdAt).toLocaleString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                }))}</p>

                                <div className="flex float-end mt-2">
                                    <RetakeButton quizId={attempt.quiz.id} topicNameSlug={attempt.quiz.topic.name} quizTitle={attempt.quiz.title} />
                                </div>
                                {/* </a> */}
                            </div>

                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}