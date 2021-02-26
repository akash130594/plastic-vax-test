import { Link } from 'gatsby'
import React from 'react'
import './newslist.scss'

const NewsList = props => {
  const newsLists = props.edges
  return (
    <div className="news-list-container d-lg-flex justify-content-lg-between">
      {newsLists.map(({ node }) => (
        <Link
          className="news-link"
          to={node.fields.slug}
          key={node.fields.slug}
        >
          <div className="news">
            <div className="news-img-container">
              <img loading="lazy" src={node.frontmatter.featuredImage} alt={node.frontmatter.title} className="news-img" />
            </div>
            <div className="news-dec">
              <p>{node.frontmatter.title}</p>
              <p>{node.frontmatter.date}</p>
              <p>{node.frontmatter.excerpt}</p>
              <p>{node.frontmatter.hashtags}</p>
            </div>
          </div>
        </Link>
      ))}

      <div className="bg-img-container d-none d-lg-block">
        <img loading="lazy" src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613386174/red-angle_ls5oqk.jp2" alt="red-angle" className="bg-img" />
      </div>
    </div>
  )
}
export default NewsList
