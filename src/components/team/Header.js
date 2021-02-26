import React from 'react'
import './header.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Header = ({ data }) => {
  const teamData = data.frontmatter
  return (
    <div className="team-header d-lg-flex align-items-lg-center" id="common-pl">
      <div className="title-container">
        <p className="sub-title">MEET</p>
        <Fade timeout={2000}>
          <h1>{teamData.title}</h1>
        </Fade>
        <Fade timeout={3000}>
          <p className="title-position">{teamData.position}</p>
        </Fade>
        <Fade timeout={3000}>
          <p className="title-dec">{teamData.description}</p>
        </Fade>
      </div>
      <div className="img-container">
        <div className="bg-text-container">
          <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613464328/our-team/team-text_vvqfn9.png" alt="Team Text" className="img-fluid" />
        </div>
        <Fade timeout={3000}>
          <img
            loading="lazy"
            src={teamData.featuredImage}
            alt={teamData.title}
            className="img-fluid team-img"
          />
        </Fade>
      </div>
    </div>
  )
}

export default Header
