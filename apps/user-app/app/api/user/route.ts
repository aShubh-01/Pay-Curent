import { PrismaClient } from "@repo/database/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "asdasd"
        }
    })

    return NextResponse.json({
        message: 'Done'
    })
}