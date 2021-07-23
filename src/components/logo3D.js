import React, { useState, useEffect, Suspense, useMemo, useCallback, useRef, forwardRef, useLayoutEffect } from 'react'
import { FontLoader, Vector3, Color } from 'three'
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber'


const Text = forwardRef(({
  children,
  texture,
  material,
  vAlign = 'center',
  hAlign = 'center',
  size = 1,
  ...props
}, ref) => {
  const font = useLoader(FontLoader, '/fredoka_ak.json')
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

  return (
    <group {...props} scale={0.1}>
      <mesh
        ref={ref}
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
})

const Word = ({ hovered, secretMode }) => {
  const [letterRefs, setLetterRefs] = useState([])
  const group = useRef()

  const bigA = useRef()
  const d = useRef()
  const a = useRef()
  const m = useRef()
  const bigK = useRef()
  const aLast = useRef()
  const r = useRef()
  const l = useRef()
  const s = useRef()
  const t = useRef()
  const e = useRef()
  const n = useRef()

  const timer = useRef(0)

  const { viewport } = useThree()

  const scaleFactor = useRef(1)

  useEffect(() => {
    const { width } = viewport
    if (width > 78) {
      scaleFactor.current = 1
    } else if (width > 50) {
      scaleFactor.current = 0.7
    } else if (width > 38) {
      scaleFactor.current = 0.5
    } else {
      scaleFactor.current = 0.3
    }

    if (width < 50) {
      group.current.position.x = -1.5
      group.current.position.y = -1
    }
  }, [viewport])

  useEffect(() => {
    if (hovered) {
      timer.current = Date.now()
    }
  }, [hovered])


  useLayoutEffect(() => {
    setLetterRefs([
      bigA.current,
      d.current,
      a.current,
      m.current,
      bigK.current,
      aLast.current,
      r.current,
      l.current,
      s.current,
      t.current,
      e.current,
      n.current
    ])
  }, [])

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const approachStartingValue = (property, increment, start = 0) => {
    if (property > start) {
      if (property - increment < start) {
        property = start
      } else {
        property -= increment
      }
    } else if (property < start) {
      if (property + increment > start) {
        property = start
      } else {
        property += increment
      }
    }

    return property
  }

  const sphereRef = useRef()

  useFrame((state, delta) => {
    const now = Date.now()
    const timeElapsed = (now - timer.current) / 1000

    if (hovered && !reduceMotion) {
      letterRefs.forEach((letter, index) => {
        const sine = Math.sin((timeElapsed + index) * 5) * 10

        letter.position.y = secretMode ? sine * 3 : sine

        if (secretMode) {
          letter.rotation.y = index % 2 === 0 ? letter.rotation.y + sine / 100 : letter.rotation.y - sine / 100
          letter.rotation.x = index % 2 === 0 ? letter.rotation.x + sine / 120 : letter.rotation.x - sine / 120
          letter.rotation.z = index % 2 === 0 ? letter.rotation.z + sine / 150 : letter.rotation.z - sine / 150
        }
      })
    } else {
      letterRefs.forEach((letter, index) => {

        // Return to starting positions

        letter.position.y = approachStartingValue(letter.position.y, delta * 15, 0)
        // secret mode rotations
        letter.rotation.x = approachStartingValue(letter.rotation.x, delta * 5, 0)
        letter.rotation.y = approachStartingValue(letter.rotation.y, delta * 5, 0)
        letter.rotation.z = approachStartingValue(letter.rotation.z, delta * 5, 0)

      })
    }
  })

  return (
    <group ref={group} scale={1 * scaleFactor.current} rotation={[0.1, 0.3, 0, 'XYZ']} position={[-3.5, -2, 0]}>
      <Text
        ref={bigA}
        position={[-35, 0, 0]}
      >A</Text>
      <Text
        ref={d}
        position={[-27, 0, 0]}
      >d</Text>
      <Text
        ref={a}
        position={[-20.5, 0, 0]}
      >a</Text>
      <Text
        ref={m}
        position={[-13.5, 0, 0]}
      >m</Text>
      <Text
        ref={bigK}
        position={[-2, 0, 0]}
      >K</Text>
      <Text
        ref={aLast}
        position={[4.5, 0, 0]}
      >a</Text>
      <Text
        ref={r}
        position={[11, 0, 0]}
      >r</Text>
      <Text
        ref={l}
        position={[16, 0, 0]}
      >l</Text>
      <Text
        ref={s}
        position={[20, 0, 0]}
      >s</Text>
      <Text
        ref={t}
        position={[25.5, 0, 0]}
      >t</Text>
      <Text
        ref={e}
        position={[30.5, 0, 0]}
      >e</Text>
      <Text
        ref={n}
        position={[37, 0, 0]}
      >n</Text>
    </group>
  )
}

const Logo3D = ({ secretMode }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Canvas
        anti
        flat={true}
        orthographic={true}
        dpr={window.devicePixelRatio}
        camera={{ position: [0, 0, 40], fov: 90, zoom: 7 }}
      >
        <ambientLight intensity={0.06} />
        <pointLight intensity={1.25} position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <Word hovered={hovered} secretMode={secretMode} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Logo3D