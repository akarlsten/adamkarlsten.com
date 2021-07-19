import React, { useState } from 'react'
import { Link } from 'gatsby'

import Logo from './logo'

const Header = props => {
  const [secretMode, setSecretMode] = useState(false)

  return (
    <header className="mainheader">
      <h1 className="mainheader__title">
        <Link to={'/'}>
          <Logo secretMode={secretMode} />
        </Link>
        <div onClick={() => setSecretMode(!secretMode)} className="mainheader__title-secret">{secretMode ? '🤪' : '🤨'}</div>
      </h1>
      <nav className="mainheader__menu">
        <ul>
          <li>
            <h3 className="mainheader__menuitem">
              <Link
                to={'/projects'}
                activeClassName="mainheader__menuitem--active"
                partiallyActive={true}
              >
                Projects
              </Link>
            </h3>
          </li>
          <li>
            <h3 className="mainheader__menuitem">
              <Link
                to={'/blog'}
                activeClassName="mainheader__menuitem--active"
                partiallyActive={true}
              >
                Blog
              </Link>
            </h3>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
