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
                setUserAttempts(response.data.quizAttempts);
                setTotalCount(response.data.totalCount);
                setOverallPassedCount(response.data.quizzesPassedCount);
                setOverallAvgPercentage(response.data.averagePercentage);
                setAllAttemptsForRetake(response.data.allAttemptsForRetake);
            } catch (err: unknown) {
                if (isAxiosError(err)) {
                    setError(err.response?.data?.message || "Unable to get user quiz attempts");
                } else {
                    setError("Unable to get user quiz attempts");
                }
            }
        };
        if (status === "authenticated") getAllQuizAttempts();
    }, [session, currentPage]);


    if (status === "loading") {
        return <DashboardSkeleton />;
    }

    
    const pageSize = 30;
    const totalPages = Math.ceil(totalCount ?? 0 / pageSize);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) router.push(`?page=${page}`);
    };

    if (status === "unauthenticated") {
        return (
            <div className="text-center mt-10 text-white">
                <p className="text-red-400 font-semibold">You must be logged in to view this page.</p>
                <Link
                    href="/api/auth/signin"
                    className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    Login
                </Link>
            </div>
        );
    }

    const latestAttempts = new Map();
    if (allAttemptsForRetake) {
        allAttemptsForRetake.forEach(attempt => {
            if (!latestAttempts.has(attempt.quiz.id)) latestAttempts.set(attempt.quiz.id, attempt);
        });
    }
    const quizzesToRetake = Array.from(latestAttempts.values()).filter(latestAttempt => {
        const totalQuestions = latestAttempt.quiz.questions.length;
        return (latestAttempt.score / totalQuestions) * 100 < 50;
    });

    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8 bg-gray-900 min-h-screen text-white">
            <h1 className="text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 drop-shadow-lg">
                Your Progress Dashboard 📈
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl transform hover:scale-105 transition duration-300">
                    <h2 className="text-xl font-semibold text-gray-300">Quizzes Attempted</h2>
                    <p className="text-4xl font-bold text-indigo-400 mt-2">{totalCount}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl transform hover:scale-105 transition duration-300">
                    <h2 className="text-xl font-semibold text-gray-300">Quizzes Passed</h2>
                    <p className="text-4xl font-bold text-green-400 mt-2">{overallPassedCount}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl transform hover:scale-105 transition duration-300">
                    <h2 className="text-xl font-semibold text-gray-300">Average Score %</h2>
                    <p className="text-4xl font-bold text-yellow-400 mt-2">{overallAvgPercentage && overallAvgPercentage.toFixed(2)}%</p>
                </div>
            </div>

            {/* Recent Attempts Table */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Recent Attempts</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quiz</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Topic</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {attempts && attempts.map((attempt) => {
                                const totalQuestions = attempt.quiz.questions.length;
                                const isPassed = (attempt.score / totalQuestions) * 100 >= 60;
                                return (
                                    <tr key={attempt.id} className="hover:bg-gray-700 transition">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{attempt.quiz.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{attempt.quiz.topic.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{attempt.score}/{totalQuestions}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isPassed ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'}`}>
                                                {isPassed ? 'Passed' : 'Failed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{new Date(attempt.createdAt).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg disabled:opacity-50">Previous</button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button key={index + 1} onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-lg font-semibold ${currentPage === index + 1 ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"}`}>
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg disabled:opacity-50">Next</button>
                    </div>
                )}
            </div>

            {/* Quizzes to Retake */}
            {quizzesToRetake.length > 0 && (
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-semibold text-white mb-4">Quizzes to Retake 🎯</h2>
                    <p className="text-gray-300 mb-4">Here are some quizzes you might want to try again to improve your score.</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzesToRetake.map((attempt) => (
                            <div key={attempt.id} className="bg-gray-900 p-4 rounded-xl border border-gray-700 shadow hover:shadow-2xl transform hover:scale-105 transition">
                                <h3 className="font-bold text-lg text-indigo-400">{attempt.quiz.title}</h3>
                                <p className="text-sm text-gray-400">Topic: {attempt.quiz.topic.name}</p>
                                <p className="text-sm text-red-400">Last Score: {attempt.score}/{attempt.quiz.questions.length}</p>
                                <p className="text-sm text-yellow-400">Last Taken: {new Date(attempt.createdAt).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</p>
                                <div className="mt-2 flex justify-end">
                                    <RetakeButton quizId={attempt.quiz.id} topicNameSlug={attempt.quiz.topic.name} quizTitle={attempt.quiz.title} 
                                    />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
