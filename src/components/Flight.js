import React, { Component } from 'react';

import SeatMap from './SeatMap';
import axios from 'axios';
import _ from 'underscore';

const SERVER_URL2 = 'http://localhost:3000/flights.json'
const SERVER_BASE_URL = 'http://localhost:3000/'

class Flight extends Component {
  constructor(){
    super();
    this.state = {
      info: []
    };

  this.saveInfo2 = this.saveInfo2.bind(this);
  this.fetchInfo = this.fetchInfo.bind(this);
  this.findFlights = this.findFlights.bind(this);
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
    return(
      <div>
        <h1>Find Your Flight</h1>
        <SearchForm onSubmit={this.findFlights}/>
        <Flights info={ this.state.info }/>
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

const Flights = (props) => { // change to component
  return (
    <div>
      { props.info.map( (i) =>
        <div>
          <p>{i.id}---{i.date}---{i.from}---{i.to}--- {i.flight_number} </p>

        </div>) }
       <SeatMap />
    </div>
  );
};

// add onClick event to call SeatMap
// connect flight to the SeatMap

export default Flight;
