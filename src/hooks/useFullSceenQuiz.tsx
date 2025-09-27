"use client";

import { useEffect, useState } from "react";

export function useFullscreenQuiz(
  quizSubmitted: boolean,
  onForceSubmit: () => void
) {
  const [fullscreenExited, setFullscreenExited] = useState(false);
  const [violationCount, setViolationCount] = useState(0);

  useEffect(() => {
    // ✅ Force fullscreen on mount
    const enterFullscreen = async () => {
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (err) {
          console.warn("Failed to enter fullscreen:", err);
        }
      }
    };
    enterFullscreen();

    // ✅ Detect fullscreen exit
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      if (!isFullscreen && !quizSubmitted) {
        setFullscreenExited(true);
        setViolationCount((count) => count + 1);
      } else {
        setFullscreenExited(false);
      }
    };

    // ✅ Detect tab switching / window blur
    const handleVisibilityChange = () => {
      if (document.hidden && !quizSubmitted) {
        setViolationCount((count) => count + 1);
      }
    };

    // ✅ Detect back/forward navigation
    const handlePopState = () => {
      if (!quizSubmitted) {
        onForceSubmit();
      }
    };

    // ✅ Detect page refresh / close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!quizSubmitted) {
        onForceSubmit();
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? Your progress will be lost.";
      }
    };

    // Attach listeners
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [quizSubmitted, onForceSubmit]);

  // ✅ Auto-submit after 3 violations
  useEffect(() => {
    if (violationCount >= 4 && !quizSubmitted) {
      onForceSubmit();
    }
  }, [violationCount, quizSubmitted, onForceSubmit]);

  return { fullscreenExited, setFullscreenExited, violationCount };
}
