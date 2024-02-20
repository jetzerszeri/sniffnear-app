import { useState } from 'react';
import { CatIcon, DogIcon } from '../customIcons';

export const PetTypeInput = ( { changeFunction, typeValue, onClickFunction } ) => {

    const [ petType, setPetType ] = useState('')

    const onPetTypeClick = (e) => {
        setPetType(e.currentTarget.getAttribute('datavalue'));
        changeFunction('type', e.currentTarget.getAttribute('datavalue'));
        onClickFunction();
    }

    return (
    <div>
        <ul className="petTypeSelector">
            <li>
                <div 
                    datavalue="perro" 
                    onClick={ onPetTypeClick }
                    className={typeValue === 'perro' ? 'selected' : ''}
                >
                    <DogIcon />
                    <p>Perro</p>                       
                </div>          
            </li>        
            <li>
                <div 
                    datavalue="gato" 
                    onClick={ onPetTypeClick }
                    className={typeValue === 'gato' ? 'selected' : ''}
                >    
                    <CatIcon />
                    <p>Gato</p>
                </div>    
            </li>
        </ul>
        <label htmlFor="type" className="hiddenLabel">Tipo de mascota</label>

        <input 
            type="hidden" 
            name="type"
            id="type" 
            value={ petType }
        />
    </div>
    )
}
