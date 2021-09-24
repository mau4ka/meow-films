import React, { useEffect, useState } from "react";
import { Cards } from "../components";
import useApiSearch from "../hooks/use-api-search";
import heart from "../heart.svg";
import heartLiked from "../heartLiked.svg";
import useSetLike from "../hooks/use-setLike";
import useApiAllShows from "../hooks/use-api-all-shows";

export function CardsContainer({ name, category, liked }) {
  const [like, setLike] = useState(null);
  useSetLike(like);
  let allShows = useApiAllShows();
  let search = useApiSearch(name);
  console.log(name);

  console.log("category" + category);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {name === null ? (
        <Cards>
          <Cards.Title>{name}</Cards.Title>
          <Cards.Group>
            {allShows && (category === null || category === "null") ? (
              allShows.map((item) => (
                <Cards.OneItem item={item} liked={liked} key={item.id}>
                  <Cards.Heart
                    onClick={(el) => {
                      setLike(item);

                      el.target.getAttribute("src") ===
                      "/static/media/heartLiked.8f98dc4c.svg"
                        ? (el.target.src = "/static/media/heart.728f1676.svg")
                        : (el.target.src =
                            "/static/media/heartLiked.8f98dc4c.svg");
                    }}
                    src={
                      liked !== null &&
                      liked.likesId &&
                      liked.likesId.indexOf(item.id) !== -1
                        ? heartLiked
                        : heart
                    }
                    alt="heart"
                  ></Cards.Heart>
                </Cards.OneItem>
              ))
            ) : allShows && category !== null ? (
              allShows
                .filter((item) => item.genres.toString().includes(category))
                .map((item) => (
                  <Cards.OneItem item={item} liked={liked} key={item.id}>
                    <Cards.Heart
                      onClick={(el) => {
                        setLike(item);

                        el.target.getAttribute("src") ===
                        "/static/media/heartLiked.8f98dc4c.svg"
                          ? (el.target.src = "/static/media/heart.728f1676.svg")
                          : (el.target.src =
                              "/static/media/heartLiked.8f98dc4c.svg");
                      }}
                      src={
                        liked !== null &&
                        liked.likesId &&
                        liked.likesId.indexOf(item.id) !== -1
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
      ) : (
        <Cards>
          <Cards.Title>Find by name: {name}</Cards.Title>

          <Cards.Group>
            {search.content && search.content.length !== 0 ? (
              search.content.map((item) => (
                <Cards.OneItem
                  item={item.show}
                  liked={liked}
                  key={item.show.id}
                >
                  <Cards.Heart
                    onClick={(el) => {
                      setLike(item.show);

                      el.target.getAttribute("src") ===
                      "/static/media/heartLiked.8f98dc4c.svg"
                        ? (el.target.src = "/static/media/heart.728f1676.svg")
                        : (el.target.src =
                            "/static/media/heartLiked.8f98dc4c.svg");
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
              <Cards.Title>Nothing</Cards.Title>
            )}
          </Cards.Group>
        </Cards>
      )}
    </>
  );
}
