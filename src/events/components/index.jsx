import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

const styles = {
  container: {
    margin: '20px',
  },
};

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
    return this.props.events.map(event => {
      const agents = event.agents.reduce((acc, agent) => {
        if (acc.length) {
          return `${acc}, ${agent.name}`;
        }
        
        return agent.name;
      }, '');

      console.log(event.protagonist)

      return (
        <TableRow key={event.name}>
          <TableRowColumn>
              <p><b>{event.name}</b></p>
              {event.description}
          </TableRowColumn>
          <TableRowColumn>{event.protagonist ? 'true' : 'false'}</TableRowColumn>
          <TableRowColumn>{event.location.name}</TableRowColumn>
          <TableRowColumn>{agents}</TableRowColumn>
          <TableRowColumn>{event.goal.name}</TableRowColumn>
          <TableRowColumn>{event.cause.name}</TableRowColumn>
          <TableRowColumn>{event.time} units</TableRowColumn>
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
    if (!this.props.events.length) {
      return null;
    }

    return (
      <div style={styles.container}>
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
              <TableHeaderColumn>Time</TableHeaderColumn>
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

const mapStateToProps = ({ events }) => ({ events });
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  if (stateProps.events.length) {
    return stateProps;
  }

  return ownProps;
};

export default connect(mapStateToProps, null, mergeProps)(TableEvents);
