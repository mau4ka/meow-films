import React from "react";
import { Cards } from "../components";
import heart from "../heart.svg";
import heartLiked from "../heartLiked.svg";
import { ContextLikes } from "../context/contextLikes";
import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";

export function CardCatContainer({ user, cards, liked, search }) {
  const [contextLikes, setContextLikes] = useContext(ContextLikes);
  const { firebase } = useContext(FirebaseContext);

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

              console.log("Already liked");
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
      {liked ? (
        search !== "true" ? (
          cards.length === 0 ? (
            <Cards.Title>Wait or search on next page</Cards.Title>
          ) : (
            cards.map((item) => (
              <Cards.OneItem item={item} liked={liked} key={item.id}>
                <Cards.Heart
                  onClick={async (el) => {
                    await setLike(item);
                    setContextLikes(!contextLikes);
                  }}
                  src={
                    liked !== null &&
                    liked.likesId &&
                    liked.likesId.indexOf(item.id) !== -1
                      ? heartLiked
                      : heart
                  }
                  alt="heart"
                ></Cards.Heart>
              </Cards.OneItem>
            ))
          )
        ) : (
          cards.map((item) => (
            <Cards.OneItem item={item.show} liked={liked} key={item.show.id}>
              <Cards.Heart
                onClick={async (el) => {
                  await setLike(item.show);
                  setContextLikes(!contextLikes);
                }}
                src={
                  liked !== null &&
                  liked.likesId &&
                  liked.likesId.indexOf(item.show.id) !== -1
                    ? heartLiked
                    : heart
                }
                alt="heart"
              ></Cards.Heart>
            </Cards.OneItem>
          ))
        )
      ) : null}
    </>
  );
}
