import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "../components/feed/FeedContainer";

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Feed} />
    </Switch>
  </Router>
);
