"use client";

import { useRouter } from "next/navigation";
import { startQuizFlow } from "@/lib/quizUtils";

interface StartQuizButtonProps {
  topicSlug: string;
  quizSlug: string;
  className?: string;
}

export default function StartQuizButton({ topicSlug, quizSlug, className }: StartQuizButtonProps) {
  const router = useRouter();

  const handleStart = () => {
    startQuizFlow(router, topicSlug, quizSlug);
  };

  return (
    <button onClick={handleStart} className={className}>
      Start Quiz
    </button>
  );
}
