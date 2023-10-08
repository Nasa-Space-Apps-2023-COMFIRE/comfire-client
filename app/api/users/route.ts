import {NextRequest, NextResponse} from "next/server";
import { prisma } from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    // if invalid, return 400
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400});

    const user = await prisma.user.findUnique({
        where: { clerk_id: body.clerk_id }
    });

    if (user)
        return NextResponse.json({ error: 'User already exists'}, { status: 400});

    const newUser = await prisma.user.create({
        data: {
            clerk_id: body?.clerk_id,
            email: body?.email,
            firstName: body?.firstName,           
            lastName: body?.lastName,
        }
    })
    return NextResponse.json(newUser, { status: 201});
}