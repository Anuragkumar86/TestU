import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;

  try {
    const quizAttempt = await prisma.quizAttempt.findUnique({
      where: { id: attemptId },
      include: {
        quiz: {
          select: {
            title: true,
            questions: true,
          },
        },
      },
    });

    if (!quizAttempt) {
      return NextResponse.json({ error: 'Quiz attempt not found.' }, { status: 404 });
    }

    return NextResponse.json(quizAttempt);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
