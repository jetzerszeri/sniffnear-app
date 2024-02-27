import { useContext, useState } from 'react';
import { MapSniffNear } from './MapSniffNear';
import { DateInput, TextAreaInput, TimeInput } from '../../ui';
import { AuthContext } from '../../auth/context';
import { useNavigate } from 'react-router-dom';

export const AlertLostFormPart2 = ( {onInputChange, errors, setErrors, checkErrors, formState, setCheckErrors, nextStep, prevStep} ) => {
    
    const  { coords } = useContext( AuthContext );
    const navigate = useNavigate();
    
    // const [ position, setPosition ] = useState({ coords })
    const onNextStep = ( ) => {
        if ( formState.date === '' || formState.time === '' || formState.description === '' ){
            setCheckErrors(true);
            return;
        } else {
            nextStep();
        }
    }

    return (
        <div className="alertLostPart2">
            <h2>¿Dónde y cuándo la viste por última vez?</h2>

            <div>
                {
                    coords &&
                    <MapSniffNear position={coords} alertForm={true}/>
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

            <div className='actions'>
                <button className='btn secundary' type="buttton" onClick={ () => {navigate(-1) }}>Regresar</button>
                <button className='btn' type="buttton" onClick={ onNextStep }>Continuar</button>
            </div>
        </div>
    )
}
