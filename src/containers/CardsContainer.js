import React, { useEffect, useState } from "react";
import { Cards } from "../components";
import useApiSearch from "../hooks/use-api-search";
import useApiAllShows from "../hooks/use-api-all-shows";
import useInfoUser from "../hooks/use-getInfoUser";
import { CardCatContainer } from "./CardCatContainer";

export function CardsContainer({ name, category, user }) {
  const liked = useInfoUser("likes");

  let allShows = useApiAllShows();
  let search = useApiSearch(name);

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
              <CardCatContainer
                user={user}
                cards={allShows}
                liked={liked}
                search="false"
              />
            ) : allShows && category !== null ? (
              <CardCatContainer
                user={user}
                cards={allShows.filter((item) =>
                  item.genres.toString().includes(category)
                )}
                liked={liked}
                search="false"
              />
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
              <CardCatContainer
                user={user}
                cards={search.content}
                liked={liked}
                search="true"
              />
            ) : (
              <Cards.Title>Nothing</Cards.Title>
            )}
          </Cards.Group>
        </Cards>
      )}
    </>
  );
}
