import { useEffect, useState } from "react";
import * as axios from "axios";

export default function useContent(category) {
  const [content, setContent] = useState([]);

  useEffect(async () => {
    await axios
      .get(`https://api.tvmaze.com/search/shows?q=${category}`)
      .then((response) => {
        const shows = response.data;
        console.log(shows);

        setContent({ shows });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  console.log({ [category]: content });

  return { [category]: content };
}
