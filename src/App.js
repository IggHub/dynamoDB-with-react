import React, { Component } from 'react';
//import Login from './components/Login';
import DynamoDBQuery from './components/DynamoDBQuery';
//import './App.css';
import AWS from 'aws-sdk';
import StepOne from './components/signup/StepOne';
import StepTwo from './components/signup/StepTwo';
import StepThree from './components/signup/StepThree';
import StepFour from './components/signup/StepFour';
import StepFive from './components/signup/StepFive';

/**
* react-multistep
* https://github.com/srdjan/react-multistep
**/
//import {steps} from './components/signup';
//import Multistep from './multistep';



const AWS_REGION = 'us-west-1';
const ACCESS_KEY_ID_WEB = '';
const SECRET_ACCESS_KEY_WEB = '';
const TABLE_NAME = "FamilyLocator";
const END_POINT_WEB = 'dynamodb.us-west-1.amazonaws.com';
//const END_POINT = 'http://localhost:8000';

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
      email: '',
      user_name: '',
      password: '',
      circle_name: '',
      member_name: '',
      member_phone_number: '',
      labeled_location_name: '',
      labeled_location_radius: '',
      labeled_location_address: ''
    }
    this.createItem = this.createItem.bind(this);
    this.readItem = this.readItem.bind(this);
    this.readAllItems = this.readAllItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.handleEmail = this.handleEmail.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLabeledLocationName = this.handleLabeledLocationName.bind(this);
    this.handleLabeledLocationRadius = this.handleLabeledLocationRadius.bind(this);
    this.handleLabeledLocationAddress = this.handleLabeledLocationAddress.bind(this);
    this.handleFamilyName = this.handleFamilyName.bind(this);
    this.handleFamilyMemberName = this.handleFamilyMemberName.bind(this);
    this.handleFamilyMemberPhone = this.handleFamilyMemberPhone.bind(this);
  }

  sayHello(){
    console.log("Hello!");
  }

  createItem(e) {
    e.preventDefault();
    const table = TABLE_NAME;
    const circle_name = this.state.circle_name;
    const member_name = this.state.member_name;
    const member_phone_number = this.state.member_phone_number;
    const labeled_location_name = this.state.labeled_location_name;
    const labeled_location_address = this.state.labeled_location_address;
    const labeled_location_radius = this.state.labeled_location_radius;
    const email = this.state.email;
    const mapAttr = {
      "circle_name": circle_name,
      "members": [
        {'name': member_name, 'phone_number': member_phone_number}
      ],
      "labeled_location": [
        {'name': labeled_location_name, 'radius': labeled_location_radius, 'address': labeled_location_address}
      ]
    }

    var params = {
        TableName : table,
        Item:{
            "email": email,
            "mapAttr": mapAttr
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
      ProjectionExpression: 'mapAttr'
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

  /**
  * Need to finish this universal-handler.
  * Todo:
  * Rename the states and add appropriate html name attributes
  **/
  handleSignup(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFamilyName(e){
    this.setState({
      circle_name: e.target.value
    })
  }

  handleFamilyMemberName(e){
    this.setState({
      member_name: e.target.value
    })
  }

  handleFamilyMemberPhone(e){
    this.setState({
      member_phone_number: e.target.value
    })
  }

  handleEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  handleUserName(e){
    this.setState({
      user_name: e.target.value
    })
  }

  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  handleLabeledLocationName(e){
    this.setState({
      labeled_location_name: e.target.value
    })
  }

  handleLabeledLocationRadius(e){
    this.setState({
      labeled_location_radius: e.target.value
    })
  }

  handleLabeledLocationAddress(e){
    this.setState({
      labeled_location_address: e.target.value
    })
  }



  render() {
    const STEPS = [<StepOne />, <StepTwo />, <StepThree /> ]
    return (
      <div>
        {/*}<DynamoDBQuery handleFlavor={this.handleFlavor} flavor={this.state.flavor} createItem={this.createItem} readItem={this.readItem} readAllItems={this.readAllItems} deleteItem={this.deleteItem} />{*/}
        {/*}<Multistep initialStep={1} steps={steps} sayHello={this.sayHello} />{*/}
        <StepOne handleEmail={this.handleEmail} handlePassword={this.handlePassword} handleUserName={this.handleUserName} />
        <StepTwo handleFamilyName={this.handleFamilyName} handleFamilyMemberName={this.handleFamilyMemberName} handleFamilyMemberPhone={this.handleFamilyMemberPhone} />
        <StepThree handleLabeledLocationName={this.handleLabeledLocationName} handleLabeledLocationAddress={this.handleLabeledLocationAddress} handleLabeledLocationRadius={this.handleLabeledLocationRadius} />
        <StepFour />
        <StepFive />
        <button onClick={this.readAllItems}>Read all items</button>
        <button onClick={this.createItem}>Send to DynamoDB</button>
      </div>
    );
  }
}

export default App;
