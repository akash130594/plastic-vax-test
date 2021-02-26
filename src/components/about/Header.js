import React from 'react'
import './header.scss'
import loadable from '@loadable/component'
import {scrollView} from '../../util/scrollView'
const Fade = loadable(() => import('../transition/Fade'))

const Header = ({ data }) => {
  return (
    <div className="header-section d-lg-flex align-items-lg-center" id="common-pl">
      <div className="title-container">
        <div>
          <p className="sub-title">Our</p>
          <Fade timeout={2000} up>
            <h1>Culture</h1> 
          </Fade>
          <Fade timeout={3000} up>
            <p className="title-dec">{data.frontmatter.description}</p>
          </Fade>
        </div>
      </div>
      <div className="background-text">
        <img loading="lazy" src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613138364/about/culture-text_ruqua5.png" alt="culture" className="text-img img-fluid" />
      </div>
      <div className="d-flex align-items-end scroll-text">
        <p onClick={() => scrollView('story')} aria-hidden="true">
          SCROLL <br />
          FOR <br />
          MORE
        </p>
      </div>
      {data.frontmatter.ceo.map(({ image, alt, title }, index) => (
        <div
          className="img-main-container d-lg-flex align-items-lg-end"
          key={index}
        >
          <div className="img-dec d-none d-lg-block">
            <p>{title}</p>
            <p>CEO</p>
          </div>
          <div className="img-container ">
            <Fade timeout={3000} up>
              <img loading="lazy" src={image} alt={alt} className="culture-img" /> 
            </Fade>
            {/* <img src="./images/ceo.png" className="culture-img" /> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Header
