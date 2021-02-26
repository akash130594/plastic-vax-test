import { graphql } from 'gatsby'
import loadable from '@loadable/component'
import React from 'react'
// import Layout from '../components/Layout'
import Header from '../components/about/Header'
import JoinUs from '../components/about/JoinUs'
import OurTeam from '../components/about/OurTeam'
import Story from '../components/about/Story'

const Layout = loadable(() => import('../components/Layout'))
// const Header = loadable(() => import('../components/about/Header'))
// const JoinUs = loadable(() => import('../components/about/JoinUs'))
// const OurTeam = loadable(() => import('../components/about/OurTeam'))
// const Story = loadable(() => import('../components/about/Story'))

const About = ({data}) => {
    return (
        <Layout meta={data.page.frontmatter.meta || false}>
            <Header data={data.page} />
            <Story data={data.page}/>
            <OurTeam data={data.page}/>
            <JoinUs data={data.page}/>
        </Layout>
    )
}

export default About

export const pageQuery = graphql`
query About($id: String!) {
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
            ceo {
                alt
                image
                title
              }
            our_story_description
            story {
                alt
                description
                header
                title
                year
                image {
                  story_alt
                  story_image
                  story_title
                }
              }
            our_team_description
            gallery {
                alt
                image
                title
              }
            join_us_description
        }
    }
  }
`
