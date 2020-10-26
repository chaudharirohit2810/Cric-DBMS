import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
    return (
        <Router>
            <NavBar />
            <Route exact path="/" component={HomePage} />
        </Router>
    );
}

export default App;
