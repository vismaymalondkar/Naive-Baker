import React, { Component } from 'react';
import NaiveBaker from './containers/NaiveBaker/NaiveBaker';
import { BrowserRouter } from 'react-router-dom';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  // Add suggestions array
  render() {
    return (
      <BrowserRouter>
      
      <div className="App">

        <NaiveBaker />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
