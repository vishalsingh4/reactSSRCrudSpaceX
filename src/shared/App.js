import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from "./routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Space X</title>
          <meta name="description" content="space x launch list" />
          <meta name="keywords" content="react,ssr,seo,helmet,spacex" />
        </Helmet>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </div>
    );
  }
}

export default App;
