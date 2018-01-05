import React, {Component} from 'react';

class StepOne extends Component {
  render(){
    const hideStep = this.props.currentStepNo === 0 ? {} : {display: 'none'}
    return (
      <div className="container" style={hideStep}>
        <div className="row">
          <div className="six columns">
            <label>Email</label>
            <input value={this.props.email} name="email" onChange={this.props.handleSignup} type="email" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>User Name</label>
            <input value={this.props.username} name="username" onChange={this.props.handleSignup} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>Password</label>
            <input value={this.props.password} name="password" onChange={this.props.handleSignup} type="password" />
          </div>
        </div>
      </div>
    )
  }
}

export default StepOne;
