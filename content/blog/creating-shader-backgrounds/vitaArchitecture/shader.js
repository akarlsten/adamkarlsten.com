import React, { useState, useEffect, Suspense, useMemo, useCallback, useRef, forwardRef, useLayoutEffect } from 'react'
import { Vector2, Color, Object3D, Texture } from 'three'
import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber'
import { shaderMaterial, useTexture } from '@react-three/drei'

import irridescent from './irridescent.jpg'
import alphaImage from './alpha.png'


const VitaMaterial = shaderMaterial({
  uDisp: 1.,
  uTime: 0.,
  uRadius: 1.73,
  uRadius2: 1.73,
  uRes: new Vector2(),
  uRes2: new Vector2(),
  uRes3: new Vector2(),
  uMap: new Texture(),
  uMask: new Texture(),
  uArchAlpha: 1.,
  uArchDisp: 0.7,
  uMapScale: 1.05,
  uMaskScale: 1.,
  uForce: 0.
}, `
uniform float uDisp;
uniform float uTime;
uniform float uRadius;
uniform vec2 uRes;

varying vec2 vUv;

float wave(vec2 _origin, vec2 _pos) {
  float r = 0.2;
  float thickness = 0.05;
  return 1.0 - (smoothstep(r, r + thickness, distance(_origin, _pos.xy)) + (1.0 - smoothstep(r - thickness, r, distance(_origin, _pos.xy))));
}

float borderWave(vec2 _origin, vec2 _pos) {
  float r = uRadius + 0.125;
  float thickness = 0.08;
  float d = distance(_origin, _pos.xy);
  float w = (smoothstep(r, r + thickness, d) + (1.0 - smoothstep(r - thickness, r, d)));
  return w;
}

void main() {
  vUv = uv;

  float scale = uRes.x / uRes.y;
  vec2 uv2 = vUv;
  uv2.x *= scale;

  vec3 pos = position;

  vec2 origin = vec2(0.1 * scale, 0.5);

  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

  gl_Position = projectionMatrix * mvPosition;
}
`, `
uniform sampler2D uMap;
uniform sampler2D uMask;
// uniform sampler2D uTouch;
uniform float uDisp;
uniform float uArchDisp;
uniform float uArchAlpha;
uniform vec2 uRes;
uniform vec2 uRes2;
uniform vec2 uRes3;
uniform float uTime;
uniform float uRadius;
uniform float uRadius2;

uniform float uMapScale;
uniform float uMaskScale;

varying vec2 vUv;

float wave(vec2 _origin, vec2 _pos, float _r) {
  float thickness = 0.1;
  float d = distance(_origin, _pos.xy);
  // float w = (smoothstep(_r, _r + thickness, d) + (1.0 - smoothstep(_r - thickness, _r, d)));
  float w = smoothstep(_r, _r + thickness, d);
  return w;
}

float borderWave(vec2 _origin, vec2 _pos, float _r) {
  float thickness = 0.03 * uDisp;
  float d = distance(_origin, _pos.xy);
  float w = (smoothstep(_r, _r + thickness, d) + (1.0 - smoothstep(_r - thickness, _r, d)));
  return w;
}

vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}

void main() {
  float scale = uRes.x / uRes.y;

  vec2 meshRes = uRes3;
  vec2 videoRes = uRes2;

  vec2 uv2 = vUv;
  // uv2.x *= scale;

  // touch
  // vec4 touchTexel = texture2D(uTouch, vUv);

  // waves
  vec2 origin = vec2(0.5 * scale, 0.5);
  float wave1 = 1.0 - borderWave(origin, uv2, 0.3 * uRadius);
  float wave2 = 1.0 - borderWave(origin, uv2, 0.3 * uRadius);
  float wave3 = wave(origin, uv2, 0.27 * uRadius);

  float wave4 = 1.0 - borderWave(origin, uv2, 0.4 * uRadius);
  float wave5 = 1.0 - borderWave(origin, uv2, 0.2 * uRadius);

  float wave6 = 1.0 - borderWave(origin, uv2, 0.05 * uRadius);
  float wave7 = 1.0 - borderWave(origin, uv2, 0.5 * uRadius);

  float wave8 = 1.0 - borderWave(origin, uv2, 0.25 * uRadius);
  float wave9 = 1.0 - borderWave(origin, uv2, 0.1 * uRadius);

  float wave10 = wave(origin, uv2, 0.15 * uRadius);
  float wave11 = wave(origin, uv2, 0.35 * uRadius);

  float wave12 = wave(origin, uv2, 0.35 * uRadius);

  // iridescent
  vec2 uv4 = vUv;
  // uv4.y += 0.4;
  uv4 -= 0.5;
  uv4 /= 1.35 * uMapScale;
  uv4.x *= scale;
  uv4 += 0.5;

  uv4 += 0.1 * (1.0 - wave3);
  uv4 += 0.05 * wave1;
  uv4 += 0.05 * wave4;
  uv4 += 0.05 * wave5;
  uv4 += 0.05 * wave6;
  uv4 += 0.05 * wave7;
  uv4 += 0.05 * wave8;
  uv4 += 0.05 * wave9;

   //uv4 += 0.1 * (1.0 - wave10);
   // uv4 += 0.1 * (1.0 - wave11);

  // uv4 += 0.2 * touchTexel.r;

  vec4 texel = texture2D(uMap, uv4); //uv4


  // arch mask
  vec4 mask = texture2D(uMask, vUv);
  // vec3 grey = vec3(238. / 255.);

  vec3 grey = vec3(100. / 255.);

  vec3 archColor = mix(grey, texel.rgb, uArchAlpha);

  vec3 color1 = mix(archColor, grey, 1.0 - mask.a);
  // color1 += 0.2 * wave1;


  vec3 color = color1;

   gl_FragColor.rgb = color;
   gl_FragColor.a = 1.0;
}
`)

extend({ VitaMaterial })


const ShaderObject = ({ specialMode }) => {
  const mesh = useRef()
  const material = useRef()

  const texture = useTexture(irridescent)
  const alphaTex = useTexture(alphaImage)

  const timer = useRef(0.6)

  const { clock, size, gl, viewport, camera } = useThree()

  useFrame((state, delta) => {
    const speedFactor = specialMode ? 15 : 1

    mesh.current.material.uniforms.uDisp.value = 1 + (Math.sin(clock.getElapsedTime()) + 1) / 2
    mesh.current.material.uniforms.uMapScale.value = 1.05 - Math.sin(clock.getElapsedTime() * 0.5) * 0.1
    mesh.current.material.uniforms.uRadius.value = 0.7 + ((Math.sin(clock.getElapsedTime() * 0.4) + 1) / 2) * 0.8
    mesh.current.material.uniforms.uRadius2.value = 0.7 + ((Math.sin(clock.getElapsedTime() * 0.6) + 1) / 2) * 1
    camera.rotation.z += delta * 0.1 * speedFactor

    if (specialMode) {
      mesh.current.material.uniforms.uRes.value.x += Math.sin(clock.getElapsedTime()) * 0.2
      // mesh.current.material.uniforms.uRes.value.y += Math.sin(clock.getElapsedTime()) * 2.2
    }

  })

  return (
    <>
      <mesh ref={mesh} position={[0, 0, -800]}>
        {/* <planeBufferGeometry args={[size.width, size.height, 100, 100]} /> */}
        <circleBufferGeometry args={[size.width / 2, 100, 100]} rotation={[0, 0, 0]} />
        <vitaMaterial ref={material} uMask={alphaTex} uRes={[alphaTex.image.width, alphaTex.image.height]} uRes2={[size.width, size.height]} uRes3={[size.width, size.height]} uMap={texture} />
      </mesh>
    </>
  )
}


const Background = () => {
  const [specialMode, setSpecialMode] = useState(false)
  return (
    <div onClick={() => setSpecialMode(!specialMode)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40rem', width: '100%', backgroundColor: '#141622' }}>
      {specialMode && (
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <h3 style={{ fontSize: '10rem' }}>😎</h3>
          <p style={{ color: '#141622', textAlign: 'center', fontSize: '2rem' }}>This is HTML</p>
        </div>
      )}
      <Canvas
        style={{ borderRadius: '10px', height: '40rem', width: '40rem', maxWidth: '85vw', marginLeft: '1rem', marginRight: '1rem' }}
        mode="concurrent"
        anti
        alpha={true}
        orthographic={true}
        dpr={window.devicePixelRatio}
        camera={{ position: [0, 0, 100], fov: 45 }}
      >
        <Suspense fallback={null}>
          <ShaderObject specialMode={specialMode} />
        </Suspense>
      </Canvas>
    </div>
  )
}


export default Background