import React from 'react'
import './Testimonials.scss'

class Testimonials extends React.Component {
    state = {
        title: "",
        designation: "",
        description: "",
        featuredImage: "",
        total: 0,
        current:0,
        currentSlug: "",
        nextSlug:"",
        prevSlug: ""
    };

    changeTestimonial = (next, status) => {      
        const testimonialData = this.props.edges
        const nextTestimonial = testimonialData.filter(({node}) => node.fields.slug === next)
        nextTestimonial.map(({node, next, previous}) => {
        return this.setState((prevState) => ({
                title: node.frontmatter.title,
                designation: node.frontmatter.designation,
                description: node.frontmatter.description,
                featuredImage: node.frontmatter.featuredImage,
                currentSlug: node.fields.slug,
                nextSlug: next ? next.fields.slug : "",
                prevSlug: previous ? previous.fields.slug : "",
                current: status==="next" ? prevState.current + 1 : prevState.current - 1,
                total: testimonialData.length
            }))
        })
    }

    componentDidMount = () => {
        const testimonialData = this.props.edges[0]
        this.setState({
            title: testimonialData.node.frontmatter.title,
            designation: testimonialData.node.frontmatter.designation,
            description: testimonialData.node.frontmatter.description,
            featuredImage: testimonialData.node.frontmatter.featuredImage,
            currentSlug: testimonialData.node.fields.slug,
            nextSlug: testimonialData.next ? testimonialData.next.fields.slug : "",
            prevSlug: testimonialData.previous ? testimonialData.previous.fields.slug : "",
            current: 1,
            total: this.props.edges.length
        })
    }

    render(){
        let nextButton;
        let prevButton;
        if(this.state.nextSlug){
            nextButton = (
              <button
                className="testimonials-btn"
                onClick={(e) =>
                  this.changeTestimonial(this.state.nextSlug, 'next')
                }
              >
                Next
                <svg
                className="angle"
                  
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.12477 19.8002L11.4636 10.4607C11.5972 10.3273 11.6641 10.1738 11.6641 10.0001C11.6641 9.82645 11.5972 9.67266 11.4636 9.53915L2.12477 0.200471C1.99098 0.0666829 1.83747 -4.29534e-07 1.66375 -4.37128e-07C1.49009 -4.44719e-07 1.33637 0.0668934 1.20286 0.200471L0.201136 1.20226C0.0675582 1.33584 0.000804836 1.48956 0.000804828 1.66322C0.000804821 1.83688 0.0675582 1.9906 0.201136 2.12418L8.07692 10.0001L0.200643 17.8763C0.0670654 18.0098 0.000734489 18.1636 0.000734481 18.337C0.000734474 18.5109 0.0674869 18.6646 0.200643 18.7982L1.20279 19.8001C1.3363 19.9336 1.49009 19.9999 1.66367 19.9999C1.83747 20 1.99119 19.9337 2.12477 19.8002Z"
                    fill="#101010"
                  />
                </svg>
              </button>
            )
        }
        if(this.state.prevSlug){
            prevButton = (
              <button
                className="testimonials-btn"
                onClick={() =>
                  this.changeTestimonial(this.state.prevSlug, 'previous')
                }
              >
                <svg
                  className="angle back-angle"
                  viewBox="0 0 12 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.53929 0.198862L0.200471 9.53831C0.0668936 9.67175 -4.44709e-07 9.82526 -4.37119e-07 9.99892C-4.29528e-07 10.1726 0.0668936 10.3264 0.200471 10.4599L9.53929 19.7986C9.67308 19.9323 9.82659 19.999 10.0003 19.999C10.174 19.999 10.3277 19.9321 10.4612 19.7986L11.4629 18.7968C11.5965 18.6632 11.6633 18.5095 11.6633 18.3358C11.6633 18.1621 11.5965 18.0084 11.4629 17.8748L3.58714 9.99892L11.4634 2.12271C11.597 1.9892 11.6633 1.83541 11.6633 1.66203C11.6633 1.4881 11.5966 1.33437 11.4634 1.20087L10.4613 0.198932C10.3278 0.0654254 10.174 -0.000908343 10.0004 -0.000908335C9.82659 -0.000976992 9.67287 0.0653549 9.53929 0.198862Z"
                    fill="#101010"
                  />
                </svg>
                Previous
              </button>
            )
        }
        return (
          <div className="testimonials-page" id="common-pl">
            <div className="title-container text-center text-lg-left">
              <p className="sub-title">What They</p>
              <h2>Say About Us</h2>
            </div>
            <div className="testimonials-content d-lg-flex justify-content-lg-between">
              <div className="testimonials-img-container">
                <p className="vertical-text">
                  {this.state.current} / {this.state.total}
                </p>
                <img
                  className="testimonials-img"
                  loading="lazy"
                  src={this.state.featuredImage}
                  alt={this.state.title}
                />
                <div className="testimonials-btn-container d-lg-flex justify-content-lg-end">
                  <div className="next-prv-btn mb-2 mb-lg-0">{prevButton}</div>
                  <div className="next-prv-btn">{nextButton}</div>
                </div>
              </div>
              <div className="testimonials-dec-container">
                <div className="dec-card">
                  <p>{this.state.description}</p>
                  <div className="card-title">
                    <p>{this.state.title}</p>
                    <p>{this.state.designation}</p>
                  </div>
                </div>
              </div>
              <div className="background-text d-none d-lg-block">
                <img
                  loading="lazy"
                  src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613138673/text-img_xt0wb9.jp2"
                  className="d-block w-100"
                  alt="text"
                />
              </div>
            </div>
          </div>
        )
    }
}

export default Testimonials