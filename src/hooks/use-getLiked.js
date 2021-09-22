import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useGetLiked() {
  const [getLike, setGetLike] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  if (user && user.email) {
    if (!getLike) {
      let userEmail = user.email;
      firebase
        .firestore()
        .collection("userPages")
        .doc(userEmail)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data(), doc.data().likes);

            // setGetLike('maau')

            const data = doc.data().likes;

            setGetLike(data);
          } else {
            console.log("No info about user");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }

  return getLike;
}
