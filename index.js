/*
 * Copyright (C) 2017 Adam Faryna <adamfaryna@appdy.net>
 *
 * Distributed under terms of the BSD 2-Clause license.
 */

const express = require('express');
const graphQLHTTP = require('express-graphql');

const schema = require('./src/schema');
const Api = require('./src/services/api');

const PORT = 8000;

const app = express();

app.use(graphQLHTTP(req => {
  const headers = { 'Authorization': req.get('Authorization') };

  return {
    context: { headers },
    schema,
    graphiql: process.env.NODE_ENV === 'development'
  };
}));

app.listen(PORT, () => console.log(`GraphQL server started at ${PORT}.`));
