import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import NewAdjustments from "./pages/newAdjustments/NewAdjustments";

export default function App() {
  return (
    <Router>
      <Header />
      <div>
        
        <Switch>
          <Route path="/about">
            <HomePage />
          </Route>
          <Route path="/new-adjustments">
            <NewAdjustments />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

 
 