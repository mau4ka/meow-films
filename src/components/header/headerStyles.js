import styled from "styled-components/macro";
import { Link as ReachRouterLink } from "react-router-dom";

export const Background = styled.div`
  display: flex;
  flex-direction: column;

  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.9)
    ),
    url(${({ src }) =>
        src ? `../images/misc/${src}` : "../images/misc/cat-header-bg.png"})
      top left / cover no-repeat;
`;

export const Container = styled.div`
  display: flex;
  margin: 0 56px;
  height: 150px;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
  }

  @media (max-width: 1000px) {
    margin: 0 30px;
  }
`;

export const Link = styled.p`
  color: #fff;
  text-decoration: none;
  margin-right: 30px;
  font-weight: ${({ active }) => (active === "true" ? "700" : "normal")};
  cursor: pointer;
  z-index: 100;

  &:hover {
    font-weight: bold;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
`;

export const GroupFriend = styled.div`
  text-align: center;
  padding: 30px;
`;

export const ButtonLink = styled(ReachRouterLink)`
  display: block;
  background-color: #e50914;
  width: 100px;
  height: fit-content;
  color: white;
  border: 0;
  font-size: 15px;
  border-radius: 3px;
  padding: 8px 17px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #f40612;
  }
`;

export const Picture = styled.button`
  background: url(${({ src }) => src});
  background-size: contain;
  border: 1px solid black;
  border-radius: 2px;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

export const PictureHome = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 5px;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: black;
  padding: 10px;
  width: 100px;
  top: 32px;
  right: 10px;

  ${Group}:last-of-type ${Link} {
    cursor: pointer;
  }

  ${Group} {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }

    ${Link} {
      cursor: pointer;
    }

    ${Picture} {
      cursor: default;
    }
  }

  button {
    margin-right: 10px;
  }

  p {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;
  z-index: 100;

  button {
    cursor: pointer;
  }

  &:hover > ${Dropdown} {
    display: flex;
    flex-direction: column;
  }
`;

export const Feature = styled(Container)`
  padding: 100px 0 400px 0;
  flex-direction: column;
  align-items: normal;
  width: 50%;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const FeatureCallOut = styled.h2`
  color: white;
  font-size: 50px;
  line-height: normal;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  margin: 0;
`;

export const Text = styled.p`
  color: white;
  font-size: 22px;
  line-height: normal;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
`;

export const Logo = styled.img`
  height: 150px;
  width: 150px;
  margin-right: 40px;

  @media (min-width: 1449px) {
    height: 200px;
    width: 200px;
    padding-top: 30px;
  }
`;

export const PlayButton = styled.button`
  box-shadow: 0 0.6vw 1vw -0.4vw rgba(0, 0, 0, 0.35);
  background-color: #e6e6e6;
  color: #000;
  border-width: 0;
  padding: 10px 20px;
  border-radius: 5px;
  max-width: 130px;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #ff1e1e;
    color: white;
  }
`;

export const Button = styled.button`
  background-color: red;
  color: black;
  margin: 50px 10px 0 10px;
  border-width: 0;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

export const SearchForm = styled.form`
  display: flex;
  width: ${({ active }) => (active === true ? "210px" : "0px")};
`;

export const SearchInput = styled.input`
  background-color: rgba(64, 64, 64, 0.5);
  color: white;
  border: 1px solid white;
  transition: width 0.5s;
  height: 30px;
  font-size: 14px;
  border-radius: 4px;
  padding: ${({ active }) => (active === true ? "0 10px" : "0")};
  opacity: ${({ active }) => (active === true ? "1" : "0")};
  width: ${({ active }) => (active === true ? "200px" : "0px")};

  &:focus {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const SearchButton = styled.button`
  background-color: rgba(64, 64, 64, 0.5);
  color: white;
  border: 1px solid white;
  transition: width 0.5s;
  height: 30px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: ${({ active }) => (active === true ? "5px" : "0")};
  padding: ${({ active }) => (active === true ? "0 5px" : "0")};
  opacity: ${({ active }) => (active === true ? "1" : "0")};
  width: ${({ active }) => (active === true ? "20px" : "0px")};
`;

export const Search = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: white;
    cursor: pointer;
  }

  @media (max-width: 580px) {
    display: none;
  }
`;

export const Select = styled.select`
  background-color: rgba(64, 64, 64, 0.5);
  color: white;
  border: 1px solid white;
  transition: width 0.5s;
  height: 30px;
  font-size: 14px;
  border-radius: 4px;
  margin: 20px 50px;
`;

export const SearchIcon = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  height: 32px;
  width: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    filter: brightness(0) invert(1);
    width: 16px;
  }
`;
