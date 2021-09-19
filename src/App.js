import React from "react";
import { MainPage } from "./pages";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Register } from "./pages";
import { Search } from "./pages";
import { SignIn } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import useAuthListener from "./hooks/use-auth-listener";

function App() {
  const { user } = useAuthListener();

  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.SEARCH}
          path={ROUTES.SIGN_IN}
        >
          <SignIn />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.SEARCH}
          path={ROUTES.REGISTER}
        >
          <Register />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.SEARCH}>
          <Search />
        </ProtectedRoute>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.SEARCH}
          path={ROUTES.MAIN}
        >
          <MainPage />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}

export default App;
