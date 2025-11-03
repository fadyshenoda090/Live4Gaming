import { Game } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

const GameDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:3000/api/games/${id}`, {
        cache: 'force-cache'
    });

    console.log(`${res}`);


    if (!res.ok) {
        notFound()
    }

    const game: Game = await res.json();


    if (!game) {
        notFound()
    }
    return (
        <div className="min-h-screen bg-gray-900 pt-20">
            {/* Hero Section */}
            <section className="relative py-12 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Game Image */}
                        <div className="relative">
                            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden border-2 border-gray-700 
                                hover:border-amber-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300">
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                            </div>
                        </div>

                        {/* Game Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-4">
                                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                        {game.title.split(':')[0]}
                                    </span>
                                    {game.title.includes(':') && (
                                        <>
                                            <br />
                                            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                                                {game.title.split(':')[1]}
                                            </span>
                                        </>
                                    )}
                                </h1>
                                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mb-6" />
                            </div>

                            {/* Rating & Genre */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-amber-500">
                                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                                    <span className="text-amber-300 font-bold text-lg">{game.rating}</span>
                                    <span className="text-gray-300 text-sm">Rating</span>
                                </div>
                                <div className="text-amber-500 font-semibold text-lg uppercase tracking-wide">
                                    {game.genre}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-amber-400 font-bold text-xl uppercase tracking-wide">About the Game</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {game.description}
                                </p>
                            </div>

                            {/* Game Details */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-amber-400 font-semibold mb-2">Developer</h4>
                                    <p className="text-gray-300">{game.developer}</p>
                                </div>
                                <div>
                                    <h4 className="text-amber-400 font-semibold mb-2">Release Date</h4>
                                    <p className="text-gray-300">{new Date(game.releaseDate).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-700 rounded-lg font-bold text-white 
                                    text-lg uppercase tracking-wider hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 
                                    transition-all duration-300 border border-amber-400">
                                    Play Now
                                </button>
                                <button className="px-8 py-4 bg-transparent border-2 border-gray-500 rounded-lg font-bold text-white 
                                    text-lg uppercase tracking-wider hover:border-amber-500 hover:bg-amber-500/10 
                                    transition-all duration-300">
                                    Add to Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Games Section */}
            <section className="py-16 px-6 bg-gray-800/30">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider mb-4">
                            <span className="text-white">MORE</span>
                            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent">
                                GAMES
                            </span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-4" />
                        <p className="text-gray-300">Discover other amazing titles</p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            href="/games"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-gray-500 rounded-lg 
                                font-bold text-white text-lg uppercase tracking-wider hover:border-amber-500 
                                hover:bg-amber-500/10 transition-all duration-300 group"
                        >
                            <span>View All Games</span>
                            <div className="w-3 h-3 border-r-2 border-t-2 border-white rotate-45 transform group-hover:border-amber-500 transition-colors duration-300" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GameDetails