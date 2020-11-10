import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap-utilities";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { debugContextDevtool } from "react-context-devtool";

const container = document.getElementById("root");

ReactDOM.render(<App />, container);
// Attach root container

// debugContextDevtool(container); CONTEXT DEBUGGER

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
