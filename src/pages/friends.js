import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../context/firebase";
import logo from "../meowLogo.png";
import userHome from "../user.png";

import { FriendsContainer } from "../containers/FriendsContainer";
import { ContextFriends } from "../context/contextFriends";
import { useHistory } from "react-router";

export default function FriendsPage() {
  let history = useHistory();
  const [contextFriends, setContextFriends] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser;

  let userEmail = null;
  if (user) {
    userEmail = user.email;
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <ContextFriends.Provider value={[contextFriends, setContextFriends]}>
        {user && userEmail ? (
          <>
            {loading ? (
              <Loading src={user.photoURL} />
            ) : (
              <Loading.ReleaseBody />
            )}
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
                    <Header.PictureHome
                      src={userHome}
                      alt="home"
                      onClick={() => history.push(ROUTES.USER)}
                    />
                  </Header.Group>
                </Header.Frame>
              </Header>
              <FriendsContainer user={user} />
            </div>
          </>
        ) : null}
      </ContextFriends.Provider>
    </>
  );
}
