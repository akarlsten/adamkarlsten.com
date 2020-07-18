import React from 'react'
import { FaReact, FaJsSquare } from 'react-icons/fa'
import { GrGatsbyjs } from 'react-icons/gr'

export const TagContainer = ({ children }) => (
  <div className="tag__container">{children}</div>
)

export const Tag = ({ subject }) => {
  let Icon
  switch (subject) {
    case 'React':
      Icon = 'FaReact'
      break
    case 'Javascript':
      Icon = 'FaJsSquare'
      break
    case 'Gatsby':
      Icon = 'GrGatsbyjs'
      break
    default:
      Icon = null
      break
  }

  return <div className="tag__item">{Icon && <Icon />} {subject}</div>
}
