import React, { Component } from 'react';
import Release from './Release'
// import ReactTable from "react-table";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class Playlist extends Component{

  render(){

    // BOOTSTRAP TABLE
    // let shuffledReleases = this.props.shuffledReleases.map((releaseData)=>{
    //   const data = releaseData.basic_information
    //   return(
    //     {
    //       id: this.props.shuffledReleases.indexOf(releaseData),
    //       artist: data.artists[0].name,
    //       title: data.title,
    //       label: data.labels[0].name,
    //       catno: data.labels[0].catno
    //     }
    //   )
    // })
    // <BootstrapTable data={shuffledReleases} striped hover>
    //   <TableHeaderColumn isKey dataField='id'>ID</TableHeaderColumn>
    //   <TableHeaderColumn dataField='artist'>Artist</TableHeaderColumn>
    //   <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
    //   <TableHeaderColumn dataField='label'>Label</TableHeaderColumn>
    //   <TableHeaderColumn dataField='catno'>Catno</TableHeaderColumn>
    // </BootstrapTable>

    // Mapping props data to Release components
    const shuffledReleases = this.props.shuffledReleases.map((release)=>{
      return (
        <Release
          id = {this.props.shuffledReleases.indexOf(release)}
          release = {release}
          onClick = {this.props.onClick}
        />
      )
    })

    const columnHeaders = ['Id','Artist','Title','Label','Catno'].map((cat)=>{
      console.log(`cat: `, cat)
      return(
        <th onClick={()=>this.props.onSort(cat.toLowerCase())}>{cat}</th>
      )
    })
    console.log(`col headers: `,columnHeaders)

    return(
      <div className="playlist-wrapper">
        <table className="playlist-table">
          <thead>
            <tr>
              {columnHeaders}
            </tr>
          </thead>
          <tbody>
            {shuffledReleases}
          </tbody>
        </table>
      </div>
    )
  }

}



export default Playlist
