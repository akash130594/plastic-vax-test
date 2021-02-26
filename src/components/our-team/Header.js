import React from 'react'
import './header.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

class Header extends React.Component {
  state = {
    images: this.props.ourTeamData.frontmatter.gallery,
    currentPage: 1,
    imagesPerPage: 2,
    totalItems: this.props.ourTeamData.frontmatter.gallery.length,
    showingItems: 0,
    currentShowingImages: []
  }
  changePage = buttonDir => {
    if (buttonDir === 'back') {
      this.setState(
        prevState => ({ currentPage: prevState.currentPage - 1 }),
        () => {
          this.changeImages(buttonDir)
        }
      )
    } else {
      this.setState(
        prevState => ({ currentPage: prevState.currentPage + 1 }),
        () => {
          this.changeImages(buttonDir)
        }
      )
    }
  }

  componentWillMount = () => {
    const { images, currentPage, imagesPerPage } = this.state
    const indexOfLastImages = currentPage * imagesPerPage
    const indexOfFirstImages = indexOfLastImages - imagesPerPage
    const currentImages = images.slice(indexOfFirstImages, indexOfLastImages)
    this.setState(prevState => ({
      currentShowingImages: currentImages,
      showingItems: prevState.showingItems + currentImages.length
    }))
  }

  changeImages = buttonDir => {
    const { images, currentPage, imagesPerPage } = this.state
    const indexOfLastImages = currentPage * imagesPerPage
    const indexOfFirstImages = indexOfLastImages - imagesPerPage
    const currentImages = images.slice(indexOfFirstImages, indexOfLastImages)
    this.setState(prevState => {
      if (buttonDir === 'back') {
        return {
          currentShowingImages: currentImages,
          showingItems:
            prevState.showingItems - prevState.currentShowingImages.length
        }
      } else {
        return {
          currentShowingImages: currentImages,
          showingItems: prevState.showingItems + currentImages.length
        }
      }
    })
  }

  render() {
    const renderImage = (
      <div className="img-parent-container">
        {this.state.currentShowingImages.map((item, index) => {
          return <img src={item.image} key={index} alt={item.alt} className="about-us-img" />
        })}
      </div>
    )
    const renderButton = (
      <div className="about-project-btn-container">
        {this.state.currentPage > 1 ? (
          <button
            className="about-project-btn"
            onClick={() => this.changePage('back')}
          >
            Prev
          </button>
        ) : null}
        {this.state.images.length - 1 >=
        this.state.currentPage * this.state.imagesPerPage ? (
          <button
            className="about-project-btn"
            onClick={() => this.changePage('next')}
          >
            Next
            <svg
              className="angle"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.12477 19.8002L11.4636 10.4607C11.5972 10.3273 11.6641 10.1738 11.6641 10.0001C11.6641 9.82645 11.5972 9.67266 11.4636 9.53915L2.12477 0.200471C1.99098 0.0666829 1.83747 -4.29534e-07 1.66375 -4.37128e-07C1.49009 -4.44719e-07 1.33637 0.0668934 1.20286 0.200471L0.201136 1.20226C0.0675582 1.33584 0.000804836 1.48956 0.000804828 1.66322C0.000804821 1.83688 0.0675582 1.9906 0.201136 2.12418L8.07692 10.0001L0.200643 17.8763C0.0670654 18.0098 0.000734489 18.1636 0.000734481 18.337C0.000734474 18.5109 0.0674869 18.6646 0.200643 18.7982L1.20279 19.8001C1.3363 19.9336 1.49009 19.9999 1.66367 19.9999C1.83747 20 1.99119 19.9337 2.12477 19.8002Z"
                fill="#101010"
              />
            </svg>
          </button>
        ) : null}
      </div>
    )

    return (
      <div className="team-header-section">
        <div className="header-content d-lg-flex" id="common-px">
          <div className="title-container">
            <p className="sub-title">Our</p>
            <Fade timeout={2000}>
              <h1>Team</h1>
            </Fade>
            <Fade timeout={3000}>
              <p className="title-dec">
                {this.props.ourTeamData.frontmatter.description}
              </p>
            </Fade>
          </div>
          <div className="img-content">
            <div className="number-container">
              <p className="vertical-text">
                {this.state.showingItems} / {this.state.totalItems}
              </p>
            </div>
            <div className="img-container">{renderImage}</div>
            <div className="btn-container">{renderButton}</div>
          </div>
        </div>
        <div className="bg-text-container">
          <img
            src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613464328/our-team/team-text_vvqfn9.png"
            alt="text text"
            className="img-fluid"
          />
        </div>
      </div>
    )
  }
}

export default Header
