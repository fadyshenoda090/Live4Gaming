import {Game} from '@/types/types'
import AllGames from "@/components/UI/AllGames";

interface GamesApiResponse {
    data: Game[]
    totalPages: number
}

const limit = 8

const GamesPage = async () => {
    const res = await fetch(`http://localhost:3000/api/games?page=1&limit=${limit}`, {
        cache: 'no-store', // use no-store for fresh pagination
    })

    if (!res.ok) throw new Error('Failed to fetch games')

    const data: GamesApiResponse = await res.json()

    return (
            <AllGames
                initialGames={data.data}
                initialPage={1}
                initialTotalPages={data.totalPages}
            />
    )
}

export default GamesPage