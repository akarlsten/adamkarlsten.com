import { FontLoader, Vector3 } from 'three'
import React, { Suspense, useRef, useState, useMemo, useCallback } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Text = ({
  children,
  texture,
  vAlign = 'center',
  hAlign = 'center',
  ...props
}) => {

  const textRef = useRef()

  const font = useLoader(FontLoader, '/fredoka_hej.json')
  const config = useMemo(
    () => ({
      font,
      size: 80,
      height: 15,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8
    }),
    [font]
  )


  const didUpdate = useCallback((self) => {
    const size = new Vector3()
    self.geometry.computeBoundingBox()
    self.geometry.boundingBox.getSize(size)
    self.position.x =
      hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
    self.position.y =
      vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
  }, [self])

  return (
    <group {...props} scale={[0.1, 0.1, 0.1]}>
      <mesh
        ref={textRef}
        onUpdate={didUpdate}
      >
        <textGeometry attach="geometry" args={[children, config]} />
        <meshPhongMaterial
          specular={0xFFFFFF}
          shininess={60}
          map={texture}
          color='#ffcc59'
          attach="material"
        />
      </mesh>
    </group>
  )
}

function Ray({ direction = 'right', texture, ...props }) {
  return (
    <mesh {...props}>
      <cylinderBufferGeometry attach="geometry" args={[direction === 'right' ? 0 : 1, direction === 'right' ? 1 : 0, 3, 16]} />
      <meshStandardMaterial
        map={texture}
        color='#ffcc59'
        attach="material"
      />
    </mesh>
  )
}

function Jumbo({ hovered }) {
  const allObjects = useRef()
  const leftRays = useRef()
  const rightRays = useRef()

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const raySpeedFactor = hovered ? 14 : 7

  useFrame(({ clock }) => (allObjects.current.position.y = reduceMotion ? 0 : Math.sin(clock.getElapsedTime() * 2)))
  useFrame(({ clock }) => (leftRays.current.position.x = reduceMotion ? 0 : Math.sin(clock.getElapsedTime() * raySpeedFactor)))
  useFrame(({ clock }) => (rightRays.current.position.x = reduceMotion ? 0 : -Math.sin(clock.getElapsedTime() * raySpeedFactor)))

  return (
    <>
      <group ref={allObjects}>
        <group ref={leftRays}>
          <Ray
            direction={'left'}
            position={[-12.5, 5, 5]}
            rotation={[1.8, -0.5, 1.3, 'XYZ']} />
          <Ray
            direction={'left'}
            position={[-14, 1, 5]}
            rotation={[1.8, -0.1, 1.3, 'XYZ']} />
          <Ray
            direction={'left'}
            position={[-12.5, -3, 4]}
            rotation={[1.8, 0.5, 1.3, 'XYZ']} />
        </group>
        <group ref={rightRays}>
          <Ray
            position={[13.5, 5, -3]}
            rotation={[1.8, 0.5, 1.3, 'XYZ']} />
          <Ray
            position={[15, 1, -4]}
            rotation={[1.8, -0.1, 1.3, 'XYZ']} />
          <Ray
            position={[13.5, -3, -4]}
            rotation={[1.8, -0.5, 1.3, 'XYZ']} />
        </group>
        <Text
          bevelSize={8}
          hAlign="center"
          position={[0, 3, 0]}
          rotation={[0.1, 0.3, 0, 'XYZ']}
        >Hej!</Text>
      </group>
    </>
  )
}

const Greeting = () => {
  const [hovered, setHovered] = useState(false)

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Canvas
        mode="concurrent"
        anti
        flat={true}
        orthographic={true}
        dpr={window.devicePixelRatio}
        camera={{ position: [0, 0, 40], fov: 90, zoom: 7 }}
      >
        <ambientLight intensity={0.06} />
        <pointLight intensity={1.25} position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <Jumbo hovered={hovered} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

export default Greeting
