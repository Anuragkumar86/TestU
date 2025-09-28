
export const dynamic = 'force-dynamic';

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(){

    const session  = await getServerSession(authOptions)

     if (!session || !session.user || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized. Must be an administrator." },
                { status: 403 }
            );
        }

    try{
        const users = await prisma.user.findMany({
        })

        return NextResponse.json(
            {mesage: "All user Fetched Successfully",
             users: users
            },
            {status: 200}
        )
    }
    catch(err){
        return NextResponse.json(
            {mesage: "Unable to find Users",
                error: err
            },
            {status: 501}
        )
    }
}