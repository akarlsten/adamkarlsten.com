import React from 'react'

import Header from './header'

import '../styles/styles.scss'

const Layout = (props) => {
  const { title, children } = props

  return (
    <div className="content">
      <Header title={title} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
