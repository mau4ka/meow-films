import React from "react";
import { HeaderText, FastRegForm } from "../components";
import { FooterContainer } from "../containers/FooterContainer";
import { HeaderContainer } from "../containers/HeaderContainer";
import { QuestionsContainer } from "../containers/QuestionsContainer";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router";
import { MainPageCatsContainer } from "../containers/MainPageCatsContainer";

export default function MainPage() {
  const history = useHistory();
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
            <FastRegForm.Button onClick={() => history.push(ROUTES.REGISTER)}>
              Try it now
            </FastRegForm.Button>
            <FastRegForm.Break />
            <FastRegForm.Text>Ready to watch? Press button!</FastRegForm.Text>
          </FastRegForm>
        </HeaderText>
      </HeaderContainer>
      <MainPageCatsContainer />
      <QuestionsContainer />
      <FooterContainer />
    </>
  );
}
