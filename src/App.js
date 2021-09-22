import React from "react";
import { MainPage } from "./pages";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Register } from "./pages";
import { Watch } from "./pages";
import { SignIn } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import useAuthListener from "./hooks/use-auth-listener";
import Show from "./pages/show";
import UserPage from "./pages/user";

function App() {
  const { user } = useAuthListener();

  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.WATCH}
          path={ROUTES.SIGN_IN}
        >
          <SignIn />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.WATCH}
          path={ROUTES.REGISTER}
        >
          <Register />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.WATCH}>
          <Watch />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.SHOW + "/:url"}>
          <Show />
        </ProtectedRoute>

        <ProtectedRoute user={user} path={ROUTES.USER}>
          <UserPage />
        </ProtectedRoute>

        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.WATCH}
          path={ROUTES.MAIN}
        >
          <MainPage />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}

export default App;
