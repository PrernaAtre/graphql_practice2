const dotenv = require("dotenv");

dotenv.config();


const express = require('express');
const path = require('path');

require("./connection");

const { ApolloServer } = require('apollo-server-express')

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer()
{
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers : resolversArray,
    });
    const server = new ApolloServer({
        schema : schema
    });

    await server.start();
    server.applyMiddleware({app, path : '/graphql'});   

    app.listen(3000, ()=>{
        console.log('running graph ql server......');
    })
}

startApolloServer();

