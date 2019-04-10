import React, { Component } from 'react';
import "./Launch.css"
class Launch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      color: props.color,
      onRocket: props.onRocket.bind(this),
      onLocation: props.onLocation.bind(this),
      onAgency: props.onAgency.bind(this)
    };
  }

  description(){
    return this.state.client.searchDescription(this.state.data["rocket.wikiURL"])
  }
  rocketUrl(){
    if (!this.state.data["rocket.imageURL"]){
      return ""
    }
    var i = this.state.data["rocket.imageURL"].lastIndexOf("_")
    var base = this.state.data["rocket.imageURL"].substr(0, i)
    var size = this.state.data["rocket.imageSizes.1"] || this.state.data["rocket.imageSizes.2"] || this.state.data["rocket.imageSizes.3"] || ""
    var j = this.state.data["rocket.imageURL"].lastIndexOf(".")
    var extension = this.state.data["rocket.imageURL"].substr(j, this.state.data["rocket.imageURL"].length)
    return `${base}_${size}${extension}`
  }

  render() {
    return (
      <div className={"launch " + this.state.color}>
        
        <img src={this.rocketUrl()}/>
        <div className="details">
            <label>Date: </label>
            <a>{this.state.data["net"]}<br/></a>
            <label>Rocket: </label>
            <a href="#/rocket" onClick={() => {this.state.onRocket(this.state.data["rocket.familyname"]);}}>{this.state.data["rocket.name"]}</a><br/>
            <label>Location: </label>
            <a href="#/location" onClick={() => this.state.onLocation(this.state.data["location.name"])}>{this.state.data["location.name"]}</a><br/>
            <label>Agency: </label>
            <a href="#/agency" onClick={() => this.state.onAgency(this.state.data["lsp.name"])}>{this.state.data["lsp.name"]}</a><br/>
        </div>
        
      </div>
    );
  }
}

export default Launch;