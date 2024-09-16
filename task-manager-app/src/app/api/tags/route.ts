import { NextRequest, NextResponse } from "next/server";
import prisma from '../../utils/connect';

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const recordTag = url.searchParams.getAll("tag");

        if (!recordTag.length) {
            const allTags = await prisma.tags.findMany();

            return NextResponse.json(allTags);
        }

        const matchedTags = await prisma.tags.findMany({
            where: {
                value: {
                    in: recordTag
                }
            }
        });

        return NextResponse.json(matchedTags);
    } catch (error) {
        return NextResponse.json(
            { error: "Error getting tags" },
            { status: 500 }
        );
    }

}