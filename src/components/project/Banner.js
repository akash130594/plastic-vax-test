import React from 'react'
import './banner.scss'
import loadable from '@loadable/component'
import {scrollView} from '../../util/scrollView'
const Fade = loadable(() => import('../transition/Fade'))

const Banner = (props) => {
    const projectData = props.data;
    return (
      <div className="banner-main-container" id="common-pl">
        <div className="banner d-lg-flex align-items-center">
          <div className="title-container">
            <p className="sub-title"> / {projectData.year}</p>
            <Fade timeout={2000}>
              <h1>{projectData.title}</h1>
            </Fade>
            <Fade timeout={3000}>
              <p className="h1-sub-title">{projectData.subtitle}</p>
              <p className="title-dec">{projectData.description}</p>
              <p className="title-tag">{projectData.hashtags}</p>
            </Fade>
            <div className="d-none d-lg-block scroll-text-container">
              <div className="d-flex align-items-end scroll-text">
                <p onClick={() => scrollView('trailer')} aria-hidden="true">
                  SCROLL <br />
                  FOR <br />
                  MORE
                </p>
              </div>
            </div>
          </div>
          <div className="banner-img-container">
            <Fade timeout={3000}>
              <img
                loading="lazy"
                className="banner-img"
                alt={projectData.title}
                src={projectData.featuredImage}
              />
            </Fade>
            <div className="d-lg-none">
              <div className="d-flex align-items-end scroll-text">
                <p onClick={() => scrollView('trailer')} aria-hidden="true">
                  SCROLL <br />
                  FOR <br />
                  MORE
                </p>
              </div>
            </div>
            <Fade timeout={3000}>
              <div className="banner-dec d-flex align-items-center justify-content-between">
                <div className="dec-tab">
                  <p>Studio</p>
                  <p>{projectData.studio}</p>
                </div>
                <div className="dec-tab">
                  <p>Release</p>
                  <p>{projectData.release}</p>
                </div>
                <div className="dec-tab">
                  <p>Category</p>
                  <p>{projectData.type}</p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    )
}

export default Banner