import config from "./config";
import LocalClient from "./LocalClient"
import RemoteClient from "./RemoteClient"
import localData from "./localData"
import AWS from 'aws-sdk';

function createClient(){
  if (config.local){
    return new LocalClient(localData);
  }
  AWS.config.region = 'us-west-2'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.cognitoId
  });
  let dynamodb = new AWS.DynamoDB()
  return new RemoteClient(dynamodb, config.dynamoTable);
}

export default {
  create: createClient
}
