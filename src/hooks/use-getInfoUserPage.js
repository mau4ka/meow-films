import { useContext, useState } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useGetInfoUserPage() {
  const [getLike, setGetLike] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  if (!getLike) {
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
  }
  return getLike;
}
