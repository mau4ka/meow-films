import { useEffect, useState, useContext } from "react";
import { ContextFriends } from "../context/contextFriends";
import { FirebaseContext } from "../context/firebase";

export default function useGetFriend() {
  const [friends, setFriends] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  let userEmail = null;
  if (user && user.email) {
    userEmail = user.email;
  }

  const [contextFriends, setContextFriends] = useContext(ContextFriends);

  useEffect(() => {
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

          setFriends(data);
        } else {
          console.log("No info about user");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [contextFriends]);

  return friends;
}
