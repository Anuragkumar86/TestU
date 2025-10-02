export const dynamic = 'force-dynamic';


import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"


export async function GET() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json(
            { message: "Unauthorize, or Not legitimate user" },
            { status: 401 }
        )
    }

    try {
        const userId = session.user.id

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                coins: true,
                totalScore: true,
                createdAt: true,
                accounts: {
                    select:{
                        provider: true
                    }
                }
            },
           
        });


        return NextResponse.json(
            {
                message: "User data fetched succesfully",
                user: user
            },
            { status: 201 }
        )
    }
    catch (error) {

        return NextResponse.json(
            {
                message: "Unable to fetch user detail",
                error: error
            },
            { status: 501 }
        )
    }
}