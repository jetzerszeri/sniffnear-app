import { DateInput, PetBreedInput, PetColorInput, PetSexInput, PetSizeInput, TextAreaInput, TextInput } from '../../ui/customInputs';

export const PetFormPart2 = ( { name, birthdate, breedType, breed, sex, size, color1, errors, setErrors, checkErrors, onInputChange, setManualValue, bySteps = false, displayContentInput = null, content } ) => {
    
    return (
    <div className={ bySteps ? 'step' : '' }>
        { bySteps && <h2>Contanos sobre tu mascota</h2>}

       
            <TextInput
                name="name"
                value={ name }
                placeholder="Ingresa el nombre de tu mascota"
                onChangeFunction={ onInputChange }
                label="Nombre"
                errors={ errors }
                setErrors={ setErrors }
                required={ true }
                checkErrors={ checkErrors }
            />
       


        <DateInput
            name="birthdate"
            value={ birthdate }
            label="Fecha de nacimiento"
            onChangeFunction={ onInputChange }
            required={ true }
            errors={ errors }
            setErrors={ setErrors }
            checkErrors={ checkErrors }
            max={ true }
            note="Puede ser un aproximado*"
        />

        <PetBreedInput
            breedTypeValue={ breedType }
            breedValue={ breed }
            onChangeFunction={ onInputChange }
            required={ true }
            errors={ errors }
            setErrors={ setErrors }
            checkErrors={ checkErrors }
        />

        <PetSexInput
            changeFunction={ setManualValue }
            sexValue={ sex }
            required={ true }
            errors={ errors }
            checkErrors={ checkErrors }
            setErrors={ setErrors }
        />

        <PetSizeInput
            changeFunction={ setManualValue }
            required={ true }
            errors={ errors }
            checkErrors={ checkErrors }
            setErrors={ setErrors }
            sizeValue={ size }
        />

        <PetColorInput
            color1value={ color1 }
            changeFunction={ setManualValue }
            required={ true }
            errors={ errors }
            checkErrors={ checkErrors }
            setErrors={ setErrors }
        />

        {
            displayContentInput &&
            <TextAreaInput
                name="content"
                value={ content }
                placeholder="Por favor agregá una descripción de la mascota"
                onChangeFunction={ onInputChange }
                label="Descripción"
                errors={ errors }
                setErrors={ setErrors }
                required={ true }
                checkErrors={ checkErrors }
            />
        }

    </div>
    )
}
