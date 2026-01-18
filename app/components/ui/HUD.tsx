export default function HUD() {
    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 z-10 select-none">

            {/* --- HEADER --- */}
            <header className="flex justify-between items-start pointer-events-auto">
                <div>
                    {/* Logo Area */}
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tighter text-white mb-1 drop-shadow-lg">
                        WEBBED<span className="text-[#00ff41]">.LOGISTICS</span>
                    </h1>

                    {/* System Status Line */}
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 font-mono">
                        <div className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse box-shadow-[0_0_10px_#00ff41]"></div>
                        <span className="tracking-widest">SYSTEM OPERATIONAL // V.2.0.4</span>
                    </div>
                </div>

                {/* Top Stats Widget (Desktop Only) */}
                <div className="hidden md:flex gap-4">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 min-w-[140px] rounded-sm">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Active Fleet</p>
                        <p className="text-2xl font-mono text-white leading-none">04</p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 min-w-[140px] rounded-sm">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Queue</p>
                        <p className="text-2xl font-mono text-[#ffaa00] leading-none">12</p>
                    </div>
                </div>
            </header>

            {/* --- SIDEBAR NAVIGATION (Desktop Only) --- */}
            <aside className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto hidden md:block">
                <nav className="flex flex-col gap-6">
                    {['DASHBOARD', 'LIVE MAP', 'FLEET', 'ANALYTICS'].map((item, i) => (
                        <button
                            key={item}
                            className={`
                        text-[10px] tracking-[0.3em] font-bold py-2 pl-4 pr-12 border-l-2 transition-all duration-300 hover:pl-6 text-left group
                        ${i === 0
                                    ? 'border-[#00ff41] text-white bg-gradient-to-r from-white/10 to-transparent'
                                    : 'border-white/10 text-gray-600 hover:text-white hover:border-white'
                                }
                    `}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* --- FOOTER --- */}
            <footer className="flex flex-col md:flex-row justify-between items-end pointer-events-auto w-full gap-4">

                {/* Server Time Widget (Hidden on tiny screens) */}
                <div className="hidden md:block bg-black/60 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                    <p className="text-[10px] text-gray-400 font-mono">
                        SERVER TIME: <span className="text-white ml-2">{new Date().toLocaleTimeString()}</span>
                    </p>
                </div>

                {/* Main Action Button */}
                <button className="w-full md:w-auto bg-[#00ff41] text-black text-xs font-bold px-10 py-4 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,65,0.3)] uppercase tracking-widest clip-path-slant">
                    + Manual Dispatch
                </button>
            </footer>

            {/* Optional: Scanlines overlay for extra tech feel */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] opacity-20" />

        </div>
    )
}