import React from "react";
import { MainPage } from "./pages";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Register } from "./pages";
import { Search } from "./pages";
import { SignIn } from "./pages";

function App() {
  return (
    <Router>
      <Route exact path={ROUTES.MAIN}>
        <MainPage />
      </Route>
      <Route exact path={ROUTES.REGISTER}>
        <Register />
      </Route>
      <Route exact path={ROUTES.SEARCH}>
        <Search />
      </Route>
      <Route exact path={ROUTES.SIGN_IN}>
        <SignIn />
      </Route>
    </Router>
  );
}

export default App;
