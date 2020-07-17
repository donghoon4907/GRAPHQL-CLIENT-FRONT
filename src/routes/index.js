import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/common/Header";
import Feed from "../components/feed/FeedContainer";
import SearchPost from "../components/search/SearchPostContainer";
import SetPost from "../components/post/SetPostContainer";
import Mypage from "../components/user/MypageContainer";
import SearchUser from "../components/search/SearchUserContainer";
import MessageRoom from "../components/user/MessageRoomContainer";

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Feed} />
      <Route path="/search" component={SearchPost} />
      <Route path="/post/:id" component={SetPost} />
      <Route strict path="/user/:id" component={SearchUser} />
      <Route path="/mypage" component={Mypage} />
      <Route strict path="/room/:id" component={MessageRoom} />
    </Switch>
  </Router>
);
