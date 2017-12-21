import React, {Component} from 'react';
import {StepOne} from './StepOne';
import {StepTwo} from './StepTwo';
import {StepThree} from './StepThree';
import {StepFour} from './StepFour';
import {StepFive} from './StepFive';

const steps =
    [
      {name: 'StepOne', component: <StepOne/>},
      {name: 'StepTwo', component: <StepTwo/>},
      {name: 'StepThree', component: <StepThree/>},
      {name: 'StepFour', component: <StepFour/>},
      {name: 'StepFive', component: <StepFive/>}
    ]

export { steps }
