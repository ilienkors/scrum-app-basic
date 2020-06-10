import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Authorization } from './../Authorization'
import { Project } from './../Project'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/project">
          <Project />
        </Route>
        <Route path="/">
          <Authorization />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
