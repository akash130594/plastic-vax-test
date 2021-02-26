import React from 'react'
import './content.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

const Content = ({data}) => {
    return (
      <div className="content-main-container d-lg-flex" id="common-px">
        <div className="column">
          <div className="content-container">
            <Fade timeout={2000}>
              <p className="list-title">Responsibilities</p>
            </Fade>
            <ul className="list-container">
              {data.responsiblities.map(({ responsiblity }, index) => (
                <Fade timeout={3000} key={index}>
                  <li className="list">{responsiblity}</li>
                </Fade>
              ))}
            </ul>
          </div>
        </div>
        <div className="column d-lg-flex flex-lg-wrap">
          <div className="content-container">
            <Fade timeout={2000}>
              <p className="list-title">Requirements</p>
            </Fade>
            <ul className="list-container">
              {data.requirements.map(({ requirement }, index) => (
                <Fade timeout={3000} key={index}>
                  <li className="list">{requirement}</li>
                </Fade>
              ))}
            </ul>
          </div>
          <div className="content-container">
            <Fade timeout={2000}>
              <p className="list-title">Desirables</p>
            </Fade>
            <ul className="list-container">
              {data.desirables.map(({ desirable }, index) => (
                <Fade timeout={3000} key={index}>
                  <li className="list">{desirable}</li>
                </Fade>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-text-container d-none d-lg-block">
              <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614154621/apply-text_viffj7.png" alt="apply text" className="apply-img"    />
        </div>
      </div>
    )
}

export default Content