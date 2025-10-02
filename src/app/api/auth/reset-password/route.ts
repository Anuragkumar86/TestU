import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"
export async function POST(req: NextRequest) {
    const { token, password } = await req.json();

    if (!token || !password) {
        return NextResponse.json(
            { message: "token or password missing" },
            { status: 400 }
        );
    }

    try {


        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                expireResetToken: { gte: new Date() }
            }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                expireResetToken: null
            }
        })

        return NextResponse.json(
            { message: "Password reset Successfull" },
            { status: 200 }
        );
        
    }
    catch{
        return NextResponse.json(
            { message: "Failed to reset password" },
            { status: 501 }
        );
    }
}