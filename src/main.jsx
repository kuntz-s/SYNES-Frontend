import React from "react";
import ReactDOM from "react-dom/client";
import ScrollToTop from "./components/scrollToTop/ScrollToTop.jsx";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./index.css";
import "react-tooltip/dist/react-tooltip.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ScrollToTop />
      <App />
    </Provider>
  </React.StrictMode>
);
