import React, {Component} from 'react';

class StepThree extends Component {
  render(){
    const hideStep = this.props.currentStepNo === 2 ? {} : {display: 'none'}
    return (
      <div className="container" style={hideStep}>
        <div>
          <label>Location Name</label>
          <input value={this.props.labeled_location_name} name="labeled_location_name" onChange={this.props.handleSignup} type="text" />
        </div>
        <div>
          <label>Location Address</label>
          <input value={this.props.labeled_location_address} onBlur={this.props.getGoogleMapInfo} name="labeled_location_address" onChange={this.props.handleSignup} type="text" />
        </div>
        <div>
          <label>Radius (m)</label>
          <input value={this.props.labeled_location_radius} name="labeled_location_radius" onChange={this.props.handleSignup} type="text" />
        </div>
      </div>
    )
  }
}

export default StepThree;
