import TrendingGames from './TrendingGames';
import NewReleases from './NewReleases';
import RecommendedGames from './RecommendedGames';
import { Suspense } from 'react';

const GamesGrid = async () => {
    return (
        <section className="px-4 sm:px-6 pb-16 space-y-6">
            {/* Trending Games */}
            <Suspense fallback={<div className="text-center text-gray-400">Loading trending games...</div>}>
                <TrendingGames />
            </Suspense>

            {/* New Releases */}
            <Suspense fallback={<div className="text-center text-gray-400">Loading new releases...</div>}>
                <NewReleases />
            </Suspense>

            {/* Recommended For You */}
            <Suspense fallback={<div className="text-center text-gray-400">Loading recommendations...</div>}>
                <RecommendedGames />
            </Suspense>
        </section>
    );
};

export default GamesGrid;