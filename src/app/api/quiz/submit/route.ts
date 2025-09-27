import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface QuizSubmissionPayload {
  quizId: string;
  userAnswers: { [key: string]: string };
  timeTaken: number;
}

export async function POST(req: NextRequest) {

  try {

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: "Unauthorize" },
        { status: 401 }
      )
    }

    const { quizId, userAnswers, timeTaken }: QuizSubmissionPayload = await req.json();

    const userId = session.user.id;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          select: {
            id: true,
            correctAnswer: true
          }
        },
        topic: {
          select: {name: true}
        }
      }
    })

    if (!quiz) {
      return NextResponse.json(
        { message: "This Quiz does not exist" }
      )
    }

    // ------------------------------------------------------------------
    let Score = 0;
    const correctAnswerMap = new Map(quiz.questions.map(q => [q.id, q.correctAnswer]))

    for (const questionId in userAnswers) {
      if (correctAnswerMap.get(questionId) === userAnswers[questionId]) {
        Score++;
      }
    }

    // -------------------------------------------------------------------------

    const correctAnswerCount = Score;
    const totalQuestionCount = quiz.questions.length;

    let coinEarned = (correctAnswerCount * 10) - ((totalQuestionCount - correctAnswerCount) * 5)

    if (coinEarned < 0) {
      coinEarned = 0;
    }

    console.log("COINED EARNED: ", coinEarned)

    // -------------------------------------------------------------------------

    const result = await prisma.$transaction(async (tx) => {

      const newAttempt = await tx.quizAttempt.create({
        data: {
          score: Score,
          timeTaken: timeTaken,
          userAnswers: userAnswers,
          userId: userId,
          quizId
        }
      })

      await tx.user.update({
        where: { id: userId },
        data: {
          totalScore: { increment: Score },
          coins: { increment: coinEarned }
        }
      })

      return newAttempt
    })
    return NextResponse.json({ attemptId: result.id, Quiz: quiz }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to submit quiz', details: error }, { status: 500 });
  }
}
