import React, { useState, useEffect, useContext } from "react";
import { Cards, Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import userHome from "../user.png";
import { FirebaseContext } from "../context/firebase";
import { FooterContainer } from "./FooterContainer";
import { CardsContainer } from "./CardsContainer";
import { ContextShow } from "../context/contextShow";

export function WatchContainer({ liked }) {
  const [contextShow, setContextShow] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [category, setCategory] = useState(null);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  console.log(user);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <ContextShow.Provider value={[contextShow, setContextShow]}>
        <Header src="neverland.png" dontShowOnSmallViewPort>
          <Header.Frame>
            <Header.Group>
              <Header.Logo to={ROUTES.MAIN} src={logo} alt="Netflix" />
            </Header.Group>
            <Header.Group>
              <Header.Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
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
                onClick={() => (window.location.href = ROUTES.USER)}
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
              onClick={() => (window.location.href = `${ROUTES.SHOW}/40147`)}
            >
              More info
            </Header.PlayButton>
          </Header.Feature>
        </Header>

        {contextShow !== null ? (
          <Cards.Button
            onClick={() => {
              setContextShow(null);
            }}
          >
            Show all shows
          </Cards.Button>
        ) : null}

        {contextShow === null || contextShow === "null" ? (
          <Header.Select
            onChange={({ target }) => {
              console.log(target.value);
              setCategory(target.value);
              console.log(contextShow);
            }}
          >
            <option value="null">All</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Triller">Thriller</option>
            <option value="Science">Science</option>
            <option value="Music">Music</option>
            <option value="Family">Family</option>
            <option value="Nature">Nature</option>
            <option value="Anime">Anime</option>
            <option value="Adventure">Adventure</option>
            <option value="Horror">Horror</option>
            <option value="War">War</option>
            <option value="Mystery">Mystery</option>
            <option value="Medical">Medical</option>
            <option value="Fantasy">Fantasy</option>
          </Header.Select>
        ) : null}
        <CardsContainer name={contextShow} category={category} liked={liked} />

        <FooterContainer />
      </ContextShow.Provider>
    </>
  );
}
