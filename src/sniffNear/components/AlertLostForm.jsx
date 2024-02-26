import { useContext, useState } from 'react';
import { useMultiSteps } from '../hooks';
import { DogPawPrintIcon, MultiStepsIndicator } from '../../ui';
import { PetsList } from './PetsList';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/context';

export const AlertLostForm = () => {

    const { user } = useContext( AuthContext ); 
    // const [ userPetsCount, setUserPetsCount ] = useState(0);
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(4);
    
    console.log(user)
    return (
    <>
        <MultiStepsIndicator current={ currentStep } total={ totalSteps } />

        <form className="multiSteps">
            <div className="AlertLostPart1">
                <h2>Seleccioná la mascota</h2>
                
                <PetsList />

                <div>
                    <p>Si la mascota que se te perdió todavía no tiene perfil, por favor creale uno para continuar con la alerta.</p>

                    <Link to="/pets/add?for=alert" className='plusOption'>
                            <DogPawPrintIcon />
                            Agregar mascota
                    </Link>

                </div>

                {/* <Link to="/pets/add" className='btn small secundary'>Agregar otra mascota</Link> */}

                

                
            </div>


                {/* <div>
                    <input type="date" />
                    <input type="time" />
                </div> */}

        </form>
    </>
    )
}
