const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("/map/:id", (req, res) => {
      const actualPage = "/map";
      const queryParams = {id: req.params.id};
      console.log(queryParams);
      app.render(req, res, actualPage, queryParams);
    });
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(7777, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:7777");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
