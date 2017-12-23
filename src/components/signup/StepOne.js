import React, {Component} from 'react';

class StepOne extends Component {
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="six columns">
            <label>Email</label>
            <input name="email" onChange={this.props.handleSignup} className="u-full-width" type="email" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>User Name</label>
            <input name="username" onChange={this.props.handleSignup} className="u-full-width" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>Password</label>
            <input name="password" onChange={this.props.handleSignup} type="password" />
          </div>
        </div>
      </div>
    )
  }
}

export default StepOne;
