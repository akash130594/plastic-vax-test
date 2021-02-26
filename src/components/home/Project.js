import { Link } from 'gatsby'
import React from 'react'
import './project.scss'
import loadable from '@loadable/component'
import {scrollView} from '../../util/scrollView'
const Fade = loadable(() => import('../transition/Fade'))

// import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

// const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
// const FadeUp = batch(Fade(), Move(), Sticky());

class Project extends React.Component {
  // Setting State for displying project
  state = {
    selected: '',
    title_part_one: '',
    title_part_two: '',
    subtitle: "",
    description: '',
    learnMore: '',
    backgroundImage: '',
    trailer: '',
    goingUp: false,
    show: true,
    
  }
  // Set state for on changing projects
  changeProject = slug => {
    const selectedProject = this.props.edges.filter(
      ({ node }) => node.fields.slug === slug
    )
    selectedProject.map(({ node }) => {
      return this.setState(this.prepareState(node))
    })
  }

 prepareState = node => ({
    title: node.frontmatter.title,
    title_part_one: node.frontmatter.title.substr(0,node.frontmatter.title.indexOf(' ')),
    title_part_two: node.frontmatter.title.substr(node.frontmatter.title.indexOf(' ')+1),
    subtitle: node.frontmatter.subtitle,
    description: node.frontmatter.description,
    learnMore: node.fields.slug,
    selected: node.fields.slug,
    backgroundImage: node.frontmatter.homePageFeaturedImage,
    trailer: node.frontmatter.trailer
  })

  // Set state when first time home page is loaded.
  componentDidMount = () => {
    this.setState(this.prepareState(this.props.edges[0].node))
  }

  render() {
    return (
      <div className="home-page" id="common-pl">
        <div className="d-flex flex-column h-100 justify-content-lg-end">
          <div className="d-lg-flex align-items-lg-end header-container mb-lg-5">
            <div className="title-container">
              <p>PROJECT</p>
              <Fade spy={this.state.selected} timeout={2000}>
                <h1>{this.state.title_part_one}</h1>
              </Fade>
              <Fade spy={this.state.selected} timeout={3000}>
                <h1>{this.state.title_part_two}</h1>
              </Fade>
              <Fade spy={this.state.selected} timeout={3500}>
                <p className="title-dec">{this.state.description}</p>
              </Fade>
            </div>
            <div>
              <Link className="project-btn ml-lg-4" to={this.state.learnMore}>
                Learn More
              </Link>
            </div>
          </div>
          <div className="scroll-text-container mt-auto mt-lg-0">
            <div className="d-flex align-items-end scroll-text">
              <p onClick={() => scrollView('clients')} aria-hidden="true">
                SCROLL <br />
                FOR <br />
                MORE
              </p>
            </div>
          </div>
        </div>
        <div className="project-btn-container d-flex align-items-center justify-content-between  d-lg-block">
          {this.props.edges.map(({ node }) => {
            return (
              <div
                className={
                  this.state.selected === node.fields.slug
                    ? 'banner-btn active'
                    : 'banner-btn'
                }
                key={node.fields.slug}
                aria-hidden="true"
                onClick={() => this.changeProject(node.fields.slug)}
              >
                {node.frontmatter.title}
              </div>
            )
          })}
        </div>
        <video
          className="banner-img playing"
          src={this.state.trailer}
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
        ></video>
      </div>
    )
  }
}

export default Project
