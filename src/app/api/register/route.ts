import bcrypt from "bcrypt";


import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = body;
        if (!email || !name || !password) {
            return new NextResponse('Missing Info', { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        })
        return NextResponse.json(user);
    } catch (err) {
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}