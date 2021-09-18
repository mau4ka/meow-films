import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MainStyles } from "./mainStyles";
import "normalize.css";
import { firebase } from "./lib/firebase.prod";
import { FirebaseContext } from "./context/firebase";

ReactDOM.render(
  <>
    <FirebaseContext.Provider value={{ firebase }}>
      <MainStyles />
      <App />
    </FirebaseContext.Provider>
  </>,
  document.getElementById("root")
);
