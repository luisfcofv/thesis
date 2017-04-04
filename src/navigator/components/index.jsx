import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';

import './index.css';

import Header from '../../header';
import player from '../../player';
import events from '../../events';
import World from '../../world';
import Location from '../../locations';
import actions from '../actions';
import { fetchWorld } from '../queries';

const Player = player.components;
const Events = events.components;

class Navigator extends Component {
  componentWillReceiveProps({ data }) {
    if (!this.props.data.world && data.world) {
      this.props.setWorld(data.world);
    }
  }

  renderContent() {
    const { data, world } = this.props;
    if (data.loading || !world.name) {
      return <Spinner spinnerName="wandering-cubes" />;
    }

    return (
      <div className="content">
        <Player world={world} setWorld={this.props.setWorld} />
        <Events events={world.latestEvents} />
        <World world={world} />
        <Location locations={world.locations} />
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.renderContent()}
      </div>
    );
  }
}

Navigator.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    world: React.PropTypes.object,
    error: React.PropTypes.object,
  }).isRequired,
  world: React.PropTypes.shape({}).isRequired,
  setWorld: React.PropTypes.func.isRequired,
};

const mapStateToProps = ({ world }) => ({ world });

const NavigatorWithQuery = graphql(fetchWorld, {
  options: { variables: { name: 'My world' } },
})(Navigator);

export default connect(mapStateToProps, { ...actions })(NavigatorWithQuery);
