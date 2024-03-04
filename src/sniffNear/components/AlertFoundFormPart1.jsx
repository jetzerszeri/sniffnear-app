import { useNavigate } from 'react-router-dom';
import { PetColorInput, PetSizeInput, PetTypeInput } from '../../ui';
import { useEffect, useState } from 'react';

export const AlertFoundFormPart1 = ( { setManualValue, formState, nextStep, errors, checkErrors, setErrors } ) => {

    const navigate = useNavigate();
    const [ validated, setValidated ] = useState(false);
    
    useEffect(() => {
        (formState.type !== '' && formState.color1 !== '' && formState.size !== '') ? setValidated(true) : setValidated(false);
    }, [formState]);
    
    return (
        <>
            <div className='step'>
                <h2>¿Qué tipo de mascota es, de qué color, y de qué tamaño?</h2>

                <PetTypeInput
                    changeFunction={ setManualValue }
                    typeValue={ formState.type }
                />

                <PetColorInput
                    changeFunction={ setManualValue }
                    color1value={ formState.color1 }
                    required={ true }
                    errors={ errors }
                    checkErrors={ checkErrors }
                    setErrors={ setErrors }
                    label={ null }
                />

                <PetSizeInput
                    changeFunction={ setManualValue }
                    sizeValue={ formState.size }
                    required={ true }
                    errors={ errors }
                    checkErrors={ checkErrors }
                    setErrors={ setErrors }
                    label={ null }
                />
            </div>

            <div className='actions'>
                <button className='btn secundary' type="buttton" onClick={ () => {navigate(-1) }}>Regresar</button>
                <button className='btn' type="buttton"  disabled={ !validated } onClick={ nextStep }>Continuar</button>
            </div> 
        
        </>
    )
}
