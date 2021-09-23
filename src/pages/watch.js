import React from "react";
import { WatchContainer } from "../containers/WatchContainer";
import useGetLiked from "../hooks/use-getLiked";

export default function Watch() {
  const liked = useGetLiked();
  return <WatchContainer liked={liked} />;
}
