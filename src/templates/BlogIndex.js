import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Header from '../components/all-news/Header'
import NewsList from '../components/all-news/NewsList'


const BlogIndex = ({ data: { page, newsLists, postCategories, topNews } }) => {
  return (
    <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <Header data={page} topNews={topNews}/>
    <NewsList newsLists={newsLists}/>
  </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query BlogIndex($id: String!) {
    topNews: allMarkdownRemark(filter: {frontmatter: {categories: {elemMatch: {category: {eq: "News"}}}, isTopNews: {eq: true}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
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
            date(formatString: "MMMM Do, YYYY")
            featuredImage
          }
        }
      }
    }
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        template
        subtitle
        featuredImage
        description
      }
    }

    newsLists: allMarkdownRemark(filter: {frontmatter: {categories: {elemMatch: {category: {eq: "News"}}}}}, sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            headerDescription
            description
            hashtags
            date(formatString: "MMMM Do, YYYY")
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
            featuredImage
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
