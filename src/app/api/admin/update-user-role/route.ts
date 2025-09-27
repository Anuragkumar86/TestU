import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma";

// Interface for the payload the API expects
interface UpdateRolePayload {
    userId: string;
    newRole: string;
}

export async function POST(req: NextRequest) {
    // 1. Authenticate and authorize the request
    const session = await getServerSession(authOptions);

    // If no session or the user is not an admin, return an unauthorized error.
    // We check for the session first, then verify the role from the session.
    if (!session || !session.user || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { message: "Unauthorized. Must be an administrator." },
            { status: 403 }
        );
    }

    try {
        // 2. Parse the request body to get the userId and the new role
        const { userId, newRole }: UpdateRolePayload = await req.json();

        // Basic validation to ensure the required data is present
        if (!userId || !newRole) {
            return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
        }

        // 3. Update the user's role in the database using Prisma
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
            // Select only necessary fields for the response
            select: { id: true, name: true, email: true, role: true }, 
        });
        
        // Return a success response. The role change has been made in the database.
        return NextResponse.json({ message: "User role updated successfully.", user: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Failed to update user role:", error);
        return NextResponse.json({ message: "Failed to update user role." }, { status: 500 });
    }
}
