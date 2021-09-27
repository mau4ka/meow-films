import React, { useState } from "react";
import { useContext } from "react";
import { WatchContainer } from "../containers/WatchContainer";
import { ContextLikes } from "../context/contextLikes";
import { FirebaseContext } from "../context/firebase";

export default function Watch() {
  const [contextLikes, setContextLikes] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser;

  let userEmail = null;
  if (user) {
    userEmail = user.email;
  }

  return (
    <ContextLikes.Provider value={[contextLikes, setContextLikes]}>
      {user && userEmail ? <WatchContainer /> : null}
    </ContextLikes.Provider>
  );
}
