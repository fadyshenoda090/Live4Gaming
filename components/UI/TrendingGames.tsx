'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {Game} from '@/types/types'

const TrendingGames = () => {
    const [trendingGames, setTrendingGames] = useState<Game[]>([])

    useEffect(() => {
        let isMounted = true;

        const fetchTrendingGames = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/games", {
                    cache: "no-store",
                });

                if (!res.ok) return;

                const data = await res.json();
                if (isMounted) setTrendingGames(data.data.slice(0, 8));
            } catch (err) {
                console.error("Failed to fetch trending games:", err);
            }
        };

        fetchTrendingGames();

        return () => {
            isMounted = false; // cleanup to prevent setting state after unmount
        };
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 1280},
            items: 4,
            partialVisibilityGutter: 20,
        },
        desktop: {
            breakpoint: {max: 1280, min: 1024},
            items: 3,
            partialVisibilityGutter: 15,
        },
        tablet: {
            breakpoint: {max: 1024, min: 640},
            items: 2,
            partialVisibilityGutter: 10,
        },
        mobile: {
            breakpoint: {max: 640, min: 0},
            items: 1,
        },
    }

    return (
        <section className="py-8">
            {/* Section Header */}
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider mb-4">
                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        TRENDING
                    </span>
                    <br/>
                    <span
                        className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        GAMES
                    </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-4"/>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
                    Most popular games right now
                </p>
            </div>

            {/* Carousel */}
            <Carousel
                responsive={responsive}
                infinite
                autoPlay={false}
                autoPlaySpeed={4000}
                showDots
                arrows
                itemClass="px-2 pt-5 h-[21rem]"
                containerClass="pb-4"
                removeArrowOnDeviceType={['mobile']}
            >
                {trendingGames.map((game, idx) => (
                    <Link
                        href={`/games/${game.id}`}
                        key={idx}
                        className="group relative h-72 bg-gray-800 flex-1 flex flex-col bg-color-dark-bg border border-gray-700 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:border-cod-orange"
                    >

                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 z-10">
                                <div
                                    className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full border border-amber-500">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"/>
                                    <span className="text-amber-300 text-sm font-bold">{game.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 p-4">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300 line-clamp-1">
                                {game.title}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-amber-500 font-semibold text-xs uppercase tracking-wide">
                                    {game.genre}
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"/>
                                    <span className="text-gray-400 text-xs">{game.developer}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </section>
    )
}

export default TrendingGames
