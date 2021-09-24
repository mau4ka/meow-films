import React, { useContext, useEffect, useState } from "react";
import { Cards, Header, Loading, Show } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import no_image from "../no_image.png";

export default function User(props) {
  console.log(props.liked);

  // const [contextLike, setContextLike] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <Header dontShowOnSmallViewPort>
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
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
      </Header>
      <Header.Button onClick={() => (window.location.href = ROUTES.FRIENDS)}>
        Go to friend list
      </Header.Button>
      {props.liked ? (
        <Cards>
          <Cards.Title>Liked</Cards.Title>
          <Cards.GroupRow>
            {props.liked.likes.map((item) => (
              <Cards.OneItem item={item} key={item.id}>
                <p> </p>
              </Cards.OneItem>
            ))}
          </Cards.GroupRow>
        </Cards>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
