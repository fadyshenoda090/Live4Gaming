// app/api/games/[id]/route.ts
import { NextResponse } from "next/server";
import { games } from "../../db";
import type { Game } from "@/types/types";

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse<Game | { message: string }>> {
    const game = games.find((g) => g.id === params.id);

    if (!game)
        return NextResponse.json({ message: "Game not found" }, { status: 404 });

    return NextResponse.json(game);
}
