import React, { useState, useContext, createContext } from "react";

import {
  Container,
  Group,
  Title,
  SubTitle,
  Text,
  Item,
  Image,
} from "./cardStyles";

export default function Cards({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Cards.Group = function CardsGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
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
