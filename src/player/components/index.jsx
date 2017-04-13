import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

import './styles.css';

import Knowledge from './knowledge';
import State from './State'
import actions from '../actions';

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

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  updateStore(world, props) {
    const { goals, social, locations } = world.player.knowledge;

    props.updateGoals(goals);
    props.updateSocial(social);
    props.updateLocations(locations);
    props.updateStateLocation(world.state.player.location);
  }

  render() {
    return (
      <div className="container">
        <Knowledge {...this.props}/>
        <State {...this.props}/>
      </div>
    );
  }
}

Player.propTypes = {
  world: React.PropTypes.shape({}),
  player: React.PropTypes.shape({}),
};

const mapStateToProps = ({ player }) => ({ player });
export default connect(mapStateToProps, { ...actions })(Player);