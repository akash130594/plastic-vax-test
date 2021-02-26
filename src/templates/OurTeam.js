import { graphql } from 'gatsby'
import loadable from '@loadable/component'
import React from 'react'


const Layout = loadable(() => import('../components/Layout'))
const Header = loadable(() => import('../components/our-team/Header'))
const MeetUs = loadable(() => import('../components/our-team/MeetUs'))

const OurTeam = ({data : {teamPage, teamLists, empOfMonth}}) =>{
    const teamListedges = teamLists.edges
    return (
      
          <Layout
            meta={teamPage.frontmatter.meta || false}
            title={teamPage.frontmatter.title || false}
          >
            <Header ourTeamData={teamPage}/>
            <MeetUs teamListEdges={teamListedges} empOfMonthDetail={empOfMonth} quotes={teamPage.frontmatter}/>
          </Layout>
      
    )
}

export default OurTeam

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query OurTeam($id: String!) {
    teamPage: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        template
        description
        gallery {
            image
            alt
            title
        }
        quote_one
        quote_two
      }
    }
    teamLists: allMarkdownRemark(filter: {fields: {contentType: {eq: "team"}}}) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              position
              description
              role
              quote
              empOfMonth
              featuredImage
              ourTeamImage
            }
          }
        }
    }
    empOfMonth: markdownRemark(frontmatter: {empOfMonth: {eq: true}}){
      frontmatter {
        title
        position
        description
        role
        quote
        empOfMonth
        featuredImage
        ourTeamImage
      }
    }
  }
`
