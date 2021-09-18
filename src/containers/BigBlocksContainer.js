import React from "react";
import { BigBlocks } from "../components";
import bigBlocksData from "../infoForMainPage/bigBlocksData.json";
export function BigBlocksContainer() {
  return (
    <BigBlocks.Container>
      {bigBlocksData.map((el) => (
        <BigBlocks key={el.id} direction={el.direction}>
          <BigBlocks.Pane>
            <BigBlocks.Title>
              <p>{el.title}</p>
            </BigBlocks.Title>
            <BigBlocks.SubTitle>
              <p>{el.subTitle}</p>
            </BigBlocks.SubTitle>
          </BigBlocks.Pane>
          <BigBlocks.Pane>
            <BigBlocks.Image src={el.image} alt={el.alt}></BigBlocks.Image>
          </BigBlocks.Pane>
        </BigBlocks>
      ))}
    </BigBlocks.Container>
  );
}
