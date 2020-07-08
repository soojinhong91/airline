import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL1 = 'http://localhost:3000/airplines.json'
const SERVER_URL2 = 'http://localhost:3000/flights.json'

class Airplane extends Component {
  constructor(){
    super();
    this.state = {
      info: []
    };

  this.fetchInfo();

  this.saveInfo = this.saveInfo.bind(this);
  this.fetchInfo = this.fetchInfo.bind(this);
}

findflights(from, to) {
  // loop
  console.log(from, to)
}

fetchInfo () {
  axios.get(SERVER_URL1).then((results) => {
    this.setState({info: results.data});
    setTimeout(this.fetchInfo, 5000);
  });
}

  saveInfo(from, to) {
    axios.get(`${SERVER_URL1}/${from}/${to}`).then((result) => {
      this.setState({info: [...this.state.info, result.data]});
    });
  }

fetchInfo2 () {
  axios.get(SERVER_URL1).then((results) => {
    this.setState({info: results.data});
    setTimeout(this.fetchInfo, 5000);
  });
}

  saveInfo2(from, to) {
    axios.get(`${SERVER_URL1}/${from}/${to}`).then((result) => {
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
      { props.info.map( (i) => <p>{i.id}:{i.from}:{i.to}</p>) }
    </div>
  );
};

export default Airplane;
