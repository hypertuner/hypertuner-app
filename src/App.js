import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import ConfigPage from './components/pages/ConfigPage';
import GraphPage from './components/pages/GraphPage';
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={ConfigPage} />
          <Route path='/graph' component={GraphPage} />
        </Switch>
    </Router>
  );
}

export default App;
