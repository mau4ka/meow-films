import React from "react";
import { MainPageCats } from "../components";
import bigBlocksData from "../infoForMainPage/bigBlocksData.json";
export const MainPageCatsContainer = () => {
  return (
    <MainPageCats.Container>
      {bigBlocksData.map((el) => (
        <MainPageCats key={el.id} direction={el.direction}>
          <MainPageCats.Pane>
            <MainPageCats.Title>
              <p>{el.title}</p>
            </MainPageCats.Title>
            <MainPageCats.SubTitle>
              <p>{el.subTitle}</p>
            </MainPageCats.SubTitle>
          </MainPageCats.Pane>
          <MainPageCats.Pane>
            <MainPageCats.Image
              src={el.image}
              alt={el.alt}
            ></MainPageCats.Image>
          </MainPageCats.Pane>
        </MainPageCats>
      ))}
    </MainPageCats.Container>
  );
};
