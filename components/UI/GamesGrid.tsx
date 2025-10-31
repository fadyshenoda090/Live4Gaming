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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-16">
            {/* {games.slice(0, 6).map((game: Game, idx: number) => (
                <Link
                    key={idx}
                    href={`/games/${game.id}`}
                    className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
                >
                    <div className="relative h-56 w-full">
                        <Image
                            src={game.image}
                            alt={game.title}
                            fill
                            className="object-cover opacity-90 hover:opacity-100 transition"
                        />
                    </div>
                    <div className="p-5">
                        <h3 className="text-xl font-semibold">{game.title}</h3>
                        <p className="text-gray-500">{game.genre}</p>
                    </div>
                </Link>
            ))} */}
        </section>

    )
}

export default GamesGrid