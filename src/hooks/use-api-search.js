import { useContext, useEffect, useState } from "react";
import * as axios from "axios";
import { ContextShow } from "../context/contextShow";

export default function useApiSearch(category) {
  const [content, setContent] = useState([]);
  const [contextShow, setContextShow] = useContext(ContextShow);

  useEffect(async () => {
    await axios
      .get(`https://api.tvmaze.com/search/shows?q=${category}`)
      .then((response) => {
        const shows = response.data;
        console.log(shows);

        setContent(shows);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [contextShow]);
  console.log(content);

  return { content };
}
