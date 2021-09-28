import React, { useContext } from "react";
import { AllUsers } from "../components";
import { FirebaseContext } from "../context/firebase";
import useGetAllUsers from "../hooks/use-getUsers";
import { ContextFriends } from "../context/contextFriends";
import useInfoUser from "../hooks/use-getInfoUser";
import { FooterContainer } from "./FooterContainer";

export function FriendsContainer() {
  const [contextFriends, setContextFriends] = useContext(ContextFriends);

  let friendsList = useInfoUser("friends");

  if (friendsList) {
    console.log(friendsList);
  }

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  console.log(user);

  let setFriend = async (person) => {
    let userEmail = user.email;
    if (user.email && person) {
      await firebase
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
            } else if (doc.data().friendsEmails.indexOf(person.email) !== -1) {
              let newFriends = doc.data().friends.filter(function (number) {
                return number.email !== person.email;
              });
              let newFriendsEmail = doc
                .data()
                .friendsEmails.filter(function (number) {
                  return number !== person.email;
                });

              firebase
                .firestore()
                .collection("userPages")
                .doc(userEmail)
                .update({
                  friends: newFriends,
                  friendsEmails: newFriendsEmail,
                });

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
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  };
  const allUsers = useGetAllUsers();
  console.log(allUsers);

  return (
    <>
      <AllUsers.BigTitle>Your Friends</AllUsers.BigTitle>
      {friendsList &&
      friendsList.friends &&
      friendsList.friends.length !== 0 ? (
        <AllUsers>
          <AllUsers.GroupRow wrap="nowrap" overflow="auto" justify="start">
            {friendsList.friends.map((el) => (
              <AllUsers.Item key={el.email} direction="column">
                {el.photo <= 5 ? (
                  <AllUsers.Image src={`/images/users/${el.photo}.jpg`} />
                ) : (
                  <AllUsers.Image src={`/images/users/1.jpg`} />
                )}

                <AllUsers.Title>{el.name}</AllUsers.Title>
                <AllUsers.Text>{el.email}</AllUsers.Text>

                <AllUsers.ButtonDelete
                  onClick={async () => {
                    await setFriend(el);
                    setContextFriends(!contextFriends);
                  }}
                >
                  Delete friend
                </AllUsers.ButtonDelete>
              </AllUsers.Item>
            ))}
          </AllUsers.GroupRow>
        </AllUsers>
      ) : (
        <AllUsers.Title>You don`t have friends. Add them</AllUsers.Title>
      )}

      {allUsers && friendsList ? (
        <>
          <AllUsers.BigTitle>Add Friends</AllUsers.BigTitle>
          <AllUsers>
            <AllUsers.GroupRow wrap="wrap" overflow="none" justify="center">
              {allUsers
                .filter(function (number) {
                  if (friendsList.friendsEmails) {
                    return !friendsList.friendsEmails.includes(number.email);
                  } else {
                    return true;
                  }
                })
                .map((el) => (
                  <AllUsers.Item key={el.email} direction="row">
                    {el.photo <= 5 ? (
                      <AllUsers.Image src={`/images/users/${el.photo}.jpg`} />
                    ) : (
                      <AllUsers.Image src={`/images/users/1.jpg`} />
                    )}

                    <AllUsers.Group>
                      <AllUsers.Title>{el.name}</AllUsers.Title>
                      <AllUsers.Text>{el.email}</AllUsers.Text>
                    </AllUsers.Group>
                    <AllUsers.ButtonAdd
                      onClick={async () => {
                        await setFriend(el);
                        setContextFriends(!contextFriends);
                      }}
                    >
                      Add friend
                    </AllUsers.ButtonAdd>
                  </AllUsers.Item>
                ))}
            </AllUsers.GroupRow>
          </AllUsers>
        </>
      ) : (
        <AllUsers.Title>You add all users to your friends</AllUsers.Title>
      )}
      <FooterContainer />
    </>
  );
}
