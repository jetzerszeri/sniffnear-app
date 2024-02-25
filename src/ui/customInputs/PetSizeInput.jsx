import { useEffect, useState } from "react";
import { PetSizeLgIcon, PetSizeMdIcon, PetSizeSmIcon } from "../customIcons";
import { onRequieredInput } from "../../sniffNear/helpers";


export const PetSizeInput = ( { name='size', changeFunction, sizeValue, required = false, errors, checkErrors, setErrors }) => {

    const [petSize, setPetSize] = useState('');
    const error = errors[name];

    useEffect(() => {
        if (checkErrors){
            onRequieredInput( required, name, sizeValue, setErrors );   
        }
    }, [ checkErrors, required, name, sizeValue, setErrors ]);

    const onPetSizeClick = (e) => {
        setPetSize(e.currentTarget.getAttribute('datavalue'));
        changeFunction(name, e.currentTarget.getAttribute('datavalue'));

        if (error){
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    }

    return (
        <div className="inputContainer">
            <label htmlFor="size">Tamaño</label>
            <input
                type="hidden"
                name={name}
                id={name}
                value={petSize}
            />
            {error && <p className='errorInput'>{ error }</p>}


            <ul className="sizeSelector">
                <li
                    datavalue="pequeño"
                    onClick={onPetSizeClick}
                    className={sizeValue === 'pequeño' ? 'selected' : ''}
                >
                    <div>
                        <PetSizeSmIcon />
                    </div>
                    <span>Pequeño</span>
                </li>

                <li
                    datavalue="mediano"
                    onClick={onPetSizeClick}
                    className={sizeValue === 'mediano' ? 'selected' : ''}
                >
                    <div>
                        <PetSizeMdIcon />
                    </div>
                    <span>Mediano</span>
                </li>

                <li
                    datavalue="grande"
                    onClick={onPetSizeClick}
                    className={sizeValue === 'grande' ? 'selected' : ''}
                >
                    <div>
                        <PetSizeLgIcon />
                    </div>
                    <span>Grande</span>
                </li>
            </ul>
        </div>

    )
}
