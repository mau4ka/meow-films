import React from "react";
import { useContext } from "react";
import { AllUsers, Header } from "../components";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../context/firebase";
import logo from "../meowLogo.png";

import useGetAllUsers from "../hooks/use-getUsers";

export default function FriendsPage() {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  const allUsers = useGetAllUsers();
  console.log(allUsers);
  return (
    <>
      <Header dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.MAIN} src={logo} alt="Netflix" />
          </Header.Group>
          <Header.Group>
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.Text>{user.displayName}</Header.Text>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
      </Header>
      <AllUsers.BigTitle>Your Friends</AllUsers.BigTitle>
      {allUsers ? (
        <AllUsers>
          <AllUsers.GroupRow wrap="nowrap" overflow="auto" justify="start">
            {allUsers.map((el) => (
              <AllUsers.Item key={el.email} direction="column">
                {el.photo <= 5 ? (
                  <AllUsers.Image src={`/images/users/${el.photo}.jpg`} />
                ) : (
                  <AllUsers.Image src={`/images/users/1.jpg`} />
                )}

                <AllUsers.Title>{el.name}</AllUsers.Title>
                <AllUsers.Text>{el.email}</AllUsers.Text>

                <AllUsers.ButtonDelete>Delete friend</AllUsers.ButtonDelete>
              </AllUsers.Item>
            ))}
          </AllUsers.GroupRow>
        </AllUsers>
      ) : (
        <div>Empty</div>
      )}

      <AllUsers.BigTitle>Add Friends</AllUsers.BigTitle>

      {allUsers ? (
        <AllUsers>
          <AllUsers.GroupRow wrap="wrap" overflow="none" justify="center">
            {allUsers.map((el) => (
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
                <AllUsers.ButtonAdd>Add friend</AllUsers.ButtonAdd>
              </AllUsers.Item>
            ))}
          </AllUsers.GroupRow>
        </AllUsers>
      ) : (
        <div>Empty</div>
      )}
    </>
  );
}
