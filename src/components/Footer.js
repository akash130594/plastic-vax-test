import React from 'react'
import { Link } from 'gatsby'
import Logo from './Logo'
import './Footer.scss'

export default () => (
  <footer className="footer" id="common-px">
    <div className="d-flex flex-column align-items-center justify-content-center flex-lg-row align-items-lg-start justify-content-lg-between position-relative">
      <div className="logo-column">
        <div className="logo-container mx-auto mx-lg-0">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <p className="description text-center text-lg-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          cursus justo sit amet sodales posuere. Duis at nulla rutrum, efficitur
          turpis sed, vestibulum magna. Nullam quis ultrices dolor. Nam semper
          faucibus feugiat.
        </p>
      </div>
      <div className="footer-link-container">
        <div>
          <Link to="/about" className=" footer-link">
            About Us
          </Link>
        </div>
        <div>
          <Link to="/services" className=" footer-link">
            Services
          </Link>
        </div>
        <div>
          <Link to="/projects" className=" footer-link">
            Projects
          </Link>
        </div>
        <div>
          <Link to="/our-team" className=" footer-link">
            Our Team
          </Link>
        </div>
        {/* <div>
          <Link to="/blog" className=" footer-link">
            News
          </Link>
        </div> */}
        <div>
          <Link to="/contact" className=" footer-link">
            Contact
          </Link>
        </div>
      </div>

      <div className="social-icon-container">
        <p>Follow us here:</p>
        <div className="d-flex align-items-center justify-content-center">
          <div className="social-icon">
            <Link to="/" className="">
              <img loading="lazy" src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613638885/facebook_kmulvl.png" alt="facebook" className="d-block img-fluid" />
            </Link>
          </div>
          <div className="social-icon mx-3">
            <Link to="/" className="">
              <img loading="lazy" src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613638885/instagram_ojdher.png" alt="instagram" className="d-block img-fluid" />
            </Link>
          </div>
          <div className="social-icon">
            <Link to="/" className="">
              <img loading="lazy" src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613638885/twitter_ijg5wc.png" alt="twitter" className="d-block img-fluid" />
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="copyright-column">
      <p>All Rights Reserved Plasticwax 2020.</p>
    </div>
  </footer>
)
