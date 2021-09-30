import React, { useState, useEffect, useContext } from "react";
import { Cards, Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import userHome from "../user.png";
import { FirebaseContext } from "../context/firebase";
import { FooterContainer } from "./FooterContainer";
import { CardsContainer } from "./CardsContainer";
import { ContextShow } from "../context/contextShow";
import { useHistory } from "react-router";
import { ContextPage } from "../context/contextPage";

export function WatchContainer({ user, all }) {
  const [contextPage, setContextPage] = useContext(ContextPage);
  const history = useHistory();
  const [contextShow, setContextShow] = useState(null);

  let categories = [
    "Drama",
    "Romance",
    "Comedy",
    "Crime",
    "Science-Fiction",
    "Music",
    "Family",
    "Nature",
    "Anime",
    "Adventure",
    "Horror",
    "War",
    "Mystery",
    "Medical",
    "Fantasy",
    "Action",
    "Supernatural",
    "Food",
    "Legal",
    "Sports",
  ];

  let category = null;
  let search = null;
  if (window.location.href.split("watch/")[1].split("/")[0] === "search") {
    category = null;
    search = window.location.href.split("watch/")[1].split("/")[1];
  } else if (window.location.href.split("page/")[1].split("/")[1] === "cat") {
    if (
      Number.parseInt(window.location.href.split("page/")[1].split("/")[0]) <=
        230 &&
      categories.includes(window.location.href.split("page/")[1].split("/")[2])
    ) {
      category = window.location.href.split("page/")[1].split("/")[2];

      search = null;
    } else {
      history.push(ROUTES.WATCH + "/page/0");
    }
  } else if (window.location.href.split("watch/")[1].split("/")[0] === "page") {
    let linkPage = Number.parseInt(
      window.location.href.split("page/")[1].split("/")[0]
    );
    if (linkPage > 230 || isNaN(linkPage)) {
      history.push(ROUTES.WATCH + "/page/0");
    }
  }

  window.addEventListener("popstate", (event) => {
    setContextPage(!contextPage);
    setContextShow(!contextShow);
  });

  const { firebase } = useContext(FirebaseContext);

  let numb;
  if (all === "0") {
    numb = "";
  } else if (all === "1") {
    numb = window.location.href.split("page/")[1].split("/")[0];
  }
  console.log(numb);

  let prev = Number.parseInt(numb) - 1;
  let next = Number.parseInt(numb) + 1;

  return (
    <>
      <ContextShow.Provider value={[contextShow, setContextShow]}>
        <Header src="neverland.png" dontShowOnSmallViewPort>
          <Header.Frame>
            <Header.Group>
              <Header.Logo to={ROUTES.MAIN} src={logo} alt="Netflix" />
            </Header.Group>
            <Header.Group>
              <Header.Search />
              <Header.Profile>
                <Header.Picture src={user.photoURL} />

                <Header.Dropdown>
                  <Header.Group>
                    <Header.Picture src={user.photoURL} />
                    <Header.Text>{user.displayName}</Header.Text>
                  </Header.Group>
                  <Header.Group>
                    <Header.TextLink onClick={() => firebase.auth().signOut()}>
                      Sign out
                    </Header.TextLink>
                  </Header.Group>
                </Header.Dropdown>
              </Header.Profile>
              <Header.PictureHome
                src={userHome}
                alt="home"
                onClick={() => history.push(ROUTES.USER)}
              />
            </Header.Group>
          </Header.Frame>

          <Header.Feature>
            <Header.FeatureCallOut>
              Watch Promises Neverland
            </Header.FeatureCallOut>
            <Header.Text>
              The Promised Neverland follows three protagonists, Emma, Norman,
              and Ray, along with a cast of orphans who live together. Their
              lives have been full of joy, that is until the protagonists learn
              the orphanage is really a farm where children are raised and given
              to demons to be eaten. Learning that they have a limited amount of
              time on their side, the three work out a plan to escape with the
              rest of the children.
            </Header.Text>
            <Header.PlayButton
              onClick={() => history.push(`${ROUTES.SHOW}/40147`)}
            >
              More info
            </Header.PlayButton>
          </Header.Feature>
        </Header>

        {search !== null ? (
          <Cards.Button
            onClick={() => {
              history.push(ROUTES.WATCH + "/");
              setContextShow(null);
            }}
          >
            Show all shows
          </Cards.Button>
        ) : null}

        {search === null || search === "null" ? (
          <Header.Select
            onChange={({ target }) => {
              // setCategory(target.value);
              setContextPage(!contextPage);
              if (target.value === "null") {
                history.push(ROUTES.WATCH + "/");
              } else {
                history.push(
                  ROUTES.WATCH + "/page/" + numb + "/cat/" + target.value
                );
              }
            }}
          >
            <option value="null">All</option>
            {categories.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </Header.Select>
        ) : null}

        <CardsContainer
          name={search}
          category={category}
          user={user}
          all={all}
          numb={numb}
        />
        <Cards.Group>
          <Cards.Button
            onClick={() => {
              if (category) {
                history.push(
                  ROUTES.WATCH + "/page/" + prev + "/cat/" + category
                );
              } else {
                history.push(ROUTES.WATCH + "/page/" + prev);
              }
              setContextPage(!contextPage);
            }}
          >
            Prev
          </Cards.Button>
          <Cards.Button
            onClick={() => {
              if (category) {
                history.push(
                  ROUTES.WATCH + "/page/" + next + "/cat/" + category
                );
              } else {
                history.push(ROUTES.WATCH + "/page/" + next);
              }
              setContextPage(!contextPage);
            }}
          >
            Next
          </Cards.Button>
        </Cards.Group>

        <FooterContainer />
      </ContextShow.Provider>
    </>
  );
}
