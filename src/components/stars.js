import * as THREE from 'three'
import React, { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useUpdate } from 'react-three-fiber'
import { OrbitControls, Stars, OrthographicCamera } from 'drei'

const Starfield = ({children}) => {

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 90 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[40, 40, 40]} />
      <Stars factor={10} radius={350} fade={true} saturation={1} />
    </Canvas>
  )
}

export default Starfield