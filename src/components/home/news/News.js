import React from 'react'
import NewsList from './NewsList'
import './news.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../../transition/Fade'))

const News = (data) => { 
  return (
    <div className="news-page" id="common-px">
      <Fade timeout={2000}>
        <div className="title-container">
          <p className="vertical-text">
            See All <span className="d-block d-lg-inline-block">of our</span>
          </p>
          <h3>NEWS</h3>
        </div>
        <p className="title-dec">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          cursus justo sit amet sodales posuere. Duis at nulla rutrum, efficitur
          turpis sed, vestibulum magna. Nullam quis ultrices dolor. Nam semper
          faucibus feugiat.
        </p>
      </Fade>
      <p className="sub-title">SEE ALL NEWS</p>
      <NewsList {...data} />
    </div>
  )
}

export default News