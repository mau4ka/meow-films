import React, { useState, useEffect, useContext } from "react";
import { Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import { FirebaseContext } from "../context/firebase";
import { FooterContainer } from "./FooterContainer";
import { CardsContainer } from "./CardsContainer";
import { ContextShow } from "../context/contextShow";

export function WatchContainer() {
  const [contextShow, setContextShow] = useState("cat");

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

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
              <Header.Select
                onChange={({ target }) => {
                  console.log(target.value);
                  setContextShow(target.value);
                }}
              >
                <option value="cat">Cat</option>
                <option value="drama">Drama</option>
                <option value="romance">Romance</option>
                <option value="comedy">Comedy</option>
                <option value="crime">Crime</option>
                <option value="triller">Thriller</option>
                <option value="science">Science</option>
                <option value="children">children</option>
                <option value="music">Music</option>
                <option value="family">Family</option>
                <option value="nature">Nature</option>
                <option value="anime">Anime</option>
                <option value="adventure">Adventure</option>
                <option value="horror">Horror</option>
                <option value="war">War</option>
                <option value="mystery">Mystery</option>
                <option value="medical">Medical</option>
                <option value="fantasy">Fantasy</option>
              </Header.Select>
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

        <CardsContainer name={contextShow} />

        <FooterContainer />
      </ContextShow.Provider>
    </>
  );
}
