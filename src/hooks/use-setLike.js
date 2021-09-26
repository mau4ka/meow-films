import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { ContextLikes } from "../context/contextLikes";

export default function useSetLike(el) {
  const [contextLikes, setContextLikes] = useContext(ContextLikes);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  console.log(user.email);
  let userEmail = user.email;
  if (user.email && el) {
    firebase
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
            setContextLikes(null);
          } else if (doc.data().likesId.indexOf(el.id) !== -1) {
            let newLikes = doc.data().likes.filter(function (number) {
              return number.id !== el.id;
            });
            let newLikesId = doc.data().likesId.filter(function (number) {
              return number !== el.id;
            });

            firebase.firestore().collection("userPages").doc(userEmail).update({
              likes: newLikes,
              likesId: newLikesId,
            });
            setContextLikes(null);

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
            setContextLikes(null);
          } else {
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .update({
                likes: [doc.data().likes, el],
                likesId: [doc.data().likesId, el.id],
              });
            setContextLikes(null);
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
          setContextLikes(null);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
}
