
import { Quiz, Question } from '@prisma/client';
import QuizClientComponent from "@/components/QuizClientComponent";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface QuizWithQuestions extends Quiz {
  questions: Question[];
}

async function getQuizData(topicSlug: string, quizSlug: string): Promise<QuizWithQuestions | null> {

  const quiz = await prisma.quiz.findFirst({
    where: {
      topic: {
        name: {
          equals: topicSlug.replaceAll("-", " "),
          mode: "insensitive"
        }
      },
      title: {
        equals: quizSlug.replaceAll("-", " "),
        mode: "insensitive"
      }

    },
    include: {
      questions: {
        select: {
          id: true,
          text: true,
          options: true
        }
      }
    }
  }) as QuizWithQuestions | null
  return quiz
}


export default async function QuizPage({params}: {params: Promise<{ topicSlug: string , quizSlug: string}>}) {

  const { topicSlug, quizSlug } = await params

  console.log("TOPIC SLUG:", topicSlug);
  console.log("QUIZ SLUG:", quizSlug);

  const quiz = await getQuizData(topicSlug, quizSlug)

  if (!quiz) {
    notFound();
  }

  return <div>
    <QuizClientComponent quiz={quiz} />
  </div>
}

