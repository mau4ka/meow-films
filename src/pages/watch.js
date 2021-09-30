import React, { useState } from "react";
import { useContext } from "react";
import { WatchContainer } from "../containers/WatchContainer";
import { ContextLikes } from "../context/contextLikes";
import { ContextPage } from "../context/contextPage";
import { FirebaseContext } from "../context/firebase";

export default function Watch({ all }) {
  const [contextLikes, setContextLikes] = useState(null);
  const [contextPage, setContextPage] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser;

  let userEmail = null;
  if (user) {
    userEmail = user.email;
  }

  return (
    <ContextLikes.Provider value={[contextLikes, setContextLikes]}>
      <ContextPage.Provider value={[contextPage, setContextPage]}>
        {user && userEmail ? <WatchContainer user={user} all={all} /> : null}
      </ContextPage.Provider>
    </ContextLikes.Provider>
  );
}
