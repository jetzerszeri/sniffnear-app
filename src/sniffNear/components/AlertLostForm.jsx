import { useCallback, useContext, useEffect, useState } from 'react';
import { useMultiSteps } from '../hooks';
import { DogPawPrintIcon, Loader, MultiStepsIndicator } from '../../ui';
import { PetsList } from './PetsList';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AuthContext } from '../../auth/context';
import { AlertLostFormPart1 } from './AlertLostFormPart1';
import { AlertLostFormPart2 } from './AlertLostFormPart2';
import { useFetchSniffNearApi, useForm, usePreviewAndUploadImg } from '../../hooks';
import { getCurrentDate } from '../helpers';
import { AlertFormVerification } from './AlertFormVerification';
import { AlertLostFormImgStep } from './AlertLostFormImgStep';

export const AlertLostForm = () => {

    const location = useLocation();
    const { user, coords, address } = useContext( AuthContext ); 
    const { type = '', petId } = queryString.parse( location.search );
    // const [ userPetsCount, setUserPetsCount ] = useState(0);
    const { data, isLoading, error, getData, create } = useFetchSniffNearApi();
    const { currentStep, totalSteps, maxStepReached, nextStep, prevStep, onResetSteps} = useMultiSteps(4);
    const { formState,  errors, checkErrors,  onInputChange, setFormState, setErrors, setCheckErrors, setManualValue} = useForm({
        petName: '',
        type: '',
        size: '',
        color1: '',
        breed: '',
        breedType: '',
        description: '',
        latitude: null,
        longitude: null,
        date: getCurrentDate(),
        time: '',
        img: '',
        personName: '',
        email: '',
        alertType: 'perdido',
        sex: '',
        creator: '',
        state:'',
        city:'',
        country:'',
        pet: '',
    })
    const { imageSelected, uploadStatus, setImgFile, resetImg, uploadImg, setCurrentImg } = usePreviewAndUploadImg();
    const [ loaderLabel, setLoaderLabel ] = useState('Cargando la info...')


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
        if ( data?.pet ){
            const petData = {
                petName: data.pet.name,
                type: data.pet.type,
                size: data.pet.size,
                color1: data.pet.color1,
                breed: data.pet.breed,
                breedType: data.pet.breedType,
                // latitude: coords?.lat,
                // longitude: coords?.lng,
                img: data.pet.img,
                personName: user.name,
                email: user.email,
                sex: data.pet.sex,
                state: address?.state,
                city: address?.city,
                country: address?.country,
                creator: user.id,
                pet: data.pet._id,
            }


            if ( !formState.latitude && !formState.longitude ){
                setFormState((prevState) => ({
                    ...prevState,
                    ...petData,
                    latitude: coords?.lat,
                    longitude: coords?.lng,
                }));
            } else {
                setFormState((prevState) => ({
                    ...prevState,
                    ...petData
                }));
            }

        }


    }, [ data, setFormState, user, coords, address, formState.latitude, formState.longitude]);

    useEffect(() => {
        if ( data?.alert){
            console.log(data)
        }
    }, [ data ]);



    

    // useEffect(() => {
    //     if ( formState.latitude = '' && formState.longitude === '' ) {
    //         updateCoords( coords.lat, coords.lng );
    //     }
    // }, [formState, coords, setFormState])
    

    useEffect(() => {
        if  ((!imageSelected && currentStep === 2) || (formState.pet !== petId && currentStep === 2)) {
            data?.pet?.img && setCurrentImg( data.pet.img );
        }
    }, [ data, setCurrentImg, imageSelected, currentStep, formState.pet, petId ])
    
    

    const onPreventSubmit = (e) => {
        e.preventDefault();
    }


    const updateCoords = useCallback(( lat, lng ) => {
        setFormState({
            ...formState,
            latitude: lat,
            longitude: lng
        });
    }, [ formState, setFormState ]);



    const onCreateAlert = async() => {

        if ( imageSelected !== formState.img ) {
            setLoaderLabel('Subiendo la imagen...');
            console.log('hay que subir la imagen');
            
        } else {
            setLoaderLabel('Publicando la alerta...');
            await create('alerts', formState);
            // console.log('se publicó la alerta');
            // console.log(data)

        }

    }
    


    return (
    <>
        <MultiStepsIndicator current={ currentStep } total={ totalSteps } />

        <form className="multiSteps" onSubmit={ onPreventSubmit }>
            {
                currentStep === 1 &&
                <AlertLostFormPart1  />
            }

            {
                currentStep === 2 &&
                <AlertLostFormPart2 
                    onInputChange={onInputChange} 
                    formState={formState} 
                    errors={errors} 
                    setErrors={setErrors} 
                    checkErrors={checkErrors} 
                    setCheckErrors={setCheckErrors}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    updateCoords={updateCoords}
                />
            }

            {
                currentStep === 3 &&
                <AlertLostFormImgStep  
                    data={formState}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    imageSelected={ imageSelected } 
                    setImgFile={ setImgFile } 
                    resetImg={ resetImg }
                />
            }

            {
                currentStep === 4 &&
                <AlertFormVerification  
                    data={formState}
                    img={imageSelected}
                    onCreateAlert={onCreateAlert}
                    prevStep={prevStep}
                />
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
            isLoading && <Loader label={ loaderLabel } />
        }
    </>
    )
}
