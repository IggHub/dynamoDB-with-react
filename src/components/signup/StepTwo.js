import React, {Component} from 'react';

class StepTwo extends Component {
  render(){
    return (
      <div className="container">
        <div>
          <label>Family Name</label>
          <input onChange={this.props.handleFamilyName} type="email" />
        </div>
        <div>
          <label>Family Member</label>
          <input onChange={this.props.handleFamilyMemberName} type="text" />
        </div>
        <div>
          <label>Phone</label>
          <input onChange={this.props.handleFamilyMemberPhone} type="text" />
        </div>
      </div>
    )
  }
}

export default StepTwo;
