import React, { useState } from "react";
import { useContext } from "react";
import { Link as ReachRouterLink } from "react-router-dom";
import { ContextShow } from "../../context/contextShow";
import * as ROUTES from "../../constants/routes";
import { useHistory } from "react-router";

import {
  Container,
  Group,
  Background,
  Dropdown,
  Picture,
  PictureHome,
  Link,
  Profile,
  FeatureCallOut,
  ButtonLink,
  Button,
  PlayButton,
  Text,
  Feature,
  Logo,
  Search,
  SearchIcon,
  SearchInput,
  SearchForm,
  SearchButton,
  Select,
} from "./headerStyles";

export default function Header({ bg = true, children, ...restProps }) {
  return bg ? (
    <Background data-testid="header-bg" {...restProps}>
      {children}
    </Background>
  ) : (
    children
  );
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
  return (
    <ReachRouterLink to={to}>
      <Logo {...restProps} />
    </ReachRouterLink>
  );
};

Header.Profile = function HeaderProfile({ children, ...restProps }) {
  return <Profile {...restProps}>{children}</Profile>;
};

Header.Feature = function HeaderFeature({ children, ...restProps }) {
  return <Feature {...restProps}>{children}</Feature>;
};

Header.Picture = function HeaderPicture({ src, ...restProps }) {
  return <Picture {...restProps} src={`/images/users/${src}.jpg`} />;
};

Header.PictureHome = function HeaderPicture({ ...restProps }) {
  return <PictureHome {...restProps} />;
};

Header.Dropdown = function HeaderDropdown({ children, ...restProps }) {
  return <Dropdown {...restProps}>{children}</Dropdown>;
};

Header.TextLink = function HeaderTextLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Header.PlayButton = function HeaderPlayButton({ children, ...restProps }) {
  return <PlayButton {...restProps}>{children}</PlayButton>;
};

Header.Button = function HeaderButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Header.FeatureCallOut = function HeaderFeatureCallOut({
  children,
  ...restProps
}) {
  return <FeatureCallOut {...restProps}>{children}</FeatureCallOut>;
};

Header.Text = function HeaderText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

Header.Select = function HeaderButtonLink({ children, ...restProps }) {
  return <Select {...restProps}>{children}</Select>;
};

Header.Search = function HeaderSearch({
  searchTerm,
  setSearchTerm,
  ...restProps
}) {
  const [searchActive, setSearchActive] = useState(false);

  const [contextShow, setContextShow] = useContext(ContextShow);
  let myHistory = useHistory();

  return (
    <Search {...restProps}>
      <SearchIcon onClick={() => setSearchActive(!searchActive)}>
        <img src="/images/icons/search.png" alt="Search" />
      </SearchIcon>
      <SearchForm active={searchActive}>
        <SearchInput
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          placeholder="Search shows"
          active={searchActive}
        />
        <SearchButton
          active={searchActive}
          onClick={(e) => {
            e.preventDefault();
            myHistory.push(ROUTES.WATCH + "/" + searchTerm);
            setContextShow(searchTerm);
          }}
        >
          &gt;
        </SearchButton>
      </SearchForm>
    </Search>
  );
};
