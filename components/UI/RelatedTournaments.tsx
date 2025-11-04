
import Link from "next/link";
import Image from "next/image";
import { tournaments, games } from "@/app/api/db";

interface RelatedTournamentsProps {
    currentTournamentId: string;
    max?: number; // optional limit of items to show
}

const RelatedTournaments = ({ currentTournamentId, max = 6 }: RelatedTournamentsProps) => {
    const current = tournaments.find(t => t.id === currentTournamentId);
    if (!current) return null;

    const currentGame = games.find(g => g.id === current.gameId);
    const currentGenre = currentGame?.genre?.toLowerCase();
    const currentGameTitle = currentGame?.title?.toLowerCase();

    const related = tournaments
        .filter(t => t.id !== currentTournamentId)
        .filter(t => {
            if (t.gameId === current.gameId) return true; // same game
            const g = games.find(x => x.id === t.gameId);
            if (!g || !currentGenre) return false;
            // same genre or same game title (safety, though title comparison implies same id set)
            return (
                g.genre.toLowerCase() === currentGenre ||
                (currentGameTitle && g.title.toLowerCase() === currentGameTitle)
            );
        })
        .slice(0, max);

    if (related.length === 0) return null;

    return (
        <section className="mt-14 pb-10">
            <h3 className="text-2xl font-bold text-amber-400 mb-6">Related Tournaments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(t => {
                    const g = games.find(x => x.id === t.gameId);
                    return (
                        <Link
                            key={t.id}
                            href={`/tournaments/${t.id}`}
                            className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all duration-300"
                        >
                            <div className="relative h-44 w-full overflow-hidden">
                                <Image
                                    src={t.image}
                                    alt={t.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-gray-900/80 text-amber-300 text-xs px-2 py-1 rounded border border-amber-500">
                                    {g?.genre ?? "Tournament"}
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-amber-300 transition-colors line-clamp-1">
                                    {t.title}
                                </h4>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>{g?.title ?? "Unknown Game"}</span>
                                    <span className="text-amber-400">{t.prizePool}</span>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    {new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default RelatedTournaments;
