import { useContext, useEffect, useState } from "react";
import * as axios from "axios";
import { ContextShow } from "../context/contextShow";
import { FirebaseContext } from "../context/firebase";

export default function useSetLike(id) {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  console.log(user.email);
  let userEmail = user.email;
  if (user.email) {
    firebase
      .firestore()
      .collection("userPages")
      .doc(userEmail)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data(), doc.data().likes);
          if (id === "" || !id) {
            console.log("Bad id");
          } else if (!doc.data().likes) {
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .update({
                likes: [id],
              });
          } else if (doc.data().likes.indexOf(id) !== -1) {
            console.log("Already liked");
          } else if (Array.isArray(doc.data().likes)) {
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .update({
                likes: [...doc.data().likes, id],
              });
          } else {
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .update({
                likes: [doc.data().likes, id],
              });
          }
        } else {
          console.log("No info about user");

          firebase
            .firestore()
            .collection("userPages")
            .doc(userEmail)
            .set({
              likes: [id],
            });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
}
