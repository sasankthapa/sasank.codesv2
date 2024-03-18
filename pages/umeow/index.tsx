'use client'

import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import React from "react"

// <Head>
//   <title>Sasank Thapa</title>
//   <meta name="Sasank Thapa" content="UMEOW" />
//   <link rel="icon" href="/favicon.ico" />
// </Head>
//
// <mesh position={[0, 0, 0]} rotation={[90, 90, 0]}>
//   <boxBufferGeometry />
//   <meshBasicMaterial color="hotpink" wireframe />
// </mesh>

const Umeow = () => {
  return (
    <div className="w-screen h-screen bg-blue-200">
      hello
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="hotpink" wireframe />
        </mesh>
        <OrbitControls />
      </Canvas>

    </div>
  )
}

export default Umeow
