import React from "react";
import ReactDOM from "react-dom";
import BookApp from "./BookApp";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <BookApp />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
