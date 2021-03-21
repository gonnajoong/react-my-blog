import React from "react";
import {Route} from "react-router-dom";

// layouts
import Header from "./pages/layouts/Header";
import Footer from "./pages/layouts/Footer";

// routes
import MainPage from "./pages/MainPage";

const AppProvider = ({contexts, children}) => contexts.reduce(
  (prev, context) => React.createElement(context, {
      children: prev
}),
  children
);

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <Header/>
        <div id="gjMainWrap">
          <Route path="/" exact component={MainPage}/>
        </div>
        <Footer/>
      </div>
    </AppProvider>
  );
}

export default App;
