import { animated, useSpring } from "@react-spring/three"
import { Html, OrbitControls, Text, Text3D } from "@react-three/drei"
import { Canvas, ThreeElements, Vector3, useFrame } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { AxesHelper, Group, Mesh } from "three"

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
// <Text3D font="./assets/Geist Bold_Regular.json">
//   Umeow
//   <meshToonMaterial />
// </Text3D>
//
interface TextLineProp {
  word: string,
  position: Vector3,
  speed: number,
  props?: any
}

const TextLine: React.FC<TextLineProp> = ({ word, position, speed, props }) => {
  const [left, setLeft] = useState(false)
  const ref = useRef<any>()
  useFrame((state, delta) => {
    if (ref.current) {
      if (left) {
        ref.current.position.x -= speed * delta
      } else {
        ref.current.position.x += speed * delta
      }
      if (ref.current.position.x > 0 || ref.current.position.x < -10) {
        setLeft(l => !l)
      }
    }
  })

  return <Text position={position} ref={ref} {...props}>
    {word}
  </Text>
}

const Generate = () => {
  var word = "umeow "
  var text = word.repeat(20)
  const ref = useRef<any>()
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    []
  )

  const [state, updateState] = useState({
    r1: 30
  })

  useFrame((_, clock) => {
    console.log(ref.current)
  })

  return (
    <>
      <group rotation={[0, 0, state.r1 * Math.PI / 180]}>
        <TextLine word={text} position={[-10, -4, 0]} speed={1} />
        <TextLine word={text} position={[-10, -3, 0]} speed={2} />
        <TextLine word={text} position={[-10, -2, 0]} speed={3} />
        <TextLine word={text} position={[-10, -1, 0]} speed={-1} />
        <TextLine word={text} position={[-10, 0, 0]} speed={-2} />
        <TextLine word={text} position={[-10, 1, 0]} speed={-3} />
        <TextLine word={text} position={[-10, 2, 0]} speed={1} />
      </group>
    </>
  )
}

const Umeow = () => {
  return (
    <div className="w-screen h-screen bg-sky-50 text-black ">
      <h1>10 meows meows that remind me of umeow</h1>
      <Canvas>
        <Generate />
      </Canvas>
    </div>
  )
}

export default Umeow
