import { Link } from 'gatsby'
import React from 'react'
import './news-list.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

class NewsList extends React.Component {
  state = {
    currentPage: 1,
    newsPerPage: 12,
    upperPageBound: 3,
    lowerPageBound: 0,
    newsLists: this.props.newsLists.edges,
    counter: 0,
  }

  handleClick = number => {
    this.setState(prevState => ({
      currentPage: number,
      counter: prevState.counter + 1
    }))
  }

  render() {
    const { newsLists, currentPage, newsPerPage } = this.state
    const indexOfLastNews = currentPage * newsPerPage
    const indexOfFirstNews = indexOfLastNews - newsPerPage
    const currentNews = newsLists.slice(indexOfFirstNews, indexOfLastNews)
    const renderNewsList = currentNews.map(({ node }, index) => {
      return (
        <Link className="news-img-link" to={node.fields.slug}>
          <Fade appear spy={this.state.counter} key={index} timeout={3000}>
            <div className="img-container">
              <img src={node.frontmatter.featuredImage} alt={node.frontmatter.title} className="news-img" />
              <div className="img-dec">
                <p className="img-title">{node.frontmatter.title}</p>
                <p className="img-date">{node.frontmatter.date}</p>
              </div>
            </div>
          </Fade>
        </Link>
      )
    })

    // Logic for displaying page numbers
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(newsLists.length / newsPerPage); i++) {
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
      <div className="news-list-container" id="common-px">
        <div className="news-list d-lg-flex justify-content-lg-between flex-wrap">
          {renderNewsList}
        </div>
        <div className="news-page-number d-flex align-items-center justify-content-center">
          {renderPageNumbers}
        </div>
      </div>
    )
  }
}

export default NewsList
