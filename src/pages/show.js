import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../components";
import { FirebaseContext } from "../context/firebase";
import useContentShow from "../hooks/use-api-show";
import { ContextLikesShow } from "../context/contextLikesShow";
import { ShowContainer } from "../containers/ShowContainer";

export default function ShowPage(props) {
  console.log(window.location.href.split("/").pop());
  let num = window.location.href.split("/").pop();
  let show = useContentShow(num);
  console.log(show);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [loading, setLoading] = useState(true);
  const [contextLikesShow, setContextLikesShow] = useState(null);

  let userEmail = null;
  if (user) {
    userEmail = user.email;
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ContextLikesShow.Provider value={[contextLikesShow, setContextLikesShow]}>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      {user && userEmail ? <ShowContainer /> : null}
    </ContextLikesShow.Provider>
  );
}
