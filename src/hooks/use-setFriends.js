import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { ContextFriends } from "../context/contextFriends";

export default function useSetFriends(person) {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [contextFriends, setContextFriends] = useContext(ContextFriends);

  console.log(user.email);
  let userEmail = user.email;
  if (user.email && person) {
    firebase
      .firestore()
      .collection("userPages")
      .doc(userEmail)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data(), doc.data().friends);
          if (person.email === "" || !person.email) {
            console.log("Bad person");
          } else if (!doc.data().friends) {
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .update({
                friends: [person],
                friendsEmails: [person.email],
              });
            setContextFriends(person.name);
          } else if (doc.data().friendsEmails.indexOf(person.email) !== -1) {
            let newFriends = doc.data().friends.filter(function (number) {
              return number.email !== person.email;
            });
            let newFriendsEmail = doc
              .data()
              .friendsEmails.filter(function (number) {
                return number !== person.email;
              });

            firebase.firestore().collection("userPages").doc(userEmail).update({
              friends: newFriends,
              friendsEmails: newFriendsEmail,
            });
            // setContextFriendsMinus(person.email)
            setContextFriends(person.email);

            console.log("Already friendship");
          } else if (
            Array.isArray(doc.data().friends) &&
            Array.isArray(doc.data().friendsEmails)
          ) {
            console.log("Is arrays");
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .update({
                friends: [...doc.data().friends, person],
                friendsEmails: [...doc.data().friendsEmails, person.email],
              });
            setContextFriends(person.email);
          } else {
            console.log("NO arrays");
            firebase
              .firestore()
              .collection("userPages")
              .doc(userEmail)
              .update({
                friends: [doc.data().friends, person],
                friendsEmails: [doc.data().friendsEmails, person.email],
              });
            setContextFriends(person.email);
          }
        } else {
          console.log("No info about user");

          firebase
            .firestore()
            .collection("userPages")
            .doc(userEmail)
            .set({
              friends: [person],
              friendsEmails: [person.email],
            });
          setContextFriends(person.email);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
}
