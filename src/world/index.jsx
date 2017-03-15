import React from 'react';
import { ObjectInspector } from 'react-inspector';
import Spinner from 'react-spinkit';

import './index.css';

function World({ data }) {
  function renderTree() {
    if (data.loading || !data.world) {
      return <Spinner spinnerName="wandering-cubes" />;
    }

    return <ObjectInspector data={data.world} />;
  }

  return (
    <div className="World">
      <h2>World state</h2>
      {renderTree()}
    </div>
  );
}

export default World;
