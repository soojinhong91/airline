import React, { Component } from 'react';

import SeatMap from './SeatMap';
import axios from 'axios';
import _ from 'underscore';

const SERVER_URL1 = 'http://localhost:3000/airplanes.json'
const SERVER_URL2 = 'http://localhost:3000/flights.json'
const SERVER_BASE_URL = 'http://localhost:3000/'


class Flight extends Component {
  constructor(){
    super();
    this.state = {
      info: [],
      planes: [],
    };

    const fetchPlanes = () => {
      axios.get(SERVER_URL1).then((results) => {
        console.log(results);
        this.setState({planes: results.data});
      });
    }

  this.saveInfo2 = this.saveInfo2.bind(this);
  this.fetchInfo = this.fetchInfo.bind(this);
  this.findFlights = this.findFlights.bind(this);


  fetchPlanes();
}


fetchInfo (url) {
  console.log(url);
  axios.get(url).then((results) => {
    console.log(results);
    this.setState({info: results.data});
    setTimeout(this.fetchInfo, 5000);
  });
}


findFlights(from, to) { /// getting the from/to params from the _handleSubmit function below
  console.log('You Clicked This');
  const generateURL = function (p) {
    return [
      SERVER_BASE_URL,
      'flights/',
      from,
      '/',
      to
      ].join('');
    }
  const url = generateURL()
  console.log(url);
  // this.fetchInfo(url)
  axios.get(url).then((results) => {
    this.setState({info: results.data});
    setTimeout(this.fetchInfo, 5000);
    console.log(results);
  });
  }

  saveInfo2(from, to) {
    axios.get(`${SERVER_URL2}/${from}/${to}`).then((result) => {
      this.setState({info: [...this.state.info, result.data]});
    });
  }

  render() {
    console.log(this.state.info)
    return(
      <div>
        <h1>Find Your Flight</h1>
        <SearchForm onSubmit={this.findFlights}/>
        <Flights flights={ this.state.info } planes={ this.state.planes }/>
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor(){
    super();
    this.state = {from: '', to: ''};
    this._handleInputTo = this._handleInputTo.bind(this);
    this._handleInputFrom = this._handleInputFrom.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleInputFrom(event){
    this.setState({from:event.target.value})
  }
  _handleInputTo(event) {
    this.setState({to:event.target.value})
  }
  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.from, this.state.to);
  }

  render() {
    return(
      <div>
      <p>Please search for a flight</p>
        <form onSubmit={this._handleSubmit}>
          From: <input type="text" placeholder="JFK" required onInput={this._handleInputFrom}/>
          To: <input type="text" placeholder="SFO" required onInput={this._handleInputTo}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

// class CallFlights extends Component {
//   render() {
//     return(
//       <Flights />
//     );
//   }
// }

class Flights extends Component {
  constructor() {
    super();
    this.state = {rows:'', columns:'', flight:{}, plane:{}}
  }

  //updatinng Component (previous)
  componentDidUpdate(prevProps, prevState){
    console.log({prevState})
    if (prevState.flight.id !== this.state.flight.id) {
      const found = this.props.planes.find((p) => p.name == this.state.flight.plane_type )
      console.log({found})
      this.setState({plane:found})
    }
  }

  render() {
    const props = this.props;
    console.log(props)
    return(
      <div>
        { props.flights.map( (i) =>
          <div>
            <p>{i.id}---{i.date}---{i.from}---{i.to}--- {i.flight_number} </p>
            <button onClick={() => this.setState({flight:i})}>click</button>
          </div>) }
         <SeatMap plane={this.state.plane} />
      </div>
    );
  }
}



export default Flight;
