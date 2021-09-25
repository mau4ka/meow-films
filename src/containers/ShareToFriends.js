import React from "react";
import { AllUsers } from "../components";

import useGetFriendShare from "../hooks/use-getFriendsShare";

export function ShareToFriendsContainer() {
  let friendsList = useGetFriendShare();

  return (
    <>
      {friendsList && friendsList.friends ? (
        <>
          <AllUsers.BigTitle>Share to your friends</AllUsers.BigTitle>
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
                  <AllUsers.ButtonDelete>Share</AllUsers.ButtonDelete>
                </AllUsers.Item>
              ))}
            </AllUsers.GroupRow>
          </AllUsers>
        </>
      ) : null}
    </>
  );
}
