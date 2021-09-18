import React from "react";
import { Container, Title, SubTitle } from "./headerTextStyles";

export default function HeaderText({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

HeaderText.Title = function HeaderTextTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

HeaderText.SubTitle = function HeaderTextSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};
