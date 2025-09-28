export const dynamic = 'force-dynamic';


import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json({
            message: "All field required",

        },
            { status: 400 }
        )
    }

    try {


        const existingUser = await prisma.user.findUnique({ where: { email: email } })

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exist" },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword

            }
        })

        return NextResponse.json(
            {
                message: "User Created Successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            },
            { status: 200 },
        )
    }
    catch (err) {
        return NextResponse.json(
            { message: "Error while Registering" , err },
            { status: 501 }
        )
    }
}

