import React, { useContext, useEffect, useState } from "react";
import { Header, Loading, Show } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import userHome from "../user.png";
import useContentShow from "../hooks/use-api-show";
import no_image from "../no_image.png";
import { ShareToFriendsContainer } from "../containers/ShareToFriends";

export default function ShowPage(props) {
  console.log(window.location.href.split("/").pop());
  let num = window.location.href.split("/").pop();
  let show = useContentShow(num);
  console.log(show);
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
            <Header.PictureHome
              src={userHome}
              alt="home"
              onClick={() => (window.location.href = ROUTES.USER)}
            />
          </Header.Group>
        </Header.Frame>
      </Header>
      <Show.Box>
        {show.length !== 0 ? (
          <Show>
            {!show.image || !show.image.original ? (
              <Show.Image src={no_image} alt="no-image" />
            ) : (
              <Show.Image src={show.image.original} alt={show.name} />
            )}
            <Show.Group>
              <Show.Title>{show.name}</Show.Title>
              <Show.Text>Language: {show.language}</Show.Text>
              <Show.Text>Status: {show.status}</Show.Text>
              <Show.Text>Type: {show.type}</Show.Text>
              {show.genres ? (
                <Show.Text>Genres: {show.genres.join(", ")}</Show.Text>
              ) : null}
              {show.summary ? (
                <Show.Text>{show.summary.replace(/<[^>]*>/g, " ")}</Show.Text>
              ) : null}

              <Show.Link href={show.url}>Watch on tvmaze</Show.Link>
            </Show.Group>
          </Show>
        ) : (
          <Show.Title>Nothing found</Show.Title>
        )}

        {user && user.email ? <ShareToFriendsContainer show={show} /> : null}
      </Show.Box>
    </>
  );
}
