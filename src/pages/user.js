import React, { useContext, useEffect, useState } from "react";
import useGetLiked from "../hooks/use-getLiked";
import User from "../containers/UserContainer";

export default function UserPage(props) {
  const liked = useGetLiked();

  return <User liked={liked} />;
}
