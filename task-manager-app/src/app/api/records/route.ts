import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../utils/connect";

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { title, description, date, isCompleted, isImportant, tags } = await request.json();

        if (!title || !date || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const record = await prisma.record.create({
            data: {
                title,
                description,
                date,
                isCompleted,
                isImportant,
                userId,
                tags
            }
        });

        return NextResponse.json(record);

    } catch (error) {
        console.log("Error creating record", error);
        return NextResponse.json(
            { error: "Error creating record" },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const records = await prisma.record.findMany({
            where: { userId },
        });

        return NextResponse.json(records);
    } catch (error) {
        return NextResponse.json(
            { error: "Error getting records" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const { id, title, description, date, isCompleted, isImportant, tags } = await request.json();

        if (!title || !date || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const record = await prisma.record.update({
            where: {
                id
            },
            data: {
                title,
                description,
                date,
                isCompleted,
                isImportant,
                tags
            }
        });

        return NextResponse.json(record);
    } catch (error) {
        console.log("Error updating record", error);
        return NextResponse.json(
            { error: "Error updating record" },
            { status: 500 }
        );
    }
}