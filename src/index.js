import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import './index.css';

import App from './App';
import player from './player';
import events from './events';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:8080/graphql' }),
});

const store = createStore(
  combineReducers({
    [player.constants.NAME]: player.reducer,
    [events.constants.NAME]: events.reducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(applyMiddleware(client.middleware())),
);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
