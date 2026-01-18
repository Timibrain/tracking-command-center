export default function HUD() {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 z-10">

            {/* --- TOP BAR (Header) --- */}
            <header className="flex justify-between items-start pointer-events-auto">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter text-white mb-1">
                        NEXUS<span className="text-[#00ff41]">.LOGISTICS</span>
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        SYSTEM OPERATIONAL // LAT: 0.00 // LNG: 0.00
                    </div>
                </div>

                {/* Stats Widget */}
                <div className="flex gap-4">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 min-w-[120px]">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Active Fleet</p>
                        <p className="text-2xl font-mono text-white">04</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 min-w-[120px]">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pending</p>
                        <p className="text-2xl font-mono text-[#ffaa00]">12</p>
                    </div>
                </div>
            </header>

            {/* --- SIDEBAR (Navigation) --- */}
            <aside className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto hidden md:block">
                <nav className="flex flex-col gap-4">
                    {['DASHBOARD', 'LIVE MAP', 'FLEET', 'ANALYTICS'].map((item, i) => (
                        <button
                            key={item}
                            className={`
                        text-xs tracking-[0.2em] font-bold py-3 pl-4 pr-12 border-l-2 transition-all hover:bg-white/5 text-left
                        ${i === 0 ? 'border-[#00ff41] text-white bg-white/5' : 'border-transparent text-gray-600 hover:text-white'}
                    `}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* --- BOTTOM BAR (Status) --- */}
            <footer className="flex justify-between items-end pointer-events-auto">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                    <p className="text-[10px] text-gray-400">
                        SERVER TIME: <span className="text-white font-mono">{new Date().toLocaleTimeString()}</span>
                    </p>
                </div>

                <button className="bg-[#00ff41] text-black text-xs font-bold px-8 py-3 hover:bg-white transition-colors">
                    + MANUAL DISPATCH
                </button>
            </footer>
        </div>
    )
}