import React, { Component } from 'react';

import Utils from './utils';

import AWS from 'aws-sdk';
import axios from 'axios';

import StepOne from './components/signup/StepOne';
import StepTwo from './components/signup/StepTwo';
import StepThree from './components/signup/StepThree';
import StepFour from './components/signup/StepFour';
import StepFive from './components/signup/StepFive';

import Loader from './components/Loader';

const AWS_REGION = 'us-west-1';
const ACCESS_KEY_ID_WEB = '';
//const SECRET_ACCESS_KEY = 'fakeSecretAccessKey';
const SECRET_ACCESS_KEY_WEB = '';
const TABLE_NAME = "FamilyLocator";
const END_POINT_WEB = 'dynamodb.us-west-1.amazonaws.com';
//const END_POINT = 'http://localhost:8000';
const GOOGLE_MAP_API_KEY = 'AIzaSyDXvd_bHxeKdRyHArFe6Q-nWbvZ5F_lS4s';

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
      /*navigating to different form step*/
      showPrevButton: false,
      showNextButton: true,
      currentStepNo: 0,

      /*form-related states*/
      email: '',
      username: '',
      password: '',
      family_name: '',
      family_member_name: '',
      family_member_synonym: '',
      family_member_phone: '',
      labeled_location_name: '',
      labeled_location_radius: '',
      labeled_location_address: '',
      labeled_location_latitude: '',
      labeled_location_longitude: '',

      /* query strings params */
      params_state: '',
      params_client_id: '',
      params_scope: '',
      params_response_type: '',
      params_redirect_uri: '',

      /* google map loading */
      isGeocoding: false
    }

    /* disable previous/next button */
    this.disableButton = {
      pointerEvents: 'none',
      cursor: 'default',
      color: '#eee'
    };

    this.stepsLength = 5;

    this.getGoogleMapInfo = this.getGoogleMapInfo.bind(this);
    //this.createItem = this.createItem.bind(this);
    //this.readItem = this.readItem.bind(this);
    //this.readAllItems = this.readAllItems.bind(this);
    //this.deleteItem = this.deleteItem.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.showObject = this.showObject.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.setStateQueryStringsParams = this.setStateQueryStringsParams.bind(this);
  }

  componentDidMount(){
    this.setStateQueryStringsParams();
  }

  setStateQueryStringsParams(){
    const paramsObj = Utils.QueryStringParser();
    if(paramsObj){
      this.setState({
        params_state: paramsObj.state,
        params_client_id: paramsObj.client_id,
        params_scope: paramsObj.scope,
        params_response_type: paramsObj.response_type,
        params_redirect_uri: paramsObj.redirect_uri
      })
    }
  }

  sayHello(){
    console.log("Hello!");
  }

  createItem(e) {
    e.preventDefault();
    const table = TABLE_NAME;
    const family_name = this.state.family_name;
    const family_member_name = this.state.family_member_name;
    const family_member_synonym = this.state.family_member_synonym
    const family_member_phone = this.state.family_member_phone;
    const labeled_location_name = this.state.labeled_location_name;
    const labeled_location_address = this.state.labeled_location_address;
    const labeled_location_latitude = this.state.labeled_location_latitude;
    const labeled_location_longitude = this.state.labeled_location_longitude;
    const labeled_location_radius = this.state.labeled_location_radius;
    const email = this.state.email;
    const username = this.state.username;
    const verification_string = Utils.RandomPinGenerator();
    const mapAttr = {
      "first_use_timestamp": Utils.UnixTimeStamp(),
      "use_count": 1,
      "circle_name": family_name,
      "members": [
        {
          'name': family_member_name,
          'synonyms': [
            family_member_synonym
          ],
          'phone_number': family_member_phone,
          'verification_string': verification_string
        }
      ],
      "labeled_location": [
        {
          "name": labeled_location_name,
          "radius": labeled_location_radius,
          "address": labeled_location_address,
          "latitude": labeled_location_latitude,
          "longitude": labeled_location_longitude,
          "timestamp": Utils.UnixTimeStamp()
        }
      ]
    }

    var params = {
        TableName : table,
        Item:{
            "username": username,
            "email": email,
            "mapAttr": mapAttr,
            "uuid": Utils.GenerateUUID()
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.log("Unable to add item: \n" + JSON.stringify(err, undefined, 2));
        } else {
            console.log("PutItem succeeded: \n" + JSON.stringify(data, undefined, 2));
        }
    });

  }
  /**
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

  **/
  /**
  * handles any signup input
  * element name needs to match name
  **/
  handleSignup(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  previous(){
    const currentStepNo = this.state.currentStepNo;
    if(currentStepNo === 1){
      this.setState({
        currentStepNo: currentStepNo - 1,
        showPrevButton: false
      })
    } else {
      this.setState({
        currentStepNo: currentStepNo - 1,
        showNextButton: true
      })
    }
  }

  next(){
    const currentStepNo = this.state.currentStepNo;
    const stepsLength = this.stepsLength;
    if(currentStepNo === stepsLength - 2){
      this.setState({
        currentStepNo: currentStepNo + 1,
        showNextButton: false
      })
    } else {
      this.setState({
        currentStepNo: currentStepNo + 1,
        showPrevButton: true
      })
    }
  }

  showObject(e){
    e.preventDefault();
    const table = TABLE_NAME;
    const family_name = this.state.family_name;
    const family_member_name = this.state.family_member_name;
    const family_member_phone = this.state.family_member_phone;
    const labeled_location_name = this.state.labeled_location_name;
    const labeled_location_address = this.state.labeled_location_address;
    const labeled_location_radius = this.state.labeled_location_radius;
    const labeled_location_latitude = this.state.labeled_location_latitude;
    const labeled_location_longitude = this.state.labeled_location_longitude;
    const email = this.state.email;
    const username = this.state.username;
    const verification_string = Utils.RandomPinGenerator();
    const mapAttr = {
      "first_use_timestamp": Utils.UnixTimeStamp(),
      "use_count": 1,
      "circle_name": family_name,
      "members": [
        {
          'name': family_member_name,
          'phone_number': family_member_phone,
          'verification_string': verification_string,
        }
      ],
      "labeled_location": [
        {
          'name': labeled_location_name,
          'radius': labeled_location_radius,
          'address': labeled_location_address,
          'latitude': labeled_location_latitude,
          'longitude': labeled_location_longitude
        }
      ]
    }

    var params = {
        TableName : table,
        Item:{
            "username": username,
            "email": email,
            "mapAttr": mapAttr
        }
    };
    console.log(params);
  }

  getGoogleMapInfo(){
    const that = this;
    this.setState({isGeocoding: true})
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.labeled_location_address + '&key=' + GOOGLE_MAP_API_KEY)
      .then(function(response){
        console.log(response.data.results[0].geometry.location);
        const lat = response.data.results[0].geometry.location.lat;
        const long = response.data.results[0].geometry.location.lng;
        that.setState({
          isGeocoding: false,
          labeled_location_latitude: lat,
          labeled_location_longitude: long
        });
      })
      .catch(function (error) {
        console.log("address is missing/ incorrect");
        console.log(error);
        that.setState({
          isGeocoding: false
        })
      });
  }

  render() {
    let isGeocoding = this.state.isGeocoding ? <Loader /> : <div></div>
    let redirect_uri = this.state.params_redirect_uri ? this.state.params_redirect_uri : ''
    let stepTrackerArray = [];
    for(let i = 0; i < this.stepsLength; i++){
      stepTrackerArray.push(i + 1)
    }

    return (
      <div className="hero-container">

        {/* top progress bar */}
        <div className="progress-bar-container">
          <ul className="progress-bar">
            {stepTrackerArray.map((stepNo, index) => {
              return <li key={index} className={this.state.currentStepNo < index ? "" : "active"}>Step {stepNo}</li>
            })}
          </ul>
        </div>

        {/*container for forms*/}
        <div className="container">

          {/* sign up steps */}
          <StepOne handleSignup={this.handleSignup} email={this.state.email} username={this.state.username} password={this.state.password} currentStepNo={this.state.currentStepNo}/>
          <StepTwo handleSignup={this.handleSignup} family_name={this.state.family_name} family_member_name={this.state.family_member_name} family_member_synonym={this.state.family_member_synonym} family_member_phone={this.state.family_member_phone} currentStepNo={this.state.currentStepNo} />
          <StepThree handleSignup={this.handleSignup} getGoogleMapInfo={this.getGoogleMapInfo} labeled_location_name={this.state.labeled_location_name} labeled_location_address={this.state.labeled_location_address} labeled_location_radius={this.state.labeled_location_radius} currentStepNo={this.state.currentStepNo} />
          <StepFour currentStepNo={this.state.currentStepNo} />
          <StepFive currentStepNo={this.state.currentStepNo} redirect_uri={redirect_uri}/>

          <div>
            <button style={this.state.showPrevButton ? {} : this.disableButton}
              onClick={this.previous}>
              Previous
            </button>
            <button style={this.state.showNextButton ? {} : this.disableButton}
              onClick={this.next}>
              Next
            </button>

            <button onClick={this.getGoogleMapInfo}>Check map info</button>
            <button onClick={() => Utils.QueryStringParser()}>Params</button>
            <button onClick={() => Utils.GenerateUUID()}>UUID</button>
            <button onClick={() => Utils.UnixTimeStamp()}>Time Stamp</button>
            <button onClick={this.showObject}>Show JSON object</button>
            <button onClick={this.createItem}>Send to DynamoDB table</button>
          </div>
        </div>

        {/* geocoding loading */}
        {isGeocoding}

      </div>
    );
  }
}

export default App;
