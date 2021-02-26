import React from 'react'
import './Trailer.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Trailer = (props) => {
    const projectData = props.data;
    return (
      <div className="trailer-section" id="common-px">
        <p className="title" id="trailer">Watch trailer</p>
        <Fade timeout={3000}>
          <div className="video-container">
            <video src={projectData.trailer} controls type="video/mp4">
            <track default
              kind="captions"
              srclang="en"
              src="" />
            </video>
          </div>
        </Fade>

        <div className="bg-text-container d-none d-lg-block">
          <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613386174/red-angle_ls5oqk.png" alt="red angle" className="bg-img"/>
        </div>
      </div>
    )
}

export default Trailer