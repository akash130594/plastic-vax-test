import React from 'react'
import './header-careers.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Header = ({ data }) => {
  return (
    <div
      id="common-pl"
      className="career-container d-lg-flex"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8),transparent), url(${data.featuredImage})`
      }}
    >
      <div className="title-container">
        <p className="sub-title">SEE OPEN</p>
        <Fade timeout={2000}>
          <h1>{data.title}</h1>
        </Fade>
        <Fade timeout={2000}>
          <p
            className="title-dec"
            dangerouslySetInnerHTML={{
              __html: data.description.replace(/(?:\r\n|\r|\n)/g, ' <br> ')
            }}
          />
        </Fade>
      </div>
      <div className="culture-text-container d-none d-lg-block align-self-lg-end">
        <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/culture-text_qvi4bs.png" alt="Careers" className="culture-img" />
      </div>
    </div>
  )
}

export default Header
