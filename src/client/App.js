import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  state = { ip: null };

  componentDidMount() {
    fetch('/api/info')
      .then(res => res.json())
      .then(res => {
        console.log(res.ip)
        return res
      })
      .then(info => this.setState({ ip: info.ip }))
      .catch(error => console.error(error));
  }

  render() {
    const { ip } = this.state;
    return (
      <div>
        {ip ? <h1>{`Hello ${ip}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
