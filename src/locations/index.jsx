import React from 'react';
import Graph from 'react-graph-vis';

import './index.css';

const options = {
  clickToUse: false,
  layout: {
    improvedLayout: true,
  },
  nodes: {
    shape: 'dot',
    size: 30,
  },
  edges: {
    arrows: {
      to: {
        enabled: false,
      },
    },
  },
  interaction: {
    dragView: false,
    dragNodes: false,
    zoomView: false,
  },
};

const locationNodes = location => ({
  id: location.id,
  label: location.name,
});

const locationEdges = (edges, location) => {
  const newEdges = location.neighbors.map(neighbor => ({
    from: location.id,
    to: neighbor.id,
  }));

  return [...edges, ...newEdges];
};

function Locations({ locations }) {
  const nodes = locations.map(locationNodes);
  const edges = locations.reduce(locationEdges, []);

  const graph = { nodes, edges };
  return (
    <div className="Locations">
      <h2>Locations</h2>
      <Graph style={{ width: '600px', height: '400px' }} graph={graph} options={options} />
    </div>
  );
}

export default Locations;
