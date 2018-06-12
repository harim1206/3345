import React, { Component } from 'react';
import Release from './Release'
// import ReactTable from "react-table";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';






class Playlist extends Component{


  render(){
    const shuffledReleases = this.props.shuffledReleases.map((releaseData)=>{
      return (

        <Release
          id = {this.props.shuffledReleases.indexOf(releaseData)}
          releaseData = {releaseData}
          onClick = {this.props.onClick}
        />

      )
    })

    // var products = [{
    //     id: 1,
    //     name: "Product1",
    //     price: 120
    // }, {
    //     id: 2,
    //     name: "Product2",
    //     price: 80
    // }];
    //
    // let releases = [{
    //   id: ,
    //   artist: "",
    //   track: ,
    //   label: ,
    //   catno:
    // }]
    //
    // // debugger
    // <BootstrapTable data={products} striped hover>
    // <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
    // <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
    // <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
    // </BootstrapTable>

    return(
      <div className="playlist-wrapper">

        <ul className="playlist">
          {shuffledReleases}
        </ul>


      </div>
    )
  }

}

export default Playlist
