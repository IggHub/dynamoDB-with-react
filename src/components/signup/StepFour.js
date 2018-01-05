import React, {Component} from 'react';

class StepFour extends Component {
  render(){
    const hideStep = this.props.currentStepNo === 3 ? {} : {display: 'none'}
    return (
      <div className="container" style={hideStep}>
        <p>By clicking "accept" I agree that:</p>
        <ul>
          <li>I have read and accepted <a href="#">User Agreement</a></li>
          <li>I have read and accepted <a href="#">Privacy Policy</a></li>
          <li>I am at least 18 years old</li>
        </ul>
        <label>
          <input type="checkbox" />
          <span className="accept">Accept</span>
        </label>
      </div>
    )
  }
}

export default StepFour;
