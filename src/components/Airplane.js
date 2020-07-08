import React, { Component } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/airplanes'

class Airplane extends Component {
  constructor(){
    super();
    this.state = {
      info: []
    };


  const fetchInfo = () => {
    axios.get(SERVER_URL).then((results) => {
      this.setState({info: results.data});
      setTimeout(fetchInfo, 5000);
    });
  };
  fetchInfo();

  this.saveInfo = this.saveInfo.bind(this);

  saveInfo(from, to) {
    axios.get(`${SERVER_URL}/${from}/${to}`).then((result) => {
      this.setState({info: [...this.state.info, result.data]});
    });
  }


  render() {
    return(
      <div>
        <h1>Find Your Flight</h1>
        <SearchForm onSubmit={this.fetchInfo}/>
        {/*<Flights />*/}
      </div>
    );
  }
}}



class SearchForm extends Component {

  constructor(){
    super();
    this.state = {from: '', to: ''}
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

{/*const Flights = () => {
  return
    <div> Goodbye
    </div>
}*/}
export default Airplane;
