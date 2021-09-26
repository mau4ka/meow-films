import { useContext, useEffect, useState } from "react";
import { ContextLikes } from "../context/contextLikes";
import { FirebaseContext } from "../context/firebase";

export default function useGetLiked() {
  const [getLike, setGetLike] = useState(null);

  const [contextLikes, setContextLikes] = useContext(ContextLikes);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  //   useEffect(() => {
  //     alert('mau')
  // }, [contextLikes]);

  // if (user && user.email) {
  useEffect(() => {
    let userEmail = user.email;
    firebase
      .firestore()
      .collection("userPages")
      .doc(userEmail)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log(
            "Document data:",
            doc.data(),
            doc.data().likes,
            doc.data().likesId
          );
          const data = doc.data();

          setGetLike(data);
        } else {
          console.log("No info about user");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [contextLikes]);
  return getLike;
}
