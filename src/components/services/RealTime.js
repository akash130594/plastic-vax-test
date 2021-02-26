import React from 'react'
import './real-time.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const RealTime = ({ data }) => {
  return (
    <div className="real-time-container d-lg-flex" id="common-px">
      <div className="title-container text-center text-lg-left">
        <p className="sub-title">MORE ABOUT</p>
        <Fade timeout={2000}>
          <h2>{data.title}</h2>
        </Fade>
        <Fade timeout={3000}>
          <p
            className="title-dec"
            dangerouslySetInnerHTML={{
              __html: data.description.replace(/(?:\r\n|\r|\n)/g, ' <br> ')
            }}
          />
        </Fade>
      </div>
      <div className="img-container align-self-lg-start">
        <Fade timeout={3000}>
          <img
            src={data.desktopImage}
            alt="Desktop"
            className="real-time-img big-img"
          />
          <img
            src={data.mobileImage}
            alt="Mobile"
            className="real-time-img small-img"
          />
        </Fade>
      </div>
      <div className="red-angle-container d-none d-lg-block">
        <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/menu-angle_hdhmid.svg" alt="menu angle" className="menu-angle" />
      </div>
    </div>
  )
}

export default RealTime
