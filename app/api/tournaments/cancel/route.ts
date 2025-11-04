import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tournamentId, playerName } = await request.json();

    if (!tournamentId) {
      return NextResponse.json(
        { message: 'Tournament ID is required' },
        { status: 400 }
      );
    }

    console.log(`Canceling enrollment for ${playerName ?? 'player'} in tournament ${tournamentId}`);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      message: 'Enrollment canceled successfully.',
      tournamentId,
      playerName: playerName ?? null,
    });
  } catch (error) {
    console.error('Cancel enrollment error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
