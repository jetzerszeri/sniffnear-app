import { useEffect } from 'react';
import { onRequieredInput } from '../../sniffNear/helpers';

export const PetColorInput = ( { color1Name = 'color1', color1value, changeFunction, required = false, errors, checkErrors, setErrors }) => {

    const error = errors[color1Name];

    const colors = ["blanco", "negro", "gris", "marrón", "naranja", "otro"];

    useEffect(() => {
        if (checkErrors){
            onRequieredInput( required, color1Name, color1value, setErrors );
        }
    }, [ checkErrors, required, color1Name, color1value, setErrors ]);

    const onPetColorClick = (e) => {
        changeFunction(color1Name, e.currentTarget.getAttribute('datavalue'));

        if (error){
            setErrors( prevErrors => {
                const updatedErrors = {...prevErrors};
                delete updatedErrors[color1Name];
                return updatedErrors;
            })
        }
    }
    


    return (
        <div className="inputContainer">
            <label htmlFor={color1Name}>Color</label>
                <input 
                type="hidden" 
                name={color1Name}
                id={color1Name}
                value={ color1value }
            />
            {error && <p className='errorInput'>{ error }</p>}

            <ul className="colorInputs">
                {
                    colors.map( color => (
                        <li
                            key={ color }
                            datavalue={ color }
                            className={ color1value === color ? 'selected' : ''}
                            onClick={ onPetColorClick }
                        >
                            { color }
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}
