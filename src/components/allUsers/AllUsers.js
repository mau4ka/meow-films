import React, { useState, useContext, createContext } from "react";

import { Container, Group, Title, Text, Image, Item } from "./allUsersStyles";

export default function AllUsers({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

AllUsers.Group = function AllUsersGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

AllUsers.Item = function AllUsersItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

AllUsers.Title = function AllUsersTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

AllUsers.Text = function AllUsersText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

AllUsers.Image = function AllUsersImage({ ...restProps }) {
  return <Image {...restProps} />;
};
