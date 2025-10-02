import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json(
            { message: "Email must be provided" },
            { status: 400 }
        );
    }

    try {

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                accounts: {
                    select: {
                        provider: true
                    }
                }
            }
        }
        );

        if (user?.accounts[0] && user?.accounts[0].provider === "google") {
            return NextResponse.json({ message: "You signed up using Google. Please use Google login to sign in." },
                { status: 401 }
            );

        }

        if (user) {
            const token = crypto.randomBytes(32).toString("hex");
            const expiry = new Date(Date.now() + 3600 * 1000);

            await prisma.user.update({
                where: { id: user.id },
                data: { resetToken: token, expireResetToken: expiry }
            });

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false, // true for 465, false for 587
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });


            const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

            await transporter.sendMail({
                from: process.env.SMTP_FROM,
                to: email,
                subject: "Reset your password",
                html: `<p>You requested a password reset.</p>
             <p>Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>
             <p>The link is valid for 1 hour.</p>`,
            });
        }

        return NextResponse.json({
            message: "If an account with that email exists, a password reset link has been sent."
        });

    }
    catch (err) {
        return NextResponse.json({
            message: "Error in forget password",
            error: err
        },
            { status: 501 }
        );
    }
}
