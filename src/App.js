import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConfigPage from "./components/pages/ConfigPage";
import GraphPage from "./components/pages/GraphPage";
import TerminalPage from "./components/pages/TerminalPage";

import { HollowDotsSpinner as Loader } from "react-epic-spinners";

import "./App.css";

import { graphApi } from "./api/actionSocket";

const isSocketReady = () => graphApi.readyState === graphApi.OPEN;

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(isSocketReady());
  }, [graphApi.readyState]);

  return isReady ? (
    <Router>
      <Switch>
        <Route exact path="/" component={ConfigPage} />
        <Route path="/graph" component={GraphPage} />
        <Route path="/terminal" component={TerminalPage} />
      </Switch>
    </Router>
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
      <Loader color="black" />
    </div>
  );
}

export default App;
