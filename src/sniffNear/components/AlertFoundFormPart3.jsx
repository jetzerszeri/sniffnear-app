import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/context';
import { DateInput, TimeInput } from '../../ui';
import { MapSniffNear } from './MapSniffNear';

export const AlertFoundFormPart3 = ( { onInputChange, formState, nextStep, prevStep, errors, checkErrors, setErrors, setManualValue, setCheckErrors, updateCoords} ) => {


    const { coords } = useContext( AuthContext );
    const [ position, setPosition ] = useState( null );

    useEffect(() => {

        if ( formState.latitude  && formState.longitude ) {
            setPosition({
                lat: formState.latitude, lng: formState.longitude
            });
        } else {
            setPosition(coords);
        }
    }, [ formState, setPosition, coords ])

    const onNextStep = ( ) => {
        if ( formState.date === '' || formState.time === '' || formState.description === '' ){
            setCheckErrors(true);
            return;
        } else {
            nextStep();
        }
    }


    return (
        <>
        <div className='step'>
            <h2>¿Dónde y cuándo la encontraste?</h2>

            <div>
                {
                    position &&
                    <MapSniffNear position={ position } alertForm={true} drag={true} formState={formState} updateCoords={updateCoords}/>
                }
                <p>Por favor arrastrá el marcador a la ubicación donde encontraste a la mascota.</p>
            </div>

            <DateInput
                name="date"
                value={ formState.date }
                label="¿Cuándo?"
                onChangeFunction={ onInputChange }
                required={ true }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
                max={ true }
            />

            <TimeInput
                name="time"
                value={ formState.time }
                label="¿A qué hora?"
                onChangeFunction={ onInputChange }
                required={ true }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
            />


        </div>

        <div className='actions'>
            <button className='btn secundary' type="buttton" onClick={prevStep}>Regresar</button>
            <button className='btn' type="buttton" onClick={ onNextStep } >Continuar</button>
        </div>
        
        </>
    )
}
