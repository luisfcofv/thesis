import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import './styles.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class SalienceSlider extends Component {
  constructor(props) {
    super(props);
    const { medium, high } = props.data; 
    this.defaultValue = [medium, high]
  }

  onChange = (values) => {
    this.props.updateData({
      medium: values[0],
      high: values[1],
    });
  }

  render(){
    const { data, title } = this.props;
    const highSalience = data.high / 100;
    const mediumSalience =  data.medium / 100;
    return (
      <div className="slider">
        <div className="salience-description">
          <p>{title} Salience</p>
          <div className="salience-threshold">
            <p>Low detail: &lt; {mediumSalience}</p>
            <p>Medium detail: &ge; {mediumSalience}</p>
            <p>High detail: &ge; {highSalience}</p>
          </div>
        </div>
        <Range
          onChange={this.onChange}
          allowCross={false}
          pushable
          min={0}
          max={100}
          defaultValue={this.defaultValue}
          tipFormatter={value => `${value / 100}`}
        />
      </div>
    );
  }
}

SalienceSlider.propTypes = {
  data: React.PropTypes.shape({}).isRequired,
  title: React.PropTypes.string.isRequired,
  updateData: React.PropTypes.func.isRequired,
};

export default SalienceSlider;
