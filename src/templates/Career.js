import { graphql } from 'gatsby'
import React from 'react'
import loadable from '@loadable/component'

const Header = loadable(() => import('../components/careers/Header'))
const Layout = loadable(() => import('../components/Layout'))
const PostingList = loadable(() => import('../components/careers/PostingList'))


const Career = ({data: {page, allPostings, positionLocations}}) => {
    return (
        <Layout meta={page.frontmatter.meta || false}>
            <Header data={page.frontmatter}/>
            <PostingList allPostings={allPostings} positionLocations={positionLocations}/>
        </Layout>
    )
}

export default Career

export const pageQuery = graphql `
    query Career($id: String!){
        page: markdownRemark(id: {eq: $id}){
            ...Meta
            frontmatter {
                featuredImage
                title
                description
            }
        }
        allPostings: allMarkdownRemark(sort: {order: ASC, fields: frontmatter___date}, filter: {fields: {contentType: {eq: "careers"}}}) {
            edges {
              node {
                frontmatter {
                  title
                  subDescription
                  responsiblities {
                    responsiblity
                  }
                  requirements {
                    requirement
                  }
                  desirables {
                    desirable
                  }
                  featuredImage
                  description
                  location
                  date(formatString: "DD.MM.YYYY")
                }
                fields {
                  contentType
                  slug
                }
              }
            }
        }
        positionLocations: allMarkdownRemark(filter: {fields: {contentType: {eq: "positionLocations"}}}) {
            edges {
                node {
                    frontmatter {
                        title
                    }
                    fields {
                        contentType
                        slug
                    }
                }
            }
        }
    }
`