import { Game } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'

const GamesGrid = async () => {
    const res = await fetch('http://localhost:3000/api/games', {
        cache: 'force-cache'
    })

    if (res.status !== 200) {
        console.error('Fetch failed:', res)
        throw new Error('Failed to get the games')
    }

    const games = await res.json()

    return (
        <section className="px-6 pb-16">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider mb-4">
                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        FEATURED
                    </span>
                    <br />
                    <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        GAMES
                    </span>
                </h2>
                <div className="w-24 h-1 bg-linear-to-r from-amber-500 to-orange-500 mx-auto mb-4" />
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Discover the hottest titles dominating the battlefield
                </p>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.slice(0, 6).map((game: Game, idx: number) => (
                    <Link
                        key={idx}
                        href={`/games/${game.id}`}
                        className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:border-amber-500"
                    >
                        {/* Glow Effect on Hover */}
                        <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                        {/* Game Image */}
                        <div className="relative h-56 w-full overflow-hidden">
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent" />

                            {/* Rating Badge */}
                            <div className="absolute top-3 right-3 z-10">
                                <div className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full border border-amber-500">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                    <span className="text-amber-300 text-sm font-bold">
                                        {game.rating}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Game Info */}
                        <div className="relative z-10 p-5">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                                {game.title}
                            </h3>

                            <div className="flex items-center justify-between">
                                <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">
                                    {game.genre}
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                                    <span className="text-gray-400 text-xs">
                                        {game.developer}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Action Indicator */}
                            <div className="absolute bottom-12 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-1 text-amber-500">
                                    <span className="text-sm font-semibold">VIEW</span>
                                    <div className="w-2 h-2 border-r-2 border-t-2 border-amber-500 rotate-45 transform" />
                                </div>
                            </div>
                        </div>

                        {/* Border Glow Effect */}
                        <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-amber-500/30 transition-all duration-300" />
                    </Link>
                ))}
            </div>

            {/* View All Games Button */}
            <div className="text-center mt-12">
                <Link
                    href="/games"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-gray-500 rounded-sm font-bold text-white text-lg uppercase tracking-wider transition-all duration-300 hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] group"
                >
                    <span>View All Games</span>
                    <div className="w-2 h-2 border-r-2 border-t-2 border-white rotate-45 transform group-hover:border-amber-500 transition-colors duration-300" />
                </Link>
            </div>
        </section>
    )
}

export default GamesGrid