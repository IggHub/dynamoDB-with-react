import React, {Component} from 'react';

class StepTwo extends Component {
  render(){
    const hideStep = this.props.currentStepNo === 1 ? {} : {display: 'none'}
    return (
      <div className="container" style={hideStep}>
        <div>
          <label>Family Name</label>
          <input value={this.props.family_name} name="family_name" onChange={this.props.handleSignup} type="email" />
        </div>
        <div>
          <label>Family Member Name:</label>
          <input value={this.props.family_member_name} name="family_member_name" onChange={this.props.handleSignup} type="text" />
        </div>
        <div>
          <label>Phone</label>
          <input value={this.props.family_member_phone} name="family_member_phone" onChange={this.props.handleSignup} type="text" />
        </div>
      </div>
    )
  }
}

export default StepTwo;
