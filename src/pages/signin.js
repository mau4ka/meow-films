import React, { useState, useContext } from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { FooterContainer } from "../containers/FooterContainer";
import { SignInForm } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSignIn = (event) => {
    event.preventDefault();

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.SEARCH);
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <SignInForm>
          <SignInForm.Title>Sign In</SignInForm.Title>
          {error && <SignInForm.Error>{error}</SignInForm.Error>}

          <SignInForm.Base onSubmit={handleSignIn} method="POST">
            <SignInForm.Input
              placeholder="Email address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <SignInForm.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignInForm.Submit
              disabled={isInvalid}
              type="submit"
              data-testid="sign-in"
            >
              Sign In
            </SignInForm.Submit>
          </SignInForm.Base>

          <SignInForm.Text>
            New to MeowFilms?{" "}
            <SignInForm.Link to="/register">Register now.</SignInForm.Link>
          </SignInForm.Text>
          <SignInForm.TextSmall>
            We are happy to add new Meowsters)
          </SignInForm.TextSmall>
        </SignInForm>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
