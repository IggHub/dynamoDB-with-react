import React, {Component} from 'react';

class StepThree extends Component {
  render(){
    return (
      <div>
        <div>
          <label>Location Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Location</label>
          <input type="text" />
        </div>
        <div>
          <label>Radius</label>
          <input type="text" />
        </div>
      </div>
    )
  }
}

export {StepThree}
