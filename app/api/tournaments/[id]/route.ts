// app/api/tournaments/[id]/route.ts
import { NextResponse } from "next/server";
import { tournaments } from "../../db";
import type { Tournament } from "@/types/types";

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse<Tournament | { message: string }>> {
    const tournament = tournaments.find(
        (t) => t.id.toLowerCase() === params.id.toLowerCase()
    );

    if (!tournament) {
        return NextResponse.json({ message: "Tournament not found" }, { status: 404 });
    }

    return NextResponse.json(tournament);
}
