import React from 'react'
import './photo-real.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const PhotoReal = ({ data }) => {
  return (
    <div
      className="photo-real-container d-lg-flex align-items-lg-center"
      id="common-px"
    >
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
      <div className="img-container">
        <Fade timeout={3000}>
          <img src={data.image} alt={data.alt} className="women-img" />
        </Fade>
        <div className="move-img-container">
            <img
              src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1612874828/services/Vector_3_xz4ij4.png"
              alt="Vector"
              className="move-img"
            />
          <p>
            Move to <br /> see more
          </p>
        </div>
      </div>
      <div className="red-angle-container d-none d-lg-block">
        <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/menu-angle_hdhmid.svg" alt="menu angle" className="menu-angle" />
      </div>
    </div>
  )
}

export default PhotoReal
