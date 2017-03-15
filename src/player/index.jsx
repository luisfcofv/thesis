import React from 'react';
import Spinner from 'react-spinkit';

import './index.css';

function Player() {
  return (
    <div className="Player">
      <h2>Player Actions</h2>
      <Spinner spinnerName="wandering-cubes" />
    </div>
  );
}

export default Player;
