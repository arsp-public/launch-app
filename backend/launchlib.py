import requests, json
import boto3
from decimal import Decimal
from datetime import datetime
from uuid import uuid4

def remove_empty(original):
  for k,v in original.copy().items():
    if v is None or len(v) == 0:
      del original[k]
  return original

def parse_array(original):
  """
    flatter array using '-'. For example 
    {
      'field':['hello', 'world']
    }

    would be transform into
    {
      "child-0": "hello",
      "child-1": "world",
    }
  """
  for k,v in original.copy().items():
    if type(v) == list:
      for i in range(len(v)):
        original[f"{k}-{i}"] = v[i] 
      del original[k]
  return original

def parse_number(original):
  """
  transform int and float to Decimal 
  """
  for k,v in original.items():
    if type(v) in [float, int]:
      original[k] = str(v)
  return original

def parse_dict(original):
  """
    flatter children dicts and arrays using '-'. For example 
    {
      "child": {
        field: "my data"
      }
    }

    would be transform into
    {
      "child-field": "my data"
    }
  """
  original = parse_array(original)
  new_children = False
  for k,v in original.copy().items():
    if type(v) == dict:
      v = parse_array(v)
      for child_k, child_v in v.items():
        new_id = f"{k}-{child_k}"
        if type(child_v) is dict:
          new_children = True
        original[new_id] = child_v
      del original[k]

  if new_children:
    original = parse_dict(original.copy())
  return original

def upload(data):
  import config
  dynamodb = boto3.resource("dynamodb", region_name=config.region)
  table = dynamodb.Table(config.table_name)
  for item in data:
    item = parse_number(item)
    item = remove_empty(item)
    table.put_item(Item=item)
    
def download(limit, future=False):
  if future:
    resp = requests.get(f"https://launchlibrary.net/1.4/launch?next={limit}&mode=verbose")
  else:
    enddate = datetime.now().strftime('%Y-%m-%d')    
    resp = requests.get(f"https://launchlibrary.net/1.4/launch?limit={limit}&mode=verbose&startdate=1200-01-01&enddate={enddate}")
  return list(map(parse_dict, resp.json()["launches"]))
  
if __name__ == '__main__':
  data = download(10, future=True)
  for item in data:
    item['hot'] = "yes"
  upload(data)

  data = download(999999)
  for item in data:
    item['hot'] = f"no-{str(uuid4())}"
  upload(data)
  