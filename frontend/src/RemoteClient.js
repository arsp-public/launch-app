
export default class RemoteClient {
  constructor(dynamodb, table){
    this.dynamodb = dynamodb 
    this.table = table
  }

  async _query(params){
    return new Promise((resolve, reject) => {
     this.dynamodb.query(params, function(err, data) {
       if (err) {
         reject(err);
      } else{
          var clean = []
          for (var i = data.Items.length - 1; i >= 0; i--) {
            let obj = {}
            let keys = Object.keys(data.Items[i])
            
            for (var j = keys.length - 1; j >= 0; j--) {
              obj[keys[j].replace(/-/g, '.')] = data.Items[i][keys[j]]['S']
            }
            clean.push(obj)
          }
          console.log(clean)
           resolve(clean);  
         }
       })  
    })
  }

  async getLaunches(){
    var params = {
          TableName: this.table,
          KeyConditionExpression: "hot=:hot",
          ExpressionAttributeValues: {
            ":hot": {"S":"yes"}
          }
       };
    return await this._query(params)    
  }

  async getRockets(family){
    console.log(family)
    var params = {
          TableName: this.table,
          IndexName:"rocketIndex",
          KeyConditionExpression: "#fn = :f",
          ExpressionAttributeNames:{
              "#fn":"rocket-familyname"
          },  
          ExpressionAttributeValues: {
            ":f": {"S":family}
          }
       };
    return await this._query(params) 
  }

  async getAgencies(agency){
    var params = {
          TableName: this.table,
          IndexName:"lspIndex",
          KeyConditionExpression: "#agency = :a",
          ExpressionAttributeNames:{
              "#agency":"lsp-name"
          },  
          ExpressionAttributeValues: {
            ":a": {"S":agency}
          }
       };
    return await this._query(params)
  }

  async getLocations(location){
    var params = {
          TableName: this.table,
          IndexName:"locationIndex",
          KeyConditionExpression: "#location = :l",
          ExpressionAttributeNames:{
              "#location":"location-name"
          },  
          ExpressionAttributeValues: {
            ":l": {"S":location}
          }
       };
    return await this._query(params)
  }
}

