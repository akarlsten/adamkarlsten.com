import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { IconContext } from "react-icons"
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa"

const Social = () => {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            github
            twitter
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata

  return (
    <IconContext.Provider value={{ className: "social__icon" }}>
      <div className="social">
        <h3 className="social__header">Get in touch</h3>
        <div className="social__link social__link--mail">
          <p>adamkarlsten[at]gmail.com</p> <FaEnvelope />
        </div>
        <a
          className="social__link"
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{social.github}</p> <FaGithub />
        </a>
        <a
          className="social__link"
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{social.twitter}</p> <FaTwitter />
        </a>
      </div>
    </IconContext.Provider>
  )
}

export default Social
