import { useEffect, useState } from "react";
import * as axios from "axios";
import { useContext } from "react";
import { ContextPage } from "../context/contextPage";

export default function useApiAllShows(num = "") {
  const [content, setContent] = useState([]);
  const [contextPage, setContextPage] = useContext(ContextPage);
  let page;
  if (isNaN(num)) {
    page = "";
  } else {
    page = `?page=${num}`;
  }

  console.log(num);

  useEffect(async () => {
    await axios
      .get(`https://api.tvmaze.com/shows${page}`)
      .then((response) => {
        const show = response.data;
        console.log(show);

        setContent(show);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [contextPage]);
  console.log(content);

  return content;
}
