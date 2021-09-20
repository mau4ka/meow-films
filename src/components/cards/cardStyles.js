import styled from "styled-components/macro";

export const Title = styled.p`
  font-size: 24px;
  color: #e5e5e5;
  font-weight: bold;
  margin-left: 56px;
  margin-right: 56px;
  margin-top: 0;
`;

export const Container = styled.div`
  display: block;
  margin: 50px;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Item = styled.div`
  margin: 15px;
  padding: 5px;
  min-width: 18rem;
  background-color: #696969;

  &:hover {
    transform: scale(1.3);
    z-index: 99;
  }
`;

export const SubTitle = styled.p`
  font-size: 12px;
  color: white;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0;
  user-select: none;
`;

export const Text = styled.p`
  margin-top: 5px;
  font-size: 10px;
  color: white;
  margin-bottom: 0;

  line-height: normal;
`;

export const Image = styled.img`
  border: 0;
  width: 100%;
  max-width: 305px;
  cursor: pointer;
  height: 18rem;
  padding: 0;
  margin: 0;
`;
