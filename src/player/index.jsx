import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css';
import Selector from './Selector';

class Player extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  render() {
    const { world } = this.props;
    return (
      <div className="player">
        <h2>Player Knowledge</h2>
        <div className="selectors">
          <Selector
            data={world.locations}
            knowledge={world.player.knowledge.locations}
            title="Locations"
          />
          <Selector
            data={world.agents}
            knowledge={world.player.knowledge.social}
            title="Social"
          />
          <Selector
            data={world.goals}
            knowledge={world.player.knowledge.goals}
            title="Goals"
          />
        </div>
        <RaisedButton className="button" label="Generate Event" primary={true} />
      </div>
    );
  }
}

Player.propTypes = {
  world: React.PropTypes.shape({}),
};

export default Player;
