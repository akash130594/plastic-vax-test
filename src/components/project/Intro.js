import React from 'react'
import './intro.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Intro = ({data}) => {
    return (
      <>
        <div
          className="intro-section d-lg-flex align-items-lg-center"
          id="common-px"
        >
          <div className="title-main-container">
            <div className="title-container">
              <h3>HEADER</h3>
              <p className="vertical-text">Intro</p>
            </div>
            <Fade timeout={2000}>
              <p className="title-dec">{data.description}</p>
            </Fade>
          </div>
          <div className="mask-img-container">
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613138737/projects/mask_hjkfnr.png"
              alt="Mask"
              className="mask-img"
            />
          </div>
        </div>
      </>
    )
}

export default Intro