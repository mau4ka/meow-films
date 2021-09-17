import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MainStyles } from "./mainStyles";
import "normalize.css";

ReactDOM.render(
  <>
    <MainStyles />
    <App />
  </>,
  document.getElementById("root")
);
