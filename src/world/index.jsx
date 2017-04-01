import React from 'react';
import { ObjectInspector } from 'react-inspector';

import './index.css';

function World({ world }) {
  return (
    <div className="World">
      <h2>World state</h2>
      <ObjectInspector data={world} />
    </div>
  );
}

World.propTypes = {
  world: React.PropTypes.shape({}),
};

export default World;
