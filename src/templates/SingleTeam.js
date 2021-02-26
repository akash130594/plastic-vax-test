import { graphql } from 'gatsby'
import React from 'react'
import loadable from '@loadable/component'


const Layout = loadable(() => import('../components/Layout'))
const Header = loadable(() => import('../components/team/Header'))
const Role = loadable(() => import('../components/team/Role'))


const SingleTeam = ({data: {team}}) => {
    return (
            <Layout meta={team.frontmatter.meta || false}>
                <Header data={team}/>
                <Role data={team}/>
            </Layout>
    )
}

export default SingleTeam

export const pageQuery = graphql `
 query SingleTeam($id: String!) {
     team: markdownRemark(id: { eq: $id} ){
         ...Meta
         id
         frontmatter {
             title
             description
             position
             role
             quote
             featuredImage
         }
     }
 }

`