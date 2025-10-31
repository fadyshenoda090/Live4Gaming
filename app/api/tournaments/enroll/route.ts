import { NextResponse } from "next/server";
import { tournaments } from "../../db";
import type { Tournament } from "@/types/types";

interface EnrollBody {
    tournamentId: string;
    userId: string;
}

export async function POST(req: Request): Promise<NextResponse<{ message: string }>> {
    const { tournamentId, userId } = (await req.json()) as EnrollBody;

    const tournament: Tournament | undefined = tournaments.find(
        (t: Tournament) => t.id === tournamentId
    );

    if (!tournament)
        return NextResponse.json({ message: "Tournament not found" }, { status: 404 });

    return NextResponse.json({
        message: `User ${userId} enrolled in ${tournament.title}`,
    });
}
