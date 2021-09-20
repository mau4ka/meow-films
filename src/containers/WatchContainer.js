import React, { useState, useEffect, useContext } from "react";
import { Cards, Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../meowLogo.png";
import { FirebaseContext } from "../context/firebase";
import useContent from "../hooks/use-api-category";
import no_image from "../no_image.png";

export function WatchContainer() {
  const { cat } = useContent("cat");
  // console.log(girls.shows);

  // const [category, setCategory] = useState("series");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="neverland.png" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.MAIN} src={logo} alt="Netflix" />
            {/* Зробити категорії */}
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
            The Promised Neverland follows three protagonists, Emma, Norman, and
            Ray, along with a cast of orphans who live together. Their lives
            have been full of joy, that is until the protagonists learn the
            orphanage is really a farm where children are raised and given to
            demons to be eaten. Learning that they have a limited amount of time
            on their side, the three work out a plan to escape with the rest of
            the children.
          </Header.Text>
          <Header.PlayButton>More info</Header.PlayButton>
        </Header.Feature>
      </Header>

      <Cards>
        <Cards.Title>Interesting Cat Films</Cards.Title>
        <Cards.Group>
          {cat.shows ? (
            cat.shows.map((item) => (
              <Cards.Item key={item.show.id}>
                {item.show.image === null || item.show.image.medium === null ? (
                  <Cards.Image src={no_image} alt="no-image" />
                ) : (
                  <Cards.Image
                    src={item.show.image.original}
                    alt={item.show.name}
                  />
                )}

                <Cards.SubTitle>{item.show.name}</Cards.SubTitle>
                <Cards.Text>{item.show.name}</Cards.Text>
              </Cards.Item>
            ))
          ) : (
            <p></p>
          )}
        </Cards.Group>
      </Cards>
    </>
  );
}
