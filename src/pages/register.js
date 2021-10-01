import React, { useState, useContext } from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { FooterContainer } from "../containers/FooterContainer";
import { SignInForm } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");

  const isInvalid = firstName === "" || password === "" || email === "";

  const handleRegister = (event) => {
    event.preventDefault();
    let photo = Math.floor(Math.random() * 5) + 1;

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) =>
        result.user

          .updateProfile({
            displayName: firstName,
            photoURL: photo,
          })
          .then(() => {
            firebase.firestore().collection("users").doc(email).set({
              email: email,
              name: firstName,
              photo: photo,
            });
            firebase.firestore().collection("userPages").doc(email).set({
              recomended: [],
              recomendedId: [],
            });
            history.push(ROUTES.WATCH);
          })
      )
      .catch((error) => {
        setFirstName("");
        setEmail("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <SignInForm>
          <SignInForm.Title>Register</SignInForm.Title>
          {error && <SignInForm.Error>{error}</SignInForm.Error>}

          <SignInForm.Base onSubmit={handleRegister} method="POST">
            <SignInForm.Input
              placeholder="First name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
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
              Register
            </SignInForm.Submit>
          </SignInForm.Base>

          <SignInForm.Text>
            Already register?{" "}
            <SignInForm.Link to="/signin">Sign in now.</SignInForm.Link>
          </SignInForm.Text>
        </SignInForm>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
