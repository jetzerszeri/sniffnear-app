import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ errors, setErrors ] = useState( {} );
    const [ checkErrors, setCheckErrors ] = useState( false )

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const setManualValue = (name, value) => {
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        errors,
        checkErrors,
        onInputChange,
        onResetForm,
        setErrors,
        setCheckErrors,
        setManualValue,
    }
}