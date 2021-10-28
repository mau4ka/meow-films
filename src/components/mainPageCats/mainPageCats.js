import React from "react";
import {
  Container,
  Image,
  InnerBox,
  ItemBox,
  Pane,
  SubTitle,
  Title,
} from "./mainPageCatsStyles";

let MainPageCats = ({ children, direction = "row", ...restProps }) => {
  return (
    <ItemBox {...restProps}>
      <InnerBox direction={direction}>{children}</InnerBox>
    </ItemBox>
  );
};

MainPageCats.Container = function mainPageCatsContainer({
  children,
  ...restProps
}) {
  return <Container {...restProps}>{children}</Container>;
};

MainPageCats.Pane = function mainPageCatsPane({ children, ...restProps }) {
  return <Pane {...restProps}>{children}</Pane>;
};

MainPageCats.Title = function mainPageCatsTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

MainPageCats.SubTitle = function mainPageCatsTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

MainPageCats.Image = function bigBlocksImage({ ...restProps }) {
  return <Image {...restProps} />;
};

export default MainPageCats;
