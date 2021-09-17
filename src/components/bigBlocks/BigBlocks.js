import React from "react";
import {
  Container,
  Image,
  InnerBox,
  ItemBox,
  Pane,
  SubTitle,
  Title,
} from "./bigBlocksStyles";

let BigBlocks = ({ children, direction = "row", ...restProps }) => {
  return (
    <ItemBox {...restProps}>
      <InnerBox direction={direction}>{children}</InnerBox>
    </ItemBox>
  );
};

BigBlocks.Container = function bigBlocksContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

BigBlocks.Pane = function bigBlocksPane({ children, ...restProps }) {
  return <Pane {...restProps}>{children}</Pane>;
};

BigBlocks.Title = function bigBlocksTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

BigBlocks.SubTitle = function bigBlocksSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

BigBlocks.Image = function bigBlocksImage({ ...restProps }) {
  return <Image {...restProps} />;
};

export default BigBlocks;
