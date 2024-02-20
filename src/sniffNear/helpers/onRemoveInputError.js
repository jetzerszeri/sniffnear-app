

export const onRemoveInputError = ( error, name, setErrors, value ) => {

    if (error && value.trim().length > 0){
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name];
            return updatedErrors;
        });
    }

}
