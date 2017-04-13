import React from 'react';

import './styles.css';

import Selector from './Selector';

function Knowledge(props) {
  const { world, player } = props;
  const { goals, social, locations } = player;

  return (
    <div>
      <h2 className="title">Player Knowledge</h2>
      <div className="selectors">
        <Selector
          data={world.locations}
          knowledge={locations}
          title="Locations"
          updateData={props.updateLocations}
        />
        <Selector
          data={world.agents}
          knowledge={social}
          title="Social"
          updateData={props.updateSocial}
        />
        <Selector
          data={world.goals}
          knowledge={goals}
          title="Goals"
          updateData={props.updateGoals}
        />
      </div>
    </div>
  );
}

Knowledge.propTypes = {
  world: React.PropTypes.shape({}).isRequired,
  player: React.PropTypes.shape({}).isRequired,
  updateLocations: React.PropTypes.func.isRequired,
  updateSocial: React.PropTypes.func.isRequired,
  updateGoals: React.PropTypes.func.isRequired,
};

export default Knowledge;
