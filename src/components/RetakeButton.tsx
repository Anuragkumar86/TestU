"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosRepeat } from "react-icons/io";
import axios, { AxiosError } from 'axios';

interface RetakeButtonProps {
    quizId: string;
    topicNameSlug: string;
    quizTitle: string;
}

export default function RetakeButton({ quizId, topicNameSlug, quizTitle }: RetakeButtonProps) {
    const [isRetaking, setIsRetaking] = useState(false);
    const router = useRouter();

    const handleRetake = async () => {
        setIsRetaking(true);
        try {
            const response = await axios.post('/api/quiz/retake', {
                quizId,
                cost: 50
            });

            if (response.status === 200) {
                // Coins were successfully deducted. Redirect to the quiz page.
                router.push(`/quizzes/${topicNameSlug}/${quizTitle.replaceAll(" ", "-")}`);
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Failed to create quiz.";
                alert(errorMessage || "Not enough coins to retake this quiz. Please attend other new quiz to earn coins"); 
            }
           else {
                alert("An unexpected error occurred.");
            }
        } finally {
            setIsRetaking(false);
        }
    };

    return (
        <button
            onClick={handleRetake}
            disabled={isRetaking}
            className="inline-block w-full md:w-auto text-center bg-green-600 text-white font-semibold py-2 px-2 mx-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
            {isRetaking ? 'Processing...' : (
                <>
                    <IoIosRepeat className="inline-block mr-2" /> Retake 50🪙
                </>
            )}
        </button>
    );
}