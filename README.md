# Launcher App

## Backend

As there isn't much of a requirement for secured transactions. We can skip the backend and connect directly to services such as DynamoDB, since we have granular control over what users are allowed to see. 

### Create AWS Resources
For this we will need:

* Cognito Identity Pool
* Anonimous user Role
* Dynamodb table

#### Dependencies

* Python >=3.6 [Tested on 3.7]
* AWS CLI configured with access to *Cloudformation* and *DynamoDB*

#### Creation
Open Terminal/CMD and navigate to the backend folder

```
aws cloudformation create-stack --stack-name NAME --template-body file://cloudformation.yml --capabilities CAPABILITY_IAM
```
Wait for it to complete
```
aws cloudformation wait stack-create-complete --stack-name NAME
```
Get the Identity Pool Id and the Table name
```
aws cloudformation describe-stacks --stack-name NAME
```
this command with result in
```
{
    "Stacks": [
        {
            ...
            "Outputs": [
                {
                    "Description": "The Cognito Identity Pool ID",
                    "OutputKey": "CognitoIdentityPoolID",
                    "OutputValue": "ARN"
                },
                {
                    "Description": "DynamoDB Table",
                    "OutputKey": "LaunchesDb",
                    "OutputValue": "TABLE-NAME"
                }
            ],
            ...
        }
    ]
}
```

We need to copy the DynamoDB table name into

*  frontend/config.js
*  backend/config.py

and the Identity Pool Id into

*  frontend/config.js

### Load Launch Library Data | Optional

Install requests library
```
python -m pip install requests
```
This command will download ALL the history and the next 4 launches and upload it to DynamoDB

```
python backend/launchlib.py
```

*Note*: You can modify the file to change how many history events you want to download

```
if __name__ == '__main__':
  data = download(5, future=True)
  for item in data:
    item['hot'] = "yes"
  upload(data)

  data = download(999999) <---- HERE
  for item in data:
    item['hot'] = f"no-{str(uuid4())}"
  upload(data)
```


## Front-End
I decided to go with React because most of my friends have been recommeding it and I though of this assesment as good opportunity to learn it. Yes, this is my first React project

### Depencies

* npm

Navigate to frontend and install depencies

```
npm install 
```

### Local
Make sure that `frontend/config.js` file has `local: true` and run 
```
npm run-script
```

### Remote
Make sure that `frontend/config.js` file has `local: false` and run 
```
npm run-script
```
## Summary
### Features
The App is optimized to query base on:

* Hot: comming soon events
* Rocket Family: past events from this family of rockets
* Location: past events from location
* Agency: past events from agency

The solution is able to be tested offline

### Security
*Anonymous* users are ONLY allowed to `query` on the specific DynamoDB table + indexes. Users are not allowed `scan` since this could potentially increase the cost 


### Cost 
The great advange is pay-per-use.   

*READ*  

* $0.25 per million read request units  

*WRITE*  
Since we have the main table + 3 indexes, everytime you write into the main table the index will copy this data, you pay 4 times the write requests

*  $1.25 per [million/4]=250.000 write request units

*STORAGE*  
Since we have the main table + 3 indexes, everytime you write into the main table the index will copy some data.

* $0.25 per GB-month in main table
* $0.25 per GB-month in indexes


### Performance
DynamoDB is optimized with indexing which results in requests latency is <100ms 

### Deployment
Since the solutions is leveraging *CloudFormation* for infrastructure as code. I makes it simple to have multiple environments

### Future improvements
* Create a Lambda function with a schedule task using *CloudWatch* to update DynamoDB with new Launch events if any
* Test each React component
* Paging for big query results

### Why Flatter the Events?
This was a quick solution to be able to index nexted object like *Location.name*

## Clean Up
Delete the CloudFormation stack
```
aws cloudformation delete-stack --stack-name NAME
```