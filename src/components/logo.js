import { FontLoader, Vector3 } from 'three'
import React, { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useLoader, useUpdate } from 'react-three-fiber'
import { OrbitControls } from 'drei'

function Text ({
  children,
  texture,
  vAlign = 'center',
  hAlign = 'center',
  size = 1,
  color = '#000000',
  ...props
}) {
  const font = useLoader(FontLoader, '/fredoka.blob')
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
  const mesh = useUpdate(
    self => {
      const size = new Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x =
        hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y =
        vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )

  const [hovered, setHover] = useState(false)

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh
        ref={mesh}
        onPointerOver={e => {
          setHover(true)
        }}
        onPointerOut={e => {
          setHover(false)
        }}
      >
        <textGeometry attach="geometry" args={[children, config]} />
        <meshStandardMaterial
          map={texture}
          color={hovered ? 'white' : '#ffcc59'}
          attach="material"
        />
      </mesh>
    </group>
  )
}

function Jumbo () {
  const ref = useRef()
  const cam = useRef()
  // useFrame(({ clock }) => ( ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.15))
  return (
    <>
      <group ref={ref}>
        <Text
          hAlign="center"
          position={[0, 3, 0]}
          rotation={[0.1, 0.3, 0, 'XYZ']}
        >Hej!</Text>
      </group>
    </>
  )
}

const Logo = () => (
  <Canvas
    invalidateFrameloop
    orthographic={true}
    pixelRatio={window.devicePixelRatio}
    camera={{ position: [0, 0, 40], fov: 90, zoom: 7 }}
  >
    <ambientLight intensity={0.3} />
    <pointLight position={[40, 40, 40]} />
    <Suspense fallback={null}>
      <Jumbo />
    </Suspense>
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 2}
    />
  </Canvas>
)

export default Logo
