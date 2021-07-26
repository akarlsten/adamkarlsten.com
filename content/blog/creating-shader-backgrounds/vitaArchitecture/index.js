import React, { Suspense, useEffect, useState } from 'react'
import loadable from '@loadable/component'


import Fallback from '../fallback'

const ShaderBackground = loadable(({ path }) => import(`./shader`))


const CreationShader = () => {
  const isBrowser = typeof window !== "undefined"

  return isBrowser ?
    (
      <ShaderBackground fallback={<Fallback />} />
    ) : (
      <Fallback />
    )
}

export default CreationShader