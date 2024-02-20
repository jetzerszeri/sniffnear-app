import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components';
import { useMultiSteps } from '../hooks';
import { MultiStepsIndicator } from '../../ui/MultiStepsIndicator';
import { DateInput, PetTypeInput, TextInput } from '../../ui/customInputs';
import { useForm } from '../../hooks/useForm';

export const PetsAddPage = () => {

    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep} = useMultiSteps(3);
    const { type, name, birthdate, breed, errors, checkErrors, setErrors, setCheckErrors, onInputChange, setManualValue } = useForm({
        type: '',
        name: '',
        birthdate: '',
        breed: ''
    });
    const [ prevBtnLabel, setPrevBtnLabel ] = useState( 'Cancelar' );
    
    const navigate = useNavigate();

    useEffect(() => {
        currentStep === 1 ? setPrevBtnLabel('Cancelar') : setPrevBtnLabel('Anterior');
    }, [ currentStep ]);


    



    const onPrevius = () => {
        prevStep();
        if (currentStep === 1) {
            navigate(-1);
        }
    }

    const onNext = () => {
        nextStep();
    }
    

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <NavBar title='Agregar mascota' />
            <main className='fullHeight'>

                <MultiStepsIndicator total={totalSteps} current={currentStep} />

                <form className='multiSteps' onSubmit={ onSubmit }>

                    {
                        currentStep === 1 && 
                        <div className='step'>
                            <h2>¿Qué tipo de mascota es?</h2>
                            <PetTypeInput 
                                changeFunction={ setManualValue }
                                typeValue={ type }
                                onClickFunction={ onNext }
                            />
                        </div>
                    }
                    {
                        currentStep === 2 && 
                        <div className='step'>
                            <h2>Contanos sobre tu mascota</h2>

                            <TextInput
                                name="name"
                                value={ name }
                                placeholder="Ingresa el nombre de tu mascota"
                                onChangeFunction={ onInputChange }
                                label="Nombre"
                                errors={ errors }
                                setErrors={ setErrors }
                                required={ true }
                                checkErrors={ checkErrors }
                            />

                            <DateInput
                                name="birthdate"
                                value={ birthdate }
                                label="Fecha de nacimiento"
                                onChangeFunction={ onInputChange }
                                required={ true }
                                errors={ errors }
                                setErrors={ setErrors }
                                checkErrors={ checkErrors }
                                max={ true }
                            />






                        </div>
                    }
                    {
                        currentStep === 3 && 
                        <div className='step'>
                            <h2>¿De qué raza es?</h2>
                            <input 
                                type="text" 
                                name="breed" 
                                value={ breed } 
                                onChange={ onInputChange }
                            />
                        </div>
                    }




                    <div className='actions'>
                        <button 
                            className='btn secundary'
                            onClick={ onPrevius }
                        >
                            { prevBtnLabel}
                        </button>

                        {
                            (currentStep > 1 || maxStepReached > 1) 
                               && <button 
                                    className='btn'
                                    onClick={ onNext }
                                >
                                    Siguiente
                                </button>
                        }
                    </div>


                </form>


            </main>
        </>
    )
}
