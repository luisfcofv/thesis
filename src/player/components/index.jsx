import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import './index.css';

import Selector from './Selector';
import actions from '../actions';
import events from '../../events';

injectTapEventPlugin();

class Player extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    const { goals, social, locations } = props.world.player.knowledge;

    props.updateGoals(goals);
    props.updateSocial(social);
    props.updateLocations(locations);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  onTouchTap = () => {
    const { goals, social, locations } =  this.props.player;
    this.props.mutate({
      variables: {
        "world": "My world",
        "knowledge": {
          "locations": locations,
          "social": social,
          "goals": goals,
        },
      },
    }).then(({ data }) => {
      this.props.addEvents(data.generateEvents);
    });
  }

  render() {
    const { world, player } = this.props;
    const { goals, social, locations } = player;

    return (
      <div className="player">
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
};

const mapStateToProps = ({ player }) => ({ player });

const PlayerWithMutation = graphql(gql`
  mutation generateEvents($world: String!, $knowledge: KnowledgeInput!) {
    generateEvents(world: $world, knowledge: $knowledge) {
      name
      description
      location {
        name
      }
      agents {
        name
      }
      salience {
        social
        time
        space
        intention
        causation
      }
    }
  }
`)(Player);

export default connect(mapStateToProps, { ...actions, ...events.actions })(PlayerWithMutation);