import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import Logo from './Logo'

import './Nav.scss'
import Fade from './transition/Fade'

export class Navigation extends Component {
  state = {
    active: this.props.location.pathname,
    activeSubNav: false,
    currentPath: false,
    isOpen: false,
    firstLoad: true
  }

  // componentDidMount = () => {
  //   this.setState({ active: this.props.location.pathname })
  // } 
    
  // handleMenuToggle = (tab) => {
  //   this.setState({ active: tab})
  // }

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()
  // keyboard events
  handleLinkKeyDown = ev => {
    if (ev.keyCode === 13) {
      this.state.active && this.handleMenuToggle()
    }
  }

  handleToggle = () => {    
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      firstLoad: true
    }))
  }

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })
  keyToggleSubNav = (e, subNav) => {
    // key o is for open so you can enter key to open
    if (e.keyCode === 79 || e.keyCode === 27) {
      this.toggleSubNav(subNav)
    }
  }
  render() {
    let menuStyle = {};
    if(!this.state.isOpen){
      menuStyle = {
        transform: 'scaleX(0)',
      }
    }else{
      menuStyle = {
        transform: 'scaleX(1)',
      }
    }
    return (
      <nav
        className="top-nav d-flex align-items-center justify-content-between"
        id="common-px"
      >
        <div className="logo-container">
          <Link
            to="/"
            // onClick={this.handleLinkClick}
            // onKeyDown={this.handleLinkKeyDown}
            // tabIndex={0}
            // aria-label="Navigation"
          >
            <Logo />
          </Link>
        </div>
        {
          this.state.firstLoad &&
            <div className="d-lg-none">
              <div className="mob-container d-flex flex-column align-items-center" style={menuStyle}>
                <div className="close-btn" onClick={this.handleToggle} aria-hidden="true">&#10005;</div>
                <div className="menu-text">MENU</div>
                <div className="mob-link-container">
                  <div>
                    <Fade spy={this.state.isOpen} timeout={1500}>
                      <Link to="/about" className="top-nav-link">
                        About Us
                      </Link>
                    </Fade>
                  </div>
                  <div>
                    <Fade spy={this.state.isOpen} timeout={1500}>
                      <Link to="/services" className="top-nav-link">
                        Services
                      </Link>
                    </Fade>  
                  </div>
                  <div>
                    <Fade spy={this.state.isOpen} timeout={1500}>
                      <Link to="/projects" className="top-nav-link">
                        Projects
                      </Link>
                    </Fade>                
                  </div>
                  {/* <div>
                    <Link to="/blog" className="top-nav-link">
                      News
                    </Link>
                  </div> */}
                  <div>
                    <Fade spy={this.state.isOpen} timeout={1500}>
                      <Link to="/careers" className="top-nav-link">
                        Careers
                      </Link>
                    </Fade>
                  </div>
                  <div>
                    <Fade spy={this.state.isOpen} timeout={1500}>
                      <Link to="/contact" className="top-nav-link">
                        Contact
                      </Link>
                    </Fade>
                  </div>
                </div>

                <div className="mob-menu-img">
                  <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/menu-angle_hdhmid.svg" alt="menu-angle" className="d-block" />
                </div>
              </div>
            </div> 
        }

        <div className="desktop-link-container d-none d-lg-block">
          <Link
            to="/about"
            className={
              this.state.active === '/about/' || '/about'
                ? 'active top-nav-link'
                : 'top-nav-link'
            }
          >
            About Us
          </Link>
          <Link
            to="/services"
            className={
              this.state.active === '/services/' || '/services'
                ? 'active top-nav-link'
                : 'top-nav-link'
            }
          >
            Services
          </Link>
          <Link
            to="/projects"
            className={
              this.state.active === '/projects/' || '/projects'
                ? 'active top-nav-link'
                : 'top-nav-link'
            }
          >
            Projects
          </Link>
          {/* <Link to="/blog" 
            className={this.state.active === "/blog/" || "/blog" ? "active top-nav-link" : "top-nav-link"}>
            News
          </Link> */}
          <Link
            to="/careers"
            className={
              this.state.active === '/careers/' || '/careers'
                ? 'active top-nav-link'
                : 'top-nav-link'
            }
          >
            Careers
          </Link>
          <Link
            to="/contact"
            className={
              this.state.active === '/contact/' || '/contact'
                ? 'active top-nav-link'
                : 'top-nav-link'
            }
          >
            Contact
          </Link>
        </div>
        <div className="menu-bar-container d-lg-none">
          <Link to="/" onClick={this.handleToggle}>
            <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/menu-bar_wi2z2z.png" alt="menu-bar" className="img-fluid" />
          </Link>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
