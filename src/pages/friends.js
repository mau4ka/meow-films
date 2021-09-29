import React, { useState } from "react";
import { useContext } from "react";
import { Header } from "../components";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../context/firebase";
import logo from "../meowLogo.png";

import { FriendsContainer } from "../containers/FriendsContainer";
import { ContextFriends } from "../context/contextFriends";

export default function FriendsPage() {
  const [contextFriends, setContextFriends] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser;

  let userEmail = null;
  if (user) {
    userEmail = user.email;
  }

  return (
    <>
      <ContextFriends.Provider value={[contextFriends, setContextFriends]}>
        {user && userEmail ? (
          <div>
            <Header>
              <Header.Frame>
                <Header.Group>
                  <Header.Logo to={ROUTES.MAIN} src={logo} alt="Netflix" />
                </Header.Group>
                <Header.Group>
                  <Header.Profile>
                    <Header.Picture src={user.photoURL} />
                    <Header.Dropdown>
                      <Header.Group>
                        <Header.Picture src={user.photoURL} />
                        <Header.Text>{user.displayName}</Header.Text>
                      </Header.Group>
                      <Header.Group>
                        <Header.TextLink
                          onClick={() => firebase.auth().signOut()}
                        >
                          Sign out
                        </Header.TextLink>
                      </Header.Group>
                    </Header.Dropdown>
                  </Header.Profile>
                </Header.Group>
              </Header.Frame>
            </Header>
            <FriendsContainer user={user} />
          </div>
        ) : null}
      </ContextFriends.Provider>
    </>
  );
}
