import { useContext, useEffect, useState } from "react";
import { ContextUserPage } from "../context/contextUserPage";
import { FirebaseContext } from "../context/firebase";

export default function useGetLiked() {
  const [getInfo, setGetInfo] = useState(null);

  const [contextUser, setContextUser] = useContext(ContextUserPage);

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

          setGetInfo(data);
        } else {
          console.log("No info about user");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [contextUser]);
  return getInfo;
}
