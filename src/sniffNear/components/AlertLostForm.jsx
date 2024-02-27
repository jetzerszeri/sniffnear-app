import { useContext, useEffect, useState } from 'react';
import { useMultiSteps } from '../hooks';
import { DogPawPrintIcon, Loader, MultiStepsIndicator } from '../../ui';
import { PetsList } from './PetsList';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AuthContext } from '../../auth/context';
import { AlertLostFormPart1 } from './AlertLostFormPart1';
import { AlertLostFormPart2 } from './AlertLostFormPart2';
import { useFetchSniffNearApi, useForm } from '../../hooks';
import { getCurrentDate } from '../helpers';

export const AlertLostForm = () => {

    const location = useLocation();
    const { user, coords, address } = useContext( AuthContext ); 
    const { type = '', petId } = queryString.parse( location.search );
    // const [ userPetsCount, setUserPetsCount ] = useState(0);
    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(4);
    const { formState,  errors, checkErrors,  onInputChange, setFormState, setErrors, } = useForm({
        petName: '',
        type: '',
        size: '',
        color1: '',
        breed: '',
        breedType: '',
        description: '',
        latitude: '',
        longitude: '',
        date: getCurrentDate(),
        time: '',
        img: '',
        personName: '',
        email: '',
        alertType: 'perdido',
        sex: '',
        creator: user.id,
        state:'',
        city:'',
        country:'',
    })


    useEffect(() => {
        if ( petId && currentStep === 1 ) {
            nextStep();
        }

        if ( type === 'lost' && !petId  && currentStep === 2) {
            prevStep();
        }
    }, [ petId, currentStep, type, prevStep, nextStep ]);


    useEffect(() => {
        ( petId && currentStep === 2 )  && getData(`pets/${petId}`);
    }, [ petId, currentStep, getData ]);


    useEffect(() => {
        if ( data  ) {
            setFormState({
                ...formState,
                petName: data.pet.name,
                type: data.pet.type,
                size: data.pet.size,
                color1: data.pet.color1,
                breed: data.pet.breed,
                breedType: data.pet.breedType,
                latitude: coords?.lat,
                longitude: coords?.lng,
                img: data.pet.img,
                personName: user.name,
                email: user.email,
                sex: data.pet.sex,
                state: address?.state,
                city: address?.city,
                country: address?.country,
            });
        }
    }, [ data, setFormState, user, coords, address ])
    
    

    
    

    

    return (
    <>
        <MultiStepsIndicator current={ currentStep } total={ totalSteps } />

        <form className="multiSteps">
            {
                currentStep === 1 &&
                <AlertLostFormPart1  />
            }

            {
                currentStep === 2 &&
                <AlertLostFormPart2 onInputChange={onInputChange} formState={formState} errors={errors} setErrors={setErrors} checkErrors={checkErrors} />
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

        {
            isLoading && <Loader label='Cargando la info de tu mascota' />
        }
    </>
    )
}
