import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/globals.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App/App.jsx";

import { Provider } from "react-redux";
import { store } from "./Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
