import React, { useContext, useEffect, useState } from "react";
import { Cards, Header, Loading } from "../components";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import heartLiked from "../heartLiked.svg";
import deleteButton from "../DeleteButton.svg";
import { ContextUserPage } from "../context/contextUserPage";
import useInfoUser from "../hooks/use-getInfoUser";
import { FooterContainer } from "./FooterContainer";
import { useHistory } from "react-router";

export default function User({ user }) {
  const history = useHistory();
  const [contextUserPage, setContextUserPage] = useContext(ContextUserPage);
  const info = useInfoUser("userPage");
  const { firebase } = useContext(FirebaseContext);
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
            console.log("Document data:", doc.data());
            if (el.id === "" || !el.id || !doc.data().likes) {
              console.log("Bad info");
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
            } else {
              console.log("Bad info");
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
            console.log("Document data:", doc.data());
            if (el.id === "" || !el.id || !doc.data().recommended) {
              console.log("Bad info");
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
            } else {
              console.log("Bad info");
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
    }, 2000);
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
      <Header.GroupFriend>
        <Header.Button onClick={() => history.push(ROUTES.FRIENDS)}>
          Go to friend list
        </Header.Button>
      </Header.GroupFriend>

      <Cards.Box>
        <Cards.Title>Liked</Cards.Title>
        {info && info.likes && info.likes.length !== 0 ? (
          <Cards>
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
          <Cards.Title style={{ color: "red" }}>No liked shows</Cards.Title>
        )}
        <Cards.Title>Recommended by friends</Cards.Title>
        {info && info.recommended && info.recommended.length !== 0 ? (
          <Cards>
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
          <Cards.Title style={{ color: "red" }}>
            No recommended shows
          </Cards.Title>
        )}
      </Cards.Box>
      <FooterContainer />
    </>
  );
}
