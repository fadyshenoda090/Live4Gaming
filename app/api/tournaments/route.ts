import { NextResponse } from "next/server";
import { tournaments } from "../db";
import type { Tournament } from "@/types/types";

export async function GET(): Promise<NextResponse<Tournament[]>> {
    return NextResponse.json(tournaments);
}
