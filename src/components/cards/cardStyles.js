import styled from "styled-components/macro";

export const Title = styled.p`
  font-size: 24px;
  color: #e5e5e5;
  font-weight: bold;
  margin-left: 56px;
  margin-right: 56px;
  margin-top: 0;
  text-align: center;
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

export const GroupRow = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: row;
  overflow-x: auto;
`;

export const GroupSpace = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const Item = styled.div`
  margin: 15px;
  padding: 5px;
  min-width: 18rem;
  background-color: #696969;

  &:hover {
    background-color: grey;
  }
`;

export const SubTitle = styled.p`
  font-size: 15px;
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

export const Heart = styled.img`
  border: 0;
  cursor: pointer;
  margin: 0;
`;
