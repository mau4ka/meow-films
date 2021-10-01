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

export const Box = styled.div`
  display: block;
  padding-bottom: 50px;
`;

export const Group = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const GroupRow = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: row;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 2px;
    background-color: black;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: red;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #f9f9fd;
  }
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
  font-size: 12px;
  color: white;
  margin-bottom: 0;

  line-height: normal;
`;

export const Image = styled.img`
  border: 0;
  width: 100%;
  max-width: 18rem;
  cursor: pointer;
  height: 18rem;
  padding: 0;
  margin: 0;
`;

export const Button = styled.button`
  box-shadow: 0 0.6vw 1vw -0.4vw rgba(0, 0, 0, 0.35);
  background-color: red;
  color: white;
  border-width: 0;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  margin: 20px 20px 0 20px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  @media (max-width: 450px) {
    margin: 20px 5px 0 5px;
  }
`;

export const Heart = styled.img`
  border: 0;
  cursor: pointer;
  margin: 0;
`;

export const Input = styled.input`
  background-color: rgba(64, 64, 64, 0.5);
  color: white;
  border: 1px solid white;
  transition: width 0.5s;
  height: 50px;
  font-size: 14px;
  border-radius: 4px;
  padding: 5px;
  width: 50px;
  margin: 20px 0 0 10px;
`;
