import React, { Component } from 'react';
import Airplane from './Airplane';
import SeatMap from './SeatMap';
import axios from 'axios';
import _ from 'underscore';

const SERVER_URL2 = 'http://localhost:3000/flights.json'

class Flight extends Component {
  constructor(){
    super();
    this.state = {
      info: []
    };

  this.fetchInfo2();

  this.saveInfo2 = this.saveInfo2.bind(this);
  this.fetchInfo2 = this.fetchInfo2.bind(this);
}

findflights(from, to) {
  // loop
  console.log(from, to)
}

fetchInfo2 () {
  axios.get(SERVER_URL2).then((results) => {
    this.setState({info: results.data});
    setTimeout(this.fetchInfo2, 5000);
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
        <SearchForm onSubmit={this.findflights}/>
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
    this.props.onSubmit(this.state.to, this.state.from);
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

const Flights = (props) => {
  return (
    <div>
      { props.info.map( (i) => <p>{i.id}---{i.date}---{i.from}---{i.to}--- {i.flight_number} </p>) }
      //(flight number needs link? to choose seat which is SeatMap.js form below)
    </div>
  );
};

export default Flight;
