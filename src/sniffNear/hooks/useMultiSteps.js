import { useCallback, useEffect, useState } from 'react';

export const useMultiSteps = ( total = 2 ) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [maxStepReached, setMaxStepReached] = useState(1);
    const [totalSteps, setTotalSteps] = useState( total );

    const nextStep = useCallback(() => {
        if (currentStep < totalSteps){
            setCurrentStep( currentStep + 1 );
        }
    }, [ currentStep, totalSteps ]);

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

    useEffect(() => {
        setTotalSteps( total );
    }, [ total ]);
    


    return {
        currentStep,
        totalSteps,
        maxStepReached,
        nextStep,
        prevStep,
        onResetSteps,
    }
}
