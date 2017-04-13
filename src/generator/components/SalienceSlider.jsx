import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import './styles.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

function SalienceSlider({ title }) {
  return (
    <div className="slider">
      <p>{title} Salience</p>
      <Range
        onChange={() => {}}
        allowCross={false}
        pushable
        min={0}
        max={100}
        defaultValue={[50, 80]}
        tipFormatter={value => `${value / 100}`}
      />
    </div>
  );
}

export default SalienceSlider;
