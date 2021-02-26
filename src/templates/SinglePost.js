import React from 'react'
import _get from 'lodash/get'
import { graphql } from 'gatsby'
import loadable from '@loadable/component'
import './SinglePost.scss'

const Layout = loadable(() => import('../components/Layout'))
const Header = loadable(() => import('../components/news/Header'))
const Content = loadable(() => import('../components/news/Content'))
const Pagination = loadable(() => import('../components/shared/Pagination'))

// Export Default SinglePost for front-end
const SinglePost = ({ data: { selectedNews, allNewsPosts } }) => {
  const isSSR = typeof window === "undefined"
  const thisEdge = allNewsPosts.edges.find(edge => edge.node.id === selectedNews.id)
  return (
    <Layout
      meta={selectedNews.frontmatter.meta || false}
      title={selectedNews.frontmatter.title || false}
    >
      <Header data={selectedNews} />
      <Content selectedNews={selectedNews} allNewsPosts={allNewsPosts}/>
      <Pagination nextData={_get(thisEdge, 'next')}
        prevData={_get(thisEdge, 'previous')}/>
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    selectedNews: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
        featuredImage
        headerDescription
        description
        hashtags
        subDescriptionOne {
          descriptionOne
          descriptionTwo
          image
          title
        }
        subDescriptionThree
        subHeaderThree
        subDescriptionTwo {
          descriptionOne
          descriptionTwo
          quoteOne
          quoteTwo
          title
          blogGallery {
            alt
            image
            title
          }
        }
      }
    }

    allNewsPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
          }
        }
      }
    }
  }
`
