import React from 'react'
import { graphql } from 'gatsby'
import loadable from '@loadable/component'

const Layout = loadable(() => import('../components/Layout'))
const Lists = loadable(() => import('../components/all-projects/Lists'))

const ProjectIndex = ({ data: {page, allProjects: {edges}, projectCategories} }) => {
  return (
      <Layout meta={page.frontmatter.meta || false}>
        <Lists projectCategories={projectCategories} projectEdges={edges} description={page.frontmatter.description}/>
      </Layout>
  )
}

export default ProjectIndex

export const pageQuery = graphql`
  query ProjectIndex($id: String!) {
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
    projectCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projectCategories" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
    allProjects: allMarkdownRemark(filter: {fields: {contentType: {eq: "projects"}}}, sort: {fields: frontmatter___allProjectOrder, order: ASC}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            allProjectImage
            hashtags
            projectCategory
            allProjectImageLarge
          }
        }
      }
    }
  }
`
