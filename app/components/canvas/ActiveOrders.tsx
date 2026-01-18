'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image, Text } from '@react-three/drei'
import * as THREE from 'three'
import { supabase } from '@/lib/supabase'
import { Order } from '@/types/database'

const getTexture = (id: string) => {
    const lastChar = id.charCodeAt(id.length - 1)
    return lastChar % 2 === 0 ? '/textures/pizza.png' : '/textures/burger.png'
}

function OrderCard({ position, texture, label, status }: { position: [number, number, number], texture: string, label: string, status: string }) {
    const groupRef = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // 1. X-AXIS ROTATION LOGIC
        // We use Math.sin to make it rock back and forth gently, rather than spinning like a fan.
        // changing '2' alters speed. changing '0.1' alters angle depth.
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1

        // 2. HOVER EFFECT
        // If hovered, we stop the rocking and tilt it slightly up to face the user
        if (hovered) {
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.2, 0.1)
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.5, 0.1)
        } else {
            // Return to floating y position
            // The '+ position[1]' ensures it stays relative to its starting spot
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 + position[1]
        }
    })

    return (
        <group
            ref={groupRef}
            position={position}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Glass Panel */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[3, 4]} />
                <meshPhysicalMaterial
                    color="white" roughness={0.1} metalness={0.1}
                    transmission={0.95} thickness={2} transparent opacity={1} envMapIntensity={2}
                />
            </mesh>

            {/* Border */}
            <mesh position={[0, 0, -0.11]}>
                <planeGeometry args={[3.1, 4.1]} />
                <meshBasicMaterial color={hovered ? "#00ff41" : "#555"} />
            </mesh>

            <Image url={texture} scale={[2, 2]} position={[0, 0.5, 0.1]} transparent />

            <Text position={[0, -1, 0.2]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                {label}
            </Text>

            <Text position={[0, -1.4, 0.2]} fontSize={0.15} color={status === "transit" ? "#00ff41" : "#ffaa00"} anchorX="center">
                {status.toUpperCase()}
            </Text>
        </group>
    )
}

export default function ActiveOrders() {
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const fetchOrders = async () => {
            const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(4)
            if (data) setOrders(data)
        }
        fetchOrders()

        const channel = supabase.channel('live-orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [])

    return (
        <group>
            {orders.map((order, index) => {
                const xPos = (index - 1.5) * 3.5
                return (
                    // @ts-ignore
                    <OrderCard
                        key={order.id}
                        // @ts-ignore
                        position={[xPos, 0, 0]}
                        texture={getTexture(order.id)}
                        label={order.restaurant_name}
                        status={order.status}
                    />
                )
            })}
        </group>
    )
}