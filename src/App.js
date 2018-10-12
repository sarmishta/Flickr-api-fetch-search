import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <SearchForm/>  
        </header>
      </div>
    );
  }
}

export default App;
