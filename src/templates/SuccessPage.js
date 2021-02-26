import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import Content from '../components/success/Content'

const SuccessPage = ({data: {page}}) => {
    return (
        <Layout meta={page.frontmatter.meta}>
            <Content data={page}/>
        </Layout>
    )
}

export default SuccessPage

export const pageQuery = graphql `
    query SuccessPage($id: String!) {
        page: markdownRemark(id: {eq: $id}) {
            ...Meta
            frontmatter {
                title
                heading
                description
                featuredImage
            }
        }
    }
`