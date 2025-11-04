'use client'

import {Game} from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const NewReleases = () => {
    const [newReleases, setNewReleases] = useState<Game[]>([])

    useEffect(() => {
        let isMounted = true;

        const fetchRecommendedGames = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/games", {
                    cache: "no-store",
                });
                if (!res.ok) return;

                const data = await res.json();
                if (isMounted) setNewReleases(data.data.slice(4, 12));
            } catch (error) {
                console.error("Failed to fetch recommended games:", error);
            }
        };

        fetchRecommendedGames();

        return () => {
            isMounted = false;
        };
    }, []);

    // 🎯 Responsive breakpoints
    const responsive = {
        superLargeDesktop: {
            breakpoint: {max: 4000, min: 1280},
            items: 4,
        },
        desktop: {
            breakpoint: {max: 1280, min: 1024},
            items: 3,
        },
        tablet: {
            breakpoint: {max: 1024, min: 640},
            items: 2,
        },
        mobile: {
            breakpoint: {max: 640, min: 0},
            items: 1,
        },
    }

    return (
        <section className="w-full">
            {/* 🧱 Section Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider mb-4">
                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        NEW
                    </span>
                    <br/>
                    <span
                        className="bg-gradient-to-r from-cod-orange to-cod-amber bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">
                        RELEASES
                    </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cod-orange to-cod-amber mx-auto mb-4"/>
                <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                    Fresh games just dropped
                </p>
            </div>

            {/* 🎮 Carousel */}
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={4000}
                showDots
                arrows
                transitionDuration={600}
                itemClass="px-2 pt-5 h-[21rem]"
                containerClass="pb-4"
                removeArrowOnDeviceType={['mobile']}
            >
                {newReleases.map((game) => (
                    <Link
                        key={game.id}
                        href={`/games/${game.id}`}
                        className="group relative h-72 bg-gray-800 flex-1 flex flex-col bg-color-dark-bg border border-gray-700 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:border-cod-orange"
                    >
                        {/* 🔥 Glow Overlay */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-cod-orange/10 via-cod-amber-light/10 to-cod-orange-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"/>

                        {/* 🏷️ Badge */}
                        <div className="absolute top-3 left-3 z-10">
                            <div
                                className="bg-gradient-to-r from-cod-orange to-cod-amber text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide shadow-[0_0_10px_rgba(249,115,22,0.6)]">
                                NEW
                            </div>
                        </div>

                        {/* 🎮 Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw`}
                                className="group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* 🧾 Info */}
                        <div className="relative z-10 p-4 flex flex-col justify-between flex-grow">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cod-amber-light transition-colors duration-300 line-clamp-1">
                                {game.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold uppercase tracking-wide text-cod-orange">
                                    {game.genre}
                                </span>
                                <span className="text-cod-gray-light">{game.releaseDate}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </section>
    )
}

export default NewReleases
