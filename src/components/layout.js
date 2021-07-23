import React from 'react'
import loadable from '@loadable/component'
import Header from './header'
import { BigSquiggle } from './squiggles'

import '../styles/styles.scss'

const Layout = ({ children }) => {

  return (
    <div className="content">
      <Header />
      <main>
        <BigSquiggle />
        {children}
      </main>
    </div>
  )
}

export default Layout
