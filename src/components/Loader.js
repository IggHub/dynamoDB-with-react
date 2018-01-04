import React, {Component} from 'react';
import { PulseLoader } from 'react-spinners';

const Loader = () => (
  <div className="loader">
    <PulseLoader
       color={'green'}
       loading={true}
       size={15}
     />
   <div>Checking your address...</div>
  </div>
)

export default Loader;
