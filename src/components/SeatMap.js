import React, { Component } from 'react';
import Airplane from './Airplane';
import Flight from './Flight';
import axios from 'axios';
import _ from 'underscore';

class SeatMap extends Component {
  render() {
    return(
      <div>
        <p>====================SeatMap.js====================</p>
        <p>Flight info: will create component later </p>
        <p><SeatPlan /></p>
      </div>
    )
  }
}


const SeatPlan = (props) => {
  return (
    <div>
      <h2>Seating Plan</h2>
      <Airplane />
    </div>
  );
};

export default SeatMap;
