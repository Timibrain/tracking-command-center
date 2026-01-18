'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import ActiveOrders from './ActiveOrders'

export default function Scene() {
    return (
        <div className="h-full w-full absolute top-0 left-0 z-0 bg-black">
            <Canvas dpr={[1, 2]}>
                {/* Camera closer to the action */}
                <PerspectiveCamera makeDefault position={[2, 0, 12]} fov={35} />

                <OrbitControls
                    enableZoom={false} // Lock zoom to keep the UI clean
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2} // Don't let user go under the floor
                    minPolarAngle={Math.PI / 3}
                />

                {/* Studio Lighting for that "Premium" look */}
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />

                <Suspense fallback={null}>
                    <ActiveOrders />
                    {/* Modern blurry reflection on the floor */}
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
                    {/* Subtle environment reflections on the glass cards */}
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    )
}