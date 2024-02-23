import React, { useEffect, useState } from 'react';
import { onRemoveInputError, onRequieredInput } from '../../sniffNear/helpers';
import { TextInput } from './TextInput';

export const PetBreedInput = ( { nameSelect = 'breedType', breedTypeValue, breedName = 'breed', breedValue,  errors, onChangeFunction, required = false, setErrors, checkErrors }) => {
    
    const error = errors[nameSelect];
    const [ selectedBreedType, setSelectedBreedType ] = useState( false );

    useEffect(() => {
        if (checkErrors){
        onRequieredInput( required, nameSelect, breedTypeValue, setErrors );
        }
    }, [ checkErrors ]);

    useEffect(() => {
        if (breedTypeValue !== '' && breedTypeValue !== 'desconocido'){
            setSelectedBreedType(true);
        } else {
            setSelectedBreedType(false);
        }

        if (breedTypeValue !== 'raza' && errors[breedName]){
            onRemoveInputError( errors[breedName], breedName, setErrors, breedTypeValue );
        } else {
            onRequieredInput( required, breedName, breedValue, setErrors );
        }

    }, [breedTypeValue]);

    const onBlur = () => {
        onRequieredInput( required, nameSelect, breedTypeValue, setErrors );
        onRemoveInputError( error, nameSelect, setErrors, breedTypeValue );
    }


    

    return (
    <>
        
        <div className="inputContainer">
            <label htmlFor={ nameSelect }>Raza</label>
            <select 
                name={ nameSelect }
                value={ breedTypeValue }
                onChange={ onChangeFunction }
                onBlur={  onBlur }
                className={ error ? 'error' : '' }
            >
                <option value="" disabled defaultValue>Seleccioná una opción</option>
                <option value="raza">Mi mascota es de raza</option>
                <option value="callejero">Mi mascota es callejera</option>
                <option value="desconocido">No sé la raza de mi mascota</option>
            </select>
            {error && <p className='errorInput'>{ error }</p>}
        </div>

        {
            selectedBreedType && 
            <TextInput
                name={ breedName }
                value={ breedValue }
                placeholder="Ingresá la raza de tu mascota"
                onChangeFunction={ onChangeFunction }
                errors={ errors }
                required={ breedTypeValue === "raza" }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
            />
        }

        
    </>

    )
}
