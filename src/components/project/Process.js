import React from 'react'
import './process.scss'

const Process = ({process}) => {
    return (
      <div className="process-section">
        <div className="text-img-container">
          <img srcSet="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613138767/projects/process-img_pj6xxz.png" alt="Process Image" className="lazyload bg-img" />
        </div>
        <div
          className="img-main-container d-lg-flex align-items-lg-center justify-content-lg-between"
          id="common-px"
        >
          {process.map((process, index) => (
            <div className="process-img-container" key={index}>
              <img
                loading="lazy"
                src={process.image}
                alt={process.alt}
                className="process-img"
              />
            </div>
          ))}
        </div>
      </div>
    )
}

export default Process