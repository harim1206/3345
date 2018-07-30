import React, { Component } from 'react';
import { connect } from 'react-redux'
import Release from './Release'


class Library extends Component{

  render(){
    // Mapping props data to Release components
    const libraryReleases = this.props.libraryReleases.map((release)=>{
      return (
        <Release release={release}/>
      )
    })

    const columnHeaders = ['ARTIST','TITLE','LABEL','CATNO','DATE'].map((cat)=>{
      return(
        <th onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      )
    })


    return(
      <div className="library-wrapper--padding">
        <div className="library-wrapper">
          <table className="library__table">
            <thead >
              <tr>
                {columnHeaders}
              </tr>
            </thead>
            <tbody>
              {libraryReleases}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    libraryReleases: state.library.libraryReleases
  }
}

export default connect(mapStateToProps)(Library)
