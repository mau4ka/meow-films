import styled from "styled-components/macro";

export const Title = styled.h3`
  color: red;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

export const BigTitle = styled.h2`
  color: white;
  font-weight: bold;
  margin: 30px 0 0 0;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  margin: 20px 50px;
`;

export const Box = styled.div`
  display: ${({ display }) => display};
  text-align: center;
  padding-top: 20px;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px;
  width: 180px;
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
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    border-radius: 10px;
    background-color: #f9f9fd;
  }
}
`;

export const GroupRow = styled.div`
  display: flex;
  flex-wrap: ${({ wrap }) => wrap};
  overflow-x: ${({ overflow }) => overflow};
  flex-direction: row;
  padding: 20px;
  margin: 0 10px;
  justify-content: ${({ justify }) => justify};

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

export const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => direction};
  padding: 10px;
  border: 2px solid grey;
  margin: 10px;
  min-width: 250px;
  text-align: center;
`;

export const Alert = styled.h2`
  display: inline-block;
  padding: 10px;
  border: 2px solid grey;
  margin: auto;
  min-width: 250px;
  color: red;
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

export const ButtonAdd = styled.button`
  background-color: red;
  color: black;
  border-width: 0;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  margin: 20px 0;
`;

export const ButtonDelete = styled.button`
  background-color: white;
  color: black;
  border-width: 0;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  margin: 20px 0;
`;
