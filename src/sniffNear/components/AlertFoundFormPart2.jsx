import { PetBreedInput, PetSexInput, TextAreaInput, TextInput } from '../../ui';

export const AlertFoundFormPart2 = ( { onInputChange, formState, nextStep, prevStep, errors, checkErrors, setErrors, setManualValue, setCheckErrors }) => {

    const onNextStep = ( ) => {
        console.log('onNextStep');
        setCheckErrors( true );
        if ( errors.length > 0 || formState.breedType === '' || formState.description === '') return;
        nextStep();
        setCheckErrors( false );
    }

    return (
    <>
        <div className='step'>
            <h2>Contanos un poco más sobre la mascota que encontraste</h2>

            <PetBreedInput
                breedTypeValue={ formState.breedType }
                breedValue={ formState.breed }
                onChangeFunction={ onInputChange }
                required={ true }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
                forAlert={ true }
                label='¿Conocés su raza?'
            />

            <PetSexInput
                changeFunction={ setManualValue }
                sexValue={ formState.sex }
                errors={ errors }
                checkErrors={ checkErrors }
                setErrors={ setErrors }
                label='¿Sabés si es macho o hembra?'
            />

            <TextAreaInput
                name="description"
                value={ formState.description }
                label="Describí a la mascota"
                placeholder={`Puedés compartir todos los datos que consideres necesarios.`}
                onChangeFunction={ onInputChange }
                required={ true }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
            />

            <TextInput
                name="petName"
                value={ formState.petName }
                label="¿Tiene nombre?"
                onChangeFunction={ onInputChange }
                required={ false }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
            />

        </div>

        <div className='actions'>
            <button className='btn secundary' type="buttton" onClick={prevStep}>Regresar</button>
            <button className='btn' type="buttton" onClick={ onNextStep }>Continuar</button>
        </div>
        
    </>
    )
}
