import React from 'react'
import _get from 'lodash/get'
import loadable from '@loadable/component'
import { graphql } from 'gatsby'


const Layout = loadable(() => import('../components/Layout'))
const Banner = loadable(() => import('../components/project/Banner'))
// const Intro = loadable(() => import('../components/project/Intro'))
const Pagination = loadable(() => import('../components/shared/Pagination'))
// const Process = loadable(() => import('../components/project/Process'))
// const Team = loadable(() => import('../components/project/Team'))
const Trailer = loadable(() => import('../components/project/Trailer'))

const SingleProject = ({data: {project, allProjects}}) => {
    const thisEdge = allProjects.edges.find(edge => edge.node.id === project.id)
    const projectData = project.frontmatter;
    return (
        <Layout>
          <Banner data={projectData}/>
          <Trailer data={projectData}/>
          {/* <About data={projectData}/>
          <Process {...projectData}/>
          <Intro data={projectData}/>
          <Team {...projectData}/> */}
            <Pagination
              nextData={_get(thisEdge, 'next')}
              prevData={_get(thisEdge, 'previous')}/>
        </Layout>
    )
}

export const pageQuery = graphql`
query SingleProject($id: String!) {
    project: markdownRemark(id: { eq: $id }) {
      ...Meta
      id
      frontmatter {
        title
        template
        subtitle
        year
        description
        hashtags
        featuredImage
        gallery {
          image
          alt
        }
        process {
          image
          alt
        }
        type
        release
        trailer
        studio
        subDescription
        team {
          director
          studio
          producer
          artDirector
        }
      }
    }
    allProjects: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "projects" } } }
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
            title,
            featuredImage
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title,
            featuredImage
          }
        }
      }
    }
  }
`

export default SingleProject
