import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { tournamentId, playerName } = await request.json();

        if (!tournamentId || !playerName) {
            return NextResponse.json(
                { message: 'Tournament ID and player name are required' },
                { status: 400 }
            );
        }

        // Here you would typically save to a database
        console.log(`Enrolling ${playerName} in tournament ${tournamentId}`);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            message: `Successfully enrolled ${playerName} in the tournament!`,
            tournamentId,
            playerName
        });

    } catch (error) {
        console.error('Enrollment error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}