
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Clean up any existing data to prevent duplicates
    await prisma.quizAttempt.deleteMany();
    await prisma.question.deleteMany();
    await prisma.quiz.deleteMany();
    await prisma.topic.deleteMany();

    // Create Topics and Quizzes with nested data for a few quizzes
    const topicsData = [
        {
            name: 'Science',
            quizzes: {
                create: [
                    {
                        title: 'General Science Knowledge',
                        description: 'A basic quiz to test your knowledge of general science.',
                        timeLimit: 120, // 2 minutes
                        questions: {
                            create: [
                                {
                                    text: 'What is the largest planet in our solar system?',
                                    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
                                    correctAnswer: 'Jupiter',
                                },
                                {
                                    text: 'What is the chemical symbol for water?',
                                    options: ['O2', 'H2O', 'CO2', 'NaCl'],
                                    correctAnswer: 'H2O',
                                },
                                {
                                    text: 'Which organelle is considered the powerhouse of the cell?',
                                    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
                                    correctAnswer: 'Mitochondria',
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            name: 'History',
            quizzes: {
                create: [
                    {
                        title: 'World War II Trivia',
                        description: 'Test your knowledge on key events and figures of WWII.',
                        timeLimit: 180, // 3 minutes
                        questions: {
                            create: [
                                {
                                    text: 'Which country invaded Poland in 1939, starting World War II?',
                                    options: ['France', 'United Kingdom', 'Germany', 'Italy'],
                                    correctAnswer: 'Germany',
                                },
                                {
                                    text: 'Who was the Prime Minister of the United Kingdom during most of the war?',
                                    options: ['Neville Chamberlain', 'Winston Churchill', 'Clement Attlee', 'Franklin D. Roosevelt'],
                                    correctAnswer: 'Winston Churchill',
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            name: 'Computer Science',
            quizzes: {
                create: [
                    {
                        title: 'Next.js Fundamentals',
                        description: 'A quiz covering the basics of the Next.js framework.',
                        timeLimit: 120, // 2 minutes
                        questions: {
                            create: [
                                {
                                    text: 'What is the main benefit of Next.js Server Components?',
                                    options: ['Faster client-side rendering', 'More SEO friendly', 'Simpler state management', 'Smaller bundle sizes'],
                                    correctAnswer: 'More SEO friendly',
                                },
                                {
                                    text: 'Which file in the App Router acts as the main layout for a route segment?',
                                    options: ['page.tsx', 'layout.tsx', 'route.ts', 'default.tsx'],
                                    correctAnswer: 'layout.tsx',
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ];

    for (const topic of topicsData) {
        await prisma.topic.create({
            data: topic,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
