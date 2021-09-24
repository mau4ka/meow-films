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
      {allUsers ? (
        <AllUsers>
          <AllUsers.Group>
            {allUsers.map((el) => (
              <AllUsers.Item key={el.email}>
                {el.photo <= 5 ? (
                  <AllUsers.Image src={`/images/users/${el.photo}.jpg`} />
                ) : (
                  <AllUsers.Image src={`/images/users/1.jpg`} />
                )}

                <AllUsers.Group>
                  <AllUsers.Title>{el.name}</AllUsers.Title>
                  <AllUsers.Text>{el.email}</AllUsers.Text>
                </AllUsers.Group>
              </AllUsers.Item>
            ))}
            ))
          </AllUsers.Group>
        </AllUsers>
      ) : (
        <div>Empty</div>
      )}
    </>
  );
}
