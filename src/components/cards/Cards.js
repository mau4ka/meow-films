import React, { useState, useContext, createContext } from "react";

import no_image from "../../no_image.png";
import * as ROUTES from "../../constants/routes";
import heart from "../../heart.svg";
import heartLiked from "../../heartLiked.svg";

import {
  Container,
  Group,
  Title,
  SubTitle,
  Text,
  Item,
  Image,
  Column,
  Heart,
  GroupSpace,
  GroupRow,
} from "./cardStyles";
import useSetLike from "../../hooks/use-setLike";

export default function Cards({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Cards.Group = function CardsGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Cards.GroupRow = function CardsGroupRow({ children, ...restProps }) {
  return <GroupRow {...restProps}>{children}</GroupRow>;
};

Cards.GroupSpace = function CardsGroup({ children, ...restProps }) {
  return <GroupSpace {...restProps}>{children}</GroupSpace>;
};

Cards.Column = function CardsColumn({ children, ...restProps }) {
  return <Column {...restProps}>{children}</Column>;
};

Cards.Title = function CardsTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Cards.SubTitle = function CardsSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Cards.Text = function CardsText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Cards.Item = function CardsItem({ item, children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Cards.Image = function CardsImage({ ...restProps }) {
  return <Image {...restProps} />;
};

Cards.Heart = function CardsImage({ ...restProps }) {
  return <Heart {...restProps} />;
};

Cards.OneItem = function CardsImage({ children, item, liked, ...restProps }) {
  // const [like, setLike] = useState(null);
  // useSetLike(like);

  return (
    <Cards.Item>
      {item.image === null || item.image.medium === null ? (
        <Cards.Image
          src={no_image}
          alt="no-image"
          onClick={() =>
            (window.location.href = `${ROUTES.SHOW}/${item.show.id}`)
          }
        />
      ) : (
        <Cards.Image
          src={item.image.original}
          alt={item.name}
          onClick={() => (window.location.href = `${ROUTES.SHOW}/${item.id}`)}
        />
      )}
      <Cards.GroupSpace>
        <Cards.Column>
          <Cards.SubTitle>{item.name}</Cards.SubTitle>
          <Cards.Text>Language: {item.language}</Cards.Text>
          <Cards.Text>Status: {item.status}</Cards.Text>
          {liked !== null &&
          liked !== undefined &&
          liked.likesId &&
          liked.likesId.indexOf(item.id) !== -1 ? (
            <Cards.Text>You can dislike</Cards.Text>
          ) : (
            <Cards.Text>You can like</Cards.Text>
          )}
        </Cards.Column>
        {children}
      </Cards.GroupSpace>
    </Cards.Item>
  );
};
