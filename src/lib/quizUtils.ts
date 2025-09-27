"use client";

import { enableQuizLock } from "@/lib/quizLock";
import { useRouter } from "next/navigation";

export async function startQuizFlow(
  router: ReturnType<typeof useRouter>, // Correct type for App Router
  topicSlug: string,
  quizSlug: string
): Promise<void> {
  try {
    // Enable quiz lock
    enableQuizLock();

    // Request fullscreen if available
    if (document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.warn("Fullscreen request failed:", err);
      }
    }

    // Redirect to quiz page
    router.push(`/quizzes/${topicSlug}/${quizSlug}`);
  } catch (err) {
    console.error("Failed to start quiz:", err);
  }
}
