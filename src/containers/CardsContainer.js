import React, { useEffect, useState } from "react";
import { Cards } from "../components";
import useApiSearch from "../hooks/use-api-search";
import heart from "../heart.svg";
import heartLiked from "../heartLiked.svg";
import useApiAllShows from "../hooks/use-api-all-shows";
import { ContextLikes } from "../context/contextLikes";
import { useContext } from "react";
import useGetLiked from "../hooks/use-getLiked";
import { FirebaseContext } from "../context/firebase";

export function CardsContainer({ name, category }) {
  const liked = useGetLiked();

  const [contextLikes, setContextLikes] = useContext(ContextLikes);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

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
            console.log("Document data:", doc.data(), doc.data().likes);
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
            console.log("No info about user");

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
  let allShows = useApiAllShows();
  let search = useApiSearch(name);
  console.log(name);

  console.log(liked);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {name === null ? (
        <Cards>
          <Cards.Title>{name}</Cards.Title>
          <Cards.Group>
            {allShows && (category === null || category === "null") ? (
              allShows.map((item) => (
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
            ) : allShows && category !== null ? (
              allShows
                .filter((item) => item.genres.toString().includes(category))
                .map((item) => (
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
            ) : (
              <p></p>
            )}
          </Cards.Group>
        </Cards>
      ) : (
        <Cards>
          <Cards.Title>Find by name: {name}</Cards.Title>

          <Cards.Group>
            {search.content && search.content.length !== 0 ? (
              search.content.map((item) => (
                <Cards.OneItem
                  item={item.show}
                  liked={liked}
                  key={item.show.id}
                >
                  <Cards.Heart
                    onClick={async (el) => {
                      await setLike(item);
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
            ) : (
              <Cards.Title>Nothing</Cards.Title>
            )}
          </Cards.Group>
        </Cards>
      )}
    </>
  );
}
