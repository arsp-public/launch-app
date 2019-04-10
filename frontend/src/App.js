import React, { Component } from 'react';
import './App.css';
import Launch from './Launch';
import Rocket from "./Rocket";
import Location from "./Location";
import Agency from "./Agency";

function compare(a,b) {
  if (a.isonet < b.isonet)
    return 1;
  if (a.isonet > b.isonet)
    return -1;
  return 0;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: props.client,
      data: []
    };
    this.views = {
      "events": this.renderEvent.bind(this),
      "rocket": this.renderRocket.bind(this),
      "location": this.renderLocation.bind(this),
      "agency": this.renderAgency.bind(this)
    }

    this.queries = {
      'events': (id) => this.state.client.getLaunches(),
      "rocket": (id) => this.state.client.getRockets(id),
      "location": (id) => this.state.client.getLocations(id),
      "agency": (id) => this.state.client.getAgencies(id),
    }
    this.changeView("events", undefined)
  }

  changeView(page, id){
    console.log("changeView")
    this.queries[page](id).then(data => {
      data.sort(compare)
      this.setState(state => {
        state.data = data
        state.selectId = id
        state.selectPage = page
        return state
      })  
    })
    
  }

  renderEvent(){
    this.state.data.reverse()
    const launches = this.state.data.map((launch, i) => 
      <Launch 
        key={launch['id']} 
        data={launch} 
        onRocket={(id) => {this.changeView("rocket", id)}}
        onLocation={(id) => {this.changeView("location", id)}}
        onAgency={(id) => {this.changeView("agency", id)}}/>
    );
    return (
      <div>
      <div className="launches">
        {launches}
      </div>
      </div>
    );
  }

  renderRocket(){
    const rockets = this.state.data.map((rocket, i) => 
      <Rocket 
        key={rocket["id"]} 
        data={rocket} 
        onRocket={(id) => {this.changeView("rocket", id)}}
        onLocation={(id) => {this.changeView("location", id)}}
        onAgency={(id) => {this.changeView("agency", id)}}/>
    );

    return (
      <div>
      <a href="#/" onClick={() => this.changeView("events", undefined)}>Home</a>
      <div className="rockets">
        {rockets}
      </div>
      </div>
    );
  }

  renderLocation(){
    const locations = this.state.data.map((location, i) => 
      <Location 
        key={location["id"]} 
        data={location} 
        onRocket={(id) => {this.changeView("rocket", id)}}
        onAgency={(id) => {this.changeView("agency", id)}}/>
    );

    return (
      <div>
      <a href="#/" onClick={() => this.changeView("events", undefined)}>Home</a>
      <div className="locations">
        {locations}
      </div>
      </div>
    );
  }

  renderAgency(){
    const agencies = this.state.data.map((agency, i) => 
      <Agency 
        key={agency["id"]} 
        data={agency} 
        onRocket={(id) => {this.changeView("rocket", id)}}
        onLocation={(id) => {this.changeView("location", id)}}/>
    );

    return (
      <div>
      <a href="#/" onClick={() => this.changeView("events", undefined)}>Home</a>
      <div className="agencies">
        {agencies}
      </div>
      </div>
    );
  }

  render() {
    if (this.state.selectPage)
      return this.views[this.state.selectPage]()
    return (
      <h1>Loading</h1>
      )
  }
}

export default App;
