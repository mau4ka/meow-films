import React from "react";
import {
  FriendsPage,
  MainPage,
  SignIn,
  ShowPage,
  UserPage,
  WatchPage,
  Register,
} from "./pages";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import useAuthListener from "./hooks/use-auth-listener";

function App() {
  const { user } = useAuthListener();

  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.WATCH + "/page/0"}
          path={ROUTES.SIGN_IN}
        >
          <SignIn />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.WATCH + "/page/0"}
          path={ROUTES.REGISTER}
        >
          <Register />
        </IsUserRedirect>

        <ProtectedRoute exact user={user} path={ROUTES.WATCH + "/search/:id"}>
          <WatchPage all="0" />
        </ProtectedRoute>

        <ProtectedRoute
          exact
          user={user}
          path={ROUTES.WATCH + "/page/:id/:type?/:name?"}
        >
          <WatchPage all="1" />
        </ProtectedRoute>

        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.WATCH + "/page/0"}
          path={ROUTES.WATCH}
        >
          <WatchPage all="1" />
        </IsUserRedirect>

        <ProtectedRoute user={user} path={ROUTES.SHOW + "/:url"}>
          <ShowPage />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.USER}>
          <UserPage />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.FRIENDS}>
          <FriendsPage />
        </ProtectedRoute>

        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.WATCH + "/page/0"}
          path={ROUTES.MAIN}
        >
          <MainPage />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}

export default App;
