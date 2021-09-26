import React from "react";
import { useContext } from "react/cjs/react.development";
import { AllUsers } from "../components";
import { FirebaseContext } from "../context/firebase";

import useGetFriendShare from "../hooks/use-getFriendsShare";

export function ShareToFriendsContainer({ show }) {
  let friendsList = useGetFriendShare();
  const { firebase } = useContext(FirebaseContext);
  const handleShare = (who) => {
    console.log("mau share");

    if (show && who) {
      firebase
        .firestore()
        .collection("userPages")
        .doc(who)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            if (!doc.data().recommended) {
              firebase
                .firestore()
                .collection("userPages")
                .doc(who)
                .update({
                  recommended: [show],
                  recommendedId: [show.id],
                });
            } else if (doc.data().recommendedId.indexOf(show.id) !== -1) {
              console.log("Already shared");
            } else if (
              Array.isArray(doc.data().recommended) &&
              Array.isArray(doc.data().recommendedId)
            ) {
              console.log("Is arrays");
              firebase
                .firestore()
                .collection("userPages")
                .doc(who)
                .update({
                  recommended: [...doc.data().recommended, show],
                  recommendedId: [...doc.data().recommendedId, show.id],
                });
            } else {
              console.log("NO arrays");
              firebase
                .firestore()
                .collection("userPages")
                .doc(who)
                .update({
                  recommended: [doc.data().recommended, show],
                  recommendedId: [doc.data().recommendedId, show.id],
                });
            }
          } else {
            console.log("No info about user");

            firebase
              .firestore()
              .collection("userPages")
              .doc(who)
              .set({
                recommended: [show],
                recommendedId: [show.id],
              });
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  };

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
                  <AllUsers.ButtonDelete
                    onClick={(e) => {
                      e.preventDefault();
                      handleShare(el.email);
                    }}
                  >
                    Share
                  </AllUsers.ButtonDelete>
                </AllUsers.Item>
              ))}
            </AllUsers.GroupRow>
          </AllUsers>
        </>
      ) : null}
    </>
  );
}
