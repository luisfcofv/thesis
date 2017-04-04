import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import './index.css';

import navigator from './navigator';
import player from './player';
import events from './events';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    // uri: 'http://sample-env.gxmxisniep.eu-west-2.elasticbeanstalk.com/graphql',
    uri: 'http://localhost:3000/graphql',
  }),
});

const store = createStore(
  combineReducers({
    [player.constants.NAME]: player.reducer,
    [events.constants.NAME]: events.reducer,
    [navigator.constants.NAME]: navigator.reducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(applyMiddleware(client.middleware())),
);

const Navigator = navigator.components;

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Navigator />
  </ApolloProvider>,
  document.getElementById('root'),
);
