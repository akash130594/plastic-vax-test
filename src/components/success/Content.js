import { Link } from 'gatsby'
import React from 'react'
import './content.scss'

const Content = ({data}) => {
    return (
        <div className="success-container d-flex align-items-center justify-content-center">
                <div className="content-container text-center">
                    <div className="img-container">
                        <img src={data.frontmatter.featuredImage} alt="Success" width="100" height="100"/>
                    </div>
                        <p className="hey-you">Hey You!</p>
                        <p className="title">{data.frontmatter.heading}</p>
                        <p className="dec">{data.frontmatter.description}</p>
                        <Link className="home-link" to="/">
                            Go To Homepage
                        </Link>
                </div>
        </div>
    )
}
export default Content