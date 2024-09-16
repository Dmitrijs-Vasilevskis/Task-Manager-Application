import React from "react";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();
        const { id } = params;

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const record = await prisma.record.delete({
            where: {
                id
            }
        });

        return NextResponse.json(record);
    } catch (error) {
        return NextResponse.json(
            { error: "Error deleting record" },
            { status: 500 }
        );
    }
}