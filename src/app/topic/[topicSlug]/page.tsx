import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Question, Quiz, QuizAttempt, Topic } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from 'next/navigation';

import { AllSubTopics } from "@/components/AllSubTopic";

interface QuizzesWithAttempts extends Quiz {
    questions: Question[],
    quizAttempts: QuizAttempt[]
}

interface TopicWithQuizzes extends Topic {
    quizzes: QuizzesWithAttempts[]
}

async function getQuizzesFromTopic(topicSlug: string, userId: string | null): Promise<TopicWithQuizzes | null> {
    const topic = await prisma.topic.findFirst({
        where: {
            name: {
                equals: topicSlug.replaceAll("-", " "),
                mode: "insensitive"
            }
        },
        include: {
            quizzes: {
                include: {
                    questions: true,
                    ...(userId && {
                        quizAttempts: {
                            where: { userId },
                            orderBy: { createdAt: "desc" },
                            take: 1,
                        },
                    }),
                },
            },
        },
    });
    return topic;
}

export default async function TopicQuizzesPage({ params }: { params: Promise<{ topicSlug: string }> }) {
    const { topicSlug } = await params;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id as string | null;
    const topic = await getQuizzesFromTopic(topicSlug, userId);

    if (!topic) {
        notFound();
    }

    

    return (
        <div>
            <AllSubTopics topic={topic}/>
        </div>
    );
}
