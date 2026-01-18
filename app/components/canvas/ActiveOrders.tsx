'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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

    useFrame((state) => {
        if (!groupRef.current) return
        // Gentle X-Axis rocking
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1

        if (hovered) {
            // Tilt up when hovered
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.2, 0.1)
        }
    })

    return (
        <group
            ref={groupRef}
            position={position}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* SMALLER CARD SIZE: Changed from [3, 4] to [2, 2.8] */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[2, 2.8]} />
                <meshPhysicalMaterial
                    color="white" roughness={0.1} metalness={0.1}
                    transmission={0.95} thickness={2} transparent opacity={1} envMapIntensity={2}
                />
            </mesh>

            {/* Border */}
            <mesh position={[0, 0, -0.11]}>
                <planeGeometry args={[2.05, 2.85]} />
                <meshBasicMaterial color={hovered ? "#00ff41" : "#555"} />
            </mesh>

            <Image url={texture} scale={[1.5, 1.5]} position={[0, 0.5, 0.1]} transparent />

            <Text position={[0, -0.6, 0.2]} fontSize={0.18} color="white" anchorX="center" anchorY="middle">
                {label}
            </Text>

            <Text position={[0, -0.9, 0.2]} fontSize={0.12} color={status === "transit" ? "#00ff41" : "#ffaa00"} anchorX="center">
                {status.toUpperCase()}
            </Text>
        </group>
    )
}

export default function ActiveOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const { viewport } = useThree() // <-- This detects screen size

    // Check if screen is narrow (Mobile)
    const isMobile = viewport.width < 8

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
                let x, y;

                if (isMobile) {
                    // MOBILE LAYOUT: Stack Vertically
                    x = 0
                    y = 3 - (index * 3.2) // Start high, stack down
                } else {
                    // DESKTOP LAYOUT: Row Horizontal
                    x = (index - 1.5) * 2.5 // Tighter spacing
                    y = 0
                }

                return (
                    // @ts-ignore
                    <OrderCard
                        key={order.id}
                        // @ts-ignore
                        position={[x, y, 0]}
                        texture={getTexture(order.id)}
                        label={order.restaurant_name}
                        status={order.status}
                    />
                )
            })}
        </group>
    )
}