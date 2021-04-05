const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const moviesJson = require('./movies.json');
const cors = require('cors');

const schema = buildSchema(`
  type Movie {
      title: String!
      release_year: String
      locations: String
      distributor: String
      director: String
      writer: String!
      actor_1: String
      actor_2: String
      actor_3: String
  }
  type Query {
    movies: [Movie]
  }
`);

// const token = 'rkj7Qf0gLkSHXgWzDi909gfZL';

const root = { movies: () => moviesJson };

// const root = axios.get('https://data.sfgov.org/resource/yitu-d5am.json', {
//     headers:{
//         'X-App-Token': token
//     }
// }).then(graphQL logica);

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));