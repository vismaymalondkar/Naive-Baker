import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import NaiveBaker from "./containers/NaiveBaker";
import "./App.css";
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <NaiveBaker />
            </BrowserRouter>
        );
    }
}

export default App;
