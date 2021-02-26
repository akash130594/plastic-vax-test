import React from 'react'
import './team.scss'

const Team = ({team}) => {
    return (
      <div className="team-section" id="common-px">
        <div className="title-container text-center text-lg-left">
          <p className="sub-title">MEET THE</p>
          <h2>Team</h2>
        </div>
        <div className="team-dec-container">
          <div className="d-flex align-items-end justify-content-between">
            <p>DIRECTOR:</p>
            <p> {team.director}</p>
          </div>

          <div className="d-flex align-items-end justify-content-between">
            <p>STUDIO:</p>
            <p> {team.studio}</p>
          </div>

          <div className="d-flex align-items-end justify-content-between">
            <p>PRODUCER:</p>
            <p> {team.producer}</p>
          </div>

          <div className="d-flex align-items-end justify-content-between">
            <p>ART DIRECTOR:</p>
            <p> {team.artDirector}</p>
          </div>
        </div>
      </div>
    )
}

export default Team