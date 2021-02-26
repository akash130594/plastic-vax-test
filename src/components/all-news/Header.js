import { Link } from 'gatsby'
import React from 'react'
import './news-header.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Header = ({ data, topNews }) => {
  return (
    <div
      className="news-header d-lg-flex align-items-lg-center justify-content-lg-between"
      id="common-px"
    >
      <div className="title-container">
        <p className="sub-title">Read Our</p>
        <Fade timeout={2000} up>
          <h1>News</h1>
        </Fade>
        <Fade timeout={3000} up>
          <p className="title-dec">{data.frontmatter.description}</p>
        </Fade>
      </div>
      <div className="img-container">
        <img
          src={topNews.edges[0].node.frontmatter.featuredImage}
          alt="blog"
          className="img-fluid"
        />
        <div className="img-dec">
          <p>{topNews.edges[0].node.frontmatter.title}</p>
          <p>{topNews.edges[0].node.frontmatter.hashtags}</p>
        </div>
        <Link to={topNews.edges[0].node.fields.slug} className="project-btn">
          Read More
          <svg
            className="btn-angle"
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.12408 19.7992L11.4629 10.4597C11.5965 10.3263 11.6634 10.1728 11.6634 9.99913C11.6634 9.82547 11.5965 9.67168 11.4629 9.53817L2.12408 0.199494C1.99029 0.0657063 1.83678 -0.000976992 1.66305 -0.000977C1.48939 -0.000977007 1.33567 0.0659168 1.20216 0.199494L0.200441 1.20129C0.066864 1.33486 0.000110561 1.48859 0.000110554 1.66224C0.000110546 1.8359 0.0668639 1.98962 0.200441 2.1232L8.07623 9.99913L0.199948 17.8753C0.0663711 18.0088 4.0214e-05 18.1626 4.02065e-05 18.336C4.01989e-05 18.51 0.0667926 18.6637 0.199948 18.7972L1.20209 19.7991C1.3356 19.9326 1.48939 19.999 1.66298 19.999C1.83678 19.999 1.9905 19.9327 2.12408 19.7992Z"
              fill="#101010"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Header
