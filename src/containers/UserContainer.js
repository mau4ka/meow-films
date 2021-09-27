import React, { useContext, useEffect, useState } from "react";
import { Cards, Header, Loading } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import heartLiked from "../heartLiked.svg";
import deleteButton from "../DeleteButton.svg";
import { ContextUserPage } from "../context/contextUserPage";
import useGetInfoUserPage from "../hooks/use-getInfoUserPage";

export default function User() {
  const [contextUserPage, setContextUserPage] = useContext(ContextUserPage);
  const info = useGetInfoUserPage();
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [loading, setLoading] = useState(true);

  let deleteLike = async (el) => {
    let userEmail = user.email;
    if (user.email && el) {
      await firebase
        .firestore()
        .collection("userPages")
        .doc(userEmail)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data(), doc.data().likes);
            if (el.id === "" || !el.id) {
              console.log("Bad id");
            } else if (!doc.data().likes) {
              console.log("Bad id");
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

              console.log("Already liked");
            } else {
              console.log("Bad id");
            }
          } else {
            console.log("No info about user");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  };

  let deleteRecommend = async (el) => {
    let userEmail = user.email;
    if (user.email && el) {
      await firebase
        .firestore()
        .collection("userPages")
        .doc(userEmail)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data(), doc.data().recommended);
            if (el.id === "" || !el.id) {
              console.log("Bad id");
            } else if (!doc.data().recommended) {
              console.log("Bad id");
            } else if (doc.data().recommendedId.indexOf(el.id) !== -1) {
              let newRec = doc.data().recommended.filter(function (number) {
                return number.id !== el.id;
              });
              let newRecId = doc.data().recommendedId.filter(function (number) {
                return number !== el.id;
              });
              firebase
                .firestore()
                .collection("userPages")
                .doc(userEmail)
                .update({
                  recommended: newRec,
                  recommendedId: newRecId,
                });

              console.log("Already liked");
            } else {
              console.log("Bad id");
            }
          } else {
            console.log("No info about user");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  };

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

      {info && info.likes ? (
        <Cards>
          <Cards.Title>Liked</Cards.Title>
          <Cards.GroupRow>
            {info.likes.map((item) => (
              <Cards.Container key={item.id}>
                <Cards.OneItem item={item}>
                  <Cards.Heart
                    onClick={async (el) => {
                      await deleteLike(item);
                      setContextUserPage(!contextUserPage);
                    }}
                    src={heartLiked}
                    alt="heart"
                  ></Cards.Heart>
                </Cards.OneItem>
              </Cards.Container>
            ))}
          </Cards.GroupRow>
        </Cards>
      ) : (
        <div>loading...</div>
      )}

      {info && info.recommended ? (
        <Cards>
          <Cards.Title>Recommended by friends</Cards.Title>
          <Cards.GroupRow>
            {info.recommended.map((item) => (
              <Cards.OneItem item={item} key={item.id}>
                <Cards.Heart
                  onClick={async (el) => {
                    await deleteRecommend(item);
                    setContextUserPage(!contextUserPage);
                  }}
                  src={deleteButton}
                  alt="heart"
                ></Cards.Heart>
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
