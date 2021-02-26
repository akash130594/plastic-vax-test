import { graphql } from 'gatsby'
import React from 'react'
import loadable from '@loadable/component'

const Layout = loadable(() => import('../components/Layout'))
const ContactUs = loadable(() => import('../components/services/ContactUs'))
const Header = loadable(() => import('../components/services/Header'))
const InEngineAnimation = loadable(() => import('../components/services/InEngineAnimation'))
const Performance = loadable(() => import('../components/services/Performance'))
const PhotoReal = loadable(() => import('../components/services/PhotoReal'))
const PreRenderedAnimation = loadable(() => import('../components/services/PreRenderedAnimation'))
const RealTime = loadable(() => import('../components/services/RealTime'))

const ServiceIndex = ({data: {page}}) => {
    return (
            <Layout meta={page.frontmatter.meta || false}>
                <Header data={page.frontmatter}/>
                <PhotoReal data={page.frontmatter.photorealCg}/>
                <InEngineAnimation data={page.frontmatter.inEngineAnimation}/>
                <PreRenderedAnimation data={page.frontmatter.preRenderedAnimation}/>
                <Performance data={page.frontmatter.performaceCapture}/>
                <RealTime data={page.frontmatter.realTimeAnimation}/>
                <ContactUs description={page.frontmatter.contactUsDescription} image={page.frontmatter.contactUsImage}/>
            </Layout>
    )
}

export default ServiceIndex

export const pageQuery = graphql`
    query ServiceIndex($id: String !) {
        page: markdownRemark(id: {eq: $id}) {
            ...Meta
            html
            id
            frontmatter {
                title
                subtitle
                description
                featuredImages {
                    image
                    alt
                    title
                }
                photorealCg {
                    title
                    description
                    image
                }
                preRenderedAnimation {
                    title
                    description
                    image
                }  
                inEngineAnimation {
                    title
                    description
                    image
                }       
                performaceCapture {
                    title
                    description
                    image {
                        image
                        alt
                        title
                    }
                }
                realTimeAnimation {
                    title
                    description
                    desktopImage
                    mobileImage
                }
                contactUsDescription
                contactUsImage
            }
        }
    }
`