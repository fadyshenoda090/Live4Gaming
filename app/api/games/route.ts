import { NextResponse } from "next/server";
import { games } from "../db";
import type { Game } from "@/types/types";

export async function GET(): Promise<NextResponse<Game[]>> {
    return NextResponse.json(games);
}
