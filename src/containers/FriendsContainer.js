import React, { useState, useEffect, useContext } from "react";
import { AllUsers, Cards, Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import userHome from "../user.png";
import { FirebaseContext } from "../context/firebase";
import { FooterContainer } from "./FooterContainer";
import { CardsContainer } from "./CardsContainer";
import { ContextShow } from "../context/contextShow";
import useSetFriends from "../hooks/use-setFriends";
import useGetAllUsers from "../hooks/use-getUsers";
import useGetFriend from "../hooks/use-getFriends";
import { ContextFriends } from "../context/contextFriends";

export function FriendsContainer() {
  const [contextFriends, setContextFriends] = useContext(ContextFriends);

  // setContextFriends(null)

  let friendsList = useGetFriend();

  if (friendsList) {
    console.log(friendsList);
  }

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  console.log(user);

  const [friend, setFriend] = useState(null);
  useSetFriends(friend);

  const allUsers = useGetAllUsers();
  console.log(allUsers);

  useEffect(() => {
    console.log("mau");
  }, [setFriend]);

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
                    setFriend(el);
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
                  return !friendsList.friendsEmails.includes(number.email);
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
                        setFriend(el);
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
