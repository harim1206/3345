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
    const shuffledReleases = this.props.shuffledReleases.map((releaseData)=>{
      return (


        <Release
          id = {this.props.shuffledReleases.indexOf(releaseData)}
          releaseData = {releaseData}
          onClick = {this.props.onClick}
        />

      )
    })

    return(
      <div className="playlist-wrapper">
        <table className="playlist-table">
          <tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Label</th>
            <th>Catno</th>
          </tr>
          {shuffledReleases}
        </table>
      </div>
    )
  }

}



export default Playlist
