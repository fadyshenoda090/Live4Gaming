// types.ts

export interface Game {
    id: string;
    title: string;
    genre: string;
    rating: number;
    image: string;
    description: string;
    releaseDate: string;
    developer: string;
}

export interface Achievement {
    title: string;
    year: number;
}

export interface UserStats {
    matchesPlayed: number;
    tournamentsWon: number;
    winRate: number; // 0.0 to 1.0
}

export interface User {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
    level: number;
    country: string;
    joinedAt: string;
    bio: string;
    favoriteGames: string[]; // array of game IDs
    achievements: Achievement[];
    stats: UserStats;
    role: "player" | "admin";
}

export interface Tournament {
    id: string;
    game:string
    genre: string;
    title: string;
    gameId: string; // references a Game.id
    image: string;
    prizePool: string;
    participants: number;
    startDate: string;
    endDate: string;
    status: "upcoming" | "ongoing" | "finished";
}
