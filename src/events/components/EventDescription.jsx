import React from 'react';

import './styles.css';

import { generateGrammar } from '../../tracery';

function EventDescription({ events }) {
  const sortedEvents = [...events];
  sortedEvents.sort((a, b) => (
    b.salience.total - a.salience.total
  ));

  const latestEvent = sortedEvents[0];
  return (
    <div className="latest-event">
      <p><b>Latest Event</b></p>
      <p className="event-text">{generateGrammar(latestEvent)}</p>
    </div>
  );
}

EventDescription.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};

export default EventDescription;
