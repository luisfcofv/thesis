import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Header from './Header';
import Player from './player';
import World from './world';

import './App.css';

function App({ data }) {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <World data={data} />
        <Player />
      </div>
    </div>
  );
}

App.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    world: React.PropTypes.object,
    error: React.PropTypes.object,
  }).isRequired,
};

const FetchWorld = gql`
  query FetchWorld($name: String!) { 
    world(name: $name){
      name
      agents {
        id
        name
        description
        connections
      }
      locations {
        name
        neighbors {
          id
        }
      }
      player {
        name
        knowledge {
          space
        }
      }
    }
  }
`;


export default graphql(FetchWorld, {
  options: { variables: { name: 'My world' } },
})(App);

