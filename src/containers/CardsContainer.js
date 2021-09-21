import React from "react";
import { Cards } from "../components";
import useContent from "../hooks/use-api-category";
import no_image from "../no_image.png";
import * as ROUTES from "../constants/routes";
import heart from "../heart.svg";

export function CardsContainer({ name }) {
  let category = useContent(name);
  console.log(name);
  return (
    <Cards>
      <Cards.Title>{name}</Cards.Title>
      <Cards.Group>
        {category.content ? (
          category.content.map((item) => (
            <Cards.Item key={item.show.id}>
              {item.show.image === null || item.show.image.medium === null ? (
                <Cards.Image
                  src={no_image}
                  alt="no-image"
                  onClick={() =>
                    (window.location.href = `${ROUTES.SHOW}/${item.show.id}`)
                  }
                />
              ) : (
                <Cards.Image
                  src={item.show.image.original}
                  alt={item.show.name}
                  onClick={() =>
                    (window.location.href = `${ROUTES.SHOW}/${item.show.id}`)
                  }
                />
              )}
              <Cards.GroupSpace>
                <Cards.Column>
                  <Cards.SubTitle>{item.show.name}</Cards.SubTitle>
                  <Cards.Text>Language: {item.show.language}</Cards.Text>
                  <Cards.Text>Status: {item.show.status}</Cards.Text>
                </Cards.Column>
                <Cards.Heart src={heart} alt="heart"></Cards.Heart>
              </Cards.GroupSpace>
            </Cards.Item>
          ))
        ) : (
          <p></p>
        )}
      </Cards.Group>
    </Cards>
  );
}
