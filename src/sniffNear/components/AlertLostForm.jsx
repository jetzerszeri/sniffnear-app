import { useContext, useEffect, useState } from 'react';
import { useMultiSteps } from '../hooks';
import { DogPawPrintIcon, MultiStepsIndicator } from '../../ui';
import { PetsList } from './PetsList';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AuthContext } from '../../auth/context';
import { AlertLostFormPart1 } from './AlertLostFormPart1';

export const AlertLostForm = () => {

    const location = useLocation();
    const { user } = useContext( AuthContext ); 
    const { type = '', petId } = queryString.parse( location.search );
    // const [ userPetsCount, setUserPetsCount ] = useState(0);
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(4);

    useEffect(() => {
        if ( petId && currentStep === 1 ) {
            nextStep();
        }

        if ( type === 'lost' && !petId  && currentStep === 2) {
            prevStep();
        }
    }, [ petId, currentStep, type, prevStep, nextStep ]);
    

    

    return (
    <>
        <MultiStepsIndicator current={ currentStep } total={ totalSteps } />

        <form className="multiSteps">
            {
                currentStep === 1 &&
                <AlertLostFormPart1  />
            }

            






            {/* <div className="AlertLostPart1">
                <h2>Seleccioná la mascota</h2>
                
                <PetsList forAlert={ true } />

                <div>
                    <p>Si la mascota que se te perdió todavía no tiene perfil, por favor creale uno para continuar con la alerta.</p>

                    <Link to="/pets/add?for=alert" className='plusOption'>
                            <DogPawPrintIcon />
                            Agregar mascota
                    </Link>

                </div>


                

                
            </div> */}


                {/* <div>
                    <input type="date" />
                    <input type="time" />
                </div> */}

        </form>
    </>
    )
}
