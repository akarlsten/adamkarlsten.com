import React from 'react'
import { FaReact, FaJsSquare, FaCog, FaNodeJs } from 'react-icons/fa'
import { GrGatsbyjs } from 'react-icons/gr'

export const TagContainer = ({ children }) => (
  <div className="tag__container">{children}</div>
)

const Icon = ({ subject }) => {
  switch (subject) {
    case 'React':
      return <FaReact />
    case 'Javascript':
      return <FaJsSquare />
    case 'Gatsby':
      return <GrGatsbyjs />
    case 'Node':
      return <FaNodeJs />
    case 'Express':
      return <FaJsSquare />
    default:
      return <FaCog />
  }
}

export const Tag = ({ subject }) => {
  return <div className="tag__item"><Icon subject={subject} /> {subject}</div>
}
