import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConfigPage from "./components/pages/ConfigPage";
import GraphPage from "./components/pages/GraphPage";
import TerminalPage from "./components/pages/TerminalPage";
import CssBaseline from '@material-ui/core/CssBaseline';

import "./App.css";

import { graphSocket, terminalSocket, progressSocket } from "./api/actionSocket";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./themes";

const socketReady = () =>
  graphSocket.readyState === graphSocket.OPEN &&
  terminalSocket.readyState === terminalSocket.OPEN &&
  progressSocket.readyState === progressSocket.OPEN;

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const testReady = setInterval(() => {
      console.log(
        graphSocket.readyState,
        terminalSocket.readyState,
        progressSocket.readyState
      );

      if (socketReady()) {
        setIsReady(socketReady());
        clearInterval(testReady);
      }
    }, 500);
  }, []);

  return isReady ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={ConfigPage} />
          <Route path="/graph" component={GraphPage} />
          <Route path="/terminal" component={TerminalPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      Loading . . .
    </div>
  );
}

export default App;
