import React, { Component } from 'react';
//import Login from './components/Login';
import './App.css';
import AWS from 'aws-sdk';

const AWS_REGION = 'us-west-1';
//const END_POINT = 'http://localhost:8000';
const END_POINT_WEB = 'dynamodb.us-west-1.amazonaws.com';
//const ACCESS_KEY_ID = 'fakeMyKeyId';
const ACCESS_KEY_ID_WEB = 'your_key_id_here';
//const SECRET_ACCESS_KEY = 'fakeSecretAccessKey';
const SECRET_ACCESS_KEY_WEB = 'your_secret_access_key_here';
const TABLE_NAME = "Donuts";

AWS.config.update({
  region: AWS_REGION,
  endpoint: END_POINT_WEB,
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  accessKeyId: ACCESS_KEY_ID_WEB,
  // secretAccessKey default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  secretAccessKey: SECRET_ACCESS_KEY_WEB
});


const docClient = new AWS.DynamoDB.DocumentClient();


class App extends Component {
  constructor(){
    super();
    this.state = {
      flavor: ''
    }
    this.createItem = this.createItem.bind(this);
    this.readItem = this.readItem.bind(this);
    this.readAllItems = this.readAllItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleFlavor = this.handleFlavor.bind(this);
  }

  createItem(e) {
    e.preventDefault();
    const table = TABLE_NAME;
    const flavor = this.state.flavor;
    var params = {
        TableName : table,
        Item:{
            "Flavor": flavor,
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.log("Unable to add item: \n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("PutItem succeeded: \n" + JSON.stringify(data, undefined, 2));
        }
    });
    this.setState({
      flavor: ''
    });
  }

  readItem(e) {
    e.preventDefault();
    const table = TABLE_NAME;
    const flavor = this.state.flavor;

    const params = {
        TableName: table,
        Key:{
            "Flavor": flavor
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.log("Unable to read item: \n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("GetItem succeeded: \n" + JSON.stringify(data, undefined, 2));
        }
    });
    this.setState({
      flavor: ''
    });
  }

  readAllItems(e){
    e.preventDefault();
    const table = TABLE_NAME;

    const params = {
      TableName: table,
      ProjectionExpression: 'flavor'
    }

    docClient.scan(params, function(err, data){
      if (err) {
          console.log("Unable to read item: \n" + JSON.stringify(err, undefined, 2));
      } else {
        const items = data.Items;
        for(let i = 0; i < items.length; i++){
          console.log(items[i])
        }
      }
    })
  }

  deleteItem(e) {
    e.preventDefault();
    const table = TABLE_NAME;
    const flavor = this.state.flavor;

    var params = {
        TableName: table,
        Key:{
            "Flavor": flavor
        },
    };

    docClient.delete(params, function(err, data) {
        if (err) {
            console.log("The conditional delete failed: \n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("The conditional delete succeeded: \n" + JSON.stringify(data, undefined, 2));
        }
    });
    this.setState({
      flavor: ''
    });
  }

  handleFlavor(e){
    this.setState({
      flavor: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <form>
          <input onChange={(e) => this.handleFlavor(e)} value={this.state.flavor} type="text" />
          <button type="submit" onClick={this.createItem}>Create item</button>
          <button type="submit" onClick={this.readItem}>Read item</button>
          <button type="submit" onClick={this.readAllItems}>Display All</button>
          <button type="submit" onClick={this.deleteItem}>Delete</button>
        </form>
      </div>
    );
  }
}

export default App;
