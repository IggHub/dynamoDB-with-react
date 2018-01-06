import React, {Component} from 'react';

class StepFive extends Component {
  render(){
    const hideStep = this.props.currentStepNo === 4 ? {} : {display: 'none'}
    return (
      <div className="container" style={hideStep}>
        <p>Before you can start using Family Locator, please verify your email address</p>

        <p>If you did not receive the confirmation email, please email us at familyLocatorAdmin@familylocator.com</p>
        {/*}redirect to amazon alexxa{*/}
        <button className="button" onClick={() => console.log(this.props.redirect_uri)}>Verify Account</button>

      </div>
    )
  }
}

export default StepFive;
