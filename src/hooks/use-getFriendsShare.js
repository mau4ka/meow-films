import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useGetFriendShare() {
  const [friends, setFriends] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  let userEmail = null;
  if (user && user.email) {
    userEmail = user.email;
  }

  useEffect(async () => {
    await firebase
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
  }, []);

  return friends;
}
