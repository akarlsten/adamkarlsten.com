import * as THREE from 'three'
import React, { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useUpdate } from 'react-three-fiber'
import { OrbitControls, OrthographicCamera } from 'drei'

function Text({ children, texture, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) {
  const font = useLoader(THREE.FontLoader, '/fredoka.blob')
  const config = useMemo(
    () => ({ font, size: 80, height: 15, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    [font]
  )
  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )

  const [hovered, setHover] = useState(false)

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh} 
      onPointerOver={(e) => { setHover(true)}}
      onPointerOut={(e) => {setHover(false)}}
      >
        <textGeometry attach="geometry" args={[children, config]} />
        <meshStandardMaterial map={texture} color={hovered ? 'white' : "#ffcc59"} attach="material" />
      </mesh>
    </group>
  )
}

function Background({size, color, hAlign = 'center', vAlign = 'center', children, ...props}) {
  // const mesh = useUpdate(
  //   self => {
  //     const size = new THREE.Vector3()
  //     self.geometry.computeBoundingBox()
  //     self.geometry.boundingBox.getSize(size)
  //     self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
  //     self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
  //   },
  //   [children]
  // )
  return (
    <mesh {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <circleBufferGeometry attach="geometry" args={[8, 64]} />
      <meshLambertMaterial color={color} attach="material" />
    </mesh>
  )
}

function Jumbo() {
  const ref = useRef()
  const cam = useRef()
  useFrame(({ clock }) => ( ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.15))
  return (
    <>
    <group ref={ref}>
      {/* <Background color="green" size={16} rotation={[0.1, 0.3, 0]} position={[-15, 0, 0]} />
      <Background color="orange" size={14} rotation={[0.1, 0.3, 0]} position={[-10, 5, 0]} />
      <Background color="hotpink" size={8} rotation={[0.1, 0.3, 0]} position={[0, 0, -5]} /> */}
      <Text hAlign="center" position={[0, 0, 0]} rotation={[0.1, 0.3, 0, 'XYZ']} children="Adam Karlsten" />
    </group>
    </>
  )
}

const Logo = () => (
  <Canvas orthographic={true} pixelRatio={window.devicePixelRatio} camera={{ position: [0, 0, 40] , fov: 90, zoom: 7}}>
    <ambientLight intensity={0.4} />
    <pointLight position={[40, 40, 40]} />
    <Suspense fallback={null}>
      <Jumbo />
    </Suspense>
    <OrbitControls />
  </Canvas>
)

export default Logo