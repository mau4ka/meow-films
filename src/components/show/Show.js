import React, { useState, useContext, createContext } from "react";

import { Container, Group, Title, Text, Image, Link } from "./showStyles";

export default function Show({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Show.Group = function ShowGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Show.Title = function ShowTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Show.Text = function ShowText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Show.Link = function ShowLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Show.Image = function ShowImage({ ...restProps }) {
  return <Image {...restProps} />;
};
