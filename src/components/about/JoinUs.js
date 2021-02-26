import { Link } from 'gatsby'
import React from 'react'
import './join-us.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const JoinUs = ({ data }) => {
  return (
    <div className="join-section-container" id="common-px">
      <div className="join-section">
        <div className="title-container text-center text-lg-left">
          <Fade timeout={2000}>
            <h2>Join us!</h2>
          </Fade>
          <Fade timeout={3000}>
            <p className="title-dec">{data.frontmatter.join_us_description}</p>
          </Fade>
          <Link className="project-btn" to="/careers">
            See Opened Positions
          </Link>
        </div>
        <div className="join-text-container">
          <img loading="lazy" src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613138375/about/join-text_rb4f1j.png" alt="join-text" className="join-text-img" />
        </div>
      </div>
    </div>
  )
}

export default JoinUs
