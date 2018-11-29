import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Main from "../components/main";
import configureStore from "../store/configureStore";

const store = configureStore();

export default class Root extends Component {
  render() {
    return <h1>HELLO WORLD IN ROOT</h1>;
  }
}
