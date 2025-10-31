import { NextResponse } from "next/server";
import { users } from "./../db";
import type { User } from "@/types/types";

interface RegisterBody {
    username: string;
    fullName: string;
    password: string;
}

interface LoginBody {
    username: string;
    password: string;
}

// POST → Register
export async function POST(req: Request): Promise<NextResponse<{ message: string; user?: User }>> {
    const { username, fullName, password } = (await req.json()) as RegisterBody;

    if (!username || !fullName || !password)
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const exists = users.find(u => u.username === username);
    if (exists)
        return NextResponse.json({ message: "Username already exists" }, { status: 400 });

    const newUser: User = {
        id: `user${users.length + 1}`,
        username,
        fullName,
        avatar: "/profiles/default.jpg",
        level: 1,
        country: "Unknown",
        joinedAt: new Date().toISOString(),
        bio: "",
        favoriteGames: [],
        achievements: [],
        stats: { matchesPlayed: 0, tournamentsWon: 0, winRate: 0 },
        role: "player",
    };

    // temporarily attach password just for simulation
    (newUser as any).password = password;

    users.push(newUser);
    return NextResponse.json({ message: "User registered", user: newUser });
}

// PUT → Login
export async function PUT(req: Request): Promise<NextResponse<{ message: string; user?: User }>> {
    const { username, password } = (await req.json()) as LoginBody;
    const user = users.find(u => (u as any).username === username && (u as any).password === password);

    if (!user)
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    return NextResponse.json({ message: "Login successful", user });
}
