import Scene from './components/canvas/Scene'
import HUD from './components/ui/HUD'

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-[#050505] overflow-hidden selection:bg-[#00ff41] selection:text-black">

      {/* 1. The 3D Layer (Background) */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* 2. The Interface Layer (Foreground) */}
      <HUD />

      {/* 3. A Vignette Overlay for that "Monitor" feel */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

    </main>
  )
}