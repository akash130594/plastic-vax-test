import { Link } from 'gatsby'
import React from 'react'
import FilterButtons from './FilterButton'
import './PostingList.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

class PostingList extends React.Component {
  state = {
    currentPage: 1,
    postingPerPage: 6,
    upperPageBound: 3,
    lowerPageBound: 0,
    filterBy: 'all',
    postingLists: this.props.allPostings.edges,
    counter: 0
  }

  onFilter = filterMethod => {
    const filteredPositions = this.props.allPostings.edges.filter(
      ({ node }) => {
        if (filterMethod === 'all') {
          return true
        } else {
          return node.frontmatter.location === filterMethod
        }
      }
    )
    this.setState(prevState => ({
      postingLists: filteredPositions,
      filterBy: filterMethod,
      currentPage: 1,
      counter: prevState.counter + 1
    }))
  }

  handleClick = number => {
    this.setState(prevState => ({
      currentPage: number,
      counter: prevState.counter + 1
    }))
  }
  render() {
    const { postingLists, currentPage, postingPerPage } = this.state
    const indexOfLastPosting = currentPage * postingPerPage
    const indexOfFirstPosting = indexOfLastPosting - postingPerPage
    const currentPosting = postingLists.slice(
      indexOfFirstPosting,
      indexOfLastPosting
    )
    const renderPostingList = currentPosting.map(({ node }, index) => {
      return (
        <div className="posting-list-container d-flex" key={index}>
          <div className="img-container align-self-start align-self-lg-stretch d-lg-flex align-items-lg-center">
            {/* <img src={node.frontmatter.featuredImage} className="posting-img" /> */}
            <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154622/visual-effects_nksehs.png" alt="visual-effect" className="posting-img" />
          </div>
          <div className="dec-container">
            <Fade appear={true} up spy={this.state.counter} timeout={2000}>
              <p className="dec-title">{node.frontmatter.title}</p>
            </Fade>
            <Fade appear={true} up spy={this.state.counter} timeout={3000}>
              <p>{node.frontmatter.location}</p>
            </Fade>
            <Fade appear={true} up spy={this.state.counter} timeout={3000}>
              <p className="dec">{node.frontmatter.subDescription}</p>
              <p className="dec-date">{node.frontmatter.date}</p>
            </Fade>
            <Link className="project-btn" to={node.fields.slug}>
              LEARN MORE
            </Link>
          </div>
        </div>
      )
    })

    // Logic for displaying page numbers
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(postingLists.length / postingPerPage); i++) {
      pageNumbers.push(i)
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div
          key={number}
          aria-hidden="true"
          className={
            this.state.currentPage === number
              ? 'active page-number'
              : 'page-number'
          }
          id={number}
          onClick={() => this.handleClick(number)}
        >
          {number}
        </div>
      )
    })

    return (
      <div className="posting-main-container" id="common-px">
        <div className="btn-main-container">
          <FilterButtons
            onFilter={this.onFilter}
            positionLocations={this.props.positionLocations}
          />
        </div>
        <div className="posting-list">{renderPostingList}</div>
        <div className="page-number-container d-flex justify-content-center">
          {renderPageNumbers}
        </div>
      </div>
    )
  }
}

export default PostingList
