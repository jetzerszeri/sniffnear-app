import { useState } from 'react';

export const useMultiSteps = ( totalSteps = 2 ) => {

    const [currentStep, setCurrentStep] = useState(1)

    const nextStep = () => {
        if (currentStep < totalSteps){
            setCurrentStep( currentStep + 1 )
        }
    }

    const prevStep = () => {
        if (currentStep > 1){
            setCurrentStep( currentStep - 1 )
        }
    }

    return {
        currentStep,
        totalSteps,
        nextStep,
        prevStep
    }
}