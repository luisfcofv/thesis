import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

class TableExampleSimple extends Component {
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

      return (
        <TableRow key={event.name}>
          <TableRowColumn>{event.name}</TableRowColumn>
          <TableRowColumn>{event.description}</TableRowColumn>
          <TableRowColumn>{event.location.name}</TableRowColumn>
          <TableRowColumn>{agents}</TableRowColumn>
          <TableRowColumn>{event.goal}</TableRowColumn>
          <TableRowColumn>{event.cause}</TableRowColumn>
          <TableRowColumn>{event.time}</TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    if (!this.props.events.length) {
      return null;
    }

    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
            <TableHeaderColumn>Agents</TableHeaderColumn>
            <TableHeaderColumn>Goal</TableHeaderColumn>
            <TableHeaderColumn>Cause</TableHeaderColumn>
            <TableHeaderColumn>Time</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.renderRows()}
        </TableBody>
      </Table>
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

export default connect(mapStateToProps, null, mergeProps)(TableExampleSimple);
