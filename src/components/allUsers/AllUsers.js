import React, { useState, useContext, createContext } from "react";

import {
  Container,
  Group,
  Title,
  Text,
  Image,
  Item,
  ButtonAdd,
  GroupRow,
  ButtonDelete,
  BigTitle,
  Alert,
  Box,
} from "./allUsersStyles";

export default function AllUsers({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

AllUsers.Group = function AllUsersGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

AllUsers.Box = function AllUsersBox({ children, ...restProps }) {
  return <Box {...restProps}>{children}</Box>;
};

AllUsers.Alert = function AllUsersAlert({ children, ...restProps }) {
  return <Alert {...restProps}>{children}</Alert>;
};

AllUsers.GroupRow = function AllUsersGroupRow({ children, ...restProps }) {
  return <GroupRow {...restProps}>{children}</GroupRow>;
};

AllUsers.Item = function AllUsersItem({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

AllUsers.Title = function AllUsersTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

AllUsers.BigTitle = function AllUsersBigTitle({ children, ...restProps }) {
  return <BigTitle {...restProps}>{children}</BigTitle>;
};

AllUsers.Text = function AllUsersText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

AllUsers.Image = function AllUsersImage({ ...restProps }) {
  return <Image {...restProps} />;
};

AllUsers.ButtonAdd = function AllUsersText({ children, ...restProps }) {
  return <ButtonAdd {...restProps}>{children}</ButtonAdd>;
};

AllUsers.ButtonDelete = function AllUsersButtonDelete({
  children,
  ...restProps
}) {
  return <ButtonDelete {...restProps}>{children}</ButtonDelete>;
};
