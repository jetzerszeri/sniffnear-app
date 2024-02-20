import { useEffect, useState } from 'react';
import { SexFemaleIcon, SexMaleIcon } from '../customIcons';
import { onRequieredInput } from '../../sniffNear/helpers';

export const PetSexInput = ( { name = "sex", changeFunction, sexValue, required = false, errors, checkErrors, setErrors } ) => {
    
    const [ petSex, setPetSex ] = useState('');
    const error = errors[name];

    useEffect(() => {
        if (checkErrors){
            onRequieredInput( required, name, sexValue, setErrors );
        }
    }, [ checkErrors ])

    
    const onPetSexClick = (e) => {
        setPetSex(e.currentTarget.getAttribute('datavalue'));
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
    <div className='inputContainer'>
        <label htmlFor={name}>Sexo</label>

        <input 
            type="hidden" 
            name={name}
            id={name}
            value={ petSex }
        />
        {error && <p className='errorInput'>{ error }</p>}

        <ul className="sexSelector">
            <li
            datavalue="macho" 
            onClick={ onPetSexClick }
            className={sexValue === 'macho' ? 'selected' : ''}
            >
                <SexMaleIcon />
                <span>Macho</span>                       
            </li>        
            <li
                datavalue="hembra"
                onClick={ onPetSexClick }
                className={sexValue === 'hembra' ? 'selected' : ''}
            >
                <SexFemaleIcon />
                <span>Hembra</span>

            </li>
        </ul>

    </div>
    )
}
