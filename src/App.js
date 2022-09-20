import React from 'react';
import './App.css';
import Home from './Home';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
