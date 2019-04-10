
export default class LocalClient {
  constructor(raw){
    this.rawData = raw
  }

  async getLaunches(){
    return this.rawData.launches
  }

  async getRockets(family){
    return this.rawData.rockets
  }

  async getAgencies(id){
    return this.rawData.launches
  }

  async getLocations(id){
    return this.rawData.launches
  }
}

