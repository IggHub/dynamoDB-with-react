import React, {Component} from 'react';

class StepTwo extends Component {
  render(){
    return (
      <div>
        <div>
          <label>Family Name</label>
          <input type="email" />
        </div>
        <div>
          <label>Family Member</label>
          <input type="text" />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" />
        </div>
      </div>
    )
  }
}

export {StepTwo}
