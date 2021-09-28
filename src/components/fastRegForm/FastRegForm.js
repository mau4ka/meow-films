import React from "react";
import { Container, Break, Button, Text } from "./fastRegFormStyles";

export default function FastRegForm({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

FastRegForm.Button = function FastRegFormButton({ children, ...restProps }) {
  return (
    <Button {...restProps}>
      {children} <img src="/images/icons/chevron-right.png" alt="Try Now" />
    </Button>
  );
};

FastRegForm.Text = function FastRegFormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

FastRegForm.Break = function FastRegFormBreak({ ...restProps }) {
  return <Break {...restProps} />;
};
