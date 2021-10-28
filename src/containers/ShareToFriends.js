import React, { useState } from "react";
import { useContext } from "react";
import { AllUsers } from "../components";
import { FirebaseContext } from "../context/firebase";
import useInfoUser from "../hooks/use-getInfoUser";

export function ShareToFriendsContainer({ show }) {
  let friendsList = useInfoUser("friendsShare");
  const { firebase } = useContext(FirebaseContext);
  const handleShare = async (who) => {
    try {
      await firebase
        .firestore()
        .collection("userPages")
        .doc(who)
        .get()
        .then(function (doc) {
          if (doc.exists) {
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
              return false;
            } else if (
              Array.isArray(doc.data().recommended) &&
              Array.isArray(doc.data().recommendedId)
            ) {
              firebase
                .firestore()
                .collection("userPages")
                .doc(who)
                .update({
                  recommended: [...doc.data().recommended, show],
                  recommendedId: [...doc.data().recommendedId, show.id],
                });
            } else {
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
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error)
    }
  };

  const [displayAl, setDisplayAl] = useState("none");
  let display = () => {
    setDisplayAl("block");
    setTimeout(() => {
      setDisplayAl("none");
    }, 2000);
  };

  return (
    <>
      {friendsList && friendsList.friends && friendsList.friends.length ? (
        <>
          <AllUsers.BigTitle>Share to your friends</AllUsers.BigTitle>
          <AllUsers.Box display={displayAl}>
            <AllUsers.Alert>Shared!</AllUsers.Alert>
          </AllUsers.Box>
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
                      display();
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
