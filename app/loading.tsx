// app/loading.tsx
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-[var(--background)] text-[var(--foreground)]">
            <div className="relative">
                {/* Glowing ring */}
                <div className="w-24 h-24 border-4 border-transparent border-t-[var(--neon-pink)] rounded-full animate-spin" />
                <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-[var(--neon-cyan)] rounded-full animate-spin-slow" />

                {/* Center dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[var(--neon-purple)] shadow-[0_0_20px_var(--neon-purple)]"></div>
                </div>
            </div>
        </div>
    );
}
