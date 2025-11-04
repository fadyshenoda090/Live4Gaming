// app/api/games/[id]/route.ts
import { NextResponse } from "next/server";
import { games } from "../../db";
import type { Game } from "@/types/types";

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse<Game | { message: string }>> {
    try {
        console.log("🧩 Params received:", params);

        const id = params?.id?.toLowerCase();
        if (!id) {
            return NextResponse.json({ message: "Invalid game ID" }, { status: 400 });
        }

        const game = games.find((g) => g.id.toLowerCase() === id);

        if (!game) {
            return NextResponse.json({ message: "Game not found" }, { status: 404 });
        }

        return NextResponse.json(game);
    } catch (error) {
        console.error("❌ Error fetching game:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
