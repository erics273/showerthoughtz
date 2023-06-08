import { Switch, Route } from "react-router-dom";
import React, {} from 'react';
import Home from "./pages/home/Home";
import Feed from "./pages/feed/Feed";
import NotFound from "./pages/notFound/NotFound";
import Registration from "./pages/registration/Registration";
import Post from "./components/post/Post";
import Profile from "./pages/Profile/Profile.js";
import Update from "./pages/Update/Update.js";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          path="/feed"
          component={Feed}
        />
        <Route
          path="/register"
          component={Registration}
        />
        <Route
          path="/post"
          component={Post}
        />
        <Route
          path="/profile/:username"
          component={Profile}
         />
          <Route
          path="/update"
          component={Update}
        />
        <Route
          path="*"
          component={NotFound}
        />
        
      </Switch>
    </div>
  );
}

export default App;