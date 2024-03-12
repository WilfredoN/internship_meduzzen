import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi!
          <br />
          This is Meduzzen internship project.
        </p>
        <a
          className="App-link"
          href={API_URL + 'docs#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </header>
    </div>
  );
}

export default App;
