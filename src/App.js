import React from 'react';
import NavBar from './components/navigation/NavBar';
import ConfigGrid from './components/buttons/ConfigGrid';
import Add from './components/buttons/Add';
import './App.css';

function App() {
  return (
    
    <div className="App">
      <NavBar />
      <ConfigGrid />
      <Add />
    </div>
  );
}

export default App;
