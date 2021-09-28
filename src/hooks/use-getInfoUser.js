import { useEffect, useState, useContext } from "react";
import { ContextFriends } from "../context/contextFriends";
import { ContextLikes } from "../context/contextLikes";
import { ContextLikesShow } from "../context/contextLikesShow";
import { ContextUserPage } from "../context/contextUserPage";
import { FirebaseContext } from "../context/firebase";

export default function useInfoUser(context) {
  const [info, setInfo] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  let userEmail = null;
  if (user && user.email) {
    userEmail = user.email;
  }

  let contextInfo
  let setContextInfo
  if(context === 'friends'){
    [contextInfo, setContextInfo] = useContext(ContextFriends);
  }else if (context === 'friendsShare'){
    [contextInfo, setContextInfo] = ['', '']
  }else if (context === 'likes'){
    [contextInfo, setContextInfo] = useContext(ContextLikes);
  }else if (context === 'likesShow'){
    [contextInfo, setContextInfo] = useContext(ContextLikesShow);
  }else if (context === 'userPage'){
    [contextInfo, setContextInfo] = useContext(ContextUserPage);
  }

  



  


  useEffect(() => {
    firebase
      .firestore()
      .collection("userPages")
      .doc(userEmail)
      .get()

      .then(function (doc) {
        if (doc.exists) {
          console.log(
            "Document data:",
            doc.data()
          );
          const data = doc.data();

          setInfo(data);
        } else {
          console.log("No info about user");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [contextInfo]);

  return info;
}
