import React from 'react'
import './PreRenderedAnimation.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const PreRenderedAnimation = ({data}) => {
    return (
      <div className="pre-rendered-container d-lg-flex" id="common-px">
        <div className="title-container text-center text-lg-left">
          <p className="sub-title">MORE ABOUT</p>
          <Fade timeout={2000}>
            <h2>{data.title}</h2>
          </Fade>
          <Fade timeout={2000}>
            <p
              className="title-dec"
              dangerouslySetInnerHTML={{
                __html: data.description.replace(/(?:\r\n|\r|\n)/g, ' <br> ')
              }}
            ></p>
          </Fade>
        </div>
        <div className="img-container">
          <Fade timeout={2000}>
            <img src={data.image} alt={data.alt} className="pre-rendered-img" />
          </Fade>
        </div>
        <div className="red-angle-container d-none d-lg-block">
          <img
            src="https://res.cloudinary.com/dhuii7xg2/image/upload/v1614154621/left-angle_ugsk98.png"
            alt="left angle"
            className="menu-angle"
          />
        </div>
      </div>
    )
}
export default PreRenderedAnimation