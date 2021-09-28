import React from "react";
import { Footer } from "../components";
export function FooterContainer() {
  return (
    <Footer>
      <Footer.Title>Questions? Contact us.</Footer.Title>
      <Footer.Break />
      <Footer.Row>
        <Footer.Column>
          <Footer.Link href="#">Meow Facebook</Footer.Link>
          <Footer.Link href="#">Meow Instagram</Footer.Link>
        </Footer.Column>

        <Footer.Column>
          <Footer.Link href="#">Meow Telegram</Footer.Link>
          <Footer.Link href="#">Meow Twitter</Footer.Link>
        </Footer.Column>

        <Footer.Column>
          <Footer.Text href="#">Meow Phone:</Footer.Text>
          <Footer.Text href="#">+38 050 050 50 50</Footer.Text>
        </Footer.Column>

        <Footer.Column>
          <Footer.Text href="#">Meow Gmail:</Footer.Text>
          <Footer.Text href="#">meowFilms@gmail.com</Footer.Text>
        </Footer.Column>
      </Footer.Row>
      <Footer.Break />
      <Footer.LastText>MeowFilms 2021</Footer.LastText>
    </Footer>
  );
}
