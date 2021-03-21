import logo from './logo.svg';
import './App.css';

import React, {Fragment} from "react";
import {Route} from "react-router-dom";

// layouts
import Header from "./pages/layouts/Header";
import Footer from "./pages/layouts/Footer";

// routes
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <Header/>
      <div id="gjMainWrap">
        <Route exact path="/" component={MainPage}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
