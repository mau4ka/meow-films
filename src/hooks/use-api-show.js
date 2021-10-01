import { useEffect, useState } from "react";
import * as axios from "axios";

export default function useContentShow(num) {
  const [content, setContent] = useState([]);

  useEffect(async () => {
    await axios
      .get(`https://api.tvmaze.com/shows/${num}`)
      .then((response) => {
        const show = response.data;

        setContent(show);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return content;
}
