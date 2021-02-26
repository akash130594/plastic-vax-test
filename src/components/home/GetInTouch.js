import { Link } from 'gatsby'
import React from 'react'
import './getintouch.scss'
// import Fade from 'react-reveal/Fade'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const GetInTouch = data => {
  const getInTouchData = data.edges[0]
  return (
    <div
      className="get-in-touch-page d-lg-flex align-items-center"
      id="common-pl"
    >
      <div className="title-container text-center text-lg-left">
        <p className="sub-title">GET</p>
        <Fade timemout={2000}>
          <h2>In touch</h2>
        </Fade>
        <Fade timemout={3000}>
          <p className="title-dec">
            {getInTouchData.node.frontmatter.description}
          </p>
        </Fade>
        <Link className="project-btn" to="/contact">
          CONTACT US
        </Link>
      </div>
      <div
        className="img-container"
        // loading="lazy"
        // style={{
        //   backgroundImage: `url(${getInTouchData.node.frontmatter.backgroundImage})`
        // }}
      >
        <img
          src={getInTouchData.node.frontmatter.backgroundImage}
          loading="lazy"
          className="bg-img"
          alt="clouds"
        />
        <div className="spider-img-container">
          <Fade timemout={2000}>
            <img
              loading="lazy"
              className="spider-img"
              alt="Spider Man"
              src={getInTouchData.node.frontmatter.featuredImage}
            />
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default GetInTouch
