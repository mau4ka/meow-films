import React from "react";
import { Questions } from "../components";
import { FastRegForm } from "../components";
import questionsData from "../infoForMainPage/questionsData.json";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router";

export function QuestionsContainer() {
  const history = useHistory();
  return (
    <Questions>
      <Questions.Title>Frequently Asked Questions</Questions.Title>
      <Questions.Frame>
        {questionsData.map((item) => (
          <Questions.Item key={item.id}>
            <Questions.Header>{item.header}</Questions.Header>
            <Questions.Body>{item.body}</Questions.Body>
          </Questions.Item>
        ))}
      </Questions.Frame>

      <FastRegForm>
        <FastRegForm.Button onClick={() => history.push(ROUTES.REGISTER)}>
          Try it now
        </FastRegForm.Button>
        <FastRegForm.Break />
        <FastRegForm.Text>Ready to watch? Press button!</FastRegForm.Text>
      </FastRegForm>
    </Questions>
  );
}
