import React from 'react';

import { generateGrammar } from '../../tracery';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function EventDescription({ events }) {
  const sortedEvents = [...events];
  sortedEvents.sort((a, b) => (
    b.salience.total - a.salience.total
  ));

  const latestEvent = sortedEvents[0];
  return (
    <div style={styles.container}>
      <p><b>Latest Event</b></p>
      <p>{generateGrammar(latestEvent)}</p>
    </div>
  );
}

EventDescription.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};

export default EventDescription;
