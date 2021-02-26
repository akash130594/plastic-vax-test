import { Link } from 'gatsby'
import React from 'react'
import Marked from 'react-markdown'
import './meet-us.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

class MeetUs extends React.Component {
  state = {
    empOfMonth: this.props.empOfMonthDetail,
    teamListData: []
  }

  componentWillMount = () => {
    let teams = []
    this.props.teamListEdges.map(project => {
      return teams.push(project)
    })
    this.setState({
      teamListData: teams
    })
  }

  formatArray = () => {
    let formattedArray = []
    let doubleQuadCounter = 1
    let quadQuadCounter = 0
    let arrayOne = []
    let arrayTwo = []
    while (this.state.teamListData.length > 0) {
      if (doubleQuadCounter > 0) {
        arrayOne = this.state.teamListData.splice(0, 2)
        arrayTwo = this.state.teamListData.splice(0, 4)
        formattedArray.push([arrayOne, arrayTwo])
        quadQuadCounter = 1
      }
      if (quadQuadCounter > 0) {
        arrayOne = this.state.teamListData.splice(0, 4)
        arrayTwo = this.state.teamListData.splice(0, 4)
        formattedArray.push([arrayOne, arrayTwo])
        doubleQuadCounter = 1
      }
    }
    return formattedArray
  }

  render() {
    const renderTeam = teamArray => {
      return (
        <div className="section-content">
          {teamArray.map((subArray, i) => (
            <div
              className="img-main-container d-flex justify-content-between flex-wrap"
              key={i}
            >
              {subArray.map(({ node }, k) => (
                <Link className="img-link" to={node.fields.slug} key={k}>
                  <Fade timeout={2000}>
                    <div className="img-container">
                      <img
                        srcSet={node.frontmatter.ourTeamImage}
                        className="lazyload meet-us-img"
                        alt={node.frontmatter.title}
                      />
                    </div>  
                  </Fade>
                  <div className="img-dec">
                    <p>{node.frontmatter.title}</p>
                    <p>{node.frontmatter.position}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className="mee-us-parent-container">
        {this.formatArray().map((teamArray, index) => {
          if (index === 0) {
            return (
              <div className="first-section-container" id="common-px">
                <div className="title-container">
                  <h3>Meet Us</h3>
                </div>
                <div className="first-section-content" key={index}>
                  {renderTeam(teamArray)}
                </div>
              </div>
            )
          } else if (index === 1) {
            if (this.state.empOfMonth) {
              return (
                <div className="second-section-container" key={index}>
                  {/* <div className="first-part ">
                    <div className="title-container text-center text-lg-left">
                      <p className="sub-title">Employee</p>
                      <h3>Of the month</h3>
                      <div className="title-position-container">
                        <p>{this.state.empOfMonth.frontmatter.title}</p>
                        <p>{this.state.empOfMonth.frontmatter.position}</p>
                      </div>
                      <p className="title-dec">
                        {this.state.empOfMonth.frontmatter.description}
                      </p>
                    </div>

                    <div className="img-container ">
                      <img
                        srcSet={this.state.empOfMonth.frontmatter.featuredImage}
                        className="lazyload img-fluid"
                      />
                    </div>

                    <div className="bg-text">
                      <img
                        loading="lazy"
                        src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613386174/red-angle_ls5oqk.jp2"
                        className="img-fluid"
                      />
                    </div>
                  </div> */}
                  {
                    <div className="second-part" id="common-px">
                      {renderTeam(teamArray)}

                      <div className="quote-container">
                        <Marked
                          className={`Content`}
                          source={this.props.quotes.quote_one}
                        />
                      </div>
                      <div className="quote-container">
                        <Marked
                          className={`Content`}
                          source={this.props.quotes.quote_two}
                        />
                      </div>
                    </div>
                  }
                </div>
              )
            }
          } else {
            return (
              <div
                id="common-px"
                className={
                  index === 2
                    ? `third-section-container third-section-container-${index}`
                    : 'third-section-container'
                }
              >
                <div key={index}>{renderTeam(teamArray)}</div>
              </div>
            )
          }
        })}

        <div className="bg-text-container">
          <img
            srcSet="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1614079566/our-team/WORK_d4xcvf.png"
            alt="work"
            className="lazyload img-fluid"
          />
        </div>
      </div>
    )
  }
}

export default MeetUs
