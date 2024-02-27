import React, { useState } from 'react';
import { MapSniffNear } from './MapSniffNear';
import { DateInput, TextAreaInput, TimeInput } from '../../ui';

export const AlertLostFormPart2 = ( {onInputChange, errors, setErrors, checkErrors, formState} ) => {
    
    const [ position, setPosition ] = useState({
        "lat": 35.2713052,
        "lng": -80.9589791
      })

    return (
        <div className="alertLostPart2">
            <h2>¿Dónde y cuándo la viste por última vez?</h2>

            <div>
                {
                    position &&
                    <MapSniffNear position={position} alertForm={true}/>
                }
                <p>Por favor arrastrá el marcador a la ubicación donde viste a tu mascota por última vez.</p>
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

            <TextAreaInput
                name="description"
                value={ formState.description }
                label="Describe a tu mascota"
                placeholder={`Puedes compartir todos los datos que consideres necesarios para localizar rápidamente a ${formState.petName}`}
                onChangeFunction={ onInputChange }
                required={ true }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
            />


        </div>
    )
}
