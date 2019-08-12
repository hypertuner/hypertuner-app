import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import ConfigPage from './components/pages/ConfigPage';
import GraphPage from './components/pages/GraphPage';
import TerminalPage from './components/pages/TerminalPage';
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={ConfigPage} />
          <Route path='/graph' component={GraphPage} />
          <Route path='/terminal' component={TerminalPage} />
        </Switch>
    </Router>
  );
}

export default App;
