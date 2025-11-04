// app/api/games/route.ts
import { NextResponse } from "next/server";
import { games } from "../db";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page") || 1); // default page = 1
        const limit = Number(url.searchParams.get("limit") || 12); // default limit = 12

        if (page < 1 || limit < 1) {
            return NextResponse.json(
                { message: "Invalid page or limit" },
                { status: 400 }
            );
        }

        const start = (page - 1) * limit;
        const end = start + limit;

        const paginatedGames = games.slice(start, end);
        const totalPages = Math.ceil(games.length / limit);

        return NextResponse.json({
            data: paginatedGames,
            totalPages,
        });
    } catch (error) {
        console.error("❌ Error fetching games:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
