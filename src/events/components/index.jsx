import React from 'react';
import { connect } from 'react-redux';

import EventDescription from './EventDescription';
import TableEvents from './TableEvents';

function Events({ events, generator }) {
  if (!events.length) {
    return null;
  }

  return (
    <div>
      <EventDescription events={events} generator={generator} />
      <TableEvents events={events} />
    </div>
  );
}

Events.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  generator: React.PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ events, generator }) => ({ events, generator });
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  if (stateProps.events.length) {
    return stateProps;
  }

  return { ...stateProps, ...ownProps };
};

export default connect(mapStateToProps, null, mergeProps)(Events);
