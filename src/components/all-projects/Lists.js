import React from 'react'
import FilterButton from './FilterButton';
import Item from './Item';
import './list.scss'
import Fade from 'react-reveal/Fade';

class Lists extends React.Component {
    
    state = {
      projectEdges: [], 
      filterBy: "",
    }
    
    componentWillMount = () => {
      let projects = [];
      this.props.projectEdges.map((project) => {
        return projects.push(project)
      })
      this.setState({
        projectEdges: projects,
        filterBy: "all"
      })
    }
    
    filterProject = (filterType) => {
      const filteredProjects = this.props.projectEdges.filter(({node}) => {
          if(filterType === "all"){
              return true;
          }else{
              return node.frontmatter.projectCategory === filterType
          }
      })
      this.setState({
          projectEdges: filteredProjects,
          filterBy: filterType
      })
  }

    getChunkProjects = () => {      
      const splicedProjects = []
      while(this.state.projectEdges.length > 0){
        splicedProjects.push(this.state.projectEdges.splice(0,3))
      }
      return splicedProjects
    }

    render(){
        return (
          <div className="project-page">
            <div className="title-container" id="common-pl">
              <div>
                <p className="sub-title">Our</p>
                <Fade up duration={2000}>
                  <h1>Projects</h1>
                </Fade>
                <Fade up duration={2000}>
                  <p className="title-dec">{this.props.description}</p>
                </Fade>
              </div>
              <div className="background-text d-none d-lg-block">
                <img src="https://res.cloudinary.com/dhuii7xg2/image/upload/c_scale,f_auto,q_auto,w_auto/v1613138586/all%20project/project-text_i1xdjz.png" alt="projects" className="text-img"></img>
              </div>
            </div>
            <div className="project-page-content" id="common-px">
              <div>
                <FilterButton
                  filterby={this.state.filterBy}
                  projectCategories={this.props.projectCategories}
                  filterProjects={this.filterProject}
                />
              </div>
              <div className="grid-flex-container">
                {this.getChunkProjects().map((chunkedProjects, i) => (
                  <Fade
                    up
                    appear
                    spy={this.state.filterBy}
                    duration={3000}
                    key={i}
                  >
                    <div className="grid-container">
                      {chunkedProjects.map(({ node }) => (
                        <Item node={node} key={node.fields.slug} />
                      ))}
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          </div>
        )
    }
}

export default Lists

