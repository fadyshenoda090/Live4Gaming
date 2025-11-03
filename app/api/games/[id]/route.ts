// app/api/games/[id]/route.ts
import { NextResponse } from "next/server";
import { games } from "../../db";
import type { Game } from "@/types/types";

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse<Game | { message: string }>> {
    console.log("🧩 params received:", params);

    const q = params.id?.toLowerCase();
    if (!q) {
        return NextResponse.json({ message: "Invalid game id" }, { status: 400 });
    }

    const game = games.find((g) => g.id.toLowerCase() === q);

    if (!game)
        return NextResponse.json({ message: "Game not found" }, { status: 404 });

    return NextResponse.json(game);
}