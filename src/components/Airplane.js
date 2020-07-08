import React, { Component } from 'react';
import axios from 'axios';


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
      <h1>Airplane coming soon</h1>
    );
  }
}

export default Airplane;
