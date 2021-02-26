import React from 'react'
import './award.scss'

const Awards = data => {
  const awardsData = data.edges
  return (
    <div className="awards-page" id="common-px">
      <div className="img-div d-flex align-items-center justify-content-between flex-wrap">
        {awardsData.map(({ node }) => (
          <img
            loading="lazy"
            src={node.frontmatter.featuredImage}
            alt={node.frontmatter.title}
            key={node.fields.slug}
            className="awards-img"
          />
        ))}
      </div>
    </div>
  )
}

export default Awards
