import React, {Component} from 'react';
import {StepOne} from './StepOne';
import {StepTwo} from './StepTwo';
import {StepThree} from './StepThree';

const steps =
    [
      {name: 'StepOne', component: <StepOne/>},
      {name: 'StepTwo', component: <StepTwo/>},
      {name: 'StepThree', component: <StepThree/>}
    ]

export { steps }
