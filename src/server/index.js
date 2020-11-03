import express from "express";
import cors from "cors";
import url from 'url';
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import fetch from 'isomorphic-fetch';
import routes from "../shared/routes";
import configureStore from "../shared/configureStore";
import App from "../shared/App";
import "source-map-support/register";

const app = express();

const host = '0.0.0.0';

const port = process.env.PORT || 3000;

const apiUri = 'https://api.spaceXdata.com/v3/launches';

app.use(cors());
app.use(express.static("public"));

app.get("/api/launches", (req, res) => {
  const queryObject = url.parse(req.url, true).search ? url.parse(req.url, true).search : '';
  fetch(`${apiUri}${queryObject}`)
    .then(response => response.json())
    .then(response => res.json(response))
    .catch(err => res.status(500).send({ error: `Error occured while fetching the data. Please try again...${err}` }))
});

app.get("*", (req, res, next) => {
  const store = configureStore();
  const queryObject = url.parse(req.url, true).search ? url.parse(req.url, true).search : '';
  const pathName = url.parse(req.url, true).pathname;
  fetch(`${apiUri}${queryObject}`)
    .then(response => response.json())
    .then(response => {
      const context = {};
      routes.map(route => {
        if (matchPath(pathName, route) && route.component && route.component.initialAction) {
          store.dispatch(route.component.initialAction(response));
        }
      });
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const initialData = store.getState();
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Space X</title>
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <link rel="preconnect" href="http://localhost:3000">
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.listen(port, host, () => {
  console.log("Server is listening....");
});
