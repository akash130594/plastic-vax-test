import React from 'react'
import './filterbutton.scss'

class FilterButton extends React.Component {
  render() {
    const { filterby, filterProjects, projectCategories } = this.props;
    
    return (
      <div className="filter-btn-container d-flex align-items-center">
        <button
          className={
            filterby === 'all' ? 'active filter-btn' : 'filter-btn'
          }
          onClick={() => filterProjects('all')}
        >
          All
        </button>
         {
           projectCategories.edges.map(({node}, index) => (
            <button
              className={
                filterby === node.frontmatter.title.toLowerCase() ? 'active filter-btn' : 'filter-btn'
              }
              key={index}
              onClick={() => filterProjects(node.frontmatter.title.toLowerCase())}
            >
              {node.frontmatter.title}
            </button>
           ))
         } 
      </div>
    )
  }
}


export default FilterButton