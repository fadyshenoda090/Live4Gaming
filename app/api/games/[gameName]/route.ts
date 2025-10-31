import { NextResponse } from "next/server";
import { games } from "../../db";
import type { Game } from "@/types/types";

export async function GET(
    _req: Request,
    { params }: { params: { name: string } }
): Promise<NextResponse<Game[] | { message: string }>> {
    const found = games.filter(game =>
        game.title.toLowerCase().includes(params.name.toLowerCase())
    );

    if (found.length === 0)
        return NextResponse.json({ message: "Game not found" }, { status: 404 });

    return NextResponse.json(found);
}
