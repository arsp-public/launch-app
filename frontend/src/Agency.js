import React, { Component } from 'react';
import "./Agency.css"

export default class Agency extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      onRocket: props.onRocket,
      onLocation: props.onLocation
    }
  }

  render() {
    return (
      <div className="location">
        <div>{this.state.data["net"]}</div>
        <div>{this.state.data["lsp.name"]}</div>
        <div>
          <a href="#/rocket" onClick={() => this.state.onRocket(this.state.data["rocket.familyname"])}>{this.state.data["rocket.name"]}</a><br/>
        </div>
        <div>
          <a href="#/location" onClick={() => this.state.onLocation(this.state.data["location.name"])}>{this.state.data["location.name"]}</a><br/>
        </div>
      </div>
    )
  }
}