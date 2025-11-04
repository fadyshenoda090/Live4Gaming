// app/tournaments/page.tsx
import {Tournament} from "@/types/types";
import AllTournaments from "@/components/UI/AllTournaments";

interface TournamentsApiResponse {
    data: Tournament[]
    totalPages: number
}

const limit = 8

const TournamentsPage = async () => {
    // Fetch all tournaments server-side
    const res = await fetch(`http://localhost:3000/api/tournaments?page=1&limit=${limit}`, {
        cache: 'no-store', // use no-store for fresh pagination
    })

    if (!res.ok) throw new Error('Failed to fetch tournaments')

    const data: TournamentsApiResponse = await res.json()

    return (
        <AllTournaments
            initialTournaments={data.data}
            initialPage={1}
            initialTotalPages={data.totalPages}
        />
    );
};

export default TournamentsPage;
