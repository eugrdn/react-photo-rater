import React, { Component } from 'react';

import { Grid } from './containers/index';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="header">React Photo Rater</h1>
        <Grid />
      </div>
    );
  }
}

export default App;