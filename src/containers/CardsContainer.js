import React, { useEffect, useState } from "react";
import { Cards } from "../components";
import useContent from "../hooks/use-api-category";
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
                  {liked !== null &&
                  liked.likesId &&
                  liked.likesId.indexOf(item.show.id) !== -1 ? (
                    <Cards.Text>You can dislike</Cards.Text>
                  ) : (
                    <Cards.Text>You can like</Cards.Text>
                  )}
                </Cards.Column>
                
                <Cards.Heart
                    onClick={(el) => {
                      setLike(item.show)
                      
                       el.target.getAttribute('src') === '/static/media/heartLiked.8f98dc4c.svg'
                       ? el.target.src="/static/media/heart.728f1676.svg"
                       : el.target.src="/static/media/heartLiked.8f98dc4c.svg"
                    }}
                    src={liked !== null &&
                      liked.likesId &&
                      liked.likesId.indexOf(item.show.id) !== -1 
                    ? heartLiked
                    : heart
                      }
                    alt="heart"
                  ></Cards.Heart>
                
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
