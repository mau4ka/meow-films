import React, { useContext } from "react";
import { AllUsers } from "../components";
import { FirebaseContext } from "../context/firebase";
import useSetFriends from "../hooks/use-setFriends";
import useGetAllUsers from "../hooks/use-getUsers";
import useGetFriend from "../hooks/use-getFriends";
import { ContextFriends } from "../context/contextFriends";

export function FriendsContainer() {
  const [contextFriends, setContextFriends] = useContext(ContextFriends);

  let friendsList = useGetFriend();

  if (friendsList) {
    console.log(friendsList);
  }

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  console.log(user);

  useSetFriends(contextFriends);

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
                  onClick={() => {
                    setContextFriends(el);
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
                      onClick={() => {
                        setContextFriends(el);
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
    </>
  );
}
