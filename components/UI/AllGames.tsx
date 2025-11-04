'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Game } from "@/types/types"

interface Props {
    initialGames: Game[]
    initialPage: number
    initialTotalPages: number
}

const limit = 8

const AllGames = ({ initialGames, initialPage, initialTotalPages }: Props) => {
    const [games, setGames] = useState<Game[]>(initialGames)
    const [page, setPage] = useState<number>(initialPage)
    const [totalPages, setTotalPages] = useState<number>(initialTotalPages)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (page === initialPage) return

        const fetchGames = async () => {
            setLoading(true)
            const res = await fetch(`/api/games?page=${page}&limit=${limit}`)
            if (!res.ok) return
            const data: { data: Game[]; totalPages: number } = await res.json()
            setGames(data.data)
            setTotalPages(data.totalPages)
            setLoading(false)

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }

        fetchGames()
    }, [page, initialPage])

    return (
        <div className="min-h-screen bg-gray-900 pt-20">
            {/* Header Section */}
            <section className="relative py-16 px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-6">
                        <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">ALL</span>
                        <br />
                        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
              GAMES
            </span>
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6" />
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Explore our complete collection of premium gaming titles
                    </p>
                </div>
            </section>

            {/* Games Grid */}
            <section className="px-6 pb-16">
                {loading && <p className="text-gray-300 text-center mb-6">Loading...</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">                            {/* Glow Effect */}
                    {games.map(game => (
                        <Link key={game.id} href={`/games/${game.id}`} className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:scale-[1.02] hover:border-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all duration-300">
                            {/* Game Image */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Rating Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="flex items-center gap-1 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-500">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                        <span className="text-amber-300 text-sm font-bold">{game.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Game Info */}
                            <div className="relative z-10 p-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300 line-clamp-1">{game.title}</h3>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-amber-500 font-semibold text-sm uppercase tracking-wide">{game.genre}</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                                        <span className="text-gray-400 text-xs">{game.developer}</span>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">{game.description}</p>
                                <div className="flex items-center justify-between text-gray-400 text-xs">
                                    <span>Released: {new Date(game.releaseDate).getFullYear()}</span>
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <span>View Details</span>
                                        <div className="w-2 h-2 border-r-2 border-t-2 border-amber-400 rotate-45 transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={`px-4 py-2 rounded-lg border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>Prev</button>
                    <span className="text-gray-300">Page {page} of {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={`px-4 py-2 rounded-lg border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>Next</button>
                </div>
            </section>
        </div>
    )
}

export default AllGames
