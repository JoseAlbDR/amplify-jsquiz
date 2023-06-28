import React from "react";
import ReactDOM from "react-dom/client";
import "prismjs/themes/prism-okaidia.css";
import "./styles/index.css";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
