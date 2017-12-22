import React, {Component} from 'react';

class StepThree extends Component {
  render(){
    return (
      <div className="container">
        <div>
          <label>Location Name</label>
          <input onChange={this.props.handleLabeledLocationName} type="text" />
        </div>
        <div>
          <label>Location Address</label>
          <input onChange={this.props.handleLabeledLocationAddress} type="text" />
        </div>
        <div>
          <label>Radius</label>
          <input onChange={this.props.handleLabeledLocationRadius} type="text" />
        </div>
      </div>
    )
  }
}

export default StepThree;
