import React from 'react';

import './styles.css';

import { generateGrammar } from '../tracery';

function EventDescription({ events, generator }) {
  const sortedEvents = [...events];
  sortedEvents.sort((a, b) => (
    b.salience.total - a.salience.total
  ));

  const latestEvent = sortedEvents[0];
  return (
    <div className="latest-event">
      <h3>Latest Event</h3>
      <p className="event-text">{generateGrammar(latestEvent, generator)}</p>
    </div>
  );
}

EventDescription.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  generator: React.PropTypes.shape({}).isRequired,
};

export default EventDescription;
