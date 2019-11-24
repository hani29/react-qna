import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Questions from './components/questions'
import Result from './components/result';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/result">
          <Result />
        </Route>
        <Route path="/">
          <div className="App">
            <div>
              <Questions />
            </div>
          </div>
        </Route>
      </Switch>

    </Router>
  );
}
export default App;
