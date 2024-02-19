import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { StepIndicatorIcon } from '../../ui/customIcons';
import { useMultiSteps } from '../hooks';
import { MultiStepsIndicator } from '../../ui/MultiStepsIndicator';

export const PetsAddPage = () => {

    const { currentStep, totalSteps, nextStep, prevStep} = useMultiSteps(4);

    return (
        <>
            <NavBar title='Agregar mascota' />
            <main>

                <MultiStepsIndicator total={totalSteps} current={currentStep} />


            </main>
        </>
    )
}
