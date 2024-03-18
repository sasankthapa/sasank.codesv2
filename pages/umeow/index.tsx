import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { NextPage } from "next"
import Head from "next/head"
import React from "react"

const Umeow: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-blue-200">
      <Head>
        <title>Sasank Thapa</title>
        <meta name="Sasank Thapa" content="UMEOW" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Canvas>
        <mesh position={[0, 0, 0]} rotation={[90, 90, 0]}>
          <boxBufferGeometry />
          <meshBasicMaterial color="hotpink" wireframe />
        </mesh>
        <OrbitControls />

      </Canvas>

    </div>
  )
}

export default Umeow
