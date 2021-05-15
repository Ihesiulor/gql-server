require("dotenv").config();

const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema");

const PORT = process.env.PORT || 5000;

express()
  .use("/graphql", graphqlHTTP({ schema, graphiql: true }))
  .use("/", graphqlHTTP({ schema }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to database");
});
