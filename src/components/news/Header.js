import React from 'react'
import './header.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))
const Header = ({ data }) => {
  return (
    <div className="single-news-container d-lg-flex" id="common-pl">
      <div className="title-container align-self-lg-center">
        <Fade timeout="3000">
          <p className="sub-title">{data.frontmatter.date}</p>
        </Fade>
        <Fade timeout="2000">
          <h1>{data.frontmatter.title}</h1>
        </Fade>
        <Fade timeout="3000">
          <p className="title-dec">{data.frontmatter.headerDescription}</p>
          <p className="title-dec">{data.frontmatter.hashtags}</p>
        </Fade>
      </div>
      <div className="img-container">
        <Fade timeout="3000">
          <img
            src={data.frontmatter.featuredImage}
            alt={data.frontmatter.title}
            className="header-img"
          />
        </Fade>
      </div>
    </div>
  )
}

export default Header
