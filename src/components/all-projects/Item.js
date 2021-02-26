import { Link } from 'gatsby';
import React from 'react'
import './item.scss'

const Item = ({node}) => {
    const data = node;
    return (
      <Link className="d-block grid-item" to={node.fields.slug}>
        <div className="image-container">
          <img loading="lazy" className="project-img" src={data.frontmatter.allProjectImage} alt={data.frontmatter.title}/>
          <div className="img-dec-container">
            <p className="img-title">{data.frontmatter.title}</p>
            <p className="img-tag">{data.frontmatter.hashtags}</p>
          </div>
        </div>
      </Link>
    )
}

export default Item