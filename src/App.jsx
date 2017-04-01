import React from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-spinkit';

import './App.css';

import Header from './header';
import player from './player';
import World from './world';
import Location from './locations';
import { fetchWorld } from './queries';


function App({ data }) {
  function renderContent() {
    if (data.loading) {
      return <Spinner spinnerName="wandering-cubes" />;
    }

    const Player = player.components;
    return (
      <div className="content">
        <Player world={data.world} />
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

export default graphql(fetchWorld, {
  options: { variables: { name: 'My world' } },
})(App);

