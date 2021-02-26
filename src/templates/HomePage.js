import React from 'react'
import { graphql } from 'gatsby'
import loadable from '@loadable/component'

// import GetInTouch from '../components/home/GetInTouch'
// import Project from '../components/home/Project';
const GetInTouch = loadable(() => import('../components/home/GetInTouch'));
const Project = loadable(() => import('../components/home/Project'));
const Layout = loadable(() => import('../components/Layout'));
const Clients = loadable(() => import('../components/home/Clients'));
const AllProjects = loadable(() => import('../components/home/AllProjects'));
const Testimonials = loadable(() => import('../components/home/Testimonials'));
const Awards = loadable(() => import('../components/home/Awards'));

// Export Template for use in CMS preview
// Export Default HomePage for front-end
const HomePage = ({ data: { page, clients, awards, testimonials, projects, getInTouch, nonfeatured, allPosts } }) => {
  return (
      <Layout meta={page.frontmatter.meta || false}>
        <Project {...projects}/>
        <Clients {...clients} />
        <AllProjects {...nonfeatured}/>
        <Awards {...awards}/>
        <Testimonials {...testimonials} />
        {/* <News {...allPosts} /> */}
        <GetInTouch {...getInTouch} />
        {/* <HomePageTemplate {...page} {...page.frontmatter} body={page.html} /> */}
      </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        videoSourceURL
        videoTitle
      }
    }
    projects: allMarkdownRemark(filter: {fields: {contentType: {eq: "projects"}}, frontmatter: {isFeatured: {eq: true}}}, sort: {fields: frontmatter___allProjectOrder, order: ASC}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            subtitle
            title
            description
            trailer
            status
            homePageFeaturedImage
          }
        }
      }
    }
    clients: allMarkdownRemark(filter: {fields: {contentType: {eq: "clients"}}}, sort: {fields: frontmatter___order, order: ASC}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
          }
        }
      }
    }
    nonfeatured: allMarkdownRemark(filter: {fields: {contentType: {eq: "projects"}}, frontmatter: {isSliderImage: {eq: true}}}, sort: {fields: frontmatter___sliderImageOrder, order: ASC}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            title
            subtitle
            description
            trailer
            status
            homePageProjectImage
          }
        }
      }
    }
    awards: allMarkdownRemark(filter: {fields: {contentType: {eq: "awards"}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            featuredImage
            title
          }
        }
      }
    }
    testimonials: allMarkdownRemark(filter: {fields: {contentType: {eq: "testimonials"}}}) {
      edges {
        node {
          frontmatter {
            featuredImage
            title
            designation
            description
          }
          fields {
            slug
          }
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    getInTouch: allMarkdownRemark(filter: {fields: {contentType: {eq: "get_in_touch"}}}) {
      edges {
        node {
          frontmatter {
            featuredImage
            backgroundImage
            description
          }
        }
      }
    }

    allPosts:
    allMarkdownRemark(
      filter:
      {
        fields: {contentType: {eq: "posts"}},
        frontmatter: {categories: {elemMatch: {category: {eq: "News"}}}}
      },
        sort: {order: DESC, fields: [frontmatter___date]}, limit: 3) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              hashtags
              featuredImage
              date(formatString: "Y-M-D")
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              hashtags
              featuredImage
              date(formatString: "Y-M-D")
            }
          }
          previous {
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
