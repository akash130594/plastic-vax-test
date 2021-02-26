import React from 'react'
import './header.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Header = ({position}) => {
    return (
      <div className="single-post-container d-lg-flex" id="common-px">
        <div className="title-container">
          <Fade timeout={3000}>
            <p className="sub-title">{position.location}</p>
          </Fade>
          <Fade timeout={2000}>
            <h2>{position.title}</h2>
          </Fade>
          <Fade timeout={3000}>
            <p
              className="title-dec"
              dangerouslySetInnerHTML={{
                __html: position.description.replace(
                  /(?:\r\n|\r|\n)/g,
                  ' <br> '
                )
              }}
            />
          </Fade>
        </div>
        <div className="img-container d-none d-lg-block align-self-lg-end">
          <img
            src={position.featuredImage}
            alt={position.title}
            className="post-img"
          />
        </div>
      </div>
    )
}

export default Header