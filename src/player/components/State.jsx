import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  field: {
    marginTop: 20,
  },
};

function State(props) {
  const handleChange = (event, index, value) => {
    props.updateStateLocation(value);
  };

  function renderItems() {
    return props.world.locations.map(location => (
      <MenuItem key={location.id} value={location.id} primaryText={location.name} />
    ));
  }

  return (
    <div className="state">
      <h2 className="title">Player State</h2>
      <SelectField
        autoWidth
        floatingLabelText="Location"
        value={props.player.stateLocation}
        onChange={handleChange}
        style={styles.field}
      >
        {renderItems()}
      </SelectField>
    </div>
  );
}

State.propTypes = {
  world: React.PropTypes.shape({
    locations: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  }).isRequired,
  player: React.PropTypes.shape({
    stateLocation: React.PropTypes.number.isRequired,
  }).isRequired,
};

export default State;
