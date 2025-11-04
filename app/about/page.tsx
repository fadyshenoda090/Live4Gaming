import React from "react";

const About = () => {
    return (
        <section className="min-h-screen bg-gray-900 text-gray-100 py-16 px-6 flex flex-col items-center">
            <div className="max-w-4xl text-center">
                <h1 className="text-4xl font-bold text-amber-400 mb-6">
                    About Our Platform
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed mb-10">
                    Welcome to <span className="text-amber-400 font-semibold">ArenaX</span> — the ultimate hub for competitive gamers.
                    Our platform brings together global tournaments, real-time leaderboards, and
                    detailed insights about your favorite games, all in one sleek experience.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-gray-800 border border-amber-500 rounded-2xl p-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                        <h3 className="text-xl font-semibold text-amber-400 mb-2">
                            🎯 Our Mission
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            To make esports accessible to everyone — whether you're a rising player,
                            a tournament host, or a passionate fan watching the action unfold.
                        </p>
                    </div>

                    <div className="bg-gray-800 border border-amber-500 rounded-2xl p-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                        <h3 className="text-xl font-semibold text-amber-400 mb-2">
                            🌍 Our Vision
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            To become the go-to destination for global gaming events — connecting
                            players, teams, and fans through innovation and fair competition.
                        </p>
                    </div>

                    <div className="bg-gray-800 border border-amber-500 rounded-2xl p-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                        <h3 className="text-xl font-semibold text-amber-400 mb-2">
                            ⚡ Our Community
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Powered by players, built for passion. Join tournaments, follow your
                            favorite games, and experience the next level of competitive gaming.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
