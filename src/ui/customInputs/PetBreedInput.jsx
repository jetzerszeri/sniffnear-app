import React, { useEffect, useState } from 'react';
import { onRemoveInputError, onRequieredInput } from '../../sniffNear/helpers';
import { TextInput } from './TextInput';

export const PetBreedInput = ( { nameSelect = 'breedType', breedTypeValue, breedName = 'breed', breedValue,  errors, onChangeFunction, required = false, setErrors, checkErrors, forAlert = false, label = 'Raza' }) => {
    
    const error = errors[nameSelect];
    const [ selectedBreedType, setSelectedBreedType ] = useState( false );

    useEffect(() => {
        if (checkErrors){
        onRequieredInput( required, nameSelect, breedTypeValue, setErrors );
        }
    }, [ checkErrors, breedTypeValue, required, nameSelect, setErrors ]);

    useEffect(() => {
        if (breedTypeValue !== '' && breedTypeValue !== 'desconocido'){
            setSelectedBreedType(true);
        } else {
            setSelectedBreedType(false);
        }

        if (breedTypeValue !== 'raza' && errors[breedName]){
            onRemoveInputError( errors[breedName], breedName, setErrors, breedTypeValue );
        } 
        // else {
        //     onRequieredInput( required, breedName, breedValue, setErrors );
        // }

    }, [ breedTypeValue, breedName, errors, required, setErrors ]);

    const onBlur = () => {
        onRequieredInput( required, nameSelect, breedTypeValue, setErrors );
        onRemoveInputError( error, nameSelect, setErrors, breedTypeValue );
    }


    

    return (
    <>
        
        <div className="inputContainer">
            <label htmlFor={ nameSelect }>{label}</label>
            <select 
                name={ nameSelect }
                value={ breedTypeValue }
                onChange={ onChangeFunction }
                onBlur={  onBlur }
                className={ error ? 'error' : '' }
            >
                <option value="" disabled defaultValue>Seleccioná una opción</option>
                <option value="raza">{ forAlert ? 'La' : 'Mi'} mascota es de raza</option>
                <option value="callejero">{ forAlert ? 'La' : 'Mi'} mascota es callejera</option>
                <option value="desconocido">No sé la raza de { forAlert ? 'la' : 'Mi'} mascota</option>
            </select>
            {error && <p className='errorInput'>{ error }</p>}
        </div>

        {
            selectedBreedType && 
            <TextInput
                name={ breedName }
                value={ breedValue }
                placeholder={breedTypeValue === "raza" ? "Ingresá la raza de la mascota" : "Ingresá una breve descripción de la mascota"}
                onChangeFunction={ onChangeFunction }
                errors={ errors }
                setErrors={ setErrors }
                checkErrors={ checkErrors }
            />
        }

        
    </>

    )
}
