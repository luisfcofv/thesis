import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import './index.css';

import Selector from './Selector';
import actions from '../actions';
import events from '../../events';
import { generateEvents } from '../mutations';

injectTapEventPlugin();

class Knowledge extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  render() {
    const { world, player } = this.props;
    const { goals, social, locations } = player;

    return (
      <div>
        <h2>Player Knowledge</h2>
        <div className="selectors">
          <Selector
            data={world.locations}
            knowledge={locations}
            title="Locations"
            updateData={this.props.updateLocations}
          />
          <Selector
            data={world.agents}
            knowledge={social}
            title="Social"
            updateData={this.props.updateSocial}
          />
          <Selector
            data={world.goals}
            knowledge={goals}
            title="Goals"
            updateData={this.props.updateGoals}
          />
        </div>
      </div>
    );
  }
}

export default Knowledge;