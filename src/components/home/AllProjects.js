import React from 'react'
import { Link } from 'gatsby'
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './allprojects.scss'
import loadable from '@loadable/component'
import { navigate } from '@reach/router';
const Fade = loadable(() => import('../transition/Fade'))
const Carousel = loadable(() => import('react-multi-carousel'))

const responsive = {
    desktop: {
      breakpoint: { max: 1920, min: 993 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 992, min: 769 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1
    }
  };
  
  class AllProjects extends React.Component {
    state = { additionalTransfrom: 0, activeButton: "", show: false, goingUp: false };
    toggleCarousel = (buttonName) => {
      this.setState({
        activeButton: buttonName
      })
    }
    render() {
        const desktopViewProjectsList = this.props.edges
        const length = 3;
        var mobileViewProjectList = this.props.edges.slice(0, length).map(i => {
            return i;
        })
        const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
          const { carouselState: { currentSlide } } = rest;
          return (
            <div className="carousel-btn-group d-flex align-items-center">
              <button
                className={
                  // currentSlide === 0 && this.state.activeButton != 'prev' ? 'disable' : 'active'
                  this.state.activeButton === 'prev' ? 'active' : ''
                }
                onClick={() => {
                  this.toggleCarousel('prev')
                  previous()
                }}
              >
                <svg
                  className="d-block"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="active-path"
                    d="M20 -1.74846e-06C25.3421 -1.28143e-06 30.3647 2.08038 34.1422 5.85785C37.9196 9.63531 40 14.6579 40 20C40 25.3421 37.9196 30.3647 34.1422 34.1422C30.3647 37.9196 25.3421 40 20 40C14.6579 40 9.63532 37.9196 5.85785 34.1421C2.08038 30.3647 1.28143e-06 25.3421 1.74846e-06 20C2.21548e-06 14.6579 2.08039 9.63531 5.85785 5.85785C9.63532 2.08038 14.6579 -2.21548e-06 20 -1.74846e-06ZM20 36.875C29.3048 36.875 36.875 29.3048 36.875 20C36.875 10.6952 29.3048 3.125 20 3.125C10.6952 3.125 3.125 10.6952 3.125 20C3.125 29.3048 10.6952 36.875 20 36.875ZM11.8527 20L22.6563 30.8035L24.866 28.5937L16.2723 20L24.866 11.4062L22.6563 9.19647L11.8527 20Z"
                    fill="black"
                  />
                </svg>
              </button>
              <button 
                className={
                  // currentSlide === 0 && this.state.activeButton != 'prev' ? 'disable' : 'active'
                  this.state.activeButton === 'next' ? 'active' : ''
                }
                onClick={() => {
                  this.toggleCarousel('next') 
                  goToSlide(currentSlide + 1)}}
                >
                <svg
                  className="d-block"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="active-path"
                    d="M20 40C14.6579 40 9.63531 37.9196 5.85785 34.1422C2.08038 30.3647 0 25.3421 0 20C0 14.6579 2.08038 9.63531 5.85785 5.85785C9.63531 2.08038 14.6579 0 20 0C25.3421 0 30.3647 2.08038 34.1422 5.85785C37.9196 9.63531 40 14.6579 40 20C40 25.3421 37.9196 30.3647 34.1422 34.1422C30.3647 37.9196 25.3421 40 20 40ZM20 3.125C10.6952 3.125 3.125 10.6952 3.125 20C3.125 29.3048 10.6952 36.875 20 36.875C29.3048 36.875 36.875 29.3048 36.875 20C36.875 10.6952 29.3048 3.125 20 3.125ZM28.1473 20L17.3438 9.19647L15.134 11.4062L23.7277 20L15.134 28.5938L17.3438 30.8035L28.1473 20Z"
                    fill="black"
                  />
                </svg>
              </button>
              <div 
              onClick={() => {
                navigate('/projects')
              }}
              aria-hidden="true"  
              className="see-all-project">See all project</div>
            </div>
          )
        };
      return (
        <div className="project-section" id="common-pl">
          <div className="title-container">
            <p className="vertical-text">
              See All <span className="d-block d-lg-inline-block">of our</span>
            </p>
            <h3>Projects</h3>
          </div>
          <div className="d-none d-lg-block desktop-view">
            <div className="project-card">
              <Carousel
                ssr={false}
                ref={el => (this.Carousel = el)}
                infinite={false}
                partialVisbile={false}
                responsive={responsive}
                showDots={false}
                containerClass="carousel-container-with-scrollbar"
                additionalTransfrom={-this.state.additionalTransfrom}
                dotListClass="custom-dot-list-style "
                removeArrowOnDeviceType={['tablet', 'mobile']}
                itemClass="card-item"
                arrows={false}
                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
                beforeChange={nextSlide => {
                  if (
                    nextSlide !== 0 &&
                    this.state.additionalTransfrom !== 150
                  ) {
                    this.setState({ additionalTransfrom: 150 })
                  }
                  if (
                    nextSlide === 0 &&
                    this.state.additionalTransfrom === 150
                  ) {
                    this.setState({ additionalTransfrom: 0 })
                  }
                }}
              >
                {desktopViewProjectsList.map(({ node }) => (
                  <div
                    key={node.fields.slug}
                    className="carousel-img-container d-lg-flex flex-lg-column justify-content-lg-between"
                  >
                    <img
                      draggable={false}
                      loading="lazy"
                      className="carousel-img"
                      src={node.frontmatter.homePageProjectImage}
                      alt={node.frontmatter.title}
                    />
                    <Fade timeout={1000}>
                      <p className="img-title">{node.frontmatter.title}</p>
                    </Fade>
                    <Fade timeout={1500}>
                      <p className="img-dec">{node.frontmatter.description}</p>
                    </Fade>
                    <Link className="img-btn" to={node.fields.slug}>
                      Learn More
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="d-lg-none mobile-view">
            <div className="project-card">
              {mobileViewProjectList.map(({ node }) => (
                <div key={node.fields.slug} className="carousel-img-container">
                  <img
                    draggable={false}
                    loading="lazy"
                    className="carousel-img"
                    src={node.frontmatter.homePageProjectImage}
                    alt={node.frontmatter.title}
                  />
                  <p className="img-title">{node.frontmatter.title}</p>
                  <p className="img-dec">{node.frontmatter.description}</p>
                  <Link className="img-btn" to={node.fields.slug}>
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="see-all-project d-lg-none">See all project</div>
        </div>
      )
    }
  }
  
export default AllProjects