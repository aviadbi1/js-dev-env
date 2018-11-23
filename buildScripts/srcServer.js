import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";
import graphqlHTTP from "express-graphql";
import schema from "../src/api/graphql_schema";

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

var people_db = [
  {
    id: 1,
    firstName: "Bob",
    lastName: "Smith",
    email: "smithy@gmail.com",
    username: "Bobby112",
    friends: ["/users/2"]
  },
  {
    id: 2,
    firstName: "Tammy",
    lastName: "Norton",
    email: "tammy@gmail.com",
    username: "Shlomke_4",
    friends: ["/users/1", "/users/3"]
  },
  {
    id: 3,
    firstName: "Bruce",
    lastName: "Lee",
    email: "bruceLee@gmail.com",
    username: "BruceLee94",
    friends: ["/users/2"]
  }
];

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.get("/users", function(req, res) {
  res.json(people_db);
});

app.get("/users/:id", function(req, res) {
  console.log("req.params.id", req.params.id);
  res.send(people_db.find(person => person.id == req.params.id));
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
