const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});




// const PORT = process.env.PORT || 3001;
// const app = express();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// server.applyMiddleware({ app });
// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }



// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`));
// });

// const express = require('express');
// const {ApolloServer} = require ('apollo-server-express');
// const path = require('path');
// const {typeDefs, resolvers} = require ('./schemas');
// const {authMiddleware} = require ('./utils/auth')
// const db = require('./config/connection');

// // const routes = require('./routes');
 
// const { ApolloServerPluginDrainHttpServer } = require ('apollo-server-core');

// const http = require ('http');

// async function startApolloServer(typeDefs, resolvers) {
//   const PORT = process.env.PORT || 3001;
//   const app = express();
//   const httpServer = http.createServer(app);
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleware,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });
//   await server.start();
//   server.applyMiddleware({ app });
  
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.json());
//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//   }
//   // app.use(routes);

//   await new Promise(resolve => httpServer.listen( PORT , resolve));
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
// }

// startApolloServer(typeDefs,resolvers)