import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import './index.css';

import actions from '../actions';
import Knowledge from './Knowledge';
import State from './State'
import { generateEvents } from '../mutations';

injectTapEventPlugin();

class Player extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.updateStore(props.world, props);
  }

  componentWillReceiveProps({ world }) {
    if (this.props.world !== world) {
      this.updateStore(world, this.props);
    }
  }

  updateStore(world, props) {
    const { goals, social, locations } = world.player.knowledge;

    props.updateGoals(goals);
    props.updateSocial(social);
    props.updateLocations(locations);
    props.updateStateLocation(world.state.player.location);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  onTouchTap = () => {
    const { goals, social, locations, stateLocation } =  this.props.player;
    this.props.mutate({
      variables: {
        "world": "My world",
        "location": stateLocation,
        "knowledge": {
          "locations": locations,
          "social": social,
          "goals": goals,
        },
      },
    }).then(({ data }) => {
      this.props.setWorld(data.generateEvents);
    });
  }

  render() {
    return (
      <div className="player">
        <div className="container">
          <Knowledge {...this.props}/>
          <State {...this.props}/>
        </div>
        <RaisedButton
          primary
          className="button"
          label="Generate Event"
          onTouchTap={this.onTouchTap}
        />
      </div>
    );
  }
}

Player.propTypes = {
  world: React.PropTypes.shape({}),
  player: React.PropTypes.shape({}),
  setWorld: React.PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({ player });

const PlayerWithMutation = graphql(generateEvents)(Player);
export default connect(mapStateToProps, { ...actions })(PlayerWithMutation);