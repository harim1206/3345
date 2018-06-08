import React, { Component } from 'react';

class App extends Component {
  state={
    pagination: {},
    releases: []
  }

  componentDidMount(){
    console.log('lifecycle')
    const url = 'https://api.discogs.com/users/harim1206/collection/folders/0/releases?per_page=200&page=1&f=json'

    fetch(url)
    .then(res => res.json())
    .then(data => {
      // debugger
      this.setState({
        collection: data
      }, ()=>{
        debugger
      })
    })
  }

  render() {
    return (
      <div className="App">
        hello
      </div>
    );
  }
}

export default App;
