import React from 'react'
import Form from './Form'
import './PageTemplate.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const PageTemplate = ({data}) => {
    return (
      <div className="page-template-container d-lg-flex" id="common-px">
        <div className="title-content">
          <div className="title-container">
            <p className="sub-title">GET IN TOUCH</p>
            <Fade timeout={2000}>
              <h1>Contact Us</h1>
            </Fade>
            <Fade timeout={3000}>
              <p className="title-dec"> {data.frontmatter.description}</p>
            </Fade>
          </div>
          <div className="img-main-container d-lg-flex justify-content-lg-between">
            {data.frontmatter.offices.map((office, index) => (
              <Fade timeout={3000} key={index}>
                <div className="img-container">
                  <img
                    src={office.image}
                    alt={office.alt}
                    className="office-img"
                  />
                  <div className="img-dec">
                    <p className="office-text">Office</p>
                    <p className="city-text">{office.city}</p>
                    <p>{office.contactNumber}</p>
                    <p>{office.address}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
        <div className="form-content">
          <p className="form-title">Drop us a line</p>
          <div className="form-container">
            <Fade timeout={3000}>
              <Form />
            </Fade>
          </div>
        </div>
        <div className="bg-text-container d-none d-lg-block">
          <img
            src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/contact-text_a1qnh9.png"
            alt="contact-text"
            className="contact-img"
          />
        </div>
      </div>
    )
}

export default PageTemplate