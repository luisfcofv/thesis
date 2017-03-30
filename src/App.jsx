import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'react-spinkit';

import Header from './Header';
import Player from './player';
import World from './world';
import Location from './locations';

import './App.css';

function App({ data }) {
  function renderContent() {
    if (data.loading) {
      return <Spinner spinnerName="wandering-cubes" />;
    }

    return (
      <div className="content">
        <Player />
        <World world={data.world} />
        <Location locations={data.world.locations} />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      {renderContent()}
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
        id
        name
        neighbors
      }
      player {
        name
        knowledge {
          locations
        }
      }
    }
  }
`;


export default graphql(FetchWorld, {
  options: { variables: { name: 'My world' } },
})(App);

