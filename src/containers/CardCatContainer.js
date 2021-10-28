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
    try {
      await firebase
        .firestore()
        .collection("userPages")
        .doc(userEmail)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            if (el.id === "" || !el.id) {
              return null;
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
              let newLikes = doc
                .data()
                .likes.filter((likeEl) => likeEl.id !== el.id);
              let newLikesId = doc
                .data()
                .likesId.filter((likeEl) => likeEl !== el.id);

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
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error)
    }
  };

  let onClickHandle = async (item) => {
    await setLike(item);
    setContextLikes(!contextLikes);
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
                  onClick={() => onClickHandle(item)}
                  src={
                    liked &&
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
                onClick={() => onClickHandle(item.show)}
                src={
                  liked &&
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
