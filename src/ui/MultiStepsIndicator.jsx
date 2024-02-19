import React from 'react';
import { StepIndicatorIcon } from './customIcons';

export const MultiStepsIndicator = ( { total, current }) => {
  return (
    <div className='multiStepsIndicators'>
        {[...Array(total).keys()].map((step, index) => (
            <StepIndicatorIcon key={index} active={ current >= index + 1 } />
        ))}
    </div>
  )
}
