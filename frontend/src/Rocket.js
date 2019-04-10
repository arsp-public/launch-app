import React, { Component } from 'react';
import "./Rocket.css"

export default class Rocket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      onLocation: props.onLocation,
      onAgency: props.onAgency,
    }
  }

  render() {
    return (
      <div className="rocket">
        <div>{this.state.data["net"]}</div>
        <div>{this.state.data["rocket.name"]}</div>
        <div>
          <a href="#/location" onClick={() => this.state.onLocation(this.state.data["location.name"])}>{this.state.data["location.name"]}</a><br/>
        </div>
        <div>
          <a href="#/agency" onClick={() => this.state.onAgency(this.state.data["lsp.name"])}>{this.state.data["lsp.name"]}</a><br/>
        </div>
      </div>
    )
  }
}