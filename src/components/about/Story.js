import React from 'react'
import './story.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

class Story extends React.Component {
  state = {
    years: [],
    stories: [],
    selectedYear: '',
    selectedStory: [],
    largeImage: '',
    smallImages: ''
  }

  componentWillMount = () => {
    let years = []
    const stories = this.props.data.frontmatter.story
    stories.map(story => {
      return years.push(story.year)
    })
    this.setState({
      years,
      selectedYear: stories.length > 0 ? stories[0].year : '',
      selectedStory: this.props.data.frontmatter.story[0],
      largeImage: this.props.data.frontmatter.story[0].image[0].story_image,
      smallImages: this.props.data.frontmatter.story[0].image.filter(
        image =>
          image.story_alt !==
          this.props.data.frontmatter.story[0].image[0].story_alt
      )
    })
  }

  changeStory = year => {
    const newStory = this.props.data.frontmatter.story.filter(
      story => story.year === year
    )
    this.setState({
      selectedYear: year,
      selectedStory: newStory[0],
      largeImage: newStory[0].image[0].story_image,
      smallImages: newStory[0].image.filter(
        image => image.story_alt !== newStory[0].image[0].story_alt
      )
    })
  }

  changeImage = (alt, storyYear) => {
    const storyDetail = this.props.data.frontmatter.story.filter(
      story => story.year === storyYear
    )
    if (storyDetail) {
      const largeImage = storyDetail[0].image.filter(
        image => image.story_alt === alt
      )
      if (largeImage) {
        const smallImages = storyDetail[0].image.filter(
          image => image.story_alt !== largeImage[0].story_alt
        )
        this.setState({
          largeImage: largeImage[0].story_image,
          smallImages
        })
      }
    }
  }

  render() {
    return (
      <div className="story-section d-lg-flex" id="common-pl">
       <div className="title-column" id="story">
            <div className="title-container text-center text-lg-left">
                <p className="sub-title">Our</p>
              <Fade timeout={2000}>
                <h3>Story</h3>
              </Fade>  
              <Fade timeout={3000}>
                <p className="title-dec">
                  {this.props.data.frontmatter.our_story_description}
                </p>
              </Fade>
            </div>
            <div className="d-lg-flex year-flex-container">
                <div className="d-flex align-items-center flex-lg-column justify-content-center align-items-lg-start year-main-container">
                  {this.state.years.map((year, index) => (
                    <div className="year-container" key={index}>
                      <div
                        className={this.state.selectedYear === year ? 'active' : ''}
                        onClick={() => this.changeStory(year)}
                        aria-hidden="true"
                      >
                        {year}.
                      </div>
                    </div>
                  ))}
                </div>
                <div className="year-dec text-center text-lg-left">
                  <Fade spy={this.state.selectedYear} timeout={2000}>
                    <p className="selected-year d-none d-lg-block">
                      {this.state.selectedStory.year}
                    </p>
                  </Fade>
                  <Fade spy={this.state.selectedYear} timeout={3000}>
                    <p className="year-header">{this.state.selectedStory.header}</p>
                  </Fade>
                  <Fade spy={this.state.selectedYear} timeout={3500}>  
                    <p className="selected-dec">{this.state.selectedStory.description}</p> 
                  </Fade>
                </div>
            </div>
       </div>
        <div className="year-img-container">
          <div className="large-image">
            <img src={this.state.largeImage} alt={this.state.selectedYear} className="year-img" />
          </div>
          <div className="small-image ">
            {this.state.smallImages.map((image, index) => (
              <img
                onClick={() =>
                  this.changeImage(image.story_alt, this.state.selectedYear)
                }
                aria-hidden="true"
                loading="lazy"
                key={index}
                src={image.story_image}
                alt={image.story_alt}
                className="year-img"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Story
