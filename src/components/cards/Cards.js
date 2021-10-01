import React from "react";

import no_image from "../../no_image.png";
import * as ROUTES from "../../constants/routes";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  Button,
  Box,
  Input,
} from "./cardStyles";

import { useHistory } from "react-router";

export default function Cards({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Cards.Container = function CardsGroup({ children, ...restProps }) {
  return <div {...restProps}>{children}</div>;
};

Cards.Box = function CardsBox({ children, ...restProps }) {
  return <Box {...restProps}>{children}</Box>;
};

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

let imageStyle = {
  border: "0",
  width: "100%",
  maxWidth: "18rem",
  cursor: "pointer",
  height: "18rem",
  padding: "0",
  margin: "0",
};

Cards.Image = function CardsImage({ ...restProps }) {
  return <Image {...restProps} />;
};

Cards.Input = function CardsInput({ ...restProps }) {
  return <Input {...restProps} />;
};

Cards.Heart = function CardsImage({ ...restProps }) {
  return <Heart {...restProps} />;
};

Cards.Button = function CardsButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Cards.OneItem = function CardsImage({ children, item, liked }) {
  const history = useHistory();
  let shortName = item.name.substr(0, 25);
  return (
    <Cards.Item>
      {!item.image || !item.image.medium ? (
        <LazyLoadImage
          src={no_image}
          alt="no-image"
          onClick={() => history.push(`${ROUTES.SHOW}/${item.show.id}`)}
          style={imageStyle}
        />
      ) : (
        <LazyLoadImage
          src={item.image.original}
          alt={item.name}
          onClick={() => history.push(`${ROUTES.SHOW}/${item.id}`)}
          style={imageStyle}
        />
      )}
      <Cards.GroupSpace>
        <Cards.Column>
          {item.name.length <= shortName.length ? (
            <Cards.SubTitle>{item.name}</Cards.SubTitle>
          ) : (
            <Cards.SubTitle title={item.name}>{shortName}...</Cards.SubTitle>
          )}
          <Cards.Text>Language: {item.language}</Cards.Text>
          <Cards.Text>Status: {item.status}</Cards.Text>
        </Cards.Column>
        {children}
      </Cards.GroupSpace>
    </Cards.Item>
  );
};
