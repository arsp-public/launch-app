import React, { Component } from 'react';
import "./Location.css"

export default class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      onRocket: props.onRocket,
      onAgency: props.onAgency
    }
  }

  render() {
    return (
      <div className="location">
        <div>{this.state.data["net"]}</div>
        <div>{this.state.data["location.name"]}</div>
        <div>
          <a href="#/rocket" onClick={() => this.state.onRocket(this.state.data["rocket.familyname"])}>{this.state.data["rocket.name"]}</a><br/>
        </div>
        <div>
          <a href="#/agency" onClick={() => this.state.onAgency(this.state.data["lsp.name"])}>{this.state.data["lsp.name"]}</a><br/>
        </div>
      </div>
    )
  }
}