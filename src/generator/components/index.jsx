import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import './styles.css';

import SalienceSlider from './SalienceSlider';
import actions from '../actions';
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
    const { generator, updateLocationSalience, updateTimeSalience } = this.props;
    return (
      <div className="generator">
        <h3 className="title">Thresholds</h3>
        <div className="sliders-container">
          <SalienceSlider
            data={generator.locationSalience}
            title="Location"
            updateData={updateLocationSalience}
          />
          <SalienceSlider
            data={generator.timeSalience}
            title="Time"
            updateData={updateTimeSalience}
          />
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
  updateLocationSalience: React.PropTypes.func.isRequired,
  updateTimeSalience: React.PropTypes.func.isRequired,
};

const mapStateToProps = ({ player, generator }) => ({ player, generator });
const GeneratorWithMutation = graphql(generateEvents)(Generator);
export default connect(mapStateToProps, actions)(GeneratorWithMutation);