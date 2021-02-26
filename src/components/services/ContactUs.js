import { Link } from 'gatsby'
import React from 'react'
import './contact.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const ContactUs = ({ description, image }) => {
  return (
    <div className="contact-us-container" id="common-px">
      <div className="contact-us-content">
        <div className="title-container text-center text-lg-left">
          <p className="sub-title">GET</p>
          <Fade timeout={2000}>
            <h2>In touch</h2>
          </Fade>
          <Fade timeout={3000}>
            <p
              className="title-dec"
              dangerouslySetInnerHTML={{
                __html: description.replace(/(?:\r\n|\r|\n)/g, ' <br> ')
              }}
            />
          </Fade>
          <Link className="project-btn" to="/contact">
            Contact Us
          </Link>
        </div>
        <div className="img-container">
          <Fade timeout={3000}>
            <img src={image} className="get-in-touch-img" alt="Contact" />
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
