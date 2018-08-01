import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  onUsernameInputChange,
  onUsernameSubmit
   } from '../actions/navActions.js'

import {
 fetchCollection
} from '../actions/libraryActions.js'

class UsernameInput extends Component{

  onUsernameInputChange = (e) =>{
    let input = e.target.value
    this.props.onUsernameInputChange(input)
  }

  onUsernameSubmit = () => {
    console.log(`this.props.usernameInput: `, this.props.usernameInput)
    this.props.onUsernameSubmit()
    this.props.fetchCollection(this.props.usernameInput)

  }

  render(){
    return(
      <div>
        <input type="text"
          value={this.props.usernameInput}
          onChange={(e)=>this.onUsernameInputChange(e)}
          placeholder="Discogs Username"
        />
        <button
          type="button"
          onClick={this.onUsernameSubmit}
        >Go</button>
      </div>
    )
  }
}

// <input
//   type="text"
//   value={this.props.newPlaylistInput}
//   placeholder="new playlist"
//   onChange={(e)=>this.onNewPlaylistInputchange(e)}
// />
//
// <i className="fas fa-plus" onClick={this.onNewPlaylistSubmit}></i>

const mapStateToProps = (state) =>{
  return {
    usernameInput: state.nav.usernameInput
  }
}

export default connect(mapStateToProps, { onUsernameInputChange, onUsernameSubmit, fetchCollection })(UsernameInput)
