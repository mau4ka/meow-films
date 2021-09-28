import { useContext, useEffect, useState } from "react";
import { ContextLikes, ContextLikesShow } from "../context/contextLikesShow";
import { FirebaseContext } from "../context/firebase";

export default function useGetLikedShow() {
  const [getLike, setGetLike] = useState(null);

  const [contextLikesShow, setContextLikesShow] = useContext(ContextLikesShow);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

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
  }, [contextLikesShow]);
  return getLike;
}
