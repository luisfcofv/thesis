import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './styles.css';

class TableEvents extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    }
  }

  renderRows() {
    const sortedEvents = [...this.props.events];
    sortedEvents.sort((a, b) => (
      b.salience.total - a.salience.total
    ));
  
    return sortedEvents.map((event, index) => {
      const agents = event.agents.reduce((acc, agent) => {
        if (acc.length) {
          return `${acc}, ${agent.name}`;
        }
        
        return agent.name;
      }, '');

      let rowStyle;
      if (index === 0) {
        rowStyle = { backgroundColor: '#E0F7FA' };
      }

      return (
        <TableRow key={event.name} style={rowStyle}>
          <TableRowColumn>
              <p><b>{event.name}</b></p>
              {event.description}
          </TableRowColumn>
          <TableRowColumn>{event.protagonist ? 'true' : 'false'}</TableRowColumn>
          <TableRowColumn>{event.location.name}</TableRowColumn>
          <TableRowColumn>{agents}</TableRowColumn>
          <TableRowColumn>{event.goal.name}</TableRowColumn>
          <TableRowColumn>{event.cause.name}</TableRowColumn>
          <TableRowColumn>{event.propagation} units</TableRowColumn>
          <TableRowColumn>
            <p>Social: {event.salience.social.toFixed(2)}</p>
            <p>Space: {event.salience.space.toFixed(2)}</p>
            <p>Time: {event.salience.time.toFixed(2)}</p>
            <p>Intention: {event.salience.intention.toFixed(2)}</p>
            <p>Causation: {event.salience.causation.toFixed(2)}</p>
          </TableRowColumn>
          <TableRowColumn><b>{event.salience.total.toFixed(2)}</b></TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div className="table-container">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Protagonist</TableHeaderColumn>
              <TableHeaderColumn>Location</TableHeaderColumn>
              <TableHeaderColumn>Agents</TableHeaderColumn>
              <TableHeaderColumn>Goal</TableHeaderColumn>
              <TableHeaderColumn>Cause</TableHeaderColumn>
              <TableHeaderColumn>Propagation</TableHeaderColumn>
              <TableHeaderColumn>Indices Salience</TableHeaderColumn>
              <TableHeaderColumn>Event Salience</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

TableEvents.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};

export default TableEvents;
