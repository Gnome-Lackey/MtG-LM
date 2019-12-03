import * as React from "react";
import { hot } from "react-hot-loader";
import { render } from "react-dom";

import * as serviceWorker from "serviceWorker.ts";

import Routes from "components/Routes";

const { ENV } = process.env;

const node = document.getElementById("root");
const App = ENV === "local" ? hot(module)(Routes) : Routes;

render(<App />, node);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
