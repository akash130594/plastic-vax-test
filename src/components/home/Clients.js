import React from 'react'
import './clients.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Clients = (data) => {
    const clientData = data.edges;
    return (
      <div className="clients-page d-lg-flex justify-content-lg-between" id="common-px">
          <div className="title-container text-center text-lg-left" id="clients">
            <p className="sub-title">Our</p>
            <Fade timemout={2000}>
              <h2>Clients</h2>
            </Fade>
            <Fade timemout={3000}>
              <p className="title-dec">
              When we started out over 20 years ago, we dreamed of working with clients like Disney and Warner Bros. It’s sometimes hard to imagine that we get to work with studios of this stature, helping them bring stories to life that shape the lives of millions of people around the world.
              </p>
            </Fade>
            {/* <span>
              {' '}
              {clientData.map(({ node }) => `${node.frontmatter.title}, `)}{' '}
            </span> */}
          </div>
        <div className="client-img-container d-flex align-items-center justify-content-between flex-wrap">
          {clientData.map(({ node }) => (
            <img
              loading="lazy"
              className="client-img"
              key={node.fields.slug}
              src={node.frontmatter.featuredImage}
              alt={node.frontmatter.title}
            />
          ))}
        </div>
      </div>
    )
}

export default Clients