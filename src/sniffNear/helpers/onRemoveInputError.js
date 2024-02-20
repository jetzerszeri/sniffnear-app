

export const onRemoveInputError = ( error, name, setErrors ) => {

    if (error){
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name];
            return updatedErrors;
        });
    }

}
