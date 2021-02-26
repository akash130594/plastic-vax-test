import React from 'react'
import './FilterButton.scss'

const FilterButtons = ({onFilter, positionLocations}) => {
    return (
        <div className="filter-btn-container d-flex">
                <div className="filter-btn" aria-hidden="true" onClick={() => onFilter('all')}>
                    All
                </div>
                {
                    positionLocations.edges.map(({node}, index) => (
                        <div className="filter-btn" aria-hidden="true" onClick={() => onFilter(node.frontmatter.title)} key={index}>{node.frontmatter.title}</div>  
                    ))
                }
        </div>
    )
}

export default FilterButtons