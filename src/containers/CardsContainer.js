import React, { useEffect, useState } from "react";
import { Cards } from "../components";
import useContent from "../hooks/use-api-search";
import no_image from "../no_image.png";
import * as ROUTES from "../constants/routes";
import heart from "../heart.svg";
import heartLiked from "../heartLiked.svg";
import useSetLike from "../hooks/use-setLike";

export function CardsContainer({ name, liked }) {
  const [like, setLike] = useState(null);
  useSetLike(like);

  let category = useContent(name);
  console.log(name);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Cards>
      <Cards.Title>{name}</Cards.Title>
      <Cards.Group>
        {category.content ? (
          category.content.map((item) => (
            <Cards.OneItem item={item.show} liked={liked} key={item.show.id}>
              <Cards.Heart
                onClick={(el) => {
                  setLike(item.show);

                  el.target.getAttribute("src") ===
                  "/static/media/heartLiked.8f98dc4c.svg"
                    ? (el.target.src = "/static/media/heart.728f1676.svg")
                    : (el.target.src = "/static/media/heartLiked.8f98dc4c.svg");
                }}
                src={
                  liked !== null &&
                  liked.likesId &&
                  liked.likesId.indexOf(item.show.id) !== -1
                    ? heartLiked
                    : heart
                }
                alt="heart"
              ></Cards.Heart>
            </Cards.OneItem>
          ))
        ) : (
          <p></p>
        )}
      </Cards.Group>
    </Cards>
  );
}
