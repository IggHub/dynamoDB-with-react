import React, {Component} from 'react';

class StepThree extends Component {
  render(){
    return (
      <div className="container">
        <div>
          <label>Location Name</label>
          <input name="labeled_location_name" onChange={this.props.handleSignup} type="text" />
        </div>
        <div>
          <label>Location Address</label>
          <input name="labeled_location_address" onChange={this.props.handleSignup} type="text" />
        </div>
        <div>
          <label>Radius</label>
          <input name="labeled_location_radius" onChange={this.props.handleSignup} type="text" />
        </div>
      </div>
    )
  }
}

export default StepThree;
