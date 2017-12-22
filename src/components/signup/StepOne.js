import React, {Component} from 'react';

class StepOne extends Component {
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="six columns">
            <label>Email</label>
            <input onChange={this.props.handleEmail} className="u-full-width" type="email" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>User Name</label>
            <input onChange={this.props.handleUserName} className="u-full-width" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>Password</label>
            <input onChange={this.props.handlePassword} type="password" />
          </div>
        </div>
      </div>
    )
  }
}

export default StepOne;
