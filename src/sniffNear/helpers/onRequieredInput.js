export const onRequieredInput = ( required, name, value, setErrors) => {

    if (required && value.trim().length === 0){
        setErrors( (prevErrors) => {
            return {
                ...prevErrors,
                [name]: '*Campo obligatorio'
            }
        })
    } 

}
