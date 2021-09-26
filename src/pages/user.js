import React, { useContext, useEffect, useState } from "react";
// import useGetLiked from "../hooks/use-getLiked";
import User from "../containers/UserContainer";
import useGetInfoUserPage from "../hooks/use-getInfoUserPage";

export default function UserPage(props) {
  const info = useGetInfoUserPage();

  return <User info={info} />;
}
