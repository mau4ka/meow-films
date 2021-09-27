import React, { useContext, useEffect, useState } from "react";
import User from "../containers/UserContainer";
import { ContextUserPage } from "../context/contextUserPage";
import { FirebaseContext } from "../context/firebase";

export default function UserPage(props) {
  const [contextUserPage, setContextUserPage] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser;

  let userEmail = null;
  if (user) {
    userEmail = user.email;
  }

  return (
    <ContextUserPage.Provider value={[contextUserPage, setContextUserPage]}>
      {user && userEmail ? <User /> : null}
    </ContextUserPage.Provider>
  );
}
