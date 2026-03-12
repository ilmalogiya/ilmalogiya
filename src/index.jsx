import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import ReactGA from "react-ga4";
import { BrowserRouter } from "react-router-dom";

ReactGA.initialize("G-0LEVT3LRDL"); 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
