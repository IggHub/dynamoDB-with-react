import React, {Component} from 'react';

class StepOne extends Component {
  render(){
    return (
      <div>
        <div className="row">
          <div className="six columns">
            <label>Email</label>
            <input className="u-full-width" type="email" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>User Name</label>
            <input className="u-full-width" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label>Password</label>
            <input type="password" />
          </div>
        </div>
      </div>
    )
  }
}

export {StepOne}
