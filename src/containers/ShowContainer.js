import React, { useContext } from "react";
import { Header, Show } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import userHome from "../user.png";
import { FirebaseContext } from "../context/firebase";
import useContentShow from "../hooks/use-api-show";
import heartLiked from "../heartLiked.svg";
import heartWhite from "../heartWhite.svg";
import no_image from "../no_image.png";
import { ShareToFriendsContainer } from "./ShareToFriends";
import { ContextLikesShow } from "../context/contextLikesShow";
import useInfoUser from "../hooks/use-getInfoUser";
import { FooterContainer } from "./FooterContainer";

export function ShowContainer({ user }) {
  const [contextLikesShow, setContextLikesShow] = useContext(ContextLikesShow);

  const liked = useInfoUser("likesShow");
  let num = window.location.href.split("/").pop();
  let show = useContentShow(num);

  const { firebase } = useContext(FirebaseContext);

  let userEmail = null;
  if (user) {
    userEmail = user.email;
  }

  let setLike = async (el) => {
    let userEmail = user.email;
    if (user.email && el) {
      await firebase
        .firestore()
        .collection("userPages")
        .doc(userEmail)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            if (el.id === "" || !el.id) {
              console.log("Bad id");
            } else if (!doc.data().likes) {
              firebase
                .firestore()
                .collection("userPages")
                .doc(userEmail)
                .update({
                  likes: [el],
                  likesId: [el.id],
                });
            } else if (doc.data().likesId.indexOf(el.id) !== -1) {
              let newLikes = doc.data().likes.filter(function (number) {
                return number.id !== el.id;
              });
              let newLikesId = doc.data().likesId.filter(function (number) {
                return number !== el.id;
              });

              firebase
                .firestore()
                .collection("userPages")
                .doc(userEmail)
                .update({
                  likes: newLikes,
                  likesId: newLikesId,
                });
            } else if (Array.isArray(doc.data().likes)) {
              firebase
                .firestore()
                .collection("userPages")
                .doc(userEmail)
                .update({
                  likes: [...doc.data().likes, el],
                  likesId: [...doc.data().likesId, el.id],
                });
            } else {
              firebase
                .firestore()
                .collection("userPages")
                .doc(userEmail)
                .update({
                  likes: [doc.data().likes, el],
                  likesId: [doc.data().likesId, el.id],
                });
            }
          } else {
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .set({
                likes: [el],
                likesId: [el.id],
              });
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  };

  return (
    <>
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
            {user && userEmail && liked !== null ? (
              <Show.Heart
                onClick={async (el) => {
                  await setLike(show);
                  setContextLikesShow(!contextLikesShow);
                }}
                src={
                  liked !== null &&
                  liked.likesId &&
                  liked.likesId.indexOf(show.id) !== -1
                    ? heartLiked
                    : heartWhite
                }
                alt="heart"
              ></Show.Heart>
            ) : null}
          </Show>
        ) : (
          <Show.Title>Nothing found</Show.Title>
        )}

        {user && user.email && show.id ? (
          <ShareToFriendsContainer show={show} />
        ) : null}
      </Show.Box>
      <FooterContainer />
    </>
  );
}
