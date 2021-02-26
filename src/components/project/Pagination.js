import { Link } from 'gatsby'
import React from 'react'
import './pagination.scss'


// class Pagination extends React.Component {
//     state = {
//         showPrevButton: "false",
//         showNextButton: "false"
//     }

//     render(){
//         return (
//             <div className="container">
//             </div> 
//         )
//     }

// }
const Pagination = ({nextPostData, prevPostData}) => {
    return (
      <div className="pagination-section" id="common-px">
        <div className="pagination-container d-flex justify-content-between">
          {prevPostData ? (
            <Link to={prevPostData.fields.slug} className="pagination-link">
              <div className="pagination-button d-flex align-items-center">
                <div className="mr-3">
                  <svg
                    className="d-block"
                    width="32"
                    height="23"
                    viewBox="0 0 32 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2737 1.00903C10.7177 0.565025 11.4167 0.565025 11.8607 1.00903C12.2897 1.43803 12.2897 2.15203 11.8607 2.58003L3.81375 10.627H30.3678C30.9867 10.627 31.4947 11.119 31.4947 11.738C31.4947 12.357 30.9867 12.865 30.3678 12.865H3.81375L11.8607 20.897C12.2897 21.341 12.2897 22.056 11.8607 22.484C11.4167 22.928 10.7177 22.928 10.2737 22.484L0.32175 12.532C-0.10725 12.103 -0.10725 11.389 0.32175 10.961L10.2737 1.00903Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p>See Previous Project</p>
              </div>
              <div className="pagination-img-container">
                <img
                  srcSet={prevPostData.frontmatter.featuredImage}
                  className="lazyload pagination-img"
                />
                <p>{prevPostData.frontmatter.title}</p>
              </div>
            </Link>
          ) : (
            ''
          )}
          {nextPostData ? (
            <Link to={nextPostData.fields.slug} className="pagination-link">
              <div className="pagination-button d-flex align-items-center justify-content-end">
                <p>See Next Project</p>
                <div className="ml-3">
                  <svg
                    className="d-block"
                    width="32"
                    height="23"
                    viewBox="0 0 32 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2204 22.485C20.7764 22.929 20.0774 22.929 19.6334 22.485C19.2044 22.056 19.2044 21.342 19.6334 20.914L27.6804 12.867L1.12639 12.867C0.507392 12.867 -0.000607531 12.375 -0.000607477 11.756C-0.000607423 11.137 0.507392 10.629 1.12639 10.629L27.6804 10.629L19.6334 2.59699C19.2044 2.15299 19.2044 1.43799 19.6334 1.00999C20.0774 0.565993 20.7764 0.565993 21.2204 1.00999L31.1724 10.962C31.6014 11.391 31.6014 12.105 31.1724 12.533L21.2204 22.485Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="pagination-img-container">
                <img
                  src={nextPostData.frontmatter.featuredImage}
                  className="pagination-img"
                />
                <p>{nextPostData.frontmatter.title}</p>
              </div>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    )
}

export default Pagination