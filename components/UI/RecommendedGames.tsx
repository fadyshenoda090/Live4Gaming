'use client'

import { Game } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useEffect, useState } from 'react'

const RecommendedGames = () => {
    const [recommendedGames, setRecommendedGames] = useState<Game[]>([])

    const fetchRecommendedGames = async () => {
        const res = await fetch('/api/games', { cache: 'force-cache' })
        const games = await res.json()
        setRecommendedGames(games.slice(4, 12))
    }

    useEffect(() => {
        fetchRecommendedGames()
    }, [])

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 4 },
        desktop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
    }

    return (
        <section className="w-full">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wider mb-4">
                    <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        RECOMMENDED
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cod-amber to-cod-orange bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        FOR YOU
                    </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-cod-amber to-cod-orange mx-auto mb-4" />
                <p className="text-cod-gray-light text-sm sm:text-base max-w-2xl mx-auto">
                    Based on your gaming preferences
                </p>
            </div>

            {/* 🌀 Slider */}
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={5000}
                transitionDuration={600}
                arrows
                showDots
                itemClass="px-2 pt-5 h-[21rem]"
                containerClass="pb-4"
                removeArrowOnDeviceType={['mobile']}
            >
                {recommendedGames.map((game) => (
                    <div
                        key={game.id}
                        className="group relative h-72 bg-gray-900 bg-color-dark-bg border-gray-700 rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:border-cod-amber"
                    >
                        {/* Glow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cod-amber/10 to-cod-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                className="group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-4 flex flex-col justify-between flex-grow">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cod-amber-light transition-colors duration-300 line-clamp-1">
                                {game.title}
                            </h3>

                            <div className="flex items-center justify-between text-xs">
                                <span className="uppercase tracking-wide text-cod-orange font-semibold">
                                    {game.genre}
                                </span>

                                {/* Fake match score */}
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cod-amber animate-pulse" />
                                    <span className="text-cod-gray-light">Match 95%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    )
}

export default RecommendedGames
