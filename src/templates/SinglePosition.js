import { graphql } from 'gatsby'
import React from 'react'
import loadable from '@loadable/component'

const Header = loadable(() => import('../components/single-position/Header'))
const Content = loadable(() => import('../components/single-position/Content'))
const Form = loadable(() => import('../components/single-position/Form'))
const Layout = loadable(() => import('../components/Layout'))

const SinglePosition = ({data: {position}}) => {
    return (
            <Layout meta={position.frontmatter.meta || false }>
                <Header position={position.frontmatter}/>
                <Content data={position.frontmatter}/>
                <Form location={position.frontmatter.location} position={position.frontmatter.title}/>
            </Layout>
    )
}

export default SinglePosition

export const paheQuery = graphql`
    query SinglePosition($id: String !){
        position: markdownRemark(id: {eq: $id}) {
            ...Meta
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
        }
    }
`