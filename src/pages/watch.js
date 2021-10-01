import React, { useState } from "react";
import { useContext } from "react";
import { WatchContainer } from "../containers/WatchContainer";
import { ContextLikes } from "../context/contextLikes";
import { ContextPage } from "../context/contextPage";
import { FirebaseContext } from "../context/firebase";
import { Header } from "../components";

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
        <>
          {user && userEmail ? <WatchContainer user={user} all={all} /> : null}
          <Header.BoxGo>
            <>
              <Header.ButtonGo
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                &#9650;
              </Header.ButtonGo>
              <Header.ButtonGo
                onClick={() => {
                  window.scrollTo({
                    top: document.body.scrollHeight - 900,
                    behavior: "smooth",
                  });
                }}
              >
                &#9660;
              </Header.ButtonGo>
            </>
          </Header.BoxGo>
        </>
      </ContextPage.Provider>
    </ContextLikes.Provider>
  );
}
