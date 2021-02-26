import React from 'react'
import './header.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Header = ({ data }) => {
  return (
    <div className="service-header-container d-lg-flex" id="common-pl">
      <div className="title-container">
        <p className="sub-title">CG PRODUCTION</p>
        <Fade timeout={2000}>
          <h1>{data.title}</h1>
        </Fade>
        <Fade timeout={2000}>
          <p className="service-title">{data.subtitle}</p>
          <p
            className="title-dec"
            dangerouslySetInnerHTML={{
              __html: data.description.replace(/(?:\r\n|\r|\n)/g, ' <br> ')
            }}
          ></p>
        </Fade>
      </div>
      <div className="img-container">
        <div className="bg-text-container d-none d-lg-block">
          <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154623/service-text_rjdiw1.png" alt="Service Text" className="img-fluid" />
        </div>
        {data.featuredImages.map(({ image, alt, title }, index) => (
          <img
            className={`service-header-img image_${index}`}
            src={image}
            alt={alt}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Header
