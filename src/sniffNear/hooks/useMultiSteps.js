import { useEffect, useState } from 'react';

export const useMultiSteps = ( totalSteps = 2 ) => {

    const [currentStep, setCurrentStep] = useState(1)
    const [maxStepReached, setMaxStepReached] = useState(1)

    const nextStep = () => {
        if (currentStep < totalSteps){
            setCurrentStep( currentStep + 1 );
        }
    }

    const prevStep = () => {
        if (currentStep > 1){
            setCurrentStep( currentStep - 1 )
        }
    };

    const onResetSteps = () => {
        setCurrentStep(1);
        setMaxStepReached(1);
    }

    useEffect(() => {
        if (currentStep > maxStepReached) {
            setMaxStepReached(currentStep);
        }
    }, [ currentStep, maxStepReached ]);
    


    return {
        currentStep,
        totalSteps,
        maxStepReached,
        nextStep,
        prevStep,
        onResetSteps,
    }
}
