import React, { useState, useContext, createContext } from "react";
import {
  Container,
  Frame,
  Title,
  Item,
  InnerBox,
  HeaderQ,
  BodyQ,
} from "./questionsStyles";

const ToggleContext = createContext();

export default function Questions({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <InnerBox>{children}</InnerBox>
    </Container>
  );
}

Questions.Title = function QuestionsTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Questions.Frame = function QuestionsFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>;
};

Questions.Item = function QuestionsItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Questions.Header = function QuestionsHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <HeaderQ onClick={() => setToggleShow(!toggleShow)} {...restProps}>
      {children}
      {toggleShow ? (
        <img src="/images/icons/close-slim.png" alt="Close" />
      ) : (
        <img src="/images/icons/add.png" alt="Open" />
      )}
    </HeaderQ>
  );
};

Questions.Body = function QuestionsBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);

  return (
    <BodyQ className={toggleShow ? "open" : "closed"} {...restProps}>
      <span>{children}</span>
    </BodyQ>
  );
};
