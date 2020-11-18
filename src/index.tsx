import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "bootstrap-utilities";
import "animate.css/animate.css";
import App from "./App";

const container = document.getElementById("root"); // debugContextDevtool(container); CONTEXT DEBUGGER

ReactDOM.render(<App />, container);
