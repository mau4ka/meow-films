import styled from "styled-components/macro";

export const Title = styled.h2`
  color: red;
  font-weight: bold;
  margin-left: 56px;
  margin-right: 56px;
  margin-top: 0;
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

export const Text = styled.p`
  margin-top: 5px;
  padding: 10px;
  font-size: 15px;
  color: white;
  margin-bottom: 0;
  line-height: normal;
`;

export const Link = styled.a`
  margin-top: 5px;
  padding: 10px;
  font-size: 15px;
  color: red;
  margin-bottom: 0;
  text-decoration: none;

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

  &:hover {
    transform: scale(1.3);
    z-index: 99;
  }
`;
