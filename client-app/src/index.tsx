import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./app/layout/index.css";
import "react-bootstrap/dist/react-bootstrap.min";

import App from "./App";
import ScrollToTop from "./app/layout/ScrollToTop";

import { createBrowserHistory } from "history";
import { StoreContext, store } from "./app/stores/store";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const history = createBrowserHistory();

root.render(
    <StoreContext.Provider value={store}>
        <Router history={history}>
            <CssBaseline />
            <ScrollToTop />
            <App />
        </Router>
    </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
