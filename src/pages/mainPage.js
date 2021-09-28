import React from "react";
import { HeaderText, FastRegForm } from "../components";
import { BigBlocksContainer } from "../containers/BigBlocksContainer";
import { FooterContainer } from "../containers/FooterContainer";
import { HeaderContainer } from "../containers/HeaderContainer";
import { QuestionsContainer } from "../containers/QuestionsContainer";
import * as ROUTES from "../constants/routes";

export default function MainPage() {
  return (
    <>
      <HeaderContainer>
        <HeaderText>
          <HeaderText.Title>
            Unlimited films, TV programmes and more.
          </HeaderText.Title>
          <HeaderText.SubTitle>
            Watch anywhere. Cancel at any time.
          </HeaderText.SubTitle>
          <FastRegForm>
            <FastRegForm.Button
              onClick={() => (window.location.href = ROUTES.REGISTER)}
            >
              Try it now
            </FastRegForm.Button>
            <FastRegForm.Break />
            <FastRegForm.Text>Ready to watch? Press button!</FastRegForm.Text>
          </FastRegForm>
        </HeaderText>
      </HeaderContainer>
      <BigBlocksContainer />
      <QuestionsContainer />
      <FooterContainer />
    </>
  );
}
