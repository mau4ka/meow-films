import React, { useContext } from "react";
import { AllUsers } from "../components";
import { FirebaseContext } from "../context/firebase";
import useGetAllUsers from "../hooks/use-getUsers";
import { ContextFriends } from "../context/contextFriends";
import useInfoUser from "../hooks/use-getInfoUser";
import { FooterContainer } from "./FooterContainer";

export function FriendsContainer({ user }) {
  const [contextFriends, setContextFriends] = useContext(ContextFriends);

  let friendsList = useInfoUser("friends");

  const { firebase } = useContext(FirebaseContext);

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
            if (!person.email) {
              return false;
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
            } else if (
              Array.isArray(doc.data().friends) &&
              Array.isArray(doc.data().friendsEmails)
            ) {
              firebase
                .firestore()
                .collection("userPages")
                .doc(userEmail)
                .update({
                  friends: [...doc.data().friends, person],
                  friendsEmails: [...doc.data().friendsEmails, person.email],
                });
            } else {
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
          console.log(error);
        });
    }
  };

  let clickHandler = async (el) => {
    await setFriend(el);
    setContextFriends(!contextFriends);
  };

  const allUsers = useGetAllUsers();

  return (
    <>
      <AllUsers.BigTitle>Your Friends</AllUsers.BigTitle>
      {friendsList && friendsList.friends && friendsList.friends.length ? (
        <AllUsers>
          <AllUsers.GroupRow wrap="nowrap" overflow="auto" justify="start">
            {friendsList.friends.map((el) => (
              <AllUsers.Item key={el.email} direction="column">
                {el.photo <= 5 ? (
                  <AllUsers.Image src={`/images/users/${el.photo}.jpg`} />
                ) : (
                  <AllUsers.Image src={"/images/users/1.jpg"} />
                )}

                <AllUsers.Title>{el.name}</AllUsers.Title>
                <AllUsers.Text>{el.email}</AllUsers.Text>

                <AllUsers.ButtonDelete onClick={() => clickHandler(el)}>
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
                      <AllUsers.Image src={"/images/users/1.jpg"} />
                    )}

                    <AllUsers.Group>
                      <AllUsers.Title>{el.name}</AllUsers.Title>
                      <AllUsers.Text>{el.email}</AllUsers.Text>
                    </AllUsers.Group>
                    <AllUsers.ButtonAdd onClick={() => clickHandler(el)}>
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
