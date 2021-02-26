import React from 'react'
import './inEngineAnimation.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const InEngineAnimation = ({ data }) => {
  return (
    <div className="engine-container d-lg-flex" id="common-pl">
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
          ></p>
        </Fade>
      </div>
      <div className="img-container align-self-lg-end">
        <Fade timeout={3000}>
          <img src={data.image} alt={data.alt} className="engine-img" />
        </Fade>
      </div>
      <div className="bg-text-container d-none d-lg-block">
        <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/anima-text_tzd23y.png" alt="animation" className="anima-img" />
      </div>
    </div>
  )
}

export default InEngineAnimation
