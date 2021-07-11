import React from "react";
import "./routes.css";
import ScrolltoTop from "../components/ScrolltoTop";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import View from "./view";
import Add from "./addrrbf";
import AddRRBF from "./addrrbf";
import AddCallput from "./addcallput";

function Routes() {
  return (
    <>
      <Router>
        <ScrolltoTop />
        <Switch>
          <Route path="/" exact component={View} />
          <Route path="/addrrbf" exact component={AddRRBF} />
          <Route path="/addcallput" exact component={AddCallput} />
        </Switch>
      </Router>
    </>
  );
}

export default Routes;
