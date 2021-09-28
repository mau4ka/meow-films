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

  @media (max-width: 800px) {
    flex-direction: column;
  }
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

export const Box = styled.div`
  display: block;
  padding-bottom: 50px;
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
  margin: auto;

  &:hover {
    transform: scale(1.3);
    z-index: 99;
  }
`;

export const Heart = styled.img`
  border: 0;
  cursor: pointer;
  margin: 0;

  @media (max-width: 800px) {
    width: 100px;
    height: 100px;
    margin: auto;
  }
`;
