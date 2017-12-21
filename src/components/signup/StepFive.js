import React, {Component} from 'react';

class StepFive extends Component {
  render(){
    return (
      <div>
        <p>Before you can start using Family Locator, please verify your email address</p>

        <p>If you did not receive the confirmation email, please email us at familyLocatorAdmin@familylocator.com</p>
        <button className="button">Verify Account</button>
      </div>
    )
  }
}

export {StepFive}
