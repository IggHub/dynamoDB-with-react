import React, {Component} from 'react';

class StepTwo extends Component {
  render(){
    return (
      <div className="container">
        <div>
          <label>Family Name</label>
          <input name="family_name" onChange={this.props.handleSignup} type="email" />
        </div>
        <div>
          <label>Family Member Name:</label>
          <input name="family_member_name" onChange={this.props.handleSignup} type="text" />
        </div>
        <div>
          <label>Phone</label>
          <input name="family_member_phone" onChange={this.props.handleSignup} type="text" />
        </div>
      </div>
    )
  }
}

export default StepTwo;
