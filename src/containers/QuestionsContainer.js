import React from "react";
import { Questions } from "../components";
import { FastRegForm } from "../components";
import questionsData from "../infoForMainPage/questionsData.json";

export function QuestionsContainer() {
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
        <FastRegForm.Input placeholder="Email address" />
        <FastRegForm.Button>Try it now</FastRegForm.Button>
        <FastRegForm.Break />
        <FastRegForm.Text>
          Ready to watch? Enter your email to create or restart your membership.
        </FastRegForm.Text>
      </FastRegForm>
    </Questions>
  );
}
