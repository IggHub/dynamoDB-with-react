import React, {Component} from 'react';

class StepOne extends Component {
  render(){
    return (
      <div>
        <div>
          <label>First Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" />
        </div>
      </div>
    )
  }
}

export {StepOne}
