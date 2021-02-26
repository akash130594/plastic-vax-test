import React from 'react'
import './content.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

class Content extends React.Component {
  state = {
    images: this.props.selectedNews.frontmatter.subDescriptionTwo.blogGallery,
    currentPage: 1,
    imagesPerPage: 2,
    totalItems: this.props.selectedNews.frontmatter.subDescriptionTwo
      .blogGallery.length,
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
      <div
        className="content-main-container text-center text-lg-left"
        id="common-px"
      >
        <div className="content-container">
          <Fade>
            <p
              className="content-dec"
              dangerouslySetInnerHTML={{
                __html: this.props.selectedNews.frontmatter.description.replace(
                  /(?:\r\n|\r|\n)/g,
                  ' <br> '
                )
              }}
            ></p>
            <p className="title-text">
              {this.props.selectedNews.frontmatter.subDescriptionOne.title}
            </p>
            <p
              className="content-dec"
              dangerouslySetInnerHTML={{
                __html: this.props.selectedNews.frontmatter.subDescriptionOne.descriptionOne.replace(
                  /(?:\r\n|\r|\n)/g,
                  ' <br> '
                )
              }}
            ></p>
          </Fade>
          <div className="content-img-container">
            <Fade>
              <img
                className="content-img"
                src={
                  this.props.selectedNews.frontmatter.subDescriptionOne.image
                }
                alt={
                  this.props.selectedNews.frontmatter.subDescriptionOne.title
                }
              />
            </Fade>
          </div>
          <Fade>
            <p
              className="content-dec"
              dangerouslySetInnerHTML={{
                __html: this.props.selectedNews.frontmatter.subDescriptionOne.descriptionTwo.replace(
                  /(?:\r\n|\r|\n)/g,
                  ' <br> '
                )
              }}
            ></p>
            <p className="title-text">
              {this.props.selectedNews.frontmatter.subDescriptionTwo.title}
            </p>
            <p
              className="content-dec"
              dangerouslySetInnerHTML={{
                __html: this.props.selectedNews.frontmatter.subDescriptionTwo.descriptionOne.replace(
                  /(?:\r\n|\r|\n)/g,
                  ' <br> '
                )
              }}
            ></p>
          </Fade>
          <div className="quote-container d-lg-flex">
            <div>
              <svg
                className="d-block"
                width="60"
                height="52"
                viewBox="0 0 60 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2037 23.6543C17.7259 23.2289 16.2481 23.013 14.8106 23.013C12.5908 23.013 10.7385 23.5203 9.30229 24.1415C10.6869 19.0725 14.0132 10.326 20.6393 9.34099C21.253 9.24973 21.7558 8.80601 21.9232 8.20873L23.3714 3.02894C23.4935 2.59089 23.4212 2.122 23.1713 1.74186C22.9214 1.36171 22.5199 1.10807 22.0699 1.04639C21.5809 0.97968 21.0824 0.945694 20.5883 0.945694C12.6349 0.945694 4.75818 9.24721 1.43442 21.1337C-0.516653 28.1072 -1.08876 38.5914 3.71718 45.1904C6.40652 48.883 10.3301 50.8549 15.379 51.0518C15.3997 51.0525 15.4199 51.0531 15.4406 51.0531C21.6702 51.0531 27.1943 46.8577 28.8747 40.8515C29.8786 37.2609 29.4248 33.4953 27.5958 30.2458C25.7864 27.0328 22.8063 24.6909 19.2037 23.6543Z"
                  fill="#222222"
                />
                <path
                  d="M58.1995 30.2465C56.3901 27.0328 53.4099 24.6909 49.8074 23.6543C48.3296 23.2289 46.8518 23.013 45.4149 23.013C43.1951 23.013 41.3422 23.5203 39.906 24.1415C41.2906 19.0725 44.6169 10.326 51.2436 9.34099C51.8573 9.24973 52.3595 8.80601 52.5276 8.20873L53.9758 3.02894C54.0979 2.59089 54.0255 2.122 53.7756 1.74186C53.5264 1.36171 53.1248 1.10807 52.6742 1.04639C52.1858 0.97968 51.6873 0.945694 51.1926 0.945694C43.2392 0.945694 35.3625 9.24721 32.0381 21.1337C30.0877 28.1072 29.5156 38.5914 34.3221 45.1917C37.0108 48.8836 40.935 50.8561 45.9833 51.0525C46.004 51.0531 46.0242 51.0537 46.0456 51.0537C52.2745 51.0537 57.7992 46.8583 59.4797 40.8521C60.4823 37.2615 60.0279 33.4953 58.1995 30.2465Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <Fade>
              <p className="content-dec">
                {this.props.selectedNews.frontmatter.subDescriptionTwo.quoteOne}
              </p>
            </Fade>
          </div>
          <Fade>
            <p
              className="content-dec"
              dangerouslySetInnerHTML={{
                __html: this.props.selectedNews.frontmatter.subDescriptionTwo.descriptionTwo.replace(
                  /(?:\r\n|\r|\n)/g,
                  ' <br> '
                )
              }}
            ></p>
            <p className="content-dec">
              {this.props.selectedNews.frontmatter.subDescriptionTwo.quoteTwo}
            </p>
          </Fade>

          <div className="img-content">
            <div className="number-container">
              <p className="vertical-text">
                {this.state.showingItems} / {this.state.totalItems}
              </p>
            </div>
            <div className="img-container">{renderImage}</div>
            <div className="btn-container">{renderButton}</div>
          </div>
          <div className="quote-container quote-container-flex d-flex align-items-center">
            <div>
              <svg
                width="60"
                height="52"
                viewBox="0 0 60 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2037 23.6543C17.7259 23.2289 16.2481 23.013 14.8106 23.013C12.5908 23.013 10.7385 23.5203 9.30229 24.1415C10.6869 19.0724 14.0132 10.3259 20.6393 9.34097C21.2529 9.24971 21.7558 8.806 21.9232 8.20872L23.3714 3.02892C23.4935 2.59088 23.4212 2.12199 23.1713 1.74184C22.9214 1.3617 22.5199 1.10806 22.0699 1.04638C21.5809 0.979665 21.0824 0.945679 20.5883 0.945679C12.6349 0.945679 4.75818 9.24719 1.43442 21.1336C-0.516653 28.1072 -1.08876 38.5914 3.71718 45.1904C6.40652 48.883 10.3301 50.8548 15.379 51.0518C15.3997 51.0525 15.4199 51.0531 15.4406 51.0531C21.6702 51.0531 27.1943 46.8576 28.8747 40.8515C29.8786 37.2609 29.4248 33.4953 27.5958 30.2458C25.7864 27.0328 22.8063 24.6909 19.2037 23.6543Z"
                  fill="#222222"
                />
                <path
                  d="M58.1995 30.2464C56.3901 27.0328 53.4099 24.6909 49.8074 23.6543C48.3296 23.2289 46.8518 23.013 45.4149 23.013C43.1951 23.013 41.3422 23.5203 39.906 24.1415C41.2906 19.0724 44.6169 10.326 51.2436 9.34097C51.8573 9.24971 52.3595 8.806 52.5276 8.20872L53.9758 3.02892C54.0979 2.59088 54.0255 2.12199 53.7756 1.74184C53.5264 1.3617 53.1248 1.10806 52.6742 1.04638C52.1858 0.979665 51.6873 0.945679 51.1926 0.945679C43.2392 0.945679 35.3625 9.24719 32.0381 21.1337C30.0877 28.1072 29.5156 38.5914 34.3221 45.1917C37.0108 48.8836 40.935 50.8561 45.9833 51.0525C46.004 51.0531 46.0242 51.0537 46.0456 51.0537C52.2745 51.0537 57.7992 46.8583 59.4797 40.8521C60.4823 37.2615 60.0279 33.4953 58.1995 30.2464Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <Fade>
              <p
                className="content-dec"
                dangerouslySetInnerHTML={{
                  __html: this.props.selectedNews.frontmatter.subDescriptionOne.descriptionTwo.replace(
                    /(?:\r\n|\r|\n)/g,
                    ' <br> '
                  )
                }}
              ></p>
            </Fade>
          </div>
          <Fade>
            <p className="content-dec">
              {this.props.selectedNews.frontmatter.subHeaderThree.header}
            </p>
            <p
              className="content-dec"
              dangerouslySetInnerHTML={{
                __html: this.props.selectedNews.frontmatter.subDescriptionThree.replace(
                  /(?:\r\n|\r|\n)/g,
                  ' <br> '
                )
              }}
            ></p>
          </Fade>
          <div className="social-link-container d-lg-flex align-items-lg-center">
            <div className="mr-lg-4">
              <p>Share To:</p>
            </div>
            <div className="d-flex justify-content-center">
              <a className="social-link" href="!#">
                <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1612791487/socialMedia/Subtract_tqb1wl.svg" alt="Subtract"/>
              </a>
              <a className="social-link" href="!#">
                <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1612791487/socialMedia/Vector_gql8or.svg" alt="Vector"/>
              </a>
              <a className="social-link" href="!#">
                <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1612791487/socialMedia/Icon_zvxspp.png" alt="Icon"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Content
