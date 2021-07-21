import React from 'react'

import Header from './header'

import '../styles/styles.scss'

const Layout = ({ children }) => {

  return (
    <div className="content">
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
