import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useGetAllUsers() {
  const [users, setUsers] = useState(null);

  const { firebase } = useContext(FirebaseContext);

  useEffect(async () => {
    let usersData = [];
    await firebase
      .firestore()
      .collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());

          usersData.push(doc.data());
        });
      });
    setUsers(usersData);
  }, []);

  return users;
}
