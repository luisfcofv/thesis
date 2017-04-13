import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import './styles.css';

import SalienceSlider from './SalienceSlider';
import { generateEvents } from '../mutations';

class Generator extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

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
      <div className="generator">
        <div className="sliders-container">
          <SalienceSlider title="Location" />
          <SalienceSlider title="Time" />
        </div>
        <div className="button-container">
          <RaisedButton
            className="button"
            primary
            label="Generate Event"
            onTouchTap={this.onTouchTap}
          />
        </div>
      </div>
    );
  }
}

Generator.propTypes = {
  player: React.PropTypes.shape({}),
  setWorld: React.PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({ player });

const GeneratorWithMutation = graphql(generateEvents)(Generator);
export default connect(mapStateToProps)(GeneratorWithMutation);