import express from "express";
import cors from "cors";
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

const apiUri = 'https://api.spaceXdata.com/v3/launches';

app.use(cors());
app.use(express.static("public"));

app.get("/api/launches", (req, res) => {
  fetch(apiUri)
    .then(response => response.json())
    .then(response => res.json(response))
    .catch(err => res.status(500).send( {error: `Error occured while fetching the data. Please try again...${err}`}))
});

app.get("*", (req, res, next) => {
  const store = configureStore();
  const promises = routes.reduce((acc, route) => {
    if (matchPath(req.url, route) && route.component && route.component.initialAction) {
      acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {};
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening....");
});

// if (module.hot) {
//   module.hot.accept('./server.js', function() {
//     console.log('🔁  HMR Reloading `./server`...');
//   });
//   console.info('✅  Server-side HMR Enabled!');
// }
