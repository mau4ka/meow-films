import styled from "styled-components/macro";

export const Title = styled.h3`
  color: red;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  margin: 50px;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px;
`;

export const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
  border: 2px solid grey;
  margin: 10px;
`;

export const Text = styled.p`
  margin-top: 5px;
  font-size: 15px;
  color: white;
  margin-bottom: 0;
  line-height: normal;
`;

export const Image = styled.img`
  border: 0;
  border-radius: 5px;
  width: 50px;
  cursor: pointer;
  height: 50px;
  padding: 0;
  margin: auto;
`;
